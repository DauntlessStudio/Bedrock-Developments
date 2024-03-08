import { File } from "../new_file_manager";
import { NameData } from "../utils";
export declare class MinecraftDataType {
    filePath: string;
    static get DirectoryPath(): string;
    constructor(filePath: string, template: any);
    static createFilePath(nameData: NameData): string;
    serialize(): string;
    static deserialize<T>(create: new (filePath: string, template: any) => T, filepath: string, json: string): T;
    toFile(): File;
    fromFile<T>(create: new (filePath: string, template: any) => T, file: File): T;
}
