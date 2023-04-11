import * as Global from './globals';
import { getFilesFromGlob, modifyAndWriteFile } from './file_manager';
import * as fs from 'fs';
import * as glob from 'glob';
import * as Path from 'path';
import { getNamesObjects, jsonJoin } from './utils';
import { requestURL, requestVanilla } from './github';

export enum soundCategory {
    ambient='ambient',
    block='block',
    bottle='bottle',
    bucket='bucket',
    hostile='hostile',
    music='music',
    neutral='neutral',
    player='player',
    record='record',
    ui='ui',
    weather='weather',
}

interface soundDefinitionOptions {
    category?: string,
    vanilla?: string,
    filepath?: string,
}

export async function createNewSoundDefinition(names: string[], options: soundDefinitionOptions) {
    const sounds = await getSoundsArray(options.filepath);
    
    const new_definition = {
        category: options.category,
        sounds: sounds,
    }

    if (options.vanilla) {
        const vanilla_sounds_raw = await requestURL(`https://raw.githubusercontent.com/Mojang/bedrock-samples/main/resource_pack/sounds/sound_definitions.json`);
        const vanilla_sounds = JSON.parse(vanilla_sounds_raw.data);

        if (options.vanilla in vanilla_sounds['sound_definitions'] && 'sounds' in vanilla_sounds['sound_definitions'][options.vanilla]) {
            new_definition.category = options.category || vanilla_sounds['sound_definitions'][options.vanilla].category;
            const vanilla_sounds_arr = vanilla_sounds['sound_definitions'][options.vanilla].sounds as Array<any>;
            new_definition.sounds = vanilla_sounds_arr.map((sound => {
                if (Object.prototype.toString.call(sound) === '[object String]') {
                    return {
                        name: sound,
                        volume: 1.0,
                        pitch: 1.0,
                    }
                } else {
                    return {
                        name: sound.name,
                        volume: sound.volume || 1.0,
                        pitch: sound.pitch || 1.0,
                    };
                }
            }))
        }
    }
    
    const definitions_path = `${Global.project_rp}sounds/sound_definitions.json`;
    const local_definitions_path = `${Global.app_root}/src/sounds/sound_definitions.json`;

    for (const name of names) {
        await modifyAndWriteFile({source_path: definitions_path, target_path: definitions_path, default_path: local_definitions_path}, (s_def: any) => {
            s_def['sound_definitions'][name] = new_definition;
        }, {overwrite: true});
    }
}

async function getSoundsArray(filepath?: string) {
    const sounds: any[] = [];

    if (filepath) {
        const files = await getFilesFromGlob(`${Global.project_rp}${filepath}`);
        if (files.length) {
            for (const file of files) {
                const path = Path.parse(file);
                sounds.push({
                    name: `${path.dir.replace(Global.project_rp, '')}/${path.name}`,
                    volume: 1.0, 
                    pitch: 1.0
                })
            }
        } else {
            sounds.push({
                name: filepath,
                volume: 1.0, 
                pitch: 1.0
            })
        }
    }

    return sounds;
}