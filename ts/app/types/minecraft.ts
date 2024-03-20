import { Directories, File, getFiles } from "../file_manager.js";
import * as JSONC from 'comment-json';
import { NameData, chalk } from "../utils.js";
import path from "path";

export function non_serializable(target: any, key: string|symbol) {
    const privatePropKey = Symbol();
    Reflect.defineProperty(target, key, {
      get(this: any) {
        return this[privatePropKey]
      },
      set(this: any, newValue: string) {
        this[privatePropKey] = newValue;
      },
    });
}

/**
 * @remarks The parent class for all Minecraft data types, i.e. MinecraftServerClient.
 */
export class MinecraftDataType {
    @non_serializable
    public filePath: string;
    
    /**
     * @remarks The directory where this type of file is kept.
     */
    public static get DirectoryPath() : string {
        return '';
    }

    /**
     * @remarks Creates a new MinecraftDataType from a file path and object.
     * @param filePath The filepath to where this object should be written to.
     * @param template The object it should be created from.
     */
    constructor(filePath: string, template: any) {
        this.filePath = filePath;
    }

    /**
     * @remarks Creates a filepath for this object type from a {@link NameData}.
     * @param nameData The namedata to use when creating the filepath.
     * @returns The filepath as a string.
     */
    public static createFilePath(nameData: NameData): string {
        return this.DirectoryPath + nameData.directory + nameData.shortname + ".json";
    }

    /**
     * @remarks Creates a new instance of the data type using reasonable defaults from a {@link NameData}.
     * @param nameData The namedata to use for identifiers and the filepath.
     * @returns An instance of this data type.
     */
    public static createFromTemplate(nameData: NameData): MinecraftDataType {
        return new MinecraftDataType(this.createFilePath(nameData), {});
    }

    /**
     * @remarks Serializes this object to a string.
     * @returns A string representation of this object.
     */
    public serialize(): string {
        let outputString = JSONC.stringify(this, this.replacer, '\t');
        if (outputString.includes('"REMOVE')) {
            outputString = outputString.replace(/\\/g, '').replace(/REMOVE"/g, '').replace(/"REMOVE/g, '');
        }

        return outputString;
    }

    protected replacer(key: string, value: any) {
        return value;
    }

    /**
     * @remarks Creates an instace of a MinecraftDataType child from a source string, used in {@link fromFile}.
     * @param create The child of MinecraftDataType to create.
     * @param filepath The filepath the MinecraftDataType can be written to with {@link toFile}.
     * @param json The source string this should be deserialized from.
     * @returns An instance of the MinecraftDataType child provided.
     */
    public static deserialize<T>(create: new (filePath: string, template: any) => T, filepath: string, json: string): T {
        try {
            return new create(filepath, JSONC.parse(json));
        } catch (error) {
            console.error(`${chalk.red(`Failed to parse ${filepath}\n${error}\nCreating from template instead.`)}`);
            return this.createFromTemplate(new NameData(filepath)) as unknown as T;
        }
    }

    /**
     * @remarks Creates a {@link File} object from this MinecraftDataType.
     * @param handleExisting How to handle existing files. Undefined will not overwrite, 'overwite' replaces the file with this object, 
     * 'overwrite_silent' does the same with no terminal log.
     * @returns A {@link File} object with this MinecraftDataType's filepath, and this object serialized as the file contents.
     */
    public toFile(handleExisting? : 'overwrite' | 'overwrite_silent'): File {
        return {filePath: this.filePath, fileContents: this.serialize(), handleExisting};
    }

    /**
     * @remarks Crates an instance of a MinecraftDataTypeChild from a {@link File}.
     * @param create The child of MinecraftDataType to create.
     * @param file The {@link File} object used to deserialize into this object.
     * @returns An instance of the MinecraftDataType child provided.
     */
    public static fromFile<T>(create: new (filePath: string, template: any) => T, file: File): T {
        return this.deserialize(create, file.filePath, file.fileContents);
    }

