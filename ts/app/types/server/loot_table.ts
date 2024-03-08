import { Directories } from "../../new_file_manager";
import { MinecraftDataType } from "../minecraft";
import { Identifier } from "../shared_types";

export interface IServerLootTable {
    pools: IServerLootTablePool[];
}

export interface IServerLootTablePool {
    rolls: number;
    entries: IServerLootTableEntry[];
    conditions: IServerLootTableCondition[];
}

export interface IServerLootTableEntry {
    type: string;
    name: Identifier;
    weight: number;
    functions?: IServerLootTableFunction[];
}

export interface IServerLootTableFunction {
    function: string;
    [key: string]: any;
}

export interface IServerLootTableCondition {
    condition: string;
}

export class ServerLootTable extends MinecraftDataType implements IServerLootTable {
    pools: IServerLootTablePool[];

    public static get DirectoryPath(): string {
        return Directories.BEHAVIOR_PATH + 'loot_tables/';
    }
    
    constructor(filepath: string, template: IServerLootTable) {
        super(filepath, template);
        this.pools = template.pools;
    }
}