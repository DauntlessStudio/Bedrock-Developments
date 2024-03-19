/**
 * @remarks File Representation, contains the file path, file contents, and how to handle existing files.
 */
export type File = {
    filePath: string;
    fileContents: string;
    handleExisting?: 'overwrite' | 'overwrite_silent';
};
/**
 * @remarks A global class for getting and setting workspace paths.
 */
export declare class Directories {
    private static behavior_path;
    private static resource_path;
    private static source_path;
    /**
     * @remarks The source path to the module itself.
     */
    static get SOURCE_PATH(): string;
    /**
     * @remarks The path to the vanilla behavior pack samples packaged with the module.
     */
    static get VANILLA_BEHAVIOR_PATH(): string;
    /**
     * @remarks The path to the vanilla resource pack samples packaged with the module.
     */
    static get VANILLA_RESOURCE_PATH(): string;
    /**
     * @remarks The behavior pack in the workspace.
     */
    static get BEHAVIOR_PATH(): string;
    /**
     * @remarks The resource pack in the workspace.
     */
    static get RESOURCE_PATH(): string;
    static set BEHAVIOR_PATH(v: string);
    static set RESOURCE_PATH(v: string);
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
export declare function getFiles(globPattern: string): File[];
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
export declare function setFiles(files: File[]): void;
/**
 * @remarks Copies a source file from this module to a destination.
 * @param sourceFile The filepath to a source file within this module's src.
 * @param targetPath The filepath to the destination the file should be copied to.
 */
export declare function copySourceFile(sourceFile: string, targetPath: string): void;
/**
 * @remarks Copies a source directory from this module to a destination.
 * @param src The path to a source directory within this module's src.
 * @param dest The filepath to the destination where the directory should be copied to.
 */
export declare function copySourceDirectory(src: string, dest: string): void;
/**
 * @remarks Archives a directory, compressing to a .zip or .mcworld for example.
 * @param dir The directory to archive.
 * @param zipPath The path the directory should be archived to.
 * @param callback A callback to run when the directory finishes archiving.
 */
export declare function archiveDirectory(dir: string, zipPath: string, callback: Function): void;
/**
 * @remarks Creates a temporary file, opening it in Notepad. The contents of the file will be returned when Notepad is closed.
 * @returns A promise to a string.
 */
export declare function getStringFromTemporaryFile(): Promise<string>;
