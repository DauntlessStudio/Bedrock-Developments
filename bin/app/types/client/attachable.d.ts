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
    addInitializeVariable(...variable: string[]): void;
    addParentVariables(): void;
    addPreAnimationVariable(...variable: string[]): void;
    addMaterials(...materials: {
        name: string;
        reference: string;
    }[]): void;
    addGeometry(...geometry: {
        name: string;
        reference: ClientEntityGeometryReference;
    }[]): void;
    addRenderController(...render_controllers: MolangOption[]): void;
}
