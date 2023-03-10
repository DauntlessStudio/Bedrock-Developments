export declare enum experimentalToggle {
    betaAPI = "beta-api",
    holiday = "holiday-creator"
}
export declare function worldList(): {
    name: string;
    path: string;
}[];
export declare function worldExport(include_packs: boolean | undefined, world_index: number): void;
export declare function worldPacks(world_index: number, bpack: string, rpack: string, experimental: string | undefined): Promise<void>;
