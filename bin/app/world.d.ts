export declare enum experimentalToggle {
    betaAPI = "beta-api",
    holiday = "holiday-creator"
}
export declare enum gameMode {
    survival = 0,
    creative = 1,
    adventure = 2,
    spectator = 3
}
export declare function worldList(): {
    name: string;
    path: string;
}[];
export declare function worldExport(include_packs: boolean | undefined, world_index: number): void;
export declare function worldAddPacks(world_index: number, bpack: string, rpack: string, experimental: string | undefined): Promise<void>;
export declare function worldRemovePacks(world_index: number, bpack: string | undefined, rpack: string | undefined, experimental: boolean): Promise<void>;
export declare function worldNew(worldName: string, testWorld: boolean, flatWorld: boolean, gamemode?: number): Promise<void>;
