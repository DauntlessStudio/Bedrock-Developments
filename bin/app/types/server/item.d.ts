import { NameData } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";
import { FormatVersion, Identifier, SlotOptions } from "../shared_types.js";
export interface IServerItem {
    format_version: FormatVersion;
    ["minecraft:item"]: IServerItemItem;
}
export interface IServerItemItem {
    description: IServerItemDescription;
    components: IServerItemComponents;
}
export interface IServerItemDescription {
    identifier: Identifier;
    category?: string;
    menu_category?: {
        category: string;
        group?: string;
        is_hidden_in_commands?: boolean;
    };
}
export interface IServerItemComponents {
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
        repair_items?: {
            items: Identifier[];
            repair_amount: number | string;
        }[];
    };
    ["minecraft:wearable"]?: {
        dispensable?: boolean;
        slot: SlotOptions;
    };
    ["minecraft:enchantable"]?: {
        value: number;
        slot: string;
    };
    ["minecraft:use_modifiers"]?: {
        use_duration: number;
        movement_modifier: number;
    };
    ["minecraft:cooldown"]?: {
        category: string;
        duration: number;
    };
    [key: string]: any;
}
export declare class ServerItem extends MinecraftDataType implements IServerItem {
    format_version: FormatVersion;
    ["minecraft:item"]: IServerItemItem;
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IServerItem);
    static createFromTemplate(nameData: NameData): ServerItem;
    setDisplayData(name: NameData): void;
    setStackSize(stack: number): void;
    setWearable(slot: SlotOptions): void;
    setFood(): void;
    setCooldown(duration: number, category?: string): void;
    setModifiers(use_duration?: number, movement_modifier?: number): void;
    setInteractButton(name: NameData): void;
}
