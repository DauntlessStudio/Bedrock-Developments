import * as fs from 'fs';
import * as glob from 'glob';
import * as Global from './globals';
import * as Chalk from 'chalk';
import * as JSONC from 'comment-json';
import * as archiver from 'archiver';
import Path from 'path';

const chalk = new Chalk.Instance();
export class jsonFile {
    json: any = {};
    file: string = '';
    constructor(json: any, file: string) {
        this.json = json;
        this.file = file;
    }
}

interface pathOptions {
    source_path: string,
    default_path?: string,
    target_path: string,
}

/**
 * @remarks gets json files from a blob pattern
 * @param path the path to the source file
 * @param default_path the path to the default source file if path is invalid
 * @returns a list of files matching the glob
 */
export async function readJSONFromGlob(path: string, default_path: string='') {
    // path to glob
    path = path.replace(/\/|\\+/g, '/');
    const glob_files = new Promise<string[]>((resolve, reject) => {
        glob.glob(path, function (error, glob_files) {
            if (error) {
                reject(error);
            }
            resolve(glob_files);
        });
    });
    let files = await glob_files;

    if (!files.length) {
        files = [default_path];
    }

    // gets json objects from blob path
    let return_values: jsonFile[] = [];
    let data;
    try {
        for (const file of files) {
            if (fs.existsSync(file)) {
                data = String(fs.readFileSync(file));
                return_values.push(new jsonFile(JSONC.parse(data), file));
            }
        }
    } catch (error) {
        throw new Error(String(error));
    }
    return return_values;
}

/**
 * @remarkds gets a json file from a direct string
 * @param path the path to the source file
 * @param default_path the path to the default source file if path is invalid
 * @returns the json file
 */
export async function readJSONFromPath(path: string, default_path: string='') {
    let read_path = fs.existsSync(path) ? path : default_path;

    try {
        return new jsonFile(JSONC.parse(String(fs.readFileSync(read_path))), read_path)
    } catch (error) {
        throw new Error(String(error));
    }
}

/**
 * @remarks writes a json object to disk
 * @param path the path to write the file to
 * @param json the json object to write
 * @param overwrite should the target file be overwritten
 */
export function writeFileFromJSON(path: string, json: any, overwrite: boolean=false, log_exists: boolean=true) {
    makeDirectory(path);

    if (!fs.existsSync(path) || overwrite) {
        fs.writeFileSync(path, JSONC.stringify(json, null, Global.indent));
        console.log(`${chalk.green(`Wrote JSON to: ${path}`)}`);
    }else if (log_exists) {
        console.log(`${chalk.red(`File already existed at ${path}`)}`);
    }
}

/**
 * @remarks reads a json file, modifies it with the callback, and writes it to the target path
 * @param path_options the source and target paths
 * @param callback a callback to modify the json before writing
 * @param write_options additional options for how the file should be written
 */
export async function modifyAndWriteFile(path_options: pathOptions, callback: Function, write_options?: {overwrite?: boolean, log_exists?: boolean}) {
    console.log(path_options.source_path);
    const json_file = await readJSONFromPath(path_options.source_path, path_options.default_path)
    callback(json_file.json);
    writeFileFromJSON(path_options.target_path, json_file.json, write_options?.overwrite, write_options?.log_exists)
}

/**
 * @remarks reads a json file, modifies it with the callback, and writes it to the target path
 * @param path_options the source and target paths
 * @param callback a callback to modify the json before writing
 * @param write_options additional options for how the file should be written
 */
export async function modifyAndWriteGlob(source_path: string, callback: Function, write_options?: {overwrite?: boolean, log_exists?: boolean}) {
    const json_files = await readJSONFromGlob(source_path);
    if (json_files.length) {
        const write_files = json_files.filter((element) => callback(element.json));

        for (const file of write_files) {
            writeFileFromJSON(file.file, file.json, write_options?.overwrite, write_options?.log_exists);
        }
        return true;
    } else {
        return false;
    }
}

