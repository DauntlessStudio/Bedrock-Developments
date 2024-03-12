import { Directories, File, getFiles } from "../new_file_manager";
import * as JSONC from 'comment-json';
import { NameData, chalk } from "../utils";
import * as fs from 'fs';
import path from "path";
import * as nbt from 'prismarine-nbt'

const APPDATA = (process.env.LOCALAPPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")).replace(/\\/g, '/');
const MOJANG = `${APPDATA}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang`;
const DOWNLOAD = `${process.env.USERPROFILE}/Downloads`.replace(/\\/g, '/');

export function cache(target: any, key: string|symbol) {
    const privatePropKey = Symbol();
    let value: any;

    Reflect.defineProperty(target, key, {
      get(this: any) {
        if (!value) {
            return this[privatePropKey]
        }
        return value
      },
      set(this: any, newValue: string) {
        this[privatePropKey] = newValue;
      },
    });
}

interface IMinecraftPack {
    uuid: string;
    directory: string;
    type: 'behavior'|'resource';
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
    }
    metadata: nbt.Metadata;
}

interface ILevelDatOptions {
    LevelName: {type: nbt.TagType.String; value: string;}
    RandomSeed: {type: nbt.TagType.Long; value: number[];}
    GameType: {type: nbt.TagType.Int; value: number;}
    Generator: {type: nbt.TagType.Int; value: number;}

    commandsEnabled: {type: nbt.TagType.Byte; value: number;}
    dodaylightcycle: {type: nbt.TagType.Byte; value: number;}
    domobloot: {type: nbt.TagType.Byte; value: number;}
    domobspawning: {type: nbt.TagType.Byte; value: number;}
    mobgriefing: {type: nbt.TagType.Byte; value: number;}
    keepinventory: {type: nbt.TagType.Byte; value: number;}
    doweathercycle: {type: nbt.TagType.Byte; value: number;}

    experiments: {type: nbt.TagType.Compound, value: {
        gametest: {type: nbt.TagType.Byte, value: number;}
        experiments_ever_used: {type: nbt.TagType.Byte, value: number;}
        saved_with_toggled_experiments: {type: nbt.TagType.Byte, value: number;}
        data_driven_vanilla_blocks_and_items: {type: nbt.TagType.Byte, value: number;}
    }
    }
}

export class MinecraftWorld {
    public filePath: string;
    
    @cache
    public get BehaviorPacks() : IBehaviorPack[] {
        return this.getPacks('behavior');
    }
    
    @cache
    public get ResourcePacks() : IResourcePack[] {
        return this.getPacks('resource');
    }
    
    public get Name() : string {
        return String(fs.readFileSync(this.filePath + '/levelname.txt'));
    }
    
    public get LevelDat() : Promise<ILevelDat> {
        return nbt.parse(fs.readFileSync(this.filePath + '/level.dat')) as unknown as Promise<ILevelDat>;
    }
    
    public set LevelDat(v : ILevelDatOptions) {
        this.LevelDat.then(levelDat => {
            levelDat.parsed.value = v;
            
            // Write 8 metadata bytes in front of nbt data
            let nbt_buffer = nbt.writeUncompressed(levelDat.parsed as unknown as nbt.NBT, levelDat.type);
            let new_buffer: Buffer = Buffer.from([0x0a, 0x00, 0x00, 0x00, 0x07, 0x0a, 0x00, 0x00]);
            new_buffer = Buffer.concat([new_buffer, nbt_buffer]);

            let stream = fs.createWriteStream(this.filePath + '/level.dat');
            stream.write(new_buffer);
            stream.end();
        });
    }  
    
    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public static getAllWorlds(): MinecraftWorld[] {
        try {
            let path = `${MOJANG}/minecraftWorlds`;
            return fs.readdirSync(path).map(dir => new MinecraftWorld(`${path}/${dir}`));
    
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    private getPacks<T extends IMinecraftPack>(type: 'behavior'|'resource'): T[] {
        if (fs.existsSync(`${this.filePath}/world_${type}_packs.json`)) {
            let bp: any[] = JSONC.parse(String(fs.readFileSync(`${this.filePath}/world_${type}_packs.json`))) as any[];
            return bp.map(pack => {
                return {
                    type: type,
                    uuid: pack.pack_id,
                    directory: findPackPathWithID(pack.pack_id, type),
                } as T
            });
        }

        return [];
    }
}

function findPackPathWithID(id: string, type: 'behavior'|'resource') {
    let path = `${APPDATA}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang`;

    // Check dev packs first
    for (const folder of fs.readdirSync(`${path}/development_${type}_packs`)) {
        let subpath = `${path}/development_${type}_packs/${folder}`;
        if (fs.existsSync(`${subpath}/manifest.json`)) {
            let manifest: any = JSONC.parse(String(fs.readFileSync(`${subpath}/manifest.json`)));
            if (manifest.header.uuid === id) {
                return subpath;
            }
        }
    }

    // Check other packs next
    for (const folder of fs.readdirSync(`${path}/${type}_packs`)) {
        let subpath = `${path}/${folder}`;
        if (fs.existsSync(`${subpath}/manifest.json`)) {
            let manifest: any = JSONC.parse(String(fs.readFileSync(`${subpath}/manifest.json`)));
            if (manifest.header.uuid === id) {
                return subpath;
            }
        }
    }

    return '';
}