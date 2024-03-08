import { MinecraftDataType } from "../minecraft";
import { FormatVersion } from "../shared_types";
export type IServerACName = `controller.animation.${string}`;
export interface IServerAnimationController {
    format_version: FormatVersion;
    animation_controllers: {
        [key: IServerACName]: IServerAC;
    };
}
export interface IServerAC {
    initial_state: string;
    states: {
        [key: string]: {};
    };
}
export interface IServerACState {
    on_entry?: string[];
    animations?: string[];
    transitions?: {
        [key: string]: string;
    };
    on_exit?: string[];
}
export declare class ServerAnimationController extends MinecraftDataType implements IServerAnimationController {
    format_version: FormatVersion;
    animation_controllers: {
        [key: IServerACName]: IServerAC;
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IServerAnimationController);
    addAnimationController(key: IServerACName, controller: IServerAC): void;
}
