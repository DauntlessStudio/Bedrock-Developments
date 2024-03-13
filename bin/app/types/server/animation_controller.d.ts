import { NameData } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";
import { FormatVersion } from "../shared_types.js";
export type ServerACName = `controller.animation.${string}`;
export interface IServerAnimationController {
    format_version: FormatVersion;
    animation_controllers: {
        [key: ServerACName]: IServerAC;
    };
}
export interface IServerAC {
    initial_state: string;
    states: {
        [key: string]: IServerACState;
    };
}
export interface IServerACState {
    on_entry?: string[];
    animations?: string[];
    transitions?: {
        [key: string]: string;
    }[];
    on_exit?: string[];
}
export declare class ServerAnimationController extends MinecraftDataType implements IServerAnimationController {
    format_version: FormatVersion;
    animation_controllers: {
        [key: ServerACName]: IServerAC;
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IServerAnimationController);
    static createFromTemplate(nameData: NameData): ServerAnimationController;
    addAnimationController(key: ServerACName, controller?: IServerAC): void;
    addState(key: ServerACName, stateName: string, state: IServerACState): void;
}
