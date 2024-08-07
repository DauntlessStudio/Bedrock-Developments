import { Directories } from "../../file_manager.js";
import { NameData, currentFormatVersion } from "../../utils.js";
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
                        default: `textures/${Directories.ADDON_PATH}attachables/${nameData.shortname}`,
                        enchanted: "textures/misc/enchanted_item_glint",
                    },
                    geometry: {
                        default: `geometry.${nameData.namespace}.player.${nameData.shortname}`,
                    },
                    scripts: {
                        pre_animation: [
                            "v.is_first_person = c.is_first_person;",
                        ]
                    },
                    render_controllers: [
                        "controller.render.item_default"
                    ]
                }
            }
        });
    }

    addInitializeVariable(...variables: string[]) {
        this["minecraft:attachable"].description.scripts = this["minecraft:attachable"].description.scripts ?? {};
        this["minecraft:attachable"].description.scripts.initialize = this["minecraft:attachable"].description.scripts.initialize ?? [];

        variables.forEach(variable => {
            if (!this["minecraft:attachable"].description.scripts!.initialize?.includes(variable)) {
                this["minecraft:attachable"].description.scripts!.initialize?.push(variable);
            }
        });
    }

    addPreAnimationVariable(...variables: string[]) {
        this["minecraft:attachable"].description.scripts = this["minecraft:attachable"].description.scripts ?? {};
        this["minecraft:attachable"].description.scripts.pre_animation = this["minecraft:attachable"].description.scripts.pre_animation ?? [];

        variables.forEach(variable => {
            if (!this["minecraft:attachable"].description.scripts!.initialize?.includes(variable)) {
                this["minecraft:attachable"].description.scripts!.initialize?.push(variable);
            }
        });
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
        
        render_controllers.forEach(render_controller => {
            if (!this["minecraft:attachable"].description.render_controllers?.includes(render_controller)) {
                this["minecraft:attachable"].description.render_controllers?.push(render_controller);
            }
        });
    }

    addAnimation(...animations: {name: string, reference: string}[]) {
        this["minecraft:attachable"].description.animations = this["minecraft:attachable"].description.animations ?? {};
        animations.forEach(animation => {
            this["minecraft:attachable"].description.animations![animation.name] = animation.reference;
        });
    }

    addAnimateScript(...animations: ({[key: string]: string}|string)[]) {
        this["minecraft:attachable"].description.scripts = this["minecraft:attachable"].description.scripts ?? {};
        this["minecraft:attachable"].description.scripts!.animate = this["minecraft:attachable"].description.scripts!.animate ?? [];
        animations.forEach(animation => {
            if (!this["minecraft:attachable"].description.scripts!.animate?.includes(animation)) {
                this["minecraft:attachable"].description.scripts!.animate?.push(animation);
            }
        });
    }
}

abstract class ClientAttachableArmor extends ClientAttachable {
    protected static readonly armorType: string = "";

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'attachables/player/';
    }

    public static createFromTemplate(nameData: NameData): ClientAttachable {
        return new ClientAttachable(this.createFilePath(nameData), {
            format_version: currentFormatVersion,
            "minecraft:attachable": {
                description: {
                    identifier: nameData.fullname as Identifier,
                    materials: {
                        default: "armor",
                        enchanted: "armor_enchanted",
                    },
                    textures: {
                        default: `textures/${Directories.ADDON_PATH}models/armor/${nameData.shortname.replace(`_${this.armorType}`, "")}`,
                        enchanted: "textures/misc/enchanted_item_glint",
                    },
                    geometry: {
                        default: `geometry.${nameData.namespace}.player.${nameData.shortname.replace(`_${this.armorType}`, "")}.armor.${this.armorType}`,
                    },
                    scripts: {
                        initialize: [
                            "variable.is_first_person = 0.0;"
                        ],
                        pre_animation: [
                            "v.is_first_person = c.owning_entity->v.is_first_person;",
                            "v.is_paperdoll = c.owning_entity->v.is_paperdoll;"
                        ],
                        parent_setup: `variable.${this.armorType}_layer_visible = 0.0;`,
                    },
                    render_controllers: [
                        "controller.render.armor"
                    ]
                }
            }
        });
    }

    public addOwnerFilter(shortname: string, owner: Identifier) {
        const originalIdentifier = this["minecraft:attachable"].description.identifier;
        this["minecraft:attachable"].description.identifier += `.${shortname}`;
        this["minecraft:attachable"].description.item = {
            [originalIdentifier]: `query.owner_identifier == '${owner}'`,
        }
    }
}

export class ClientAttachableArmorHelmet extends ClientAttachableArmor {
    protected static readonly armorType: string = "helmet";
}

export class ClientAttachableArmorChestplate extends ClientAttachableArmor {
    protected static readonly armorType: string = "chestplate";
}

export class ClientAttachableArmorLeggings extends ClientAttachableArmor {
    protected static readonly armorType: string = "leggings";
}

export class ClientAttachableArmorBoots extends ClientAttachableArmor {
    protected static readonly armorType: string = "boots";
}