export declare enum soundCategory {
    ambient = "ambient",
    block = "block",
    bottle = "bottle",
    bucket = "bucket",
    hostile = "hostile",
    music = "music",
    neutral = "neutral",
    player = "player",
    record = "record",
    ui = "ui",
    weather = "weather"
}
interface soundDefinitionOptions {
    category?: string;
    vanilla?: string;
    filepath?: string;
}
export declare function createNewSoundDefinition(names: string[], options: soundDefinitionOptions): Promise<void>;
export declare function soundsFormat(): Promise<void>;
export {};
