import { Directories } from "../../new_file_manager";
import { NameData, currentFormatVersion } from "../../utils";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion } from "../shared_types";

export type ClientACName = `controller.animation.${string}`;

export interface IClientAnimationController {
    format_version: FormatVersion;
    animation_controllers: {
        [key: ClientACName]: IClientAC;
    }
}

export interface IClientAC {
    initial_state: string;
    states: {
        [key: string]: IClientACState
    }
}

export interface IClientACState {
    on_entry?: string[];
    animations?: string[];
    transitions?: {[key:string]: string};
    on_exit?: string[];
    blend_transition?: number;
    blend_via_shortest_path?: boolean;
    particle_effects?: IClientACParticleEffects[];
    sound_effects?: IClientACSoundEffects[];
    variables?: {
        [key: string]: IClientACSoundVariable;
    }
}

export interface IClientACParticleEffects {
    bind_to_actor?: boolean;
    effect: string;
    locator?: string;
    pre_effect_script?: string;
}

export interface IClientACSoundEffects {
    effect: string;
}

export interface IClientACSoundVariable {
    input: string;
    remape_curve?: any;
}

export class ClientAnimationController extends MinecraftDataType implements IClientAnimationController {
    format_version: FormatVersion;
    animation_controllers: {
        [key: ClientACName]: IClientAC;
    }

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'animation_controllers/';
    }
    
    constructor(filepath: string, template: IClientAnimationController) {
        super(filepath, template);
        this.format_version = template.format_version;
        this.animation_controllers = template.animation_controllers;
    }

    public static createFromTemplate(nameData: NameData): ClientAnimationController {
        return new ClientAnimationController(this.createFilePath(nameData), {
            format_version: currentFormatVersion,
            animation_controllers: {
                [`controller.animation.${nameData.shortname}` as ClientACName]: {
                    initial_state: 'default',
                    states: {
                        'default': {}
                    }
                }
            }
        });
    }

    addAnimationController(key: ClientACName, controller: IClientAC) {
        this.animation_controllers[key] = controller;
    }
}