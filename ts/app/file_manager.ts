import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';
import { chalk } from './utils.js';
import { exec } from "child_process";
import { fileURLToPath } from 'url';
import * as archiver from 'archiver';

export type File = {filePath: string, fileContents: string, handleExisting? : 'overwrite' | 'overwrite_silent'};

export class Directories {
    private static behavior_path = '**/behavior_packs/*bp/';
    private static resource_path = '**/resource_packs/*rp/';
    private static source_path = path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url))), 'src');

    public static get SOURCE_PATH() : string {
        return this.source_path;
    }
    
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

export function copySourceFile(sourceFile: string, targetPath: string) {
    if (!fs.existsSync(path.dirname(targetPath))) {
        fs.mkdirSync(path.dirname(targetPath), {recursive: true});
        console.log(`${chalk.green(`Creating directory at ${path.dirname(targetPath)}`)}`);
    }

    console.log(`${chalk.green(`Writing file at ${targetPath}`)}`);
    fs.copyFileSync(path.join(Directories.SOURCE_PATH, sourceFile), targetPath);
}

export function copySourceDirectory(src: string, dest: string) {
    fs.mkdirSync(dest, { recursive: true })
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries)
    {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ? copySourceDirectory(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    }
}

export function archiveDirectory(dir: string, zipPath: string, callback: Function) {
    let output = fs.createWriteStream(zipPath);
    let archive = archiver.default('zip', { zlib: { level: 9 } });
   
    output.on('close', async () => {
     await callback();
     fs.rmSync(dir, {recursive: true, force: true});
    });
   
    archive.pipe(output);
    archive.directory(dir, '');
    archive.finalize();
}

export function getStringFromTemporaryFile(): Promise<string> {
    const filename = 'temp-' + Date.now() + '.txt';
    fs.writeFileSync(filename, '');

    return new Promise<string>(resolve => {
        exec(`Notepad ${filename}`).on("close", () => {
            const contents = String(fs.readFileSync(filename));
            fs.rmSync(filename);
            resolve(contents)
        });
    });
}