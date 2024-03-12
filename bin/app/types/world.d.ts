import * as nbt from 'prismarine-nbt';
export declare const MOJANG: string;
export declare function cache(target: any, propertyName: string, descriptor: PropertyDescriptor): void;
export interface INewWorldOptions {
    behavior_pack_manifest_path?: string;
    resource_pack_manifest_path?: string;
    gamemode?: 0 | 1 | 2 | 3;
    flatworld?: boolean;
    testworld?: boolean;
}
interface IMinecraftPack {
    uuid: string;
    directory: string;
    name: string;
    type: 'behavior' | 'resource';
}
export interface IBehaviorPack extends IMinecraftPack {
    type: 'behavior';
}
export interface IResourcePack extends IMinecraftPack {
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
    LevelName?: {
        type: 'string';
        value: string;
    };
    RandomSeed?: {
        type: 'long';
        value: number[];
    };
    GameType?: {
        type: 'int';
        value: number;
    };
    Generator?: {
        type: 'int';
        value: number;
    };
    commandsEnabled?: {
        type: 'byte';
        value: number;
    };
    dodaylightcycle?: {
        type: 'byte';
        value: number;
    };
    domobloot?: {
        type: 'byte';
        value: number;
    };
    domobspawning?: {
        type: 'byte';
        value: number;
    };
    mobgriefing?: {
        type: 'byte';
        value: number;
    };
    keepinventory?: {
        type: 'byte';
        value: number;
    };
    doweathercycle?: {
        type: 'byte';
        value: number;
    };
    experiments?: {
        type: 'compound';
        value: {
            gametest?: {
                type: 'byte';
                value: number;
            };
            experiments_ever_used?: {
                type: 'byte';
                value: number;
            };
            saved_with_toggled_experiments?: {
                type: 'byte';
                value: number;
            };
            data_driven_vanilla_blocks_and_items?: {
                type: 'byte';
                value: number;
            };
        };
    };
    [key: string]: {
        type: string;
        value: any;
    } | undefined;
}
export declare class MinecraftWorld {
    filePath: string;
    get BehaviorPacks(): IBehaviorPack[];
    get ResourcePacks(): IResourcePack[];
    get Name(): string;
    get LevelDat(): Promise<ILevelDat>;
    set LevelDat(v: ILevelDatOptions);
    constructor(filePath: string);
    static create(worldName: string, options: INewWorldOptions): Promise<MinecraftWorld>;
    static getAllWorlds(): MinecraftWorld[];
    exportWorld(include_packs: boolean, type: 'template' | 'world'): Promise<void>;
    private getPacks;
    static getPackFromManifest(filepath: string): IResourcePack | IBehaviorPack;
    addPack(pack: IBehaviorPack | IResourcePack): void;
    private addManifest;
}
export {};
