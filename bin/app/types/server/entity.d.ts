import { NameData } from "../../utils";
import { MinecraftDataType } from "../minecraft";
import { EffectNames, FormatVersion, Identifier, MolangTripleArray } from "../shared_types";
import { ServerAnimationName } from "./animation";
import { ServerACName } from "./animation_controller";
import { IServerItemComponents } from "./item";
export type DamageType = string;
export type Range = number | [number, number];
export type ServerEntityTarget = 'block' | 'damager' | 'other' | 'parent' | 'player' | 'self' | 'target';
export interface IServerEntity {
    format_version: FormatVersion;
    ["minecraft:entity"]: {
        description: IServerEntityDescription;
        component_groups?: IServerEntityComponentGroups;
        components: IServerEntityComponents;
        events: IServerEntityEvents;
    };
}
export interface IServerEntityDescription {
    identifier: Identifier;
    runtime_identifier?: Identifier;
    is_spawnable: boolean;
    is_summonable: boolean;
    is_experimental: boolean;
    properties?: IServerEntityProperties;
    animations?: {
        [key: string]: ServerAnimationName | ServerACName;
    };
    scripts?: {
        animate?: (string | {
            [key: string]: string;
        })[];
    };
}
export interface IServerEntityProperties {
    [key: Identifier]: {
        type: 'bool' | 'enum' | 'int' | 'float';
        range?: [number, number];
        values?: string[];
        client_sync?: boolean;
        default?: boolean | string | number;
    };
}
export interface IServerEntityComponentGroups {
    [key: string]: IServerEntityComponents;
}
export interface IServerEntityComponents {
    ["minecraft:addrider"]?: {
        entity_type: string;
        spawn_event: string;
    };
    ["minecraft:area_attack"]?: {
        case: DamageType;
        damage_cooldown?: number;
        damage_per_tick?: number;
        damage_range?: number;
        entity_filter: IServerEntityFilters;
        play_attack_sound?: boolean;
    };
    ["minecraft:attack"]?: {
        damage: Range;
        effect_duration?: number;
        effect_name?: EffectNames;
    };
    ["minecraft:boss"]?: {
        hud_range?: number;
        name: string;
        should_darken_sky?: boolean;
    };
    ["minecraft:break_blocks"]?: {
        breakable_blocks: Identifier[];
    };
    ["minecraft:collision_box"]?: {
        height?: number;
        width?: number;
    };
    ["minecraft:custom_hit_test"]?: {
        hitboxes: {
            height: number;
            width: number;
            pivot: MolangTripleArray;
        }[];
    };
    ["minecraft:damage_sensor"]?: {
        triggers: {
            on_damage?: IServerEntityTrigger;
            deals_damage?: boolean;
            damage_modifier?: number;
            damage_multiplier?: number;
            cause?: DamageType;
            on_damage_sound_event?: string;
        } | {
            on_damage?: IServerEntityTrigger;
            deals_damage?: boolean;
            damage_modifier?: number;
            damage_multiplier?: number;
            cause?: DamageType;
            on_damage_sound_event?: string;
        }[];
    };
    ["minecraft:despawn"]?: {
        despawn_from_change?: boolean;
        despawn_from_distance?: {
            max_distance?: number;
            min_distance?: number;
        };
        despawn_from_inactivity?: boolean;
        despawn_from_simulation_edge?: boolean;
        filters?: IServerEntityFilters;
        min_range_inactivity_timer?: number;
        min_range_random_chance?: number;
        remove_child_entities?: boolean;
    };
    ["minecraft:environment_sensor"]?: {
        triggers: IServerEntityTrigger[];
    };
    ["minecraft:hurt_on_condition"]?: {
        damage_conditions: {
            filters: IServerEntityFilters;
            cause: DamageType;
            damage_per_tick: number;
        }[];
    };
    ["minecraft:instant_despawn"]?: {
        remove_child_entities?: boolean;
    };
    ["minecraft:interact"]?: {
        interactions: {
            interact_text?: string;
            on_interact?: IServerEntityTrigger;
            [key: string]: any;
        };
    };
    ["minecraft:loot"]?: {
        table: string;
    };
    ["minecraft:physics"]?: {
        has_collision?: boolean;
        has_gravity?: boolean;
        push_towards_closest_space?: boolean;
    };
    ["minecraft:projectile"]?: {
        on_hit?: {
            impact_damage?: {
                damage?: Range;
                knockback?: boolean;
                semi_random_diff_damage?: boolean;
                destroy_on_hit?: boolean;
            };
            stick_in_ground?: {
                shake_time?: number;
            };
            arrow_effect?: {
                apply_effect_to_blocking_targets?: boolean;
            };
            definition_event?: {
                event_trigger: {
                    event: string;
                    target: ServerEntityTarget;
                };
            };
        };
        hit_sound?: string;
        power: number;
        gravity: number;
        uncertainty_base: number;
        uncertainty_multiplier: number;
        anchor: number;
        should_bounce?: boolean;
        offset: MolangTripleArray;
        [key: string]: any;
    };
    ["minecraft:pushable"]?: {
        is_pushable?: boolean;
        is_pushable_by_piston?: boolean;
    };
    ["minecraft:type_family"]?: {
        family: string[];
    };
    [key: string]: any;
}
export interface IServerEntityFilters {
    test: string;
    subject?: ServerEntityTarget;
    operator?: string;
    domain?: string;
    value?: string | number | boolean;
}
export interface IServerEntityTrigger {
    filters?: IServerEntityFilters;
    event?: string;
    target?: ServerEntityTarget;
}
export interface IServerEntityEvents {
    [key: string]: IServerEntityEvent;
}
export interface IServerEntityEvent {
    add?: {
        component_groups: string[];
    };
    remove?: {
        component_groups: string[];
    };
    filters?: IServerEntityFilters;
    emit_vibration?: {
        vibration: string;
    };
    queue_command?: {
        command: string | string[];
    };
    set_property?: {
        [key: Identifier]: string | number | boolean;
    };
    trigger?: IServerEntityTrigger | string;
    randomize?: IServerEntityEvent[];
    sequence?: IServerEntityEvent[];
    wheight?: number;
}
export interface IServerEntityComponentGroupOptions {
    addEvent: boolean;
    removeEvent: boolean;
}
export interface IServerEntityPropertiesOptions {
    createEvents: boolean;
}
export interface IServerAnimationOptions {
    createScriptEntry: boolean;
    createFileEntry: boolean;
}
export declare class ServerEntity extends MinecraftDataType implements IServerEntity {
    format_version: FormatVersion;
    ["minecraft:entity"]: {
        description: IServerEntityDescription;
        component_groups?: IServerEntityComponentGroups;
        components: IServerEntityComponents;
        events: IServerEntityEvents;
    };
    static get DirectoryPath(): string;
    get Identifier(): Identifier;
    get NameData(): NameData;
    constructor(filepath: string, template: IServerEntity);
    static createFromTemplate(nameData: NameData): ServerEntity;
    setComponents(components: IServerItemComponents, handleExisting?: 'overwrite' | 'merge' | 'ignore'): void;
    setComponentGroups(groups: IServerEntityComponentGroups, handleExisting?: 'overwrite' | 'merge' | 'ignore', options?: IServerEntityComponentGroupOptions): void;
    setEvents(events: IServerEntityEvents, handleExisting?: 'overwrite' | 'merge' | 'ignore'): void;
    setProperties(properties: IServerEntityProperties, handleExisting?: 'overwrite' | 'merge' | 'ignore', options?: IServerEntityPropertiesOptions): void;
    setAnimations(animations: {
        [key: string]: ServerAnimationName | ServerACName;
    }, handleExisting?: 'overwrite' | 'merge' | 'ignore', options?: IServerAnimationOptions): void;
    setAnimateScripts(...animations: (string | {
        [key: string]: string;
    })[]): void;
    hasFamilyTypes(...family: string[]): boolean;
}
