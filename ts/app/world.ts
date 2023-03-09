import * as Global from './globals';
import * as JSONC from 'comment-json';
import * as fs from 'fs';
import * as archiver from 'archiver';
import path from 'path';

const appdata = (process.env.LOCALAPPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share"));
const download = `${process.env.USERPROFILE}/Downloads`

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

        console.log(`${Global.chalk.green(`Exporting ${worlds[world_index].path}...`)}`);
        copyDir(worlds[world_index].path, new_path);

        if (include_packs) {
            let packs = worldGetPacks(new_path);

            try {
                fs.mkdirSync(`${new_path}/behavior_packs`);
                fs.mkdirSync(`${new_path}/resource_packs`);
            } catch (error) {
                
            }

            for (const bp of packs.bp) {
                console.log(`${Global.chalk.green(`Exporting ${bp.name}...`)}`);
                copyDir(bp.path, `${new_path}/behavior_packs/${bp.name}`);
            }

            for (const rp of packs.rp) {
                console.log(`${Global.chalk.green(`Exporting ${rp.name}...`)}`);
                copyDir(rp.path, `${new_path}/resource_packs/${rp.name}`);
            }
        }

        console.log(`${Global.chalk.green(`Packaging World...`)}`);
        archiveDirToZip(new_path, `${new_path}.mcworld`, () => {
            console.log(`${Global.chalk.green(`Cleaning Up...`)}`);
            fs.rmSync(new_path, { recursive: true, force: true });

            console.log(`${Global.chalk.green(`Packaged To ${new_path}.mcworld`)}`);
        });
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

function copyDir(src: string, dest: string)
{
    fs.mkdirSync(dest, { recursive: true })
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries)
    {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    }
}

function archiveDirToZip(dir: string, zipPath: string, callback: Function) {
    let output = fs.createWriteStream(zipPath);
    let archive = archiver.default('zip', { zlib: { level: 9 } });
   
    output.on('close', () => {
     callback();
    });
   
    archive.pipe(output);
    archive.directory(dir, '');
    archive.finalize();
}