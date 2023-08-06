export declare class jsonFile {
    json: any;
    file: string;
    constructor(json: any, file: string);
}
interface pathOptions {
    source_path: string;
    default_path?: string;
    target_path: string;
}
export declare function getFilesFromGlob(path: string): Promise<string[]>;
/**
 * @remarks gets json files from a blob pattern
 * @param path the path to the source file
 * @param default_path the path to the default source file if path is invalid
 * @returns a list of files matching the glob
 */
export declare function readJSONFromGlob(path: string, default_path?: string): Promise<jsonFile[]>;
/**
 * @remarkds gets a json file from a direct string
 * @param path the path to the source file
 * @param default_path the path to the default source file if path is invalid
 * @returns the json file
 */
export declare function readJSONFromPath(path: string, default_path?: string): Promise<jsonFile>;
/**
 * @remarks writes a json object to disk
 * @param path the path to write the file to
 * @param json the json object to write
 * @param overwrite should the target file be overwritten
 */
export declare function writeFileFromJSON(path: string, json: any, overwrite?: boolean, log_exists?: boolean, customWrite?: boolean): void;
/**
 * @remarks reads a json file, modifies it with the callback, and writes it to the target path
 * @param path_options the source and target paths
 * @param callback a callback to modify the json before writing
 * @param write_options additional options for how the file should be written
 */
export declare function modifyAndWriteFile(path_options: pathOptions, callback: Function, write_options?: {
    overwrite?: boolean;
    log_exists?: boolean;
    custom_write?: boolean;
}): Promise<void>;
/**
 * @remarks reads a json file, modifies it with the callback, and writes it to the target path
 * @param path_options the source and target paths
 * @param callback a callback to modify the json before writing
 * @param write_options additional options for how the file should be written
 */
export declare function modifyAndWriteGlob(source_path: string, callback: Function, write_options?: {
    overwrite?: boolean;
    log_exists?: boolean;
}): Promise<boolean>;
/**
 *
 * @param source the file to be copied
 * @param target the path to copy the file to
 */
export declare function copyFile(source: string, target: string): void;
/**
 * @remarks reads a local source file as a string
 * @param path path to a local src file, not a glob
 * @returns the string contents of the file
 */
export declare function readSourceFile(path: string): string;
/**
 * @remarks writes a line of text to the en_US.lang file
 * @param entry the line to add to the lang file
 * @param category the category the entry should be added to
 */
export declare function writeToLang(entry: string, category: string, path?: string): void;
/**
 * @remarks writes a string of text to a file
 * @param path the path to write the file too
 * @param data the string that should be written
 * @param overwrite should an existing file at that path be overwritten
 */
export declare function writeFileFromString(path: string, data: string, overwrite?: boolean): void;
/**
 * @remarks writes a string to a data buffer to a file
 * @param path the path to write the file too
 * @param data the string that should be written
 * @param overwrite should an existing file at that path be overwritten
 */
export declare function writeBufferFileFromString(path: string, data: string, overwrite?: boolean): void;
/**
 * @remarks deletes a file at a given path
 * @param path the path to delete the file from
 */
export declare function deleteFile(path: string): void;
/**
 * @remarks copies directory from source to destination recursively
 * @param src the source directory
 * @param dest the target directory
 */
export declare function copyDirectory(src: string, dest: string): void;
/**
 * @remarks compresses a directory to a zip-like file
 * @param dir the directory to compress
 * @param zipPath the path the compressed directory should be written to
 * @param callback the callback to run when the compression finishes
 */
export declare function archiveDirToZip(dir: string, zipPath: string, callback: Function): void;
export {};
