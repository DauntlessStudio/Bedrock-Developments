export declare enum entityType {
    dummy = "dummy",
    hostile = "hostile",
    passive = "passive",
    projectile = "projectile"
}
interface fileOptions {
    file: string;
    family?: string[];
}
interface newEntityOptions {
    client?: boolean;
    geo?: boolean;
    texture?: boolean;
    type?: entityType;
}
interface entityGroupOptions {
    overwrite?: boolean;
    add_event?: boolean;
    remove_event?: boolean;
}
/**
 * @remarks creates a new entity
 * @param names the entity names
 * @param lang should a lang entry be added
 * @param geo should a geo be created
 * @param texture should a texture be created
 * @param type what type is the entity
 * @param client should the client entity file be created
 */
export declare function createNewEntity(names: string[], lang: boolean, entity_options?: newEntityOptions): Promise<void>;
/**
 * @remarks imports an entity from the vanilla samples repository
 * @param names the vanilla entities to import
 * @param client should the corresponding client entity file be imported
 */
export declare function createVanillaEntity(names: string[], client: boolean, server?: boolean): Promise<void>;
/**
 * @remarks adds an animation to an entity
 * @param names the animation names as entity.name
 * @param file_options the options for finding files
 * @param script should the animation be animated in scripts
 * @param create should the animation be created
 */
export declare function entityAddAnim(names: string[], file_options: fileOptions, script: boolean, create: string | undefined): Promise<void>;
/**
 * @remarks adds a component group to an entity
 * @param group the group to add as a string that will be parsed to json
 * @param file_options the options for finding files
 * @returns void
 */
export declare function entityAddGroup(group: string, file_options: fileOptions, group_options?: entityGroupOptions): Promise<void>;
/**
 * @remarks adds/modifies components on an an entity
 * @param component the component to add/modify as a string that will be parsed to json
 * @param file_options the options for finding files
 * @param overwrite should an existing component be overwrited
 * @returns void
 */
export declare function entityAddComponent(component: string, file_options: fileOptions, overwrite: boolean): Promise<void>;
/**
 * @remarks adds entries to the entity's damage sensor
 * @param sensor the sensor as a string that will be parsed to json
 * @param file_options the options for finding files
 * @param start should the new sensor be added to the beginning of the array
 * @returns void
 */
export declare function entityAddDamageSensor(sensor: string, file_options: fileOptions, start: boolean): Promise<void>;
/**
 * @remarks adds properties to the entity
 * @param names the property names
 * @param file_options the options for finding files
 * @param property the property type
 * @param values the values of the property
 * @param default_value the default value of the property
 * @param client should client_sync be true
 * @param event should events automatically be created
 */
export declare function entityAddProperty(names: string[], file_options: fileOptions, property: string, values: string[] | undefined, default_value: string | undefined, client: boolean, event: boolean): Promise<void>;
/**
 * @remarks adds set property event to the entity
 * @param values the values to assign the properties to
 * @param file_options the optoins for finding files
 * @param property the property to modify
 * @param event the name of the event to create
 */
export declare function entityAddPropertyEvent(values: string[], file_options: fileOptions, property: string, event: string | undefined): Promise<void>;
export declare function isEntityFamilyType(entity: any, family: string[]): boolean;
export {};