    /**
     * @remarks Creates a MinecraftDataType object from a filepath, or a template if that filepath doesn't exist.
     * @param create The child of MinecraftDataType to create.
     * @param path The filepath to create the object from.
     * @returns The deserialized file as a child of MinecraftDataType, or this object's {@link createFromTemplate} default if the file doesn't exist.
     */
    public static fromPathOrTemplate<T>(create: new (filePath: string, template: any) => T, path: string): T {
        if (path) {
            const file = getFiles(path).shift();
            if (file) {
                return this.fromFile(create, file)
            }
        }

        return this.createFromTemplate(new NameData(path)) as unknown as T;
    }
}

/**
 * @remarks A class for working with lang files.
 */
export class LangFile {
    /**
     * @remarks The lang files handled by this class instance, as an array of {@link File}s.
     */
    public files: File[];

    /**
     * @remarks Gets a list of files from a glob pattern. Note that any valid pattern will work and the file will be treated as a lang file, even without the .lang extension.
     * @param filepattern The glob pattern to find lang files with. If no files match the pattern, a default `en_US.lang` file will be created automatically.
     */
    constructor(filepattern: string) {
        this.files = getFiles(Directories.RESOURCE_PATH + 'texts/' + filepattern);
        if (!this.files.length) {
            this.files = [{filePath: Directories.RESOURCE_PATH + 'texts/' + 'en_US.lang', fileContents: `## RESOURCE PACK MANIFEST `.padEnd(120, '=')}];
        }

        this.files.forEach(file => file.handleExisting = 'overwrite_silent');
    }

    /**
     * @remarks Adds a lang file entry to every `.lang` file in `RP/texts`.
     * @param categoryName The category to add an entry to, i.e. `Item Names`.
     * @param entries Entries to add to that category, i.e. `item.minecraft:test.name=Test`.
     * @returns A new LangFile object with every `.lang` file in the `RP/texts` directory, having added the entries.
     */
    public static addToAllLangs(categoryName: string, ...entries: string[]) {
        const langs = new LangFile('*.lang');
        langs.addToCategory(categoryName, ...entries);
        return langs;
    }

    /**
     * @remarks Adds an entry to all the `.lang` file in this object's {@link files} list.
     * @param categoryName The category to add an entry to, i.e. `Item Names`.
     * @param entries Entries to add to that category, i.e. `item.minecraft:test.name=Test`.
     */
    public addToCategory(categoryName: string, ...entries: string[]) {
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

/**
 * @remarks A class for working with `.mcfunction` files.
 */
export class MCFunction {
    /**
     * @remarks The mcfunction files handled by this class instance, as an array of {@link File}s.
     */
    public files: File[];

    /**
     * @remarks Creates a list of files from the filepattern. Note that if no files match the filepattern, a new file will be created in `BP/functions` using the filepattern as a path.
     * @param filepattern The filepattern used to find or create mcfunction files.
     */
    constructor(filepattern: string) {
        this.files = getFiles(Directories.BEHAVIOR_PATH + 'functions/' + filepattern);
        if (!this.files.length) {
            this.files = [{filePath: Directories.BEHAVIOR_PATH + 'functions/' + filepattern, fileContents: ""}];
        }

        this.files.forEach(file => file.handleExisting = 'overwrite');
    }

    /**
     * @remarks Adds commands and optional comments.
     * @param commands A list of commands to add to the files.
     * @param options The mcfunction's comments at the top of the file, note these are only added if the file is empty.
     */
    addCommand(commands: string[], options?: {description: string, source?: string, selector?: string}) {
        this.files.forEach(file => {
            file.fileContents = "";
            if (options) {
                file.fileContents += `## ${options.description ?? "Missing Description"}\n`;
                file.fileContents += `## Runs from "${options.source ?? "Missing Source"}"\n`;
                file.fileContents += `## @s = ${options.selector ?? "Missing Selector"}\n`;
            }

            for (const command of commands) {
                file.fileContents += "\n" + command;
            }
        });
    }
}