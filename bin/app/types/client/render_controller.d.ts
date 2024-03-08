import { MinecraftDataType } from "../minecraft";
import { FormatVersion, MolangDoubleArray } from "../shared_types";
interface IRenderController {
    format_version: FormatVersion;
    render_controllers: Controllers;
}
type Controllers = Record<string, IRCController>;
type Reference = `Array.${string}[${string}]` | `Geometry.${string}` | `Material.${string}` | `Texture.${string}` | `array.${string}[${string}]` | `geometry.${string}` | `material.${string}` | `texture.${string}`;
interface IRCController {
    arrays?: IRCArrays;
    geometry: Reference;
    materials: Record<string, Reference>[];
    textures: Reference[];
    color?: IRCColor;
    on_fire_color?: IRCColor;
    overlay_color?: IRCColor;
    is_hurt_color?: IRCColor;
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
interface IRCArrays {
    materials?: Record<`Array.${string}`, `Material.${string}`[]>;
    textures?: Record<`Array.${string}`, `Texture.${string}`[]>;
    geometries?: Record<`Array.${string}`, `Geometry.${string}`[]>;
}
interface IRCColor {
    a?: number | string;
    r: number | string;
    g: number | string;
    b: number | string;
}
export declare class RenderController extends MinecraftDataType implements IRenderController {
    format_version: FormatVersion;
    render_controllers: Controllers;
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IRenderController);
}
export {};
