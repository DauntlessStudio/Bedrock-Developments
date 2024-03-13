import { File } from "../../file_manager.js";
import { MinecraftDataType } from "../minecraft.js";
import { Identifier } from "../shared_types.js";
export interface IClientBlocks {
    [key: Identifier]: IClientBlocksEntry;
}
export interface IClientBlocksEntry {
    sound?: string;
    sounds?: string;
    textures?: string | {
        up: string;
        down: string;
        side: string;
        east: string;
        north: string;
        south: string;
        west: string;
    };
    isotropic?: boolean | {
        up: boolean;
        down: boolean;
        side: boolean;
        east: boolean;
        north: boolean;
        south: boolean;
        west: boolean;
    };
    carried_textures?: string | {
        up: string;
        down: string;
        side: string;
        east: string;
        north: string;
        south: string;
        west: string;
    };
}
export declare class ClientBlocks extends MinecraftDataType implements IClientBlocks {
    [key: Identifier]: IClientBlocksEntry;
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IClientBlocks);
    static createFilePath(): string;
    static createFromTemplate(): ClientBlocks;
    static fileWithAddedBlock(name: Identifier, block: IClientBlocksEntry): File;
    toFile(): File;
    addBlock(name: Identifier, block: IClientBlocksEntry): void;
}
