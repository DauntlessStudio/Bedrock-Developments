import { Directories, File } from "../../file_manager.js";
import { NameData } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";

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
        return Directories.RESOURCE_PATH;
    }

    constructor(filepath: string, template: IClientTerrainTexture) {
        super(filepath, template);
        this.num_mip_levels = template.num_mip_levels;
        this.padding = template.padding;
        this.resource_pack_name = 'vanilla';
        this.texture_name = 'atlas.items';
        this.texture_data = template.texture_data;
    }

    public static createFilePath(): string {
        return this.DirectoryPath +  "textures/terrain_texture.json";
    }

    public static createFromTemplate(): ClientTerrainTexture {
        return new ClientTerrainTexture(this.createFilePath(), {
            num_mip_levels: 4,
            padding: 8,
            resource_pack_name: "vanilla",
            texture_name: "atlas.items",
            texture_data: {},
        });
    }

    public static fileWithAddedTexture(name: string, textures: string): File {
        const items = ClientTerrainTexture.fromPathOrTemplate(ClientTerrainTexture, ClientTerrainTexture.createFilePath());
        items.addTexture(name, textures);
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