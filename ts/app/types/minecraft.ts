import { Directories, File, getFiles } from "../new_file_manager";
import * as JSONC from 'comment-json';
import { NameData, chalk } from "../utils";
import path from "path";

function non_serializable(target: any, key: string) {
    let currentValue = target[key];
  
    Object.defineProperty(target, key, {
      set: (newValue: string) => {
        currentValue = newValue;
      },
      get: () => currentValue,
    });
}

export class MinecraftDataType {
    @non_serializable
    public filePath: string;
    
    public static get DirectoryPath() : string {
        return '';
    }

    constructor(filePath: string, template: any) {
        this.filePath = filePath;
    }

    public static createFilePath(nameData: NameData): string {
        return this.DirectoryPath + nameData.directory + nameData.shortname + ".json";
    }

    public serialize(): string {
        return JSONC.stringify(this, null, '\t');
    }

    public static deserialize<T>(create: new (filePath: string, template: any) => T, filepath: string, json: string): T {
        return new create(filepath, JSONC.parse(json));
    }

    public toFile(): File {
        return {filePath: this.filePath, fileContents: this.serialize()};
    }

    public fromFile<T>(create: new (filePath: string, template: any) => T, file: File): T {
        return MinecraftDataType.deserialize(create, file.filePath, file.fileContents);
    }
}

export class LangFile {
    files: File[];

    constructor(filepattern: string) {
        this.files = getFiles(Directories.OUTPUT_RESOURCE_PATH + 'texts/' + filepattern);
        if (!this.files.length) {
            this.files = [{filePath: Directories.OUTPUT_RESOURCE_PATH + 'texts/' + 'en_US.lang', fileContents: `## RESOURCE PACK MANIFEST `.padEnd(120, '=')}];
        }

        this.files.forEach(file => file.handleExisting = 'overwrite_silent');
    }

    addToCategory(categoryName: string, ...entries: string[]) {
        categoryName = categoryName.toUpperCase();

        this.files.forEach(file => {
            if (!file.fileContents.includes(categoryName)) {
                file.fileContents += `\n\n## ${categoryName} `.padEnd(118, '=');
            }

            const lines = file.fileContents.split('\n');
            const categoryIndex = lines.findIndex(line => line.includes(categoryName));
            for (const entry of entries) {
                const key = entry.split('=')[0];

                if (!lines.find(line => line.startsWith(key))) {
                    console.log(`${chalk.green(`Adding ${entry} to ${path.basename(file.filePath)}`)}`);
                    lines.splice(categoryIndex + 1, 0, entry);
                } else {
                    console.log(`${chalk.yellow(`${path.basename(file.filePath)} already contains an entry for ${key}`)}`);
                }
            }
            
            file.fileContents = lines.join('\n');
        });
    }
}