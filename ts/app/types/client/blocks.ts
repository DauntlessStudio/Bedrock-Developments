import { Directories, File } from "../../file_manager.js";
import { MinecraftDataType } from "../minecraft.js";
import { Identifier } from "../shared_types.js";

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

    public static createFilePath(): string {
        return this.DirectoryPath + "blocks.json";
    }

    public static createFromTemplate(): ClientBlocks {
        return new ClientBlocks(this.createFilePath(), {});
    }

    public static fileWithAddedBlock(name: Identifier, block: IClientBlocksEntry): File {
        const blocks = ClientBlocks.fromPathOrTemplate(ClientBlocks, ClientBlocks.createFilePath());
        blocks.addBlock(name, block);
        return blocks.toFile();
    }

    public toFile(): File {
        return {filePath: this.filePath, fileContents: this.serialize(), handleExisting: 'overwrite'};
    }

    addBlock(name: Identifier, block: IClientBlocksEntry) {
        this[name] = block;
    }
}