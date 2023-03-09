import * as Global from './globals';
import { deleteFile, readJSONFromFile, readSourceFile, writeBufferFileFromString, writeFileFromJSON, writeFileFromString, writeToLang } from './file_manager';
import * as Chalk from 'chalk';
import * as JSONC from 'comment-json';
import * as fs from 'fs';

const chalk = new Chalk.Instance();
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

export function worldExport(include_packs = false, world_index = 0){
    let worlds = worldList();
    if (world_index <= worlds.length) {
        let new_path = `${download}/${worlds[world_index].name}`;
        fs.cpSync(worlds[world_index].path, new_path, {recursive: true});

        if (include_packs) {
            
        }
    }
}

function worldGetPacks(path: string) {
    const packs = {bp: [], rp: []};
    if (fs.existsSync(`${path}/world_behavior_packs.json`)) {
        let bp: any = JSONC.parse(String(fs.readFileSync(`${path}/world_behavior_packs.json`)));
        for (const obj of bp) {
            obj.pack_id;
            // Create function to search bp and rp lists and find matching pack id
        }
    }
}