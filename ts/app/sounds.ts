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

class SoundDefinitions {
    format_version: string;
    sound_definitions: {
        [name: string]: SoundDefinition;
    };

    constructor(format_version: string, sound_definitions: { [name: string]: SoundDefinition }) {
        this.format_version = format_version;
        this.sound_definitions = sound_definitions;
    }
}

class SoundDefinition {
    category: string;
    sounds: (SoundOneLiner|string)[];
    __use_legacy_max_distance?: string;
    min_distance?: number;

    constructor(category: string, sounds: (SoundOneLiner|string)[], __use_legacy_max_distance?: string, min_distance?: number) {
        this.category = category;
        this.__use_legacy_max_distance = __use_legacy_max_distance;
        this.min_distance = min_distance;
        this.sounds = sounds;
    }
}

export class integer {
    int: number;
    constructor(int: number) {
        this.int = int;
    }
};

class SoundOneLiner {
    name: string;
    is3D?: boolean;
    stream?: boolean;
    volume?: number;
    pitch?: number;
    weight?: integer;
    load_on_low_memory?: boolean;

    constructor(data: {name: string, is3D?: boolean, stream?: boolean, volume?: number, pitch?: number, weight?: number, load_on_low_memory?: boolean}) {
        this.name = data.name;
        this.is3D = data.is3D;
        this.stream = data.stream;
        this.volume = data.volume;
        this.pitch = data.pitch;
        if (data.weight) {
            this.weight = new integer(data.weight);
        }
        this.load_on_low_memory = data.load_on_low_memory;
    }
}


export async function createNewSoundDefinition(names: string[], options: soundDefinitionOptions) {
    const sounds = await getSoundsArray(options.filepath);
    
    const new_definition = new SoundDefinition(options.category || soundCategory.neutral, sounds);

    if (options.vanilla) {
        const vanilla_sounds_raw = await requestURL(`https://raw.githubusercontent.com/Mojang/bedrock-samples/main/resource_pack/sounds/sound_definitions.json`);
        const vanilla_sounds = JSON.parse(vanilla_sounds_raw.data);

        if (options.vanilla in vanilla_sounds['sound_definitions'] && 'sounds' in vanilla_sounds['sound_definitions'][options.vanilla]) {
            new_definition.category = options.category || vanilla_sounds['sound_definitions'][options.vanilla].category;
            const vanilla_sounds_arr = vanilla_sounds['sound_definitions'][options.vanilla].sounds as Array<any>;
            new_definition.sounds = vanilla_sounds_arr.map((sound => {
                if (Object.prototype.toString.call(sound) === '[object String]') {
                    return new SoundOneLiner({
                        name: sound,
                        volume: 1.0,
                        pitch: 1.0,
                    });
                } else {
                    return new SoundOneLiner({
                        name: sound.name,
                        volume: sound.volume || 1.0,
                        pitch: sound.pitch || 1.0,
                    });
                }
            }))
        }
    }
    
    const definitions_path = `${Global.project_rp}sounds/sound_definitions.json`;
    const local_definitions_path = `${Global.app_root}/src/sounds/sound_definitions.json`;

    for (const name of names) {
        await modifyAndWriteFile({source_path: definitions_path, target_path: definitions_path, default_path: local_definitions_path}, (data: any) => {
            let s_def = createSoundDef(data);
            s_def.sound_definitions[name] = new_definition;
        }, {overwrite: true, custom_write: true});
    }
}

function createSoundDef(object: any) {
    const definitions: any = {};
    for (const def_key of Object.keys(object['sound_definitions'])) {
        const sounds: (SoundOneLiner|string)[] = [];

        for (const sound of Object.values(object['sound_definitions'][def_key]['sounds'])) {
            if (typeof sound === 'string') {
                sounds.push(sound);
            } else {
                let new_sound = Object.create(SoundOneLiner.prototype) as SoundOneLiner;
                Object.assign(new_sound, sound);
                if (new_sound.weight) {
                    new_sound.weight = new integer(Number((sound as any).weight));
                }
                sounds.push(new_sound);
            }
        }

        definitions[def_key] = object['sound_definitions'][def_key];
        definitions[def_key].sounds = sounds;
    }

    return new SoundDefinitions('1.14.0', definitions);
}

async function getSoundsArray(filepath?: string) {
    const sounds: SoundOneLiner[] = [];

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