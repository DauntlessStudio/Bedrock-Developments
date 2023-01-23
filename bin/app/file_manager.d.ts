/**
 * @remarks gets a json object from a file glob
 * @param path The glob pattern for json files
 * @returns an array of objects containing the filepath that matched the glob pattern and the json object
 */
export declare function readJSONFromFile(path: string, default_path?: string): Promise<{
    json: any;
    file: string;
}[]>;
/**
 * @remarks writes a json object to disk
 * @param path the path to write the file to
 * @param json the json object to write
 * @param overwrite should the target file be overwritten
 */
export declare function writeFileFromJSON(path: string, json: any, overwrite?: boolean): void;
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
export declare function writeToLang(entry: string, category: string): void;
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