/**
 * 
 * @param source the file to be copied
 * @param target the path to copy the file to
 */
export function copyFile(source: string, target: string) {
    makeDirectory(target);
    fs.copyFileSync(source, target);
    console.log(`${chalk.green(`Wrote file to: ${target}`)}`);
}

/**
 * @remarks reads a local source file as a string
 * @param path path to a local src file, not a glob
 * @returns the string contents of the file
 */
export function readSourceFile(path: string) {
    return String(fs.readFileSync(path));
}

/**
 * @remarks writes a line of text to the en_US.lang file
 * @param entry the line to add to the lang file
 * @param category the category the entry should be added to
 */
export function writeToLang(entry: string, category: string, path: string = `${Global.project_rp}texts/en_US.lang`) {
    let data = '';

    makeDirectory(path);

    category = category.toUpperCase();

    if (fs.existsSync(path)) {
        data = String(fs.readFileSync(path));
    }

    if (data.includes(entry)) {
        console.log(`${chalk.red(`${path} already contains "${entry}"`)}`);
        return;
    }

    let match = data.match(`\\b${category}\\b.+`);
    if (match) {
        data = data.replace(match[0], `${match[0]}\n${entry}`);
    }else {
        data += `\n\n## ${category} ${'='.repeat(120-4-category.length)}\n${entry}`;
    }

    fs.writeFileSync(path, data);
    console.log(`${chalk.green(`Wrote to ${category} at ${path}`)}`);
}

/**
 * @remarks writes a string of text to a file
 * @param path the path to write the file too
 * @param data the string that should be written
 * @param overwrite should an existing file at that path be overwritten
 */
export function writeFileFromString(path: string, data: string, overwrite: boolean = false) {
    makeDirectory(path);

    if (!fs.existsSync(path) || overwrite) {
        fs.writeFileSync(path, data);
        console.log(`${chalk.green(`Wrote text to ${path}`)}`);
    }else {
        console.log(`${chalk.red(`File already existed at ${path}`)}`);
    }
}

/**
 * @remarks writes a string to a data buffer to a file
 * @param path the path to write the file too
 * @param data the string that should be written
 * @param overwrite should an existing file at that path be overwritten
 */
export function writeBufferFileFromString(path: string, data: string, overwrite: boolean = false) {
    makeDirectory(path);

    if (!fs.existsSync(path) || overwrite) {
        fs.writeFileSync(path, Buffer.from(data, 'utf8'));
        console.log(`${chalk.green(`Wrote data to ${path}`)}`);
    }else {
        console.log(`${chalk.red(`File already existed at ${path}`)}`);
    }
}

/**
 * @remarks deletes a file at a given path
 * @param path the path to delete the file from
 */
export function deleteFile(path: string) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

/**
 * @remarks creates recursive directories, to be used before writing files
 * @param path the file path
 */
function makeDirectory(path: string) {
    let dir_paths = path.replace(/\/|\\+/g, '/').split('/');
    dir_paths.pop();
    let dir = `${dir_paths.join('/')}/`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
        console.log(`${chalk.yellow(`Creating Directory at: ${dir}`)}`);
    }
}

/**
 * @remarks copies directory from source to destination recursively
 * @param src the source directory
 * @param dest the target directory
 */
export function copyDirectory(src: string, dest: string)
{
    fs.mkdirSync(dest, { recursive: true })
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries)
    {
        let srcPath = Path.join(src, entry.name);
        let destPath = Path.join(dest, entry.name);

        entry.isDirectory() ? copyDirectory(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    }
}

/**
 * @remarks compresses a directory to a zip-like file
 * @param dir the directory to compress
 * @param zipPath the path the compressed directory should be written to
 * @param callback the callback to run when the compression finishes
 */
export function archiveDirToZip(dir: string, zipPath: string, callback: Function) {
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