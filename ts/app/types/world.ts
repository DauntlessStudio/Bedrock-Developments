import { Directories, File, archiveDirectory, copySourceDirectory, getFiles, setFiles } from "../new_file_manager";
import * as JSONC from 'comment-json';
import { NameData, chalk } from "../utils";
import * as fs from 'fs';
import path from "path";
import * as nbt from 'prismarine-nbt'
import { v4 } from 'uuid';
import { execSync } from "child_process";

const APPDATA = (process.env.LOCALAPPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")).replace(/\\/g, '/');
export const MOJANG = `${APPDATA}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang`;
const DOWNLOAD = `${process.env.USERPROFILE}/Downloads`.replace(/\\/g, '/');

export function cache(target: any, propertyName: string, descriptor: PropertyDescriptor) {

    if (descriptor.get) {
        const get = descriptor.get;
        target[`${propertyName}_cached`] = undefined;
        
        descriptor.get = function() {
            const obj = this as any;
            if (obj[`${propertyName}_cached`]) {
                return obj[`${propertyName}_cached`];
            } else {
                const value = get.apply(obj);
                obj[`${propertyName}_cached`] = value;
                return value;
            }
        }
    }
}

interface IMinecraftPack {
    uuid: string;
    directory: string;
    name: string;
    type: 'behavior'|'resource';
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

    [key: string]: {type: string; value: any;}
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
    
    @cache
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

    public exportWorld(include_packs: boolean, type: 'template'|'world') {
        const outputPath = `${DOWNLOAD}/${this.Name}`;
        this.addManifest();

        console.log(`${chalk.green(`Exporting ${this.filePath}`)}`);
        copySourceDirectory(this.filePath, outputPath);

        if (include_packs) {
            try {
                fs.mkdirSync(`${outputPath}/behavior_packs`);
                fs.mkdirSync(`${outputPath}/resource_packs`);
            } catch (error) {}

            for (const bp of this.BehaviorPacks) {
                console.log(`${chalk.green(`Exporting ${bp.name}`)}`);
                copySourceDirectory(bp.directory, `${outputPath}/behavior_packs/${bp.name}`);
            }

            for (const rp of this.ResourcePacks) {
                console.log(`${chalk.green(`Exporting ${rp.name}`)}`);
                copySourceDirectory(rp.directory, `${outputPath}/resource_packs/${rp.name}`);
            }
        }

        console.log(`${chalk.green(`Packaging World`)}`);
        return new Promise<void>(resolve => {
            archiveDirectory(outputPath, `${outputPath}.mc${type}`, () => {
                console.log(`${chalk.green(`Cleaning Up`)}`);
                fs.rmSync(outputPath, { recursive: true, force: true });
    
                console.log(`${chalk.green(`Packaged ${this.filePath}.mc${type} To ${DOWNLOAD}`)}`);
                execSync(`start %windir%\\explorer.exe "${DOWNLOAD.replace(/\//g, '\\')}"`);
                resolve();
            });
        })
    }

    private getPacks<T extends IMinecraftPack>(type: 'behavior'|'resource'): T[] {
        if (fs.existsSync(`${this.filePath}/world_${type}_packs.json`)) {
            let bp: any[] = JSONC.parse(String(fs.readFileSync(`${this.filePath}/world_${type}_packs.json`))) as any[];
            return bp.map(pack => {
                const directory = findPackPathWithID(pack.pack_id, type);
                return {
                    type: type,
                    name: path.basename(directory),
                    uuid: pack.pack_id,
                    directory,
                } as T
            });
        }

        return [];
    }

    public static getPackFromManifest(filepath: string): IResourcePack|IBehaviorPack {
        const manifest = JSON.parse(String(fs.readFileSync(filepath)));
        const type = filepath.includes('resource') ? 'resource' : 'behavior';
        const uuid = manifest.header.uuid;
        const directory = path.dirname(filepath);
        const name = directory.split('\\').pop()!;

        const pack = {
            directory,
            name,
            type,
            uuid,
        };

        return type === 'resource' ? pack as IResourcePack : pack as IBehaviorPack;
    }

    public addPack(pack: IBehaviorPack|IResourcePack) {
        getFiles(this.filePath + `/world_${pack.type}_packs.json`).forEach(file => {
            if (file.fileContents.includes(pack.uuid)) return;

            const json = JSON.parse(file.fileContents);
            json.push({
                pack_id: pack.uuid,
                version: [ 1, 0, 0 ],
            });
            file.fileContents = JSON.stringify(json, null, '\t');
            file.handleExisting = 'overwrite';

            setFiles([file]);
        });
    }

    private async addManifest() {
        const dat = await this.LevelDat;
        const version_array = dat.parsed.value.lastOpenedWithVersion.value.value.slice(0, 3);

        setFiles([{
            filePath: `${this.filePath}/manifest.json`,
            handleExisting: 'overwrite_silent',
            fileContents: JSON.stringify({
                format_version : 2,
                header : 
                {
                    base_game_version : version_array,
                    description : "",
                    lock_template_options : true,
                    name : this.Name,
                    platform_locked : false,
                    uuid : v4(),
                    version : [ 1, 0, 0 ]
                },
                modules : 
                [
                    
                    {
                        description : "",
                        type : "world_template",
                        uuid : v4(),
                        version : [ 1, 0, 0 ]
                    }
                ]
            }, null, '/t')
        }]);
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