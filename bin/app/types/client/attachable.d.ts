import { NameData } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";
import { FormatVersion, Identifier, MolangOption } from "../shared_types.js";
import { ClientEntityGeometryReference, IClientEntityDescription } from "./entity.js";
export interface IClientAttachable {
    format_version: FormatVersion;
    ['minecraft:attachable']: {
        description: IClientAttachableDescription;
    };
}
export interface IClientAttachableDescription extends IClientEntityDescription {
    item?: {
        [key: Identifier]: string;
    };
}
export declare class ClientAttachable extends MinecraftDataType implements IClientAttachable {
    format_version: FormatVersion;
    ['minecraft:attachable']: {
        description: IClientAttachableDescription;
    };
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IClientAttachable);
    static createFromTemplate(nameData: NameData): ClientAttachable;
    addInitializeVariable(...variables: string[]): void;
    addPreAnimationVariable(...variables: string[]): void;
    addMaterials(...materials: {
        name: string;
        reference: string;
    }[]): void;
    addGeometry(...geometry: {
        name: string;
        reference: ClientEntityGeometryReference;
    }[]): void;
    addRenderController(...render_controllers: MolangOption[]): void;
    addAnimation(...animations: {
        name: string;
        reference: string;
    }[]): void;
    addAnimateScript(...animations: ({
        [key: string]: string;
    } | string)[]): void;
}
declare abstract class ClientAttachableArmor extends ClientAttachable {
    protected static readonly armorType: string;
    static get DirectoryPath(): string;
    static createFromTemplate(nameData: NameData): ClientAttachable;
    addOwnerFilter(shortname: string, owner: Identifier): void;
}
export declare class ClientAttachableArmorHelmet extends ClientAttachableArmor {
    protected static readonly armorType: string;
}
export declare class ClientAttachableArmorChestplate extends ClientAttachableArmor {
    protected static readonly armorType: string;
}
export declare class ClientAttachableArmorLeggings extends ClientAttachableArmor {
    protected static readonly armorType: string;
}
export declare class ClientAttachableArmorBoots extends ClientAttachableArmor {
    protected static readonly armorType: string;
}
export {};
