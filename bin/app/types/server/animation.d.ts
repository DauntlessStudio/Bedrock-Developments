import { MinecraftDataType } from "../minecraft";
import { FormatVersion } from "../shared_types";
export type ServerAnimationName = `animation.${string}`;
export interface IServerAnimation {
    format_version: FormatVersion;
    animations: {
        [key: ServerAnimationName]: IServerAnimationAnim;
    };
}
export interface IServerAnimationAnim {
    aninimation_length: number;
    anim_time_update?: string;
    loop?: boolean;
    timeline?: {
        [key: `${number}`]: string[];
    };
}
export declare class ServerAnimation extends MinecraftDataType implements IServerAnimation {
    format_version: FormatVersion;
    animations: {
        [key: ServerAnimationName]: IServerAnimationAnim;
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IServerAnimation);
}
