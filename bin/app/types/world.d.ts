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
export declare class MinecraftWorld {
    filePath: string;
    get BehaviorPacks(): IBehaviorPack[];
    get ResourcePacks(): IResourcePack[];
    get Name(): string;
    get LevelDat(): Promise<any>;
    constructor(filePath: string);
    static create(worldName: string, options: INewWorldOptions): Promise<MinecraftWorld>;
    static getAllWorlds(): MinecraftWorld[];
    exportWorld(include_packs: boolean, type: 'template' | 'world'): Promise<void>;
    private getPacks;
    static getPackFromManifest(filepath: string): IResourcePack | IBehaviorPack;
    addPack(pack: IBehaviorPack | IResourcePack): void;
    private addManifest;
    private setLevelDat;
}
export {};
