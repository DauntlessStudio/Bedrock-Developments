import { Directories } from "../../new_file_manager";
import { NameData } from "../../utils";
import { MinecraftDataType } from "../minecraft";
import { Identifier } from "../shared_types";

export interface IClientBlocks {
    [key: Identifier]: IClientBlocksEntry
}

export interface IClientBlocksEntry {
    sound?: string;
    sounds?: string;
    textures?: string|{
        up: string;
        down: string;
        side: string;
        east: string;
        north: string;
        south: string;
        west: string;
    };
    isotropic?: boolean|{
        up: boolean;
        down: boolean;
        side: boolean;
        east: boolean;
        north: boolean;
        south: boolean;
        west: boolean;
    },
    carried_textures?: string|{
        up: string;
        down: string;
        side: string;
        east: string;
        north: string;
        south: string;
        west: string;
    };
}

export class ClientBlocks extends MinecraftDataType implements IClientBlocks {
    [key: Identifier]: IClientBlocksEntry;

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH;
    }

    constructor(filepath: string, template: IClientBlocks) {
        super(filepath, template);
        Object.getOwnPropertyNames(template).forEach(prop => {
            this[prop as Identifier] = template[prop as Identifier];
        });
    }

    public static createFromTemplate(nameData: NameData): ClientBlocks {
        return new ClientBlocks(this.createFilePath(nameData), {});
    }

    addBlock(name: Identifier, block: IClientBlocksEntry) {
        this[name] = block;
    }
}