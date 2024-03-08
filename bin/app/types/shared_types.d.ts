export type FormatVersion = `${number}.${number}.${number}`;
export type Identifier = `${string}:${string}`;
export type MolangOption = string | Record<string, string>;
export type MolangDoubleArray = [number | string, number | string];
export type MolangTripleArray = [number | string, number | string, number | string];
export type SlotOptions = 'slot.weapon.mainhand' | 'slot.weapon.offhand' | 'slot.armor.head' | 'slot.armor.chest' | 'slot.armor.legs' | 'slot.armor.feet' | 'slot.hotbar' | 'slot.inventory' | 'slot.enderchest' | 'slot.saddle' | 'slot.armor' | 'slot.chest' | 'slot.equippable';
export interface RawMessage {
    rawtext?: RawMessage[];
    score?: RawMessageScore;
    text?: string;
    translate?: string;
    with?: string[] | RawMessage;
}
export interface RawMessageScore {
    name?: string;
    objective?: string;
}
