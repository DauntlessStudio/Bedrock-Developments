import { MinecraftDataType } from "../minecraft";
import { FormatVersion } from "../shared_types";
export type ClientACName = `controller.animation.${string}`;
export interface IClientAnimationController {
    format_version: FormatVersion;
    animation_controllers: {
        [key: ClientACName]: IClientAC;
    };
}
export interface IClientAC {
    initial_state: string;
    states: {
        [key: string]: IClientACState;
    };
}
export interface IClientACState {
    on_entry?: string[];
    animations?: string[];
    transitions?: {
        [key: string]: string;
    };
    on_exit?: string[];
    blend_transition?: number;
    blend_via_shortest_path?: boolean;
    particle_effects?: IClientACParticleEffects[];
    sound_effects?: IClientACSoundEffects[];
    variables?: {
        [key: string]: IClientACSoundVariable;
    };
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
export declare class ClientAnimationController extends MinecraftDataType implements IClientAnimationController {
    format_version: FormatVersion;
    animation_controllers: {
        [key: ClientACName]: IClientAC;
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IClientAnimationController);
    addAnimationController(key: ClientACName, controller: IClientAC): void;
}
