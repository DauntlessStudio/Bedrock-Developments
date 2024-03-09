import { Directories } from "../../new_file_manager";
import { NameData, currentFormatVersion } from "../../utils";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion } from "../shared_types";

export interface IClientSoundDefinitions {
    format_version: FormatVersion;
    sound_definitions: {
        [key: string]: IClientSoundDefinition;
    };
}

export interface IClientSoundDefinition {
    category?: 'ambient'|'block'|'bottle'|'bucket'|'hostile'|'music'|'neutral'|'player'|'record'|'ui'|'weather';
    sounds: (string|IClientSoundDefinitionSound)[];
    __use_legacy_max_distance?: boolean;
    min_distance?: number;
    max_distance?: number;
}

export interface IClientSoundDefinitionSound {
    name: string;
    volume?: number;
    pitch?: number;
    load_on_low_memory?: boolean;
    is3D?: boolean;
    stream?: boolean;
    weight?: boolean;
}

export class ClientSoundDefinitions extends MinecraftDataType implements IClientSoundDefinitions {
    format_version: FormatVersion;
    sound_definitions: {
        [key: string]: IClientSoundDefinition;
    };

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'sounds/';
    }

    constructor(filepath: string, template: IClientSoundDefinitions) {
        super(filepath, template);
        this.format_version = template.format_version;
        this.sound_definitions = template.sound_definitions;
    }

    public static createFromTemplate(nameData: NameData): ClientSoundDefinitions {
        return new ClientSoundDefinitions(this.createFilePath(nameData), {
            format_version: currentFormatVersion,
            sound_definitions: {}
        });
    }

    addSound(name: string, sound: IClientSoundDefinition) {
        this.sound_definitions[name] = sound;
    }

    convertSoundsToObjects() {
        Object.keys(this.sound_definitions).forEach(key => {
            const newSounds: IClientSoundDefinitionSound[] = [];

            this.sound_definitions[key].sounds.forEach(sound => {
                if (typeof(sound) === 'string') {
                    newSounds.push({name: sound, volume: 1, pitch: 1, load_on_low_memory: true});
                } else {
                    newSounds.push(sound);
                }
            });

            this.sound_definitions[key].sounds = newSounds;
        });
    }
}