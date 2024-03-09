import { Directories } from "../../new_file_manager";
import { NameData, currentFormatVersion } from "../../utils";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion, Identifier, MolangOption } from "../shared_types";
import { ClientEntityGeometryReference, IClientEntityDescription } from "./entity";

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

export class ClientAttachable extends MinecraftDataType implements IClientAttachable {
    format_version: FormatVersion;
    ['minecraft:attachable']: {
        description: IClientAttachableDescription;
    };

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'attachables/';
    }
    
    constructor(filepath: string, template: IClientAttachable) {
        super(filepath, template);
        this.format_version = template.format_version;
        this["minecraft:attachable"] = template["minecraft:attachable"];
    }

    public static createFromTemplate(nameData: NameData): ClientAttachable {
        return new ClientAttachable(this.createFilePath(nameData), {
            format_version: currentFormatVersion,
            "minecraft:attachable": {
                description: {
                    identifier: nameData.fullname as Identifier,
                    materials: {
                        default: "entity_alphatest",
                        enchanted: "entity_alphatest_glint",
                    },
                    textures: {
                        default: `textures/attachables/${nameData.shortname}`,
                        enchanted: "textures/misc/enchanted_item_glint",
                    },
                    geometry: {
                        default: `geometry.player.${nameData.shortname}`,
                    },
                    scripts: {
                        pre_animation: [
                            "v.is_first_person = c.is_first_person;",
                            "v.attack_time = c.owning_entity->v.attack_time;",
                        ]
                    },
                    render_controllers: [
                        "controller.render.item_default"
                    ]
                }
            }
        });
    }

    addInitializeVariable(...variable: string[]) {
        this["minecraft:attachable"].description.scripts = this["minecraft:attachable"].description.scripts ?? {};
        this["minecraft:attachable"].description.scripts.initialize = this["minecraft:attachable"].description.scripts.initialize ?? [];

        this["minecraft:attachable"].description.scripts.initialize.push(...variable);
    }

    addParentVariables() {
        this.addPreAnimationVariable("v.is_first_person = c.is_first_person;", "v.attack_time = c.owning_entity->v.attack_time;");
    }

    addPreAnimationVariable(...variable: string[]) {
        this["minecraft:attachable"].description.scripts = this["minecraft:attachable"].description.scripts ?? {};
        this["minecraft:attachable"].description.scripts.pre_animation = this["minecraft:attachable"].description.scripts.pre_animation ?? [];

        this["minecraft:attachable"].description.scripts.pre_animation.push(...variable);
    }

    addMaterials(...materials: {name: string, reference: string}[]) {
        this["minecraft:attachable"].description.materials = this["minecraft:attachable"].description.materials ?? {};
        materials.forEach(material => {
            this["minecraft:attachable"].description.materials![material.name] = material.reference;
        });
    }

    addGeometry(...geometry: {name: string, reference: ClientEntityGeometryReference}[]) {
        this["minecraft:attachable"].description.geometry = this["minecraft:attachable"].description.geometry ?? {};
        geometry.forEach(geometry => {
            this["minecraft:attachable"].description.geometry![geometry.name] = geometry.reference;
        });
    }

    addRenderController(...render_controllers: MolangOption[]) {
        this["minecraft:attachable"].description.render_controllers = this["minecraft:attachable"].description.render_controllers ?? [];
        this["minecraft:attachable"].description.render_controllers?.push(...render_controllers);
    }
}