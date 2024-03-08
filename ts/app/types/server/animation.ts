import { Directories } from "../../new_file_manager";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion } from "../shared_types";

export type ServerAnimationName = `animation.${string}`;

export interface IServerAnimation {
    format_version: FormatVersion;
    animations: {
        [key: ServerAnimationName]: IServerAnimationAnim;
    }
}

export interface IServerAnimationAnim {
    aninimation_length: number;
    anim_time_update?: string;
    loop?: boolean;
    timeline?: {
        [key: `${number}`]: string[];
    }
}

export class ServerAnimation extends MinecraftDataType implements IServerAnimation {
    format_version: FormatVersion;
    animations: {
        [key: ServerAnimationName]: IServerAnimationAnim;
    }

    public static get DirectoryPath(): string {
        return Directories.BEHAVIOR_PATH + 'animations/';
    }
    
    constructor(filepath: string, template: IServerAnimation) {
        super(filepath, template);
        this.format_version = template.format_version;
        this.animations = template.animations;
    }
}