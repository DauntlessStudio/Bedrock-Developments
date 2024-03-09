import { Directories } from "../../new_file_manager";
import { NameData } from "../../utils";
import { MinecraftDataType } from "../minecraft";

export interface IClientTerrainTexture {
	num_mip_levels: number;
	padding: number;
    resource_pack_name: 'vanilla';
    texture_name: `atlas.${string}`;
    texture_data: {
        [key: string]: {
            textures: string;
        }
    };
}

export class ClientTerrainTexture extends MinecraftDataType implements IClientTerrainTexture {
	num_mip_levels: number;
	padding: number;
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

    constructor(filepath: string, template: IClientTerrainTexture) {
        super(filepath, template);
        this.num_mip_levels = template.num_mip_levels;
        this.padding = template.padding;
        this.resource_pack_name = 'vanilla';
        this.texture_name = 'atlas.items';
        this.texture_data = template.texture_data;
    }

    public static createFromTemplate(nameData: NameData): ClientTerrainTexture {
        return new ClientTerrainTexture(this.createFilePath(nameData), {
            num_mip_levels: 4,
            padding: 8,
            resource_pack_name: "vanilla",
            texture_name: "atlas.items",
            texture_data: {},
        });
    }

    addTexture(name: string, textures: string) {
        this.texture_data[name] = {
            textures
        }
    }
}