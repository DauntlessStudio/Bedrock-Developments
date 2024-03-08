import { Directories } from "../../new_file_manager";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion, MolangTripleArray } from "../shared_types";
import { IClientACParticleEffects, IClientACSoundEffects } from "./animation_controller";

export type ClientAnimationName = `animation.${string}`;

export interface IClientAnimation {
    format_version: FormatVersion;
    animations: {
        [key: ClientAnimationName]: IClientAnimationAnim;
    }
}

export interface IClientAnimationAnim {
    animation_length: number;
    anim_time_update?: string;
    blend_weight?: string;
    loop?: boolean;
    loop_delay?: string;
    start_delay?: string;
    override_previous_animation?: boolean;
    timeline?: {
        [key: `${number}`]: string[];
    };
    particle_effects?: {
        [key: `${number}`]: IClientACParticleEffects;
    };
    sound_effects?: {
        [key: `${number}`]: IClientACSoundEffects;
    };
    bones?: {
        [key: string]: IClientAnimationBone;
    }
}

export interface IClientAnimationBone {
    rotation?: MolangTripleArray|{
        [key: `${number}`]: MolangTripleArray;
    };
    position?: MolangTripleArray|{
        [key: `${number}`]: MolangTripleArray;
    };
    scale?: MolangTripleArray|{
        [key: `${number}`]: MolangTripleArray;
    };
    relative_to?: {
        rotation: string;
    };
}

export class ClientAnimation extends MinecraftDataType implements IClientAnimation {
    format_version: FormatVersion;
    animations: {
        [key: ClientAnimationName]: IClientAnimationAnim;
    }

    public static get DirectoryPath(): string {
        return Directories.BEHAVIOR_PATH + 'animations/';
    }
    
    constructor(filepath: string, template: IClientAnimation) {
        super(filepath, template);
        this.format_version = template.format_version;
        this.animations = template.animations;
    }
}