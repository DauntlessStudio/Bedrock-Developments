import { archiveDirectory, copySourceDirectory, copySourceFile, getFiles, setFiles } from "../file_manager.js";
import * as JSONC from 'comment-json';
import { chalk } from "../utils.js";
import * as fs from 'fs';
import path from "path";
import { v4 } from 'uuid';
import { execSync } from "child_process";
import { NbtFile } from "deepslate";

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

export interface INewWorldOptions{
    behavior_pack_manifest_path?: string;
    resource_pack_manifest_path?: string;
    gamemode?: 0|1|2|3;
    flatworld?: boolean;
    testworld?: boolean;
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
    
    public get LevelDat() : NbtFile {
        const buffer = fs.readFileSync(this.filePath + '/level.dat');
        const uint8Array = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return NbtFile.read(uint8Array, {bedrockHeader: true, littleEndian: true})
    }
    
    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public static async create(worldName: string, options: INewWorldOptions): Promise<MinecraftWorld> {
        const world = new MinecraftWorld(`${DOWNLOAD}/${worldName}`);

        if (options.behavior_pack_manifest_path) {
            world.addPack(MinecraftWorld.getPackFromManifest(options.behavior_pack_manifest_path));
        }
        if (options.resource_pack_manifest_path) {
            world.addPack(MinecraftWorld.getPackFromManifest(options.resource_pack_manifest_path));
        }
    
        copySourceFile('world/level.dat', `${world.filePath}/level.dat`);
        setFiles([{filePath: `${world.filePath}/levelname.txt`, fileContents: worldName}]);

        const levelDat = world.LevelDat.toJson() as any;

        levelDat.root.LevelName = {type: 8, value: worldName};
        levelDat.root.RandomSeed = {type: 4, value: [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]};
        levelDat.root.GameType = {type: 3, value: options.gamemode ?? 0};
        
        if (options.flatworld) {
            levelDat.root.Generator = {type: 3, value: 2};
        }

        if (options.testworld) {
            levelDat.root.commandsEnabled = {type: 1, value: 1};
            levelDat.root.dodaylightcycle = {type: 1, value: 0};
            levelDat.root.domobloot = {type: 1, value: 0};
            levelDat.root.domobspawning = {type: 1, value: 0};
            levelDat.root.mobgriefing = {type: 1, value: 0};
            levelDat.root.keepinventory = {type: 1, value: 1};
            levelDat.root.doweathercycle = {type: 1, value: 0};
        }

        world.setLevelDat(NbtFile.fromJson(levelDat).write());

        await new Promise<void>(resolve => {
            archiveDirectory(world.filePath, `${world.filePath}.mcworld`, () => {
                console.log(`${chalk.green(`Opening World`)}`);
        
                execSync(`"${world.filePath}.mcworld"`);
                fs.rmSync(`${world.filePath}.mcworld`);
                resolve();
            });
        });

        return world;
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
        const name = path.basename(directory);

        const pack = {
            directory,
            name,
            type,
            uuid,
        };

        return type === 'resource' ? pack as IResourcePack : pack as IBehaviorPack;
    }

    public addPack(pack: IBehaviorPack|IResourcePack) {
        let files = getFiles(this.filePath + `/world_${pack.type}_packs.json`);
        if (!files.length) {
            files.push({filePath: this.filePath + `/world_${pack.type}_packs.json`, fileContents: '[]'});
        }

        files = files.filter(file => {
            if (file.fileContents.includes(pack.uuid)) {
                console.warn(`${chalk.yellow(`${this.Name} already contains pack ${pack.name}`)}`);
                return false;
            };

            const json = JSON.parse(file.fileContents);
            json.push({
                pack_id: pack.uuid,
                version: [ 1, 0, 0 ],
            });
            file.fileContents = JSON.stringify(json, null, '\t');
            file.handleExisting = 'overwrite';

            return true;
        });

        setFiles(files);
    }

    private async addManifest() {
        const dat = this.LevelDat.toJson() as any;
        const version_array = dat.root.lastOpenedWithVersion.value.items.slice(0, 3);
        console.log(version_array)

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

    private setLevelDat(v: Uint8Array) {
        let stream = fs.createWriteStream(this.filePath + '/level.dat');
        stream.write(v);
        stream.end();
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