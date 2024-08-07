import { Directories } from "../../file_manager.js";
import { NameData, currentFormatVersion } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";
import { FormatVersion, Identifier, MolangOption } from "../shared_types.js";

export interface IClientEntity {
    format_version: FormatVersion;
    ['minecraft:client_entity']: {
        description: IClientEntityDescription;
    };
}

export type ClientEntityTexturePath = `textures/${string}`;
export type ClientEntityGeometryReference = `geometry.${string}`;

export interface IClientEntityDescription {
    identifier: Identifier;
    min_engine_version?: FormatVersion;
    materials?: Record<string, string>;
    textures?: Record<string, ClientEntityTexturePath>;
    geometry?: Record<string, ClientEntityGeometryReference>;
    scripts?: IClientEntityScripts;
    animations?: Record<string, string>;
    animation_controllers?: Record<string, string>[];
    render_controllers?: MolangOption[];
    spawn_egg?: IClientEntitySpawnEgg;
    enable_attachables?: boolean;
    held_item_ignores_lightning?: boolean;
    hide_armor?: boolean;
    particle_effects?: Record<string, string>;
    particle_emitters?: Record<string, string>;
    sound_effects?: Record<string, string>;
}

export interface IClientEntityScripts {
    initialize?: string[];
    pre_animation?: string[];
    animate?: MolangOption[];
    parent_setup?: string;
    scale?: string|number;
    scalex?: string|number;
    scaley?: string|number;
    scalez?: string|number;
    should_update_bones_and_effects_offscreen?: string|boolean;
    should_update_effects_offscreen?: string|boolean;
    variables?: Record<string, string>;
}

export interface IClientEntitySpawnEgg {
    base_color?: string;
    overlay_color?: string;
    texture?: string;
    texture_index?: number;
}

export class ClientEntity extends MinecraftDataType implements IClientEntity {
    format_version: FormatVersion;
    ['minecraft:client_entity']: {
        description: IClientEntityDescription;
    };

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'entity/';
    }
    
    constructor(filepath: string, template: IClientEntity) {
        super(filepath, template);
        this.format_version = template.format_version;
        this["minecraft:client_entity"] = template["minecraft:client_entity"];
    }

    public static createFromTemplate(nameData: NameData): ClientEntity {
        return new ClientEntity(this.createFilePath(nameData), {
            format_version: currentFormatVersion,
            "minecraft:client_entity": {
              description: {
                identifier: nameData.fullname as Identifier,
                materials: {
                  default: "entity_alphatest",
                },
                geometry: {
                  default: `geometry.${nameData.namespace}.${nameData.shortname}`,
                },
                textures: {
                  default: `textures/${Directories.ADDON_PATH}entity/${nameData.directory}${nameData.shortname}/default`,
                },
                render_controllers: [
                  "controller.render.default",
                ],
                spawn_egg: {}
              }
            }
        });
    }
    
    public static createFilePath(nameData: NameData): string {
        return this.DirectoryPath + nameData.directory + nameData.shortname + ".entity.json";
    }

    upgradeFormatVersion() {
        if (this.format_version !== '1.8.0') return;

        this.format_version = currentFormatVersion;

        if (this["minecraft:client_entity"].description.animation_controllers) {
            this["minecraft:client_entity"].description.animations = this["minecraft:client_entity"].description.animations ?? {};
            this["minecraft:client_entity"].description.animation_controllers.forEach(controller => {
                Object.keys(controller).forEach(key => {
                    this["minecraft:client_entity"].description.animations![`ctrl.${key}`] = controller[key];
                })
            });

            delete this["minecraft:client_entity"].description.animation_controllers;
        }
    }

    addInitializeVariable(...variables: string[]) {
        this["minecraft:client_entity"].description.scripts = this["minecraft:client_entity"].description.scripts ?? {};
        this["minecraft:client_entity"].description.scripts.initialize = this["minecraft:client_entity"].description.scripts.initialize ?? [];

        variables.forEach(variable => {
            if (!this["minecraft:client_entity"].description.scripts!.initialize?.includes(variable)) {
                this["minecraft:client_entity"].description.scripts!.initialize?.push(variable);
            }
        });
    }

    addPreAnimationVariable(...variables: string[]) {
        this["minecraft:client_entity"].description.scripts = this["minecraft:client_entity"].description.scripts ?? {};
        this["minecraft:client_entity"].description.scripts.pre_animation = this["minecraft:client_entity"].description.scripts.pre_animation ?? [];

        variables.forEach(variable => {
            if (!this["minecraft:client_entity"].description.scripts!.pre_animation?.includes(variable)) {
                this["minecraft:client_entity"].description.scripts!.pre_animation?.push(variable);
            }
        });
    }

    addMaterials(...materials: {name: string, reference: string}[]) {
        this["minecraft:client_entity"].description.materials = this["minecraft:client_entity"].description.materials ?? {};
        materials.forEach(material => {
            this["minecraft:client_entity"].description.materials![material.name] = material.reference;
        });
    }

    addGeometry(...geometry: {name: string, reference: ClientEntityGeometryReference}[]) {
        this["minecraft:client_entity"].description.geometry = this["minecraft:client_entity"].description.geometry ?? {};
        geometry.forEach(geometry => {
            this["minecraft:client_entity"].description.geometry![geometry.name] = geometry.reference;
        });
    }

    addRenderController(...render_controllers: MolangOption[]) {
        this["minecraft:client_entity"].description.render_controllers = this["minecraft:client_entity"].description.render_controllers ?? [];
        
        render_controllers.forEach(render_controller => {
            if (!this["minecraft:client_entity"].description.render_controllers?.includes(render_controller)) {
                this["minecraft:client_entity"].description.render_controllers?.push(render_controller);
            }
        });
    }

    addAnimation(...animations: {name: string, reference: string}[]) {
        this.upgradeFormatVersion();
        this["minecraft:client_entity"].description.animations = this["minecraft:client_entity"].description.animations ?? {};
        animations.forEach(animation => {
            this["minecraft:client_entity"].description.animations![animation.name] = animation.reference;
        });
    }

    addAnimateScript(...animations: ({[key: string]: string}|string)[]) {
        this.upgradeFormatVersion();
        this["minecraft:client_entity"].description.scripts = this["minecraft:client_entity"].description.scripts ?? {};
        this["minecraft:client_entity"].description.scripts!.animate = this["minecraft:client_entity"].description.scripts!.animate ?? [];
        animations.forEach(animation => {
            if (!this["minecraft:client_entity"].description.scripts!.animate?.includes(animation)) {
                this["minecraft:client_entity"].description.scripts!.animate?.push(animation);
            }
        });
    }

    addPublicVariable(...variables: string[]) {
        this.upgradeFormatVersion();
        this["minecraft:client_entity"].description.scripts = this["minecraft:client_entity"].description.scripts ?? {};
        this["minecraft:client_entity"].description.scripts!.variables = this["minecraft:client_entity"].description.scripts!.variables ?? {};
        variables.forEach(variable => {
            this["minecraft:client_entity"].description.scripts!.variables![variable] = "public";
        });
    }
}