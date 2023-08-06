import * as Global from './globals';
import { getFilesFromGlob, modifyAndWriteFile } from './file_manager';
import * as fs from 'fs';
import * as glob from 'glob';
import * as Path from 'path';
import { getNamesObjects, jsonJoin } from './utils';
import { requestURL, requestVanilla } from './github';
import mergeDeep from './merge_deep';

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

    sortDefinitionsAlphabetically() {
        let def_keys = Object.keys(this.sound_definitions);
        def_keys.sort();
        let temp_def: {[name: string]: SoundDefinition} = {};
        for (const key of def_keys) {
            temp_def[key] = this.sound_definitions[key];
        }

        this.sound_definitions = temp_def;
    }
}

class SoundDefinition {
    category: string;
    sounds: SoundOneLiner[];
    __use_legacy_max_distance?: string;
    min_distance?: number;

    constructor(category: string, sounds: SoundOneLiner[], __use_legacy_max_distance?: string, min_distance?: number) {
        this.category = category;
        this.__use_legacy_max_distance = __use_legacy_max_distance;
        this.min_distance = min_distance;
        this.sounds = sounds;
    }

    formatSounds() {
        const has_low_memory = this.sounds.findIndex(sound => sound.load_on_low_memory) !== -1;
        this.sounds.forEach(sound => sound.load_on_low_memory = sound.load_on_low_memory ?? false);
        if (!has_low_memory && this.sounds.length) {
            this.sounds[0].load_on_low_memory = true;
        }
    }
}

class SoundOneLiner {
    name: string;
    volume: number;
    pitch: number;
    is3D?: boolean;
    stream?: boolean;
    weight?: Global.integer;
    load_on_low_memory?: boolean;

    constructor(data: {name: string, volume?: number, pitch?: number, is3D?: boolean, stream?: boolean, weight?: number, load_on_low_memory?: boolean}|string) {
        if (typeof data === 'string') {
            this.name = data;
            this.volume = 1.0;
            this.pitch = 1.0;
        } else {
            this.name = data.name;
            this.volume = data.volume ?? 1.0;
            this.pitch = data.pitch ?? 1.0;
            this.is3D = data.is3D;
            this.stream = data.stream;
            if (data.weight) {
                this.weight = new Global.integer(data.weight);
            }
            this.load_on_low_memory = data.load_on_low_memory;
        }
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
                return new SoundOneLiner(sound)
            }));
        }
    }
    
    const definitions_path = `${Global.project_rp}sounds/sound_definitions.json`;
    const local_definitions_path = `${Global.app_root}/src/sounds/sound_definitions.json`;

    for (const name of names) {
        await modifyAndWriteFile({source_path: definitions_path, target_path: definitions_path, default_path: local_definitions_path}, (s_def: SoundDefinitions) => {
            s_def.sound_definitions[name] = new_definition;

            let new_s_def = formatSoundDef(s_def);
            new_s_def.sortDefinitionsAlphabetically();

            Object.assign(s_def, new_s_def);
        }, {overwrite: true, custom_write: true});
    }
}

export async function soundsFormat() {
    const definitions_path = `${Global.project_rp}sounds/sound_definitions.json`;
    const local_definitions_path = `${Global.app_root}/src/sounds/sound_definitions.json`;

    await modifyAndWriteFile({source_path: definitions_path, target_path: definitions_path, default_path: local_definitions_path}, (s_def: SoundDefinitions) => {
        let new_s_def = formatSoundDef(s_def);
        new_s_def.sortDefinitionsAlphabetically();

        Object.assign(s_def, new_s_def);
    }, {overwrite: true, custom_write: true});
}

function formatSoundDef(object: any) {
    const definitions: { [name: string]: SoundDefinition } = {};
    for (const def_key of Object.keys(object['sound_definitions'])) {
        const sounds: SoundOneLiner[] = [];

        for (const sound of Object.values(object['sound_definitions'][def_key]['sounds'])) {
            let new_sound = new SoundOneLiner(sound as any);
            sounds.push(new_sound);
        }

        definitions[def_key] = new SoundDefinition(object['sound_definitions'][def_key].category, sounds, object['sound_definitions'][def_key].__use_legacy_max_distance, object['sound_definitions'][def_key].min_distance);
        definitions[def_key].formatSounds();
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