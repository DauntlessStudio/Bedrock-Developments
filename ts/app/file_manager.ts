import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';
import { chalk } from './utils.js';
import { exec } from "child_process";
import { fileURLToPath } from 'url';
import * as archiver from 'archiver';

/**
 * @remarks File Representation, contains the file path, file contents, and how to handle existing files.
 */
export type File = {filePath: string, fileContents: string, handleExisting? : 'overwrite' | 'overwrite_silent'};

/**
 * @remarks A global class for getting and setting workspace paths.
 */
export class Directories {
    private static behavior_path = '**/behavior_packs/*bp/';
    private static resource_path = '**/resource_packs/*rp/';
    private static addon_path = '';
    private static source_path = path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url))), 'src');
    private static package_path = path.join(path.resolve(path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))))), 'package.json');
    
    public static get PACKAGE_PATH() : string {
        return this.package_path;
    }
    
    /**
     * @remarks The path to the module's /src
     */
    public static get SOURCE_PATH() : string {
        return this.source_path + '/';
    }
    
    /**
     * @remarks The path to the vanilla behavior pack samples packaged with the module.
     */
    public static get VANILLA_BEHAVIOR_PATH() : string {
        return Directories.SOURCE_PATH + 'vanilla/behavior_pack/';
    }
    
    /**
     * @remarks The path to the vanilla resource pack samples packaged with the module.
     */
    public static get VANILLA_RESOURCE_PATH() : string {
        return Directories.SOURCE_PATH + 'vanilla/resource_pack/';
    }
    
    /**
     * @remarks The behavior pack in the workspace.
     */
    public static get BEHAVIOR_PATH() : string {
        try {
            return globSync(this.behavior_path)[0].replace(/\/|\\+/g, '/') + '/';
        } catch (error) {
            throw chalk.red("Cannot Find Behavior Path");
        }
    }
    
    /**
     * @remarks The resource pack in the workspace.
     */
    public static get RESOURCE_PATH() : string {
        try {
            return globSync(this.resource_path)[0].replace(/\/|\\+/g, '/') + '/';
        } catch (error) {
            throw chalk.red("Cannot Find Resource Path");
        }
    }

    /**
     * @remarks The addon subpath <team>/<project> or an empty string if unspecified.
     */
    public static get ADDON_PATH() : string {
        return Directories.addon_path;
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
    
    public static set ADDON_PATH(v : string) {
        Directories.addon_path = v + "/";
    }
}

/**
 * @remarks Gets files matching a glob pattern.
 * @param globPattern The glob pattern to use to find files.
 * @returns An array of {@link File}s matching the pattern.
 * @example
 * ```typescript
 * let files = getFiles(Directories.RESOURCE_PATH + 'texts/*.lang');
 * ```
 */
export function getFiles(globPattern: string): File[] {
    globPattern = globPattern.replace(/\/|\\+/g, '/');

    return globSync(globPattern).filter(file => fs.lstatSync(file).isFile()).map(file => {
        return {filePath: file, fileContents: String(fs.readFileSync(file))}
    });
}

/**
 * @remarks Writes an array of files.
 * @param files The array of {@link File}s to write.
 * @example
 * ```typescript
 * let files = getFiles(Directories.RESOURCE_PATH + 'texts/*.lang');
 * files.forEach(file => file.fileContents = ':)');
 * setFiles(files);
 * ```
 */
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

/**
 * @remarks Copies a source file from this module to a destination.
 * @param sourceFile The filepath to a source file within this module's src.
 * @param targetPath The filepath to the destination the file should be copied to.
 * @param handleExisting How to handle existing files. Undefined will not overwrite, 'overwite' replaces the file with this object, 
 * 'overwrite_silent' does the same with no terminal log.
 */
export function copySourceFile(sourceFile: string, targetPath: string, handleExisting? : 'overwrite' | 'overwrite_silent') {
    if (!fs.existsSync(path.dirname(targetPath))) {
        fs.mkdirSync(path.dirname(targetPath), {recursive: true});
        console.log(`${chalk.green(`Creating directory at ${path.dirname(targetPath)}`)}`);
    }

    if (fs.existsSync(targetPath)) {
        switch (handleExisting) {
            case 'overwrite':
                console.log(`${chalk.green(`Overwriting file at ${targetPath}`)}`);
                fs.copyFileSync(path.join(Directories.SOURCE_PATH, sourceFile), targetPath);
                return;
            case 'overwrite_silent':
                fs.copyFileSync(path.join(Directories.SOURCE_PATH, sourceFile), targetPath);
                return;
            default:
                console.warn(`${chalk.yellow(`Won't overwrite file at ${targetPath}`)}`);
                return;
        }
    }

    console.log(`${chalk.green(`Writing file at ${targetPath}`)}`);
    fs.copyFileSync(path.join(Directories.SOURCE_PATH, sourceFile), targetPath);
}

/**
 * @remarks Copies a source directory from this module to a destination.
 * @param src The path to a source directory within this module's src.
 * @param dest The filepath to the destination where the directory should be copied to.
 */
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

/**
 * @remarks Archives a directory, compressing to a .zip or .mcworld for example.
 * @param dir The directory to archive.
 * @param zipPath The path the directory should be archived to.
 * @param callback A callback to run when the directory finishes archiving.
 */
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

/**
 * @remarks Creates a temporary file, opening it in Notepad. The contents of the file will be returned when Notepad is closed.
 * @returns A promise to a string.
 */
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