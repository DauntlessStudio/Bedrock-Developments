import * as fs from 'fs';
import * as path from 'path';
import {Instance} from 'chalk';
import { glob, globSync, globStream, globStreamSync, Glob } from 'glob';

export const appPath = path.resolve(__dirname);
const chalk = new Instance();

export type File = {filePath: string, fileContents: string}

export class Directories {
    private static input_behavior_path = '**/behavior_packs/*bp/';
    private static input_resource_path = '**/resource_packs/*rp/';
    private static output_behavior_path = '**/behavior_packs/*bp/';
    private static output_resource_path = '**/resource_packs/*rp/';
    
    public static get INPUT_BEHAVIOR_PATH() : string {
        return this.input_behavior_path;
    }
    
    public static get INPUT_RESOURCE_PATH() : string {
        return this.input_resource_path;
    }
    
    public static get OUTPUT_BEHAVIOR_PATH() : string {
        return this.output_behavior_path;
    }
    
    public static get OUTPUT_RESOURCE_PATH() : string {
        return this.output_resource_path;
    }
    
    public static set INPUT_BEHAVIOR_PATH(v: string) {
        if (globSync(v).every(path => fs.existsSync(path))) {
            this.input_behavior_path = v;
        } else {
            console.error(`${chalk.red(`Failed to resolve glob pattern ${v}. Cannot assign to input_behavior_path`)}`);
        }
    }
    
    public static set INPUT_RESOURCE_PATH(v: string) {
        if (globSync(v).every(path => fs.existsSync(path))) {
            this.input_resource_path = v;
        } else {
            console.error(`${chalk.red(`Failed to resolve glob pattern ${v}. Cannot assign to input_resource_path`)}`);
        }
    }
    
    public static set OUTPUT_BEHAVIOR_PATH(v: string) {
        if (globSync(v).every(path => fs.existsSync(path))) {
            this.output_behavior_path = v;
        } else {
            console.error(`${chalk.red(`Failed to resolve glob pattern ${v}. Cannot assign to output_behavior_path`)}`);
        }
    }
    
    public static set OUTPUT_RESOURCE_PATH(v: string) {
        if (globSync(v).every(path => fs.existsSync(path))) {
            this.output_resource_path = v;
        } else {
            console.error(`${chalk.red(`Failed to resolve glob pattern ${v}. Cannot assign to output_resource_path`)}`);
        }
    }
}

export function getFiles(globPattern: string): File[] {
    globPattern = globPattern.replace(/\/|\\+/g, '/');;

    return globSync(globPattern).map(file => {
        return {filePath: file, fileContents: String(fs.readFileSync(file))}
    });
}

export function setFiles(files: File[], overwrite: boolean = false) {
    files.forEach(file => {
        globSync(path.dirname(file.filePath)).forEach(directory => {
            const resolvedPath = path.join(directory, path.basename(file.filePath));
            if (!fs.existsSync(path.dirname(resolvedPath))) {
                fs.mkdirSync(path.dirname(resolvedPath), {recursive: true});
                console.log(`${chalk.green(`Creating directory at ${path.dirname(resolvedPath)}`)}`);
            }

            if (fs.existsSync(resolvedPath)) {
                if (overwrite) {
                    console.log(`${chalk.green(`Overwriting file at ${resolvedPath}`)}`);
                    fs.writeFileSync(resolvedPath, file.fileContents);
                    return;
                } else {
                    console.warn(`${chalk.yellow(`Won't overwrite file at ${resolvedPath}`)}`);
                    return;
                }
            }

            console.log(`${chalk.green(`Writing file at ${resolvedPath}`)}`);
            fs.writeFileSync(resolvedPath, file.fileContents);
        });
    });
}