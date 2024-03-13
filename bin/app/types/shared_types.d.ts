export declare type FormatVersion = `${number}.${number}.${number}`;
export declare type Identifier = `${string}:${string}`;
export declare type MolangOption = string | Record<string, string>;
export declare type MolangDoubleArray = [number | string, number | string];
export declare type MolangTripleArray = [number | string, number | string, number | string];
export declare type SlotOptions = 'slot.weapon.mainhand' | 'slot.weapon.offhand' | 'slot.armor.head' | 'slot.armor.chest' | 'slot.armor.legs' | 'slot.armor.feet' | 'slot.hotbar' | 'slot.inventory' | 'slot.enderchest' | 'slot.saddle' | 'slot.armor' | 'slot.chest' | 'slot.equippable';
export declare type EffectNames = 'speed' | 'slowness' | 'haste' | 'mining_fatigue' | 'strength' | 'instant_health' | 'instant_damage' | 'jump_boost' | 'regeneration' | 'resistance' | 'fire_resistance' | 'water_breathing' | 'invisibility' | 'blindness' | 'night_vision' | 'hunger' | 'weakness' | 'poison' | 'wither' | 'health_boost' | 'absorptoin' | 'saturation' | 'levitation' | 'fatal_poison' | 'slow_falling' | 'conduit_power' | 'bad_omen' | 'village_hero' | 'darkness';
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
