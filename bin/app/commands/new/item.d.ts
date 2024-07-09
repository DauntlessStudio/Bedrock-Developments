export interface NewItemOptions {
    lang: boolean;
    stack: number;
    cooldown: number | undefined;
    override: boolean;
    type: ServerItemOptions;
}
declare enum ServerItemOptions {
    basic = "basic",
    attachable = "attachable",
    food = "food",
    armor_set = "armor_set",
    helmet = "helmet",
    chestplate = "chestplate",
    leggings = "leggings",
    boots = "boots"
}
export {};
