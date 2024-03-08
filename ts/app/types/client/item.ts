import { Directories } from "../../new_file_manager";
import { NameData } from "../../utils";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion, Identifier } from "../shared_types";

export interface IClientItem {
    format_version: FormatVersion;
    ["minecraft:item"]: IClientItemItem;
}

export interface IClientItemItem {
    description: IClientItemDescription;
    components: IClientItemComponents;
}

export interface IClientItemDescription {
    identifier: Identifier;
    category?: string;
}

export interface IClientItemComponents {
    ["minecraft:icon"]?: string;
    ["minecraft:render_offsets"]?: string;
}

export class ClientItem extends MinecraftDataType implements IClientItem {
    format_version: FormatVersion;
    ["minecraft:item"]: IClientItemItem;

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'items/';
    }

    constructor(filepath: string, template: IClientItem) {
        super(filepath, template);
        this.format_version = template.format_version;
        this["minecraft:item"] = template["minecraft:item"];
    }

    setDisplayData(name: NameData) {
        this["minecraft:item"].description.identifier = name.fullname as Identifier;
        this["minecraft:item"].components["minecraft:icon"] = name.shortname;
    }
}