import { MinecraftDataType } from "./minecraft.js";
import { FormatVersion, Identifier, MolangOption } from "./shared_types.js";
export interface IClientEntity {
    format_version: FormatVersion;
    ['minecraft:client_entity']: {
        description: IClientEntityDescription;
    };
}
type TexturePath = `textures/${string}`;
type GeometryReference = `geometry.${string}`;
export interface IClientEntityDescription {
    identifier: Identifier;
    min_engine_version?: FormatVersion;
    materials?: Record<string, string>;
    textures?: Record<string, TexturePath>;
    geometry?: Record<string, GeometryReference>;
    scripts?: IClientEntityScripts;
    animations?: Record<string, string>;
    animation_controllers?: Record<string, string>[];
    render_controllers?: MolangOption[];
    spawn_egg: IClientEntitySpawnEgg;
    enable_attachables?: boolean;
    held_item_ignores_lightning?: boolean;
    hide_armor?: boolean;
    particle_effects?: Record<string, string>;
    particle_emitters?: Record<string, string>;
    sound_effects?: Record<string, string>;
}
export interface IClientEntityScripts {
    initialize?: string[];
    pre_animation?: string[];
    animate?: MolangOption[];
    parent_setup?: string;
    scale?: string | number;
    scalex?: string | number;
    scaley?: string | number;
    scalez?: string | number;
    should_update_bones_and_effects_offscreen?: string | boolean;
    should_update_effects_offscreen?: string | boolean;
    variables?: Record<string, string>;
}
export interface IClientEntitySpawnEgg {
    base_color?: string;
    overlay_color?: string;
    texture?: string;
    texture_index?: number;
}
export declare class ClientEntity extends MinecraftDataType implements IClientEntity {
    format_version: FormatVersion;
    ['minecraft:client_entity']: {
        description: IClientEntityDescription;
    };
    get DirectoryPath(): string;
    constructor(filepath: string, template: IClientEntity);
    upgradeFormatVersion(): void;
    addInitializeVariable(...variable: string[]): void;
    addPreAnimationVariable(...variable: string[]): void;
    addMaterials(...materials: {
        name: string;
        reference: string;
    }[]): void;
    addGeometry(...geometry: {
        name: string;
        reference: GeometryReference;
    }[]): void;
    addRenderController(...render_controllers: MolangOption[]): void;
}
export {};
