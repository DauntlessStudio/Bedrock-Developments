import { Directories, File } from "../../file_manager.js";
import { NameData } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";

export interface IClientItemTexture {
    resource_pack_name: 'vanilla';
    texture_name: 'atlas.items';
    texture_data: {
        [key: string]: {
            textures: string;
        }
    };
}

export class ClientItemTexture extends MinecraftDataType implements IClientItemTexture {
    resource_pack_name: 'vanilla';
    texture_name: 'atlas.items';
    texture_data: {
        [key: string]: {
            textures: string;
        }
    };

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH;
    }

    constructor(filepath: string, template: IClientItemTexture) {
        super(filepath, template);
        this.resource_pack_name = 'vanilla';
        this.texture_name = 'atlas.items';
        this.texture_data = template.texture_data;
    }

    public static createFilePath(): string {
        return this.DirectoryPath +  "textures/item_texture.json";
    }

    public static createFromTemplate(): ClientItemTexture {
        return new ClientItemTexture(this.createFilePath(), {
            resource_pack_name: 'vanilla',
            texture_name: 'atlas.items',
            texture_data: {},
        });
    }

    public static fileWithAddedTextures(...data: {name: string, texture: string}[]): File {
        const items = ClientItemTexture.fromPathOrTemplate(ClientItemTexture, ClientItemTexture.createFilePath());
        data.forEach(data => items.addTexture(data.name, data.texture));
        return items.toFile();
    }

    public toFile(): File {
        return {filePath: this.filePath, fileContents: this.serialize(), handleExisting: 'overwrite'};
    }

    addTexture(name: string, textures: string) {
        if (!name.includes(NameData.ProjectName)) name = `${NameData.TeamName}_${NameData.ProjectName}:${name}`;
        this.texture_data[name] = {
            textures
        }
    }
}