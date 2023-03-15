interface worldOptions {
    name?: string;
    behavior_pack?: string;
    resource_pack?: string;
    experimental?: experimentalToggle;
    gamemode?: gameMode;
    flatworld?: boolean;
    testworld?: boolean;
}
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
export declare enum exportType {
    world = "world",
    template = "template"
}
/**
 * @remarks gets the array of worlds installed
 * @returns an array of worlds with their internal name and paths
 */
export declare function worldList(): {
    name: string;
    path: string;
}[];
/**
 * @remarks exports a world into the user's download folder
 * @param worldOptions contains options used for exporting the world
 * @param include_packs should the behavior and resource packs be packaged as well
 * @param type should it export to mcworld or mctemplate
 */
export declare function worldExport(worldOptions: worldOptions, include_packs?: boolean, type?: exportType): Promise<void>;
/**
 * @remarks adds a behavior and resource pack to a world and can activate experimental features
 * @param worldOptions options containing the packs to add and experiment preferences
 */
export declare function worldAddPacks(worldOptions: worldOptions): Promise<void>;
/**
 * @remarks removes a behavior and resource pack to a world and can deactivate experimental features
 * @param worldOptions options containing the packs to remove and experiment preferences
 */
export declare function worldRemovePacks(worldOptions: worldOptions): Promise<void>;
/**
 * adds a world to the list of minecraft worlds, automatically importing it
 * @param worldName the name of the world to create
 * @param worldOptions the options for generating the world
 */
export declare function worldNew(worldName: string, worldOptions: worldOptions): Promise<void>;
export {};
