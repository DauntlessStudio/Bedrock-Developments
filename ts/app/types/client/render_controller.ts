import { Directories } from "../../new_file_manager";
import { NameData, currentFormatVersion } from "../../utils";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion, MolangDoubleArray } from "../shared_types";

interface IClientRenderController {
    format_version: FormatVersion;
    render_controllers: {
        [key: string]: IClientRCController;
    };
}

type Reference = `Array.${string}[${string}]`|`Geometry.${string}`|`Material.${string}`|`Texture.${string}`|`array.${string}[${string}]`|`geometry.${string}`|`material.${string}`|`texture.${string}`;

interface IClientRCController {
    arrays?: IClientRCArrays;
    geometry: Reference;
    materials: Record<string, Reference>[];
    textures: Reference[];
    color?: IClientRCColor;
    on_fire_color?: IClientRCColor;
    overlay_color?: IClientRCColor;
    is_hurt_color?: IClientRCColor;
    light_color_mutliplier?: number|string;
    filter_lighting?: boolean;
    ignore_lighting?: boolean;
    rebuild_animation_matrices?: boolean;
    part_visiblity?: Record<string, boolean|string>[];
    uv_anim?: {offset: MolangDoubleArray, scale: MolangDoubleArray};
}

interface IClientRCArrays {
    materials?: Record<`Array.${string}`, `Material.${string}`[]>;
    textures?: Record<`Array.${string}`, `Texture.${string}`[]>;
    geometries?: Record<`Array.${string}`, `Geometry.${string}`[]>;
}

interface IClientRCColor {
    a?: number|string;
    r: number|string;
    g: number|string;
    b: number|string;
}

export class ClientRenderController extends MinecraftDataType implements IClientRenderController {
    format_version: FormatVersion;
    render_controllers: {
        [key: string]: IClientRCController;
    };

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'render_controllers/';
    }

    constructor(filepath: string, template: IClientRenderController) {
        super(filepath, template);
        this.format_version = template.format_version;
        this.render_controllers = template.render_controllers;
    }

    public static createFromTemplate(nameData: NameData): ClientRenderController {
        return new ClientRenderController(this.createFilePath(nameData), {
            format_version: currentFormatVersion,
            render_controllers: {
                [`controller.render.${nameData.shortname}`]: {
                    geometry: "geometry.default",
                    materials: [ { "*": "Material.default" } ],
                    textures: [ "texture.default" ],
                }
            }
        });
    }
}