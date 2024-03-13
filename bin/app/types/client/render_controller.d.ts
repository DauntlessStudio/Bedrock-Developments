import { NameData } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";
import { FormatVersion, MolangDoubleArray } from "../shared_types.js";
interface IClientRenderController {
    format_version: FormatVersion;
    render_controllers: {
        [key: string]: IClientRCController;
    };
}
type Reference = `Array.${string}[${string}]` | `Geometry.${string}` | `Material.${string}` | `Texture.${string}` | `array.${string}[${string}]` | `geometry.${string}` | `material.${string}` | `texture.${string}`;
interface IClientRCController {
    arrays?: IClientRCArrays;
    geometry: Reference;
    materials: Record<string, Reference>[];
    textures: Reference[];
    color?: IClientRCColor;
    on_fire_color?: IClientRCColor;
    overlay_color?: IClientRCColor;
    is_hurt_color?: IClientRCColor;
    light_color_mutliplier?: number | string;
    filter_lighting?: boolean;
    ignore_lighting?: boolean;
    rebuild_animation_matrices?: boolean;
    part_visiblity?: Record<string, boolean | string>[];
    uv_anim?: {
        offset: MolangDoubleArray;
        scale: MolangDoubleArray;
    };
}
interface IClientRCArrays {
    materials?: Record<`Array.${string}`, `Material.${string}`[]>;
    textures?: Record<`Array.${string}`, `Texture.${string}`[]>;
    geometries?: Record<`Array.${string}`, `Geometry.${string}`[]>;
}
interface IClientRCColor {
    a?: number | string;
    r: number | string;
    g: number | string;
    b: number | string;
}
export declare class ClientRenderController extends MinecraftDataType implements IClientRenderController {
    format_version: FormatVersion;
    render_controllers: {
        [key: string]: IClientRCController;
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IClientRenderController);
    static createFromTemplate(nameData: NameData): ClientRenderController;
}
export {};
