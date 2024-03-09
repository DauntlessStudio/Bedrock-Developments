import { Directories } from "../../new_file_manager";
import { NameData } from "../../utils";
import { MinecraftDataType } from "../minecraft";

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
        return Directories.RESOURCE_PATH + 'sounds/';
    }

    constructor(filepath: string, template: IClientItemTexture) {
        super(filepath, template);
        this.resource_pack_name = 'vanilla';
        this.texture_name = 'atlas.items';
        this.texture_data = template.texture_data;
    }

    public static createFromTemplate(nameData: NameData): ClientItemTexture {
        return new ClientItemTexture(this.createFilePath(nameData), {
            resource_pack_name: 'vanilla',
            texture_name: 'atlas.items',
            texture_data: {},
        });
    }

    addTexture(name: string, textures: string) {
        this.texture_data[name] = {
            textures
        }
    }
}