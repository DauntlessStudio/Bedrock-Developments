import { Directories } from "../../file_manager.js";
import { NameData } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";
import { Identifier } from "../shared_types.js";

export interface IServerLootTable {
    pools: IServerLootTablePool[];
}

export interface IServerLootTablePool {
    rolls: number;
    entries: IServerLootTableEntry[];
    conditions?: IServerLootTableCondition[];
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

    public static createFromTemplate(nameData: NameData): MinecraftDataType {
        return new MinecraftDataType(this.createFilePath(nameData), {
            pools: [
                {
                    rolls: 1,
                    entries: [
                        {
                            type: "item",
                            name: nameData.fullname as Identifier,
                            weight: 1,
                            functions: [
                                {
                                    function: "set_count",
                                    "count": {
                                        "min": 1,
                                        "max": 1,
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }
}