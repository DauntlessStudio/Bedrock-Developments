import * as Global from './globals';
import * as JSONC from 'comment-json';
import * as fs from 'fs';
import * as nbt from 'prismarine-nbt'
import { archiveDirToZip, copyDir } from './file_manager';

const appdata = (process.env.LOCALAPPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")).replace(/\\/g, '/');
const download = `${process.env.USERPROFILE}/Downloads`.replace(/\\/g, '/');
const header_bytes = 8;

export enum experimentalToggle {
    betaAPI='beta-api',
    holiday='holiday-creator',
}

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

export function worldExport(include_packs: boolean = false, world_index: number){
    let worlds = worldList();
    if (world_index < worlds.length) {
        let new_path = `${download}/${worlds[world_index].name}`;

        console.log(`${Global.chalk.green(`Exporting ${worlds[world_index].path}`)}`);
        copyDir(worlds[world_index].path, new_path);

        if (include_packs) {
            let packs = worldGetPacks(new_path);

            try {
                fs.mkdirSync(`${new_path}/behavior_packs`);
                fs.mkdirSync(`${new_path}/resource_packs`);
            } catch (error) {
                
            }

            for (const bp of packs.bp) {
                console.log(`${Global.chalk.green(`Exporting ${bp.name}`)}`);
                copyDir(bp.path, `${new_path}/behavior_packs/${bp.name}`);
            }

            for (const rp of packs.rp) {
                console.log(`${Global.chalk.green(`Exporting ${rp.name}`)}`);
                copyDir(rp.path, `${new_path}/resource_packs/${rp.name}`);
            }
        }

        console.log(`${Global.chalk.green(`Packaging World`)}`);
        archiveDirToZip(new_path, `${new_path}.mcworld`, () => {
            console.log(`${Global.chalk.green(`Cleaning Up`)}`);
            fs.rmSync(new_path, { recursive: true, force: true });

            console.log(`${Global.chalk.green(`Packaged To ${new_path}.mcworld`)}`);
        });
    }
}

export async function worldAddPacks(world_index: number, bpack: string, rpack: string, experimental: string|undefined) {
    let worlds = worldList();
    if (world_index < worlds.length) {
        let bpID = getIDFromPack(bpack, packType.behavior);
        let rpID = getIDFromPack(rpack, packType.resource);

        if (bpID) {
            let path = `${worlds[world_index].path}/world_behavior_packs.json`
            let world_behavior_packs: any = fs.existsSync(path) ? JSONC.parse(String(fs.readFileSync(path))) : [];

            world_behavior_packs.push({pack_id: bpID, version: [ 1, 0, 0 ]});
            console.log(`${Global.chalk.green(`Added ${bpack} to ${path}`)}`);
            fs.writeFileSync(path, JSONC.stringify(world_behavior_packs, null, Global.indent));
        } else if (bpack) {
            console.log(`${Global.chalk.red(`Failed to find ${bpack}`)}`);
        }

        if (rpID) {
            let path = `${worlds[world_index].path}/world_resource_packs.json`
            let world_resource_packs: any = fs.existsSync(path) ? JSONC.parse(String(fs.readFileSync(path))) : [];

            world_resource_packs.push({pack_id: rpID, version: [ 1, 0, 0 ]});
            console.log(`${Global.chalk.green(`Added ${rpack} to ${path}`)}`);
            fs.writeFileSync(path, JSONC.stringify(world_resource_packs, null, Global.indent));
        } else if (rpack) {
            console.log(`${Global.chalk.red(`Failed to find ${rpack}`)}`);
        }

        if (experimental) {
            writeLevelDat(`${worlds[world_index].path}/level.dat`, (nbtData: any) => {
                console.log(`${Global.chalk.green(`Adding Experiments`)}`);

                switch (experimental) {
                    case experimentalToggle.betaAPI:
                        nbtData.value.experiments ||= nbt.comp({type: nbt.TagType.Compound, value: {}});
                        nbtData.value.experiments.value.gametest = nbt.byte(1);
                        nbtData.value.experiments.value.experiments_ever_used = nbt.byte(1);
                        nbtData.value.experiments.value.saved_with_toggled_experiments = nbt.byte(1);
                        break;
                
                    default:
                        break;
                }
            });
        }
    }
}

export async function worldRemovePacks(world_index: number, bpack: string|undefined, rpack: string|undefined, experimental: boolean) {
    let worlds = worldList();
    if (world_index < worlds.length) {
        let bpID = getIDFromPack(bpack, packType.behavior);
        let rpID = getIDFromPack(rpack, packType.resource);

        if (bpID) {
            let path = `${worlds[world_index].path}/world_behavior_packs.json`
            let world_behavior_packs: any = fs.existsSync(path) ? JSONC.parse(String(fs.readFileSync(path))) : [];

            let index = world_behavior_packs.indexOf({pack_id: bpID, version: [ 1, 0, 0 ]});
            if (index > -1) {
                world_behavior_packs.splice(index, 1);
            }

            console.log(`${Global.chalk.green(`Removed ${bpack} from ${path}`)}`);
            fs.writeFileSync(path, JSONC.stringify(world_behavior_packs, null, Global.indent));
        } else if (bpack) {
            console.log(`${Global.chalk.red(`Failed to find ${bpack}`)}`);
        }

        if (rpID) {
            let path = `${worlds[world_index].path}/world_resource_packs.json`
            let world_resource_packs: any = fs.existsSync(path) ? JSONC.parse(String(fs.readFileSync(path))) : [];

            let index = world_resource_packs.indexOf({pack_id: bpID, version: [ 1, 0, 0 ]});
            if (index > -1) {
                world_resource_packs.splice(index, 1);
            }

            console.log(`${Global.chalk.green(`Removed ${rpack} from ${path}`)}`);
            fs.writeFileSync(path, JSONC.stringify(world_resource_packs, null, Global.indent));
        } else if (rpack) {
            console.log(`${Global.chalk.red(`Failed to find ${rpack}`)}`);
        }

        if (experimental) {
            writeLevelDat(`${worlds[world_index].path}/level.dat`, (nbtData: any) => {
                console.log(nbtData.value.experiments);
                console.log(`${Global.chalk.green(`Removing Experiments`)}`);
                
                nbtData.value.experiments = {type: 'compound', value: {
                    data_driven_vanilla_blocks_and_items: nbt.byte(1),
                    experiments_ever_used: nbt.byte(0),
                    saved_with_toggled_experiments: nbt.byte(0),
                }};

                console.log(nbtData.value.experiments);
            });

            if (fs.existsSync(`${worlds[world_index].path}/level.dat_old`)) {
                fs.unlinkSync(`${worlds[world_index].path}/level.dat_old`);
            }
            fs.copyFileSync(`${worlds[world_index].path}/level.dat`, `${worlds[world_index].path}/level.dat_old`);
        }
    }
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

enum packType {
    behavior = 'behavior',
    resource = 'resource',
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

async function writeLevelDat(path: string, write_callback: Function) {
    let buffer = fs.readFileSync(path);
    const {parsed, type} = await nbt.parse(buffer);
    
    write_callback(parsed);

    // Write 8 metadata bytes in front of nbt data
    let nbt_buffer = nbt.writeUncompressed(parsed, type);
    let new_buffer: Buffer = buffer.subarray(0, header_bytes);
    new_buffer[4] = 0x07;
    new_buffer = Buffer.concat([new_buffer, nbt_buffer]);

    fs.createWriteStream(path).write(new_buffer);
}