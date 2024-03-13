import { nameObject } from './utils.js';
export declare enum itemType {
    basic = "basic",
    attachable = "attachable",
    weapon = "weapon",
    projectile = "projectile",
    usable = "usable",
    food = "food",
    armor_set = "armor_set",
    helmet = "helmet",
    chestplate = "chestplate",
    leggings = "leggings",
    boots = "boots"
}
export declare function createNewItem(names: string[], lang: boolean, stack: number | undefined, type: itemType): Promise<void>;
export declare function writeToItemTextureFromNames(names: nameObject[]): Promise<void>;
export declare function writeToItemTextureFromObjects(objects: {
    name: string;
    path: string;
}[]): Promise<void>;
