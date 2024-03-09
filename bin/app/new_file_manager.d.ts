export type File = {
    filePath: string;
    fileContents: string;
    handleExisting?: 'overwrite' | 'merge' | 'overwrite_silent';
};
export declare class Directories {
    private static behavior_path;
    private static resource_path;
    private static source_path;
    static get SOURCE_PATH(): string;
    static get BEHAVIOR_PATH(): string;
    static get RESOURCE_PATH(): string;
    static set BEHAVIOR_PATH(v: string);
    static set RESOURCE_PATH(v: string);
}
export declare function getFiles(globPattern: string): File[];
export declare function setFiles(files: File[]): void;
export declare function copySourceFile(sourceFile: string, targetPath: string): void;
