import { NameData } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";
import { FormatVersion, MolangTripleArray } from "../shared_types.js";
import { IClientACParticleEffects, IClientACSoundEffects } from "./animation_controller";
export type ClientAnimationName = `animation.${string}`;
export interface IClientAnimation {
    format_version: FormatVersion;
    animations: {
        [key: ClientAnimationName]: IClientAnimationAnim;
    };
}
export interface IClientAnimationAnim {
    animation_length?: number;
    anim_time_update?: string;
    blend_weight?: string;
    loop?: boolean | "hold_on_last_frame";
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
    };
}
export interface IClientAnimationBone {
    rotation?: MolangTripleArray | {
        [key: `${number}`]: MolangTripleArray;
    };
    position?: MolangTripleArray | {
        [key: `${number}`]: MolangTripleArray;
    };
    scale?: MolangTripleArray | {
        [key: `${number}`]: MolangTripleArray;
    };
    relative_to?: {
        rotation: string;
    };
}
export declare class ClientAnimation extends MinecraftDataType implements IClientAnimation {
    format_version: FormatVersion;
    animations: {
        [key: ClientAnimationName]: IClientAnimationAnim;
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IClientAnimation);
    static createFilePath(nameData: NameData): string;
    static createFromTemplate(nameData: NameData): ClientAnimation;
}
