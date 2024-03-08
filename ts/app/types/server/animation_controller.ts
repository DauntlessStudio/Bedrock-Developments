import { Directories } from "../../new_file_manager";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion } from "../shared_types";

export type ServerACName = `controller.animation.${string}`;

export interface IServerAnimationController {
    format_version: FormatVersion;
    animation_controllers: {
        [key: ServerACName]: IServerAC;
    }
}

export interface IServerAC {
    initial_state: string;
    states: {
        [key: string]: IServerACState
    }
}

export interface IServerACState {
    on_entry?: string[];
    animations?: string[];
    transitions?: {[key:string]: string};
    on_exit?: string[];
}

export class ServerAnimationController extends MinecraftDataType implements IServerAnimationController {
    format_version: FormatVersion;
    animation_controllers: {
        [key: ServerACName]: IServerAC;
    }

    public static get DirectoryPath(): string {
        return Directories.BEHAVIOR_PATH + 'animation_controllers/';
    }
    
    constructor(filepath: string, template: IServerAnimationController) {
        super(filepath, template);
        this.format_version = template.format_version;
        this.animation_controllers = template.animation_controllers;
    }

    addAnimationController(key: ServerACName, controller: IServerAC) {
        this.animation_controllers[key] = controller;
    }
}