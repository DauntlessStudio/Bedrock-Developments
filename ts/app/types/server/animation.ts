import { Directories } from "../../new_file_manager";
import { NameData, currentFormatVersion } from "../../utils";
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
    animation_length: number;
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

    public static createFromTemplate(nameData: NameData): ServerAnimation {
        return new ServerAnimation(this.createFilePath(nameData), {
            format_version: currentFormatVersion,
            animations: {
                [`animation.${nameData.shortname}` as ServerAnimationName]: {
                    animation_length: 1,
                    timeline: {}
                }
            }
        });
    }
}