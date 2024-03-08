import * as fs from 'fs';
import * as path from 'path';
import { glob, globSync, globStream, globStreamSync, Glob } from 'glob';
import { chalk } from './utils';

export const appPath = path.resolve(__dirname);

export type File = {filePath: string, fileContents: string, handleExisting? : 'overwrite' | 'merge' | 'overwrite_silent'};

export class Directories {
    private static behavior_path = '**/behavior_packs/*bp/';
    private static resource_path = '**/resource_packs/*rp/';
    
    public static get BEHAVIOR_PATH() : string {
        return globSync(this.behavior_path)[0].replace(/\/|\\+/g, '/') + '/';
    }
    
    public static get RESOURCE_PATH() : string {
        return globSync(this.resource_path)[0].replace(/\/|\\+/g, '/') + '/';
    }
    
    public static set BEHAVIOR_PATH(v: string) {
        if (globSync(v).every(path => fs.existsSync(path))) {
            this.behavior_path = v;
        } else {
            console.error(`${chalk.red(`Failed to resolve glob pattern ${v}. Cannot assign to behavior path`)}`);
        }
    }
    
    public static set RESOURCE_PATH(v: string) {
        if (globSync(v).every(path => fs.existsSync(path))) {
            this.resource_path = v;
        } else {
            console.error(`${chalk.red(`Failed to resolve glob pattern ${v}. Cannot assign to resource path`)}`);
        }
    }
}

export function getFiles(globPattern: string): File[] {
    globPattern = globPattern.replace(/\/|\\+/g, '/');

    return globSync(globPattern).map(file => {
        return {filePath: file, fileContents: String(fs.readFileSync(file))}
    });
}

export function setFiles(files: File[]) {
    files.forEach(file => {
        if (!fs.existsSync(path.dirname(file.filePath))) {
            fs.mkdirSync(path.dirname(file.filePath), {recursive: true});
            console.log(`${chalk.green(`Creating directory at ${path.dirname(file.filePath)}`)}`);
        }

        if (fs.existsSync(file.filePath)) {
            switch (file.handleExisting) {
                case 'merge':
                    // TODO: Handle File Merge
                case 'overwrite':
                    console.log(`${chalk.green(`Overwriting file at ${file.filePath}`)}`);
                    fs.writeFileSync(file.filePath, file.fileContents);
                    return;
                case 'overwrite_silent':
                    fs.writeFileSync(file.filePath, file.fileContents);
                    return;
                default:
                    console.warn(`${chalk.yellow(`Won't overwrite file at ${file.filePath}`)}`);
                    return;
            }
        }

        console.log(`${chalk.green(`Writing file at ${file.filePath}`)}`);
        fs.writeFileSync(file.filePath, file.fileContents);
    });
}