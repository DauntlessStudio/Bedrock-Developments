import { Directories } from "../../file_manager.js";
import { NameData, currentFormatVersion } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";
import { FormatVersion, MolangTripleArray } from "../shared_types.js";
import { IClientACParticleEffects, IClientACSoundEffects } from "./animation_controller";

export type ClientAnimationName = `animation.${string}`;

export interface IClientAnimation {
    format_version: FormatVersion;
    animations: {
        [key: ClientAnimationName]: IClientAnimationAnim;
    }
}

export interface IClientAnimationAnim {
    animation_length?: number;
    anim_time_update?: string;
    blend_weight?: string;
    loop?: boolean|"hold_on_last_frame";
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
        return Directories.RESOURCE_PATH + 'animations/';
    }
    
    constructor(filepath: string, template: IClientAnimation) {
        super(filepath, template);
        this.format_version = template.format_version;
        this.animations = template.animations;
    }

    public static createFromTemplate(nameData: NameData): ClientAnimation {
        return new ClientAnimation(this.createFilePath(nameData), {
            format_version: currentFormatVersion,
            animations: {
                [`animation.${nameData.shortname}` as ClientAnimationName]: {
                    animation_length: 1,
                    timeline: {}
                }
            }
        });
    }
}