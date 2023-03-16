interface blockOptions {
    emissive?: number;
    table?: boolean;
    geo?: boolean;
}
/**
 * @remarks creates a new block
 * @param names new block names
 * @param lang should the lang entry be added
 * @param emissive how emissive is the block
 * @param table should a loot table be created
 * @param geo should the block use custom geo
 */
export declare function createNewBlock(names: string[], lang: boolean, options: blockOptions): Promise<void>;
export {};
