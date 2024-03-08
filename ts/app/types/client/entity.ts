import { Directories } from "../../new_file_manager";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion, Identifier, MolangOption } from "../shared_types";

export interface IClientEntity {
    format_version: FormatVersion;
    ['minecraft:client_entity']: {
        description: IClientEntityDescription;
    };
}

type TexturePath = `textures/${string}`;
type GeometryReference = `geometry.${string}`;

export interface IClientEntityDescription {
    identifier: Identifier;
    min_engine_version?: FormatVersion;
    materials?: Record<string, string>;
    textures?: Record<string, TexturePath>;
    geometry?: Record<string, GeometryReference>;
    scripts?: IClientEntityScripts;
    animations?: Record<string, string>;
    animation_controllers?: Record<string, string>[];
    render_controllers?: MolangOption[];
    spawn_egg: IClientEntitySpawnEgg;
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

    upgradeFormatVersion() {
        if (this.format_version !== '1.8.0') return;

        this.format_version = '1.12.0';

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

    addInitializeVariable(...variable: string[]) {
        this["minecraft:client_entity"].description.scripts = this["minecraft:client_entity"].description.scripts ?? {};
        this["minecraft:client_entity"].description.scripts.initialize = this["minecraft:client_entity"].description.scripts.initialize ?? [];

        this["minecraft:client_entity"].description.scripts.initialize.push(...variable);
    }

    addPreAnimationVariable(...variable: string[]) {
        this["minecraft:client_entity"].description.scripts = this["minecraft:client_entity"].description.scripts ?? {};
        this["minecraft:client_entity"].description.scripts.pre_animation = this["minecraft:client_entity"].description.scripts.pre_animation ?? [];

        this["minecraft:client_entity"].description.scripts.pre_animation.push(...variable);
    }

    addMaterials(...materials: {name: string, reference: string}[]) {
        this["minecraft:client_entity"].description.materials = this["minecraft:client_entity"].description.materials ?? {};
        materials.forEach(material => {
            this["minecraft:client_entity"].description.materials![material.name] = material.reference;
        });
    }

    addGeometry(...geometry: {name: string, reference: GeometryReference}[]) {
        this["minecraft:client_entity"].description.geometry = this["minecraft:client_entity"].description.geometry ?? {};
        geometry.forEach(geometry => {
            this["minecraft:client_entity"].description.geometry![geometry.name] = geometry.reference;
        });
    }

    addRenderController(...render_controllers: MolangOption[]) {
        this["minecraft:client_entity"].description.render_controllers = this["minecraft:client_entity"].description.render_controllers ?? [];
        this["minecraft:client_entity"].description.render_controllers?.push(...render_controllers);
    }
}