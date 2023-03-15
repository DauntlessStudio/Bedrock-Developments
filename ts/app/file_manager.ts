import * as fs from 'fs';
import * as glob from 'glob';
import * as Global from './globals';
import * as Chalk from 'chalk';
import * as JSONC from 'comment-json';
import * as archiver from 'archiver';
import Path from 'path';

const chalk = new Chalk.Instance();

/**
 * @remarks gets a json object from a file glob
 * @param path The glob pattern for json files
 * @returns an array of objects containing the filepath that matched the glob pattern and the json object
 */
export async function readJSONFromFile(path: string, default_path: string='') {
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
    let return_values = [];
    let data;
    try {
        for (const file of files) {
            data = String(fs.readFileSync(file));
            return_values.push({json: JSONC.parse(data) as any, file: file});
        }
    } catch (error) {
        throw new Error(String(error));
    }
    return return_values;
}

/**
 * @remarks writes a json object to disk
 * @param path the path to write the file to
 * @param json the json object to write
 * @param overwrite should the target file be overwritten
 */
export function writeFileFromJSON(path: string, json: any, overwrite: boolean=false) {
    makeDirectory(path);

    if (!fs.existsSync(path) || overwrite) {
        fs.writeFileSync(path, JSONC.stringify(json, null, Global.indent));
        console.log(`${chalk.green(`Wrote JSON to: ${path}`)}`);
    }else {
        console.log(`${chalk.red(`File already existed at ${path}`)}`);
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

export function deleteDirectory(path: string) {
    if (fs.existsSync(path)) {
        for (const file of fs.readdirSync(path, {withFileTypes: true})) {
            const subpath = Path.join(path, file.name);
            if (file.isDirectory()) {
               deleteDirectory(subpath); 
            } else if (fs.existsSync(subpath)) {
                console.log(`Delete File: ${subpath}`);
                try {
                    fs.unlinkSync(subpath);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        if (fs.readdirSync(path).length) {
            console.log(`Remaining Files:`);
            fs.readdirSync(path).forEach((x) => {console.log(x)});
            deleteDirectory(path);
        }else {
            fs.rmdirSync(path);
        }
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