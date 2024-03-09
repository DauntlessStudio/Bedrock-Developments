import { File } from "../../new_file_manager";
import { MinecraftDataType } from "../minecraft";
export interface IClientTerrainTexture {
    num_mip_levels: number;
    padding: number;
    resource_pack_name: 'vanilla';
    texture_name: `atlas.${string}`;
    texture_data: {
        [key: string]: {
            textures: string;
        };
    };
}
export declare class ClientTerrainTexture extends MinecraftDataType implements IClientTerrainTexture {
    num_mip_levels: number;
    padding: number;
    resource_pack_name: 'vanilla';
    texture_name: 'atlas.items';
    texture_data: {
        [key: string]: {
            textures: string;
        };
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IClientTerrainTexture);
    static createFilePath(): string;
    static createFromTemplate(): ClientTerrainTexture;
    static fileWithAddedTexture(name: string, textures: string): File;
    toFile(): File;
    addTexture(name: string, textures: string): void;
}
