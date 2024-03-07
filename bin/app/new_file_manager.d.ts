export declare const appPath: string;
export type File = {
    filePath: string;
    fileContents: string;
};
export declare class Directories {
    private static input_behavior_path;
    private static input_resource_path;
    private static output_behavior_path;
    private static output_resource_path;
    static get INPUT_BEHAVIOR_PATH(): string;
    static get INPUT_RESOURCE_PATH(): string;
    static get OUTPUT_BEHAVIOR_PATH(): string;
    static get OUTPUT_RESOURCE_PATH(): string;
    static set INPUT_BEHAVIOR_PATH(v: string);
    static set INPUT_RESOURCE_PATH(v: string);
    static set OUTPUT_BEHAVIOR_PATH(v: string);
    static set OUTPUT_RESOURCE_PATH(v: string);
}
export declare function getFiles(globPattern: string): File[];
export declare function setFiles(files: File[], overwrite?: boolean): void;
