import { MinecraftDataType } from "../minecraft";
import { FormatVersion } from "../shared_types";
export interface IClientSoundDefinitions {
    format_version: FormatVersion;
    sound_definitions: {
        [key: string]: IClientSoundDefinition;
    };
}
export interface IClientSoundDefinition {
    category?: 'ambient' | 'block' | 'bottle' | 'bucket' | 'hostile' | 'music' | 'neutral' | 'player' | 'record' | 'ui' | 'weather';
    sounds: (string | IClientSoundDefinitionSound)[];
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
export declare class ClientSoundDefinitions extends MinecraftDataType implements IClientSoundDefinitions {
    format_version: FormatVersion;
    sound_definitions: {
        [key: string]: IClientSoundDefinition;
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IClientSoundDefinitions);
    convertSoundsToObjects(): void;
}