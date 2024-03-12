import * as nbt from 'prismarine-nbt';
export declare function cache(target: any, key: string | symbol): void;
interface IMinecraftPack {
    uuid: string;
    directory: string;
    type: 'behavior' | 'resource';
}
interface IBehaviorPack extends IMinecraftPack {
    type: 'behavior';
}
interface IResourcePack extends IMinecraftPack {
    type: 'resource';
}
interface ILevelDat {
    type: nbt.NBTFormat;
    parsed: {
        type: nbt.TagType.Compound;
        value: ILevelDatOptions;
    };
    metadata: nbt.Metadata;
}
interface ILevelDatOptions {
    LevelName: {
        type: nbt.TagType.String;
        value: string;
    };
    RandomSeed: {
        type: nbt.TagType.Long;
        value: number[];
    };
    GameType: {
        type: nbt.TagType.Int;
        value: number;
    };
    Generator: {
        type: nbt.TagType.Int;
        value: number;
    };
    commandsEnabled: {
        type: nbt.TagType.Byte;
        value: number;
    };
    dodaylightcycle: {
        type: nbt.TagType.Byte;
        value: number;
    };
    domobloot: {
        type: nbt.TagType.Byte;
        value: number;
    };
    domobspawning: {
        type: nbt.TagType.Byte;
        value: number;
    };
    mobgriefing: {
        type: nbt.TagType.Byte;
        value: number;
    };
    keepinventory: {
        type: nbt.TagType.Byte;
        value: number;
    };
    doweathercycle: {
        type: nbt.TagType.Byte;
        value: number;
    };
    experiments: {
        type: nbt.TagType.Compound;
        value: {
            gametest: {
                type: nbt.TagType.Byte;
                value: number;
            };
            experiments_ever_used: {
                type: nbt.TagType.Byte;
                value: number;
            };
            saved_with_toggled_experiments: {
                type: nbt.TagType.Byte;
                value: number;
            };
            data_driven_vanilla_blocks_and_items: {
                type: nbt.TagType.Byte;
                value: number;
            };
        };
    };
}
export declare class MinecraftWorld {
    filePath: string;
    get BehaviorPacks(): IBehaviorPack[];
    get ResourcePacks(): IResourcePack[];
    get Name(): string;
    get LevelDat(): Promise<ILevelDat>;
    set LevelDat(v: ILevelDatOptions);
    constructor(filePath: string);
    static getAllWorlds(): MinecraftWorld[];
    private getPacks;
}
export {};
