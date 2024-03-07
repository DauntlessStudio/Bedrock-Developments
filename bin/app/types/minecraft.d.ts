export declare class MinecraftDataType {
    filePath: string;
    get DirectoryPath(): string;
    constructor(filePath: string, template: any);
    serialize(): string;
    static deserialize<T>(create: new (filePath: string, template: any) => T, filepath: string, json: string): T;
}
