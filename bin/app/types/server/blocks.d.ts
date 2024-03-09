import { NameData } from "../../utils";
import { GeometryName } from "../client";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion, Identifier, MolangTripleArray } from "../shared_types";
export interface IServerBlock {
    format_version: FormatVersion;
    ["minecraft:block"]: {
        description: IServerBlockDescription;
        components: IServerBlockComponents;
        permutations?: {
            condition: string;
            components: IServerBlockComponents;
        }[];
    };
}
export interface IServerBlockDescription {
    identifier: Identifier;
    register_to_creative_menu?: boolean;
    is_experimental?: boolean;
    menu_category?: {
        category: string;
        group?: string;
        is_hidden_in_commands?: boolean;
    };
    states?: {
        [key: string]: any;
    };
    traits?: {
        [key: string]: any;
    };
}
export interface IServerBlockComponents {
    ["minecraft:collision_box"]?: boolean | {
        origin: MolangTripleArray;
        size: MolangTripleArray;
    };
    ["minecraft:crafting_table"]?: {
        table_name: string;
        crafting_tags: string[];
    };
    ["minecraft:destructible_by_explosion"]?: boolean | {
        explosion_resistance: number;
    };
    ["minecraft:destructible_by_mining"]?: boolean | {
        seconds_to_destroy: number;
    };
    ["minecraft:flammable"]?: boolean | {
        catch_chance_multiplier: number;
        destroy_chance_multiplier: number;
    };
    ["minecraft:display_name"]?: string;
    ["minecraft:friction"]?: number;
    ["minecraft:geometry"]?: GeometryName | {
        identifier: GeometryName;
        bone_visibility?: {
            [key: string]: boolean | string;
        };
    };
    ["minecraft:light_dampening"]?: number;
    ["minecraft:light_emission"]?: number;
    ["minecraft:loot"]?: string;
    ["minecraft:map_color"]?: string | MolangTripleArray;
    ["minecraft:material_instances"]?: {
        ['*']: IServerBlockMaterialInstance;
        [key: string]: IServerBlockMaterialInstance;
    };
    ["minecraft:placement_filter"]?: {
        conditions: {
            allowed_faces?: 'up' | 'down' | 'north' | 'east' | 'south' | 'west' | 'side'[];
            block_filter?: Identifier | {
                tags: string;
            }[];
        }[];
    };
    ["minecraft:selection_box"]?: boolean | {
        origin: MolangTripleArray;
        size: MolangTripleArray;
    };
    ["minecraft:transformation"]?: {
        translation?: MolangTripleArray;
        rotation?: MolangTripleArray;
        scale?: MolangTripleArray;
    };
    [key: string]: any;
}
export interface IServerBlockMaterialInstance {
    texture: string;
    render_method?: 'opaque' | 'double_sided' | 'alpha_test' | 'blend';
    face_dimming?: boolean;
    ambient_occlusion?: boolean;
}
export declare class ServerBlock extends MinecraftDataType implements IServerBlock {
    format_version: FormatVersion;
    ["minecraft:block"]: {
        description: IServerBlockDescription;
        components: IServerBlockComponents;
        permutations?: {
            condition: string;
            components: IServerBlockComponents;
        }[];
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IServerBlock);
    static createFromTemplate(nameData: NameData): ServerBlock;
    setDisplayData(name: NameData): void;
    setExplosionResistance(resistance: number | boolean): void;
    setFriction(friction?: number): void;
    setLightEmission(emission: number): void;
    setLootTable(table?: string): void;
}
