import { File } from "../new_file_manager";

function non_serializable(target: any, key: string) {
    let currentValue = target[key];
  
    Object.defineProperty(target, key, {
      set: (newValue: string) => {
        currentValue = newValue;
      },
      get: () => currentValue,
    });
}

export class MinecraftDataType {
    @non_serializable
    public filePath: string;
    
    public get DirectoryPath() : string {
        return '';
    }

    constructor(filePath: string, template: any) {
        this.filePath = filePath;
    }

    public serialize(): string {
        return JSON.stringify(this, null, '\t');
    }

    public static deserialize<T>(create: new (filePath: string, template: any) => T, filepath: string, json: string): T {
        return new create(filepath, JSON.parse(json));
    }

    public toFile(): File {
        return {filePath: this.filePath, fileContents: this.serialize()};
    }

    public fromFile<T>(create: new (filePath: string, template: any) => T, file: File): T {
        return MinecraftDataType.deserialize(create, file.filePath, file.fileContents);
    }
}