export declare enum itemType {
    basic = "basic",
    weapon = "weapon",
    projectile = "projectile",
    food = "food",
    armor_set = "armor_set",
    helmet = "helmet",
    chestplate = "chestplate",
    leggings = "leggings",
    boots = "boots"
}
export declare function createNewItem(names: string[], lang: boolean, stack: number | undefined, type: itemType): Promise<void>;
