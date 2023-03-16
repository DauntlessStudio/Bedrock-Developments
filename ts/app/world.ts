import * as Global from './globals';
import * as JSONC from 'comment-json';
import * as fs from 'fs';
import * as nbt from 'prismarine-nbt'
import { archiveDirToZip, copyDirectory, writeFileFromJSON } from './file_manager';
import {execSync} from 'child_process';
import { isNumeric } from './utils';
import { v4 } from 'uuid';

const appdata = (process.env.LOCALAPPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")).replace(/\\/g, '/');
const download = `${process.env.USERPROFILE}/Downloads`.replace(/\\/g, '/');

interface worldOptions{
    name?: string;
    behavior_pack?: string;
    resource_pack?: string;
    experimental?: experimentalToggle;
    gamemode?: gameMode;
    flatworld?: boolean;
    testworld?: boolean;
}

export enum experimentalToggle {
    betaAPI='beta-api',
    holiday='holiday-creator',
}

export enum gameMode {
    survival,
    creative,
    adventure,
    spectator
}

export enum exportType {
    world = 'world',
    template = 'template',
}

enum packType {
    behavior = 'behavior',
    resource = 'resource',
}

/**
 * @remarks gets the array of worlds installed
 * @returns an array of worlds with their internal name and paths
 */
export function worldList() {
    try {
        let path = `${appdata}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/minecraftWorlds`;
        let worlds = [];
        for (const folder of fs.readdirSync(path)) {
            let subpath = `${path}/${folder}`;
            let name = String(fs.readFileSync(`${subpath}/levelname.txt`));
            worlds.push({name: name, path: subpath});
        }

        return worlds;

    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * @remarks exports a world into the user's download folder
 * @param worldOptions contains options used for exporting the world
 * @param include_packs should the behavior and resource packs be packaged as well
 * @param type should it export to mcworld or mctemplate
 */
export async function worldExport(worldOptions: worldOptions, include_packs: boolean = false, type: exportType = exportType.world){
    const world = getWorld(worldOptions);

    if (world) {
        const new_path = `${download}/${world.name}`;

        await writeWorldManifest(world);

        console.log(`${Global.chalk.green(`Exporting ${world.path}`)}`);
        copyDirectory(world.path, new_path);

        if (include_packs) {
            let packs = worldGetPacks(new_path);

            try {
                fs.mkdirSync(`${new_path}/behavior_packs`);
                fs.mkdirSync(`${new_path}/resource_packs`);
            } catch (error) {
                
            }

            for (const bp of packs.bp) {
                console.log(`${Global.chalk.green(`Exporting ${bp.name}`)}`);
                copyDirectory(bp.path, `${new_path}/behavior_packs/${bp.name}`);
            }

            for (const rp of packs.rp) {
                console.log(`${Global.chalk.green(`Exporting ${rp.name}`)}`);
                copyDirectory(rp.path, `${new_path}/resource_packs/${rp.name}`);
            }
        }

        console.log(`${Global.chalk.green(`Packaging World`)}`);
        archiveDirToZip(new_path, `${new_path}.mc${type}`, () => {
            console.log(`${Global.chalk.green(`Cleaning Up`)}`);
            fs.rmSync(new_path, { recursive: true, force: true });

            console.log(`${Global.chalk.green(`Packaged ${world.name}.mc${type} To ${download}`)}`);
            execSync(`start %windir%\\explorer.exe "${download.replace(/\//g, '\\')}"`);
        });
    }
}

/**
 * @remarks adds a behavior and resource pack to a world and can activate experimental features
 * @param worldOptions options containing the packs to add and experiment preferences
 */
export async function worldAddPacks(worldOptions: worldOptions) {
    const world = getWorld(worldOptions);

    if (world) {
        addPackToWorld(world.path, getIDFromPack(worldOptions.behavior_pack, packType.behavior), worldOptions.behavior_pack, packType.behavior);
        addPackToWorld(world.path, getIDFromPack(worldOptions.resource_pack, packType.resource), worldOptions.resource_pack, packType.resource);

        writeLevelDat(`${world.path}/level.dat`, (nbtData: any) => {
            addExperimentsToDat(nbtData, worldOptions.experimental);
        });
    }
}

/**
 * @remarks removes a behavior and resource pack to a world and can deactivate experimental features
 * @param worldOptions options containing the packs to remove and experiment preferences
 */
export async function worldRemovePacks(worldOptions: worldOptions) {
    const world = getWorld(worldOptions);

    if (world) {
        removePackFromWorld(world.path, getIDFromPack(worldOptions.behavior_pack, packType.behavior), worldOptions.behavior_pack, packType.behavior);
        removePackFromWorld(world.path, getIDFromPack(worldOptions.resource_pack, packType.resource), worldOptions.resource_pack, packType.resource);

        if (worldOptions.experimental) {
            writeLevelDat(`${world.path}/level.dat`, (nbtData: any) => {
                removeExperimentsFromDat(nbtData, worldOptions.experimental);
            });

            fs.copyFileSync(`${world.path}/level.dat`, `${world.path}/level.dat_old`);
        }
    }
}

/**
 * adds a world to the list of minecraft worlds, automatically importing it
 * @param worldName the name of the world to create
 * @param worldOptions the options for generating the world
 */
export async function worldNew(worldName: string, worldOptions: worldOptions) {
    const path = `${download}/${worldName}`;

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    fs.writeFileSync(`${path}/levelname.txt`, worldName);
    fs.copyFileSync(`${Global.app_root}/src/world/level.dat`, `${path}/level.dat`);

    addPackToWorld(path, getIDFromPack(worldOptions.behavior_pack, packType.behavior), worldOptions.behavior_pack, packType.behavior);
    addPackToWorld(path, getIDFromPack(worldOptions.resource_pack, packType.resource), worldOptions.resource_pack, packType.resource);

    await writeLevelDat(`${path}/level.dat`, (nbtData: any) => {
        nbtData.value.LevelName = nbt.string(worldName);
        nbtData.value.RandomSeed = nbt.long([Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]);
        nbtData.value.GameType = nbt.int(worldOptions.gamemode ? worldOptions.gamemode : gameMode.survival);
        
        if (worldOptions.flatworld) {
            nbtData.value.Generator = nbt.int(2);
        }

        if (worldOptions.testworld) {
            nbtData.value.commandsEnabled = nbt.byte(1);
            nbtData.value.dodaylightcycle = nbt.byte(0);
            nbtData.value.domobloot = nbt.byte(0);
            nbtData.value.domobspawning = nbt.byte(0);
            nbtData.value.mobgriefing = nbt.byte(0);
            nbtData.value.keepinventory = nbt.byte(1);
            nbtData.value.doweathercycle = nbt.byte(0);
        }

        addExperimentsToDat(nbtData, worldOptions.experimental);
    });

    archiveDirToZip(path, `${path}.mcworld`, () => {
        console.log(`${Global.chalk.green(`Opening World`)}`);

        execSync(`"${path}.mcworld"`);
        fs.rmSync(`${path}.mcworld`);
    });
}

function getWorld(worldOptions: worldOptions) {
    const worlds = worldList();

    if (isNumeric(worldOptions.name!) && worlds.length >= Number(worldOptions.name)) {
        return worlds[Number(worldOptions.name)];
    }

    for (const world of worlds) {
        if (worldOptions.name && world.name === worldOptions.name) {
            return world;
        }
    }

    console.log(`${Global.chalk.red(`Failed To Find World`)}`);
    return undefined;
}

function worldGetPacks(path: string) {
    let bp_packs = [];
    let rp_packs = [];

    // Get BP Packs
    if (fs.existsSync(`${path}/world_behavior_packs.json`)) {
        let bp: any = JSONC.parse(String(fs.readFileSync(`${path}/world_behavior_packs.json`)));
        for (const obj of bp) {
            let pack_path = getPackFromID(obj.pack_id, packType.behavior);
            if (pack_path) {
                bp_packs.push(pack_path);
            }
        }
    }

    // Get RP Packs
    if (fs.existsSync(`${path}/world_resource_packs.json`)) {
        let rp: any = JSONC.parse(String(fs.readFileSync(`${path}/world_resource_packs.json`)));
        for (const obj of rp) {
            let pack_path = getPackFromID(obj.pack_id, packType.resource);
            if (pack_path) {
                rp_packs.push(pack_path);
            }
        }
    }

    return {bp: bp_packs, rp: rp_packs};
}

function addPackToWorld(world_path: string, pack_id: string, pack_path: string|undefined, pack_type: packType) {
    if (pack_id) {
        const path = `${world_path}/world_${pack_type}_packs.json`
        const world_packs: any = fs.existsSync(path) ? JSONC.parse(String(fs.readFileSync(path))) : [];

        world_packs.push({pack_id: pack_id, version: [ 1, 0, 0 ]});
        fs.writeFileSync(path, JSONC.stringify(world_packs, null, Global.indent));

        console.log(`${Global.chalk.green(`Added ${pack_path} to ${path}`)}`);
    } else if (pack_path) {
        console.log(`${Global.chalk.red(`Failed to find ${pack_path}`)}`);
    }
}

function removePackFromWorld(world_path: string, pack_id: string, pack_path: string|undefined, pack_type: packType) {
    if (pack_id) {
        let path = `${world_path}/world_${packType}_packs.json`
        let world_packs: any = fs.existsSync(path) ? JSONC.parse(String(fs.readFileSync(path))) : [];

        let index = world_packs.indexOf({pack_id: pack_id, version: [ 1, 0, 0 ]});
        if (index > -1) {
            world_packs.splice(index, 1);
        }

        console.log(`${Global.chalk.green(`Removed ${pack_path} from ${path}`)}`);
        fs.writeFileSync(path, JSONC.stringify(world_packs, null, Global.indent));
    } else if (pack_path) {
        console.log(`${Global.chalk.red(`Failed to find ${pack_path}`)}`);
    }
}

function getIDFromPack(pack: string|undefined, type: packType) {
    if (!pack) {
        return undefined;
    }

    let path = `${appdata}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang`;

    // Check dev packs first
    let subpath = `${path}/development_${type}_packs/${pack}`;
    if (fs.existsSync(`${subpath}/manifest.json`)) {
        let manifest: any = JSONC.parse(String(fs.readFileSync(`${subpath}/manifest.json`)));
        return manifest.header.uuid;
    }

    // Check other packs next
    subpath = `${path}/${type}_packs/${pack}`;
    if (fs.existsSync(`${subpath}/manifest.json`)) {
        let manifest: any = JSONC.parse(String(fs.readFileSync(`${subpath}/manifest.json`)));
        return manifest.header.uuid;
    }
}

function getPackFromID(id: string, type: packType) {
    let path = `${appdata}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang`;

    // Check dev packs first
    for (const folder of fs.readdirSync(`${path}/development_${type}_packs`)) {
        let subpath = `${path}/development_${type}_packs/${folder}`;
        if (fs.existsSync(`${subpath}/manifest.json`)) {
            let manifest: any = JSONC.parse(String(fs.readFileSync(`${subpath}/manifest.json`)));
            if (manifest.header.uuid === id) {
                return {path: subpath, name: folder};
            }
        }
    }

    // Check other packs next
    for (const folder of fs.readdirSync(`${path}/${type}_packs`)) {
        let subpath = `${path}/${folder}`;
        if (fs.existsSync(`${subpath}/manifest.json`)) {
            let manifest: any = JSONC.parse(String(fs.readFileSync(`${subpath}/manifest.json`)));
            if (manifest.header.uuid === id) {
                return {path: subpath, name: folder};
            }
        }
    }
}

async function readLevelDat(path: string) {
    const {parsed, type} = await nbt.parse(fs.readFileSync(path));
    return {parsed, type};
}

async function writeLevelDat(path: string, write_callback: Function) {
    const {parsed, type} = await readLevelDat(path);
    
    write_callback(parsed);

    // Write 8 metadata bytes in front of nbt data
    let nbt_buffer = nbt.writeUncompressed(parsed, type);
    let new_buffer: Buffer = Buffer.from([0x0a, 0x00, 0x00, 0x00, 0x07, 0x0a, 0x00, 0x00]);
    new_buffer = Buffer.concat([new_buffer, nbt_buffer]);

    let stream = fs.createWriteStream(path);
    stream.write(new_buffer);
    stream.end();
    return;
}

function addExperimentsToDat(nbtData: any, experiments: experimentalToggle|undefined) {
    if (experiments) {
        console.log(`${Global.chalk.green(`Adding Experiments`)}`);

        switch (experiments) {
            case experimentalToggle.betaAPI:
                nbtData.value.experiments ||= {type: 'compound', value: {}};
                nbtData.value.experiments.value.gametest = nbt.byte(1);
                nbtData.value.experiments.value.experiments_ever_used = nbt.byte(1);
                nbtData.value.experiments.value.saved_with_toggled_experiments = nbt.byte(1);
                break;
        
            default:
                break;
        }
    }
}

function removeExperimentsFromDat(nbtData: any, experiments: experimentalToggle|undefined) {
    if (experiments) {
        console.log(`${Global.chalk.green(`Removing Experiments`)}`);
            
        nbtData.value.experiments = {type: 'compound', value: {
            data_driven_vanilla_blocks_and_items: nbt.byte(1),
            experiments_ever_used: nbt.byte(0),
            saved_with_toggled_experiments: nbt.byte(0),
        }};
    }
}

async function writeWorldManifest(world: {name: string, path: string}) {
    const {parsed}: any = await readLevelDat(`${world.path}/level.dat`);
    const version_array = parsed.value.lastOpenedWithVersion.value.value.slice(0, 3);
    
    const manifest = {
        format_version : 2,
        header : 
        {
            base_game_version : version_array,
            description : "",
            lock_template_options : true,
            name : world.name,
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
    }

    writeFileFromJSON(`${world.path}/manifest.json`, manifest, false, false);
}