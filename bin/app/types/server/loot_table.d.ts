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
export declare class ServerLootTable extends MinecraftDataType implements IServerLootTable {
    pools: IServerLootTablePool[];
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IServerLootTable);
}
