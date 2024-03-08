import { MinecraftDataType } from "../minecraft";
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
    addTexture(name: string, textures: string): void;
}
