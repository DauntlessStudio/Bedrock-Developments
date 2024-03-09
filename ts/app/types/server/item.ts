import { Directories } from "../../new_file_manager";
import { NameData, currentFormatVersion } from "../../utils";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion, Identifier, SlotOptions } from "../shared_types";

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
    }
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
    }

    ["minecraft:durability"]?: {
        damage_chance?: {
            min: number;
            max: number;
        }
        max_durability: number;
    };

    ["minecraft:food"]?: {
        can_always_eat?: boolean;
        nutrition?: number;
        saturation_modifier?: number;
        using_converts_to?: string;
    };

    ["minecraft:interact_button"]?: string|boolean;

    ["minecraft:max_stack_size"]?: {
        value: number;
    };

    ["minecraft:repairable"]?: {
        on_repaired?: string;
        repair_items?: {
            items: Identifier[];
            repair_amount: number|string;
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

    [key: string]: any;
}

export class ServerItem extends MinecraftDataType implements IServerItem {
    format_version: FormatVersion;
    ["minecraft:item"]: IServerItemItem;

    public static get DirectoryPath(): string {
        return Directories.BEHAVIOR_PATH + 'items/';
    }

    constructor(filepath: string, template: IServerItem) {
        super(filepath, template);
        this.format_version = template.format_version;
        this["minecraft:item"] = template["minecraft:item"];
    }

    public static createFromTemplate(nameData: NameData): MinecraftDataType {
        return new MinecraftDataType(this.createFilePath(nameData), {
            format_version: currentFormatVersion,
            "minecraft:item": {
                description: {
                    identifier: 'placeholder:placeholder'
                },
                components: {}
            },
        });
    }

    setDisplayData(name: NameData) {
        this["minecraft:item"].description.identifier = name.fullname as Identifier;
        this["minecraft:item"].components["minecraft:display_name"] = {
            value: `item.${name.fullname}.name`
        };
        this["minecraft:item"].components["minecraft:icon"] = {
            texture: name.shortname
        };
    }

    setStackSize(stack: number) {
        this["minecraft:item"].components["minecraft:max_stack_size"] = {
            value: stack
        };
    }

    setWearable(slot: SlotOptions) {
        this["minecraft:item"].components["minecraft:wearable"] = {
            slot: slot,
            dispensable: true,
        };
        this["minecraft:item"].components["minecraft:repairable"] = {
            repair_items: [
                {
                    items: [
                        this["minecraft:item"].description.identifier
                    ],
                    repair_amount: "query.remaining_durability + 0.05 * query.max_durability",
                }
            ]
        };
        this["minecraft:item"].components["minecraft:enchantable"] = {
            value: 10,
            slot: enchantSlot(slot),
        };
    }

    setFood() {
        this["minecraft:item"].components["minecraft:food"] = {
            can_always_eat: true,
            nutrition: 10,
            saturation_modifier: 10,
        }
    }
}

function enchantSlot(slot: SlotOptions): string {
    switch (slot) {
        case "slot.armor.feet":
            return 'armor_feet';
        case "slot.armor.legs":
            return "armor_legs";
        case "slot.armor.chest":
            return "armor_torso";
        case "slot.armor.head":
            return "armor_head";
        default:
            return '';
    }
}