import { Directories, getFiles } from "../../new_file_manager";
import { NameData, chalk } from "../../utils";
import { MinecraftDataType } from "../minecraft";
import { EffectNames, FormatVersion, Identifier, MolangTripleArray } from "../shared_types";
import { IServerAnimation, IServerAnimationAnim, ServerAnimation, ServerAnimationName } from "./animation";
import { IServerAC, IServerAnimationController, ServerACName, ServerAnimationController } from "./animation_controller";
import { IServerItemComponents } from "./item";

export type DamageType = string;
export type Range = number|[number, number];
export type ServerEntityTarget = 'block'|'damager'|'other'|'parent'|'player'|'self'|'target';

export interface IServerEntity {
    format_version: FormatVersion;
    ["minecraft:entity"]: {
        description: IServerEntityDescription;
        component_groups?: IServerEntityComponentGroups;
        components: IServerEntityComponents;
        events: IServerEntityEvents;
    }
}

export interface IServerEntityDescription {
    identifier: Identifier;
    runtime_identifier?: Identifier;
    is_spawnable: boolean;
    is_summonable: boolean;
    is_experimental: boolean;
    properties?: IServerEntityProperties,
    animations?: {
        [key: string]: ServerAnimationName|ServerACName;
    };
    scripts?: {
        animate?: (string|{[key: string]: string})[]
    }
}

export interface IServerEntityProperties {
    [key: Identifier]: {
        type: 'bool'|'enum'|'int'|'float';
        range?: [number, number];
        values?: string[];
        client_sync?: boolean;
        default?: boolean|string|number;
    }
}

export interface IServerEntityComponentGroups {
    [key: string]: IServerEntityComponents
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
            on_damage?: IServerEntityTrigger,
            deals_damage?: boolean;
            damage_modifier?: number;
            damage_multiplier?: number;
            cause?: DamageType;
            on_damage_sound_event?: string;
        }
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
    ["minecraft:interact"]?: {
        interactions: {
            interact_text?: string;
            on_interact?: IServerEntityTrigger;
            [key: string]: any;
        }
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
                }
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

export interface IServerEntityFilters { // TODO: Add filter categories
    test: string;
    subject?: ServerEntityTarget;
    operator?: string;
    domain?: string;
    value?: string|number|boolean;
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
        command: string|string[];
    };
    set_property?: {
        [key: Identifier]: string|number|boolean;
    };
    trigger?: IServerEntityTrigger|string;
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

export class ServerEntity extends MinecraftDataType implements IServerEntity {
    format_version: FormatVersion;
    ["minecraft:entity"]: {
        description: IServerEntityDescription;
        component_groups?: IServerEntityComponentGroups;
        components: IServerEntityComponents;
        events: IServerEntityEvents;
    }

    public static get DirectoryPath(): string {
        return Directories.BEHAVIOR_PATH + 'entities/';
    }
    
    public get Identifier() : Identifier {
        return this["minecraft:entity"].description.identifier;
    }
    
    public get NameData() : NameData {
        return new NameData(this.Identifier);
    }
    
    constructor(filepath: string, template: IServerEntity) {
        super(filepath, template);
        this.format_version = template.format_version;
        this["minecraft:entity"] = template["minecraft:entity"];
    }

    setComponents(components: IServerItemComponents, handleExisting: 'overwrite'|'merge'|'ignore'='overwrite') {
        Object.keys(components).forEach(key => {
            const component = this["minecraft:entity"].components[key];
            if (component) {
                switch (handleExisting) {
                    case 'ignore': 
                        console.warn(chalk.yellow(`${this.Identifier} already has component ${key}`));
                        return;
                    case 'merge':
                        //TODO: handle merge
                        break;
                    case 'overwrite':
                        console.log(chalk.green(`Overwriting existing component ${key} on ${this.Identifier}`));
                        this["minecraft:entity"].components[key] = components[key];
                        return;
                }
            }

            console.log(chalk.green(`Added component ${key} to ${this.Identifier}`));
            this["minecraft:entity"].components[key] = components[key];
        });
    }

    setComponentGroups(groups: IServerEntityComponentGroups, handleExisting: 'overwrite'|'merge'|'ignore'='overwrite', options?: IServerEntityComponentGroupOptions) {
        this["minecraft:entity"].component_groups = this["minecraft:entity"].component_groups ?? {};

        Object.keys(groups).forEach(key => {
            const group = this["minecraft:entity"].component_groups![key];
            if (group) {
                switch (handleExisting) {
                    case 'ignore': 
                        console.warn(chalk.yellow(`${this.Identifier} already has component group ${key}`));
                        return;
                    case 'merge':
                        //TODO: handle merge
                    case 'overwrite':
                        console.log(chalk.green(`Overwriting existing component group ${key} on ${this.Identifier}`));
                        this["minecraft:entity"].component_groups![key] = groups[key];
                        return;
                }
            } else {
                console.log(chalk.green(`Added component group ${key} to ${this.Identifier}`));
                this["minecraft:entity"].component_groups![key] = groups[key];
            }

            if (options?.addEvent) {
                this.setEvents({
                    [`add_${key}`]: {
                        add: {
                            component_groups: [key]
                        }
                    }
                });
            }

            if (options?.removeEvent) {
                this.setEvents({
                    [`remove_${key}`]: {
                        remove: {
                            component_groups: [key]
                        }
                    }
                });
            }
        });
    }

    setEvents(events: IServerEntityEvents, handleExisting: 'overwrite'|'merge'|'ignore'='overwrite') {
        Object.keys(events).forEach(key => {
            const entityEvents = this["minecraft:entity"].events[key];
            if (entityEvents) {
                switch (handleExisting) {
                    case 'ignore': 
                        console.warn(chalk.yellow(`${this.Identifier} already has event ${key}`));
                        return;
                    case 'merge':
                        //TODO: handle merge
                        break;
                    case 'overwrite':
                        console.log(chalk.green(`Overwriting existing event ${key} on ${this.Identifier}`));
                        this["minecraft:entity"].events[key] = events[key];
                        return;
                }
            }

            console.log(chalk.green(`Added event ${key} to ${this.Identifier}`));
            this["minecraft:entity"].events[key] = events[key];
        });
    }

    setProperties(properties: IServerEntityProperties, handleExisting: 'overwrite'|'merge'|'ignore'='overwrite', options?: IServerEntityPropertiesOptions) {
        this["minecraft:entity"].description.properties = this["minecraft:entity"].description.properties ?? {};

        Object.keys(properties).forEach(key => {
            const idKey = key as Identifier;
            const property = this["minecraft:entity"].description.properties![idKey];
            if (property) {
                switch (handleExisting) {
                    case 'ignore': 
                        console.warn(chalk.yellow(`${this.Identifier} already has property ${idKey}`));
                        return;
                    case 'merge':
                        //TODO: handle merge
                    case 'overwrite':
                        console.log(chalk.green(`Overwriting existing property ${idKey} on ${this.Identifier}`));
                        this["minecraft:entity"].description.properties![idKey] = properties[idKey];
                        return;
                }
            } else {
                console.log(chalk.green(`Added property ${idKey} to ${this.Identifier}`));
                this["minecraft:entity"].description.properties![idKey] = properties[idKey];
            }

            if (options?.createEvents) {
                const keyName = new NameData(idKey);

                switch (properties[idKey].type) {
                    case "bool":
                        this.setEvents({
                            [`set_${keyName.shortname}_to_false`]: {
                                set_property: {
                                    [idKey]: false
                                }
                            },
                            [`set_${keyName.shortname}_to_true`]: {
                                set_property: {
                                    [idKey]: true
                                }
                            },
                        })
                        break;
                    case "enum":
                        const enum_events: IServerEntityEvents = {};
                        properties[idKey].values?.forEach(value => {
                            enum_events[`set_${keyName.shortname}_to_${value}`] = {
                                set_property: {
                                    [idKey]: value
                                }
                            }
                        });
                        this.setEvents(enum_events);
                        break;
                    case "float":
                    case "int": 
                        let start = properties[idKey].range?.[0];
                        let end = properties[idKey].range?.[1];

                        if (start !== undefined && end !== undefined) {
                            const number_events: IServerEntityEvents = {};
                            for (let index = start; index <= end; index++) {
                                number_events[`set_${keyName.shortname}_to_${index}`] = {
                                    set_property: {
                                        [idKey]: index
                                    }
                                }
                            }
                        }
                        break;
                }
            }
        });
    }

    setAnimations(animations: {[key: string]: ServerAnimationName|ServerACName}, handleExisting: 'overwrite'|'merge'|'ignore'='overwrite', options?: IServerAnimationOptions) {
        this["minecraft:entity"].description.animations = this["minecraft:entity"].description.animations ?? {};

        Object.keys(animations).forEach(key => {
            const entityAnimations = this["minecraft:entity"].description.animations![key];
            if (entityAnimations) {
                switch (handleExisting) {
                    case 'ignore': 
                        console.warn(chalk.yellow(`${this.Identifier} already has animation reference ${key}`));
                        return;
                    case 'merge':
                        //TODO: handle merge
                        break;
                    case 'overwrite':
                        console.log(chalk.green(`Overwriting existing animation reference ${key} on ${this.Identifier}`));
                        this["minecraft:entity"].description.animations![key] = animations[key];
                        return;
                }
            }

            console.log(chalk.green(`Added animation reference ${key} to ${this.Identifier}`));
            this["minecraft:entity"].description.animations![key] = animations[key];

            if (options?.createScriptEntry) {
                this.setAnimateScripts(key);
            }

            if (options?.createFileEntry) {
                const name = animations[key];
                if (name.startsWith('animation.')) {
                    createAnimationFileEntry(name as ServerAnimationName, this.NameData, key);
                } else {
                    createAnimationControllerFileEntry(name as ServerACName, this.NameData, key);
                }
            }
        });
    }

    setAnimateScripts(...animations: (string|{[key: string]: string})[]) {
        this["minecraft:entity"].description.scripts = this["minecraft:entity"].description.scripts ?? {};
        this["minecraft:entity"].description.scripts.animate = this["minecraft:entity"].description.scripts.animate ?? [];

        animations.forEach(animation => {
            if (!this["minecraft:entity"].description.scripts!.animate!.includes(animation)) {
                this["minecraft:entity"].description.scripts!.animate!.push(animation);
            }
        });
    }
}

function createAnimationFileEntry(name: string, nameData: NameData, key: string) {
    const files = getFiles(Directories.BEHAVIOR_PATH + `animations/${nameData.shortname}.json`);
    const anim: IServerAnimationAnim = {
        animation_length: 1,
        timeline: {
            ["0.0"]: [`/say ${key}`]
        }
    };

    if (files.length) {
        files.forEach(file => {
            const animation = MinecraftDataType.fromFile(ServerAnimation, file);
            animation.animations[name as ServerAnimationName] = anim
        })
    } else {
        new ServerAnimation(Directories.BEHAVIOR_PATH + `animations/${nameData.shortname}.json`, {
            format_version: "1.20.50",
            animations: {
                [name as ServerAnimationName]: anim
            }
        })
    }
}

function createAnimationControllerFileEntry(name: ServerACName, nameData: NameData, key: string) {
    const files = getFiles(Directories.BEHAVIOR_PATH + `animation_controllers/${nameData.shortname}.json`);
    const controller: IServerAC = {
        initial_state: "default",
        states: {
            ["default"]: {
                on_entry: [
                    `/say ${key}`
                ]
            }
        }
    };

    if (files.length) {
        files.forEach(file => {
            const ac = MinecraftDataType.fromFile(ServerAnimationController, file);
            ac.addAnimationController(name, controller);
        })
    } else {
        new ServerAnimationController(Directories.BEHAVIOR_PATH + `animation_controllers/${nameData.shortname}.json`, {
            format_version: "1.20.50",
            animation_controllers: {
                [name]: controller
            }
        });
    }
}