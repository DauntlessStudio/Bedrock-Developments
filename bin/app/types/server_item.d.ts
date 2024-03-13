import { MinecraftDataType } from "./minecraft.js";
import { FormatVersion, Identifier, SlotOptions } from "./shared_types.js";
interface IServerItem {
    format_version: FormatVersion;
    ["minecraft:item"]: IServerItemItem;
}
interface IServerItemItem {
    description: IServerItemDescription;
    components: IServerItemComponents;
}
interface IServerItemDescription {
    identifier: Identifier;
    category?: string;
    menu_category?: {
        category: string;
        group?: string;
        is_hidden_in_commands?: boolean;
    };
}
interface IServerItemComponents {
    ["minecraft:icon"]?: {
        texture: string;
    };
    ["minecraft:display_name"]?: {
        value: string;
    };
    ["minecraft:tags"]?: {
        tags: string[];
    };
    ["minecraft:durability"]?: {
        damage_chance?: {
            min: number;
            max: number;
        };
        max_durability: number;
    };
    ["minecraft:food"]?: {
        can_always_eat?: boolean;
        nutrition?: number;
        saturation_modifier?: number;
        using_converts_to?: string;
    };
    ["minecraft:interact_button"]?: string | boolean;
    ["minecraft:max_stack_size"]?: {
        value: number;
    };
    ["minecraft:repairable"]?: {
        on_repaired?: string;
        repair_items?: string[];
    };
    ["minecraft:wearable"]?: {
        dispensable?: boolean;
        slot: SlotOptions;
    };
    [key: string]: any;
}
export declare class ServerItem extends MinecraftDataType implements IServerItem {
    format_version: FormatVersion;
    ["minecraft:item"]: IServerItemItem;
    get DirectoryPath(): string;
    constructor(filepath: string, template: IServerItem);
}
export {};
