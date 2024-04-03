import { File } from "../../file_manager.js";
import { MinecraftDataType } from "../minecraft.js";
export interface IClientItemTexture {
    resource_pack_name: 'vanilla';
    texture_name: 'atlas.items';
    texture_data: {
        [key: string]: {
            textures: string;
        };
    };
}
export declare class ClientItemTexture extends MinecraftDataType implements IClientItemTexture {
    resource_pack_name: 'vanilla';
    texture_name: 'atlas.items';
    texture_data: {
        [key: string]: {
            textures: string;
        };
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IClientItemTexture);
    static createFilePath(): string;
    static createFromTemplate(): ClientItemTexture;
    static fileWithAddedTexture(name: string, textures: string): File;
    toFile(): File;
    addTexture(name: string, textures: string): void;
}
