import { File } from "../new_file_manager";
import { NameData } from "../utils";
export declare function non_serializable(target: any, key: string): void;
export declare class MinecraftDataType {
    filePath: string;
    static get DirectoryPath(): string;
    constructor(filePath: string, template: any);
    static createFilePath(nameData: NameData): string;
    static createFromTemplate(nameData: NameData): MinecraftDataType;
    serialize(): string;
    protected replacer(key: string, value: any): any;
    static deserialize<T>(create: new (filePath: string, template: any) => T, filepath: string, json: string): T;
    toFile(): File;
    static fromFile<T>(create: new (filePath: string, template: any) => T, file: File): T;
    static fromPathOrTemplate<T>(create: new (filePath: string, template: any) => T, path: string): T;
}
export declare class LangFile {
    files: File[];
    constructor(filepattern: string);
    static addToAllLangs(categoryName: string, ...entries: string[]): LangFile;
    addToCategory(categoryName: string, ...entries: string[]): void;
}
export declare class MCFunction {
    files: File[];
    constructor(filepattern: string);
    addCommand(commands: string[], options?: {
        description: string;
        source?: string;
        selector?: string;
    }): void;
}
