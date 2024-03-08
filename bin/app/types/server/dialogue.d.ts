import { MinecraftDataType } from "../minecraft";
import { FormatVersion, RawMessage } from "../shared_types";
export interface IServerDialogue {
    format_version: FormatVersion;
    ["minecraft:npc_dialogue"]: {
        scenes: IServerDialogueScene[];
    };
}
export interface IServerDialogueScene {
    npc_name: RawMessage;
    scene_tag: string;
    on_open_commands?: string[];
    on_close_commands?: string[];
    text: RawMessage;
    buttons?: {
        name: RawMessage;
        commands?: string[];
    }[];
}
export declare class ServerDialogue extends MinecraftDataType implements IServerDialogue {
    format_version: FormatVersion;
    ["minecraft:npc_dialogue"]: {
        scenes: IServerDialogueScene[];
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IServerDialogue);
    addScene(scene: IServerDialogueScene): void;
    addButtonToAllScenes(button: {
        name: RawMessage;
        commands: string[];
    }): void;
    addToAllCloseCommands(...commands: string[]): void;
    addToAllOpenCommands(...commands: string[]): void;
    addToAllButtonCommands(...commands: string[]): void;
}
