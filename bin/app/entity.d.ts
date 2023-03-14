export declare enum entityType {
    dummy = "dummy",
    hostile = "hostile",
    passive = "passive",
    projectile = "projectile"
}
/**
 * @remarks creates new entities
 * @param names an array of names of entities to create
 * @param lang the lang file to edit
 * @param type the type of entity to create
 * @param client should a client entity be created
 */
export declare function createNewEntity(names: string[], lang: boolean, geo: boolean, texture: boolean, type: entityType, client: boolean): Promise<void>;
export declare function createVanillaEntity(names: string[], client: boolean): Promise<void>;
export declare function entityAddAnim(names: string[], family: string | undefined, file: string, script: boolean, create: string | undefined): Promise<void>;
export declare function entityAddGroup(group: string, family: string | undefined, file: string): Promise<void>;
export declare function entityAddComponent(component: string, family: string | undefined, file: string, overwrite: boolean): Promise<void>;
export declare function entityAddDamageSensor(sensor: string, family: string | undefined, file: string, start: boolean): Promise<void>;
export declare function entityAddProperty(names: string[], family: string | undefined, file: string, property: string, values: string[] | undefined, default_value: string | undefined, client: boolean, event: boolean): Promise<void>;
export declare function entityAddPropertyEvent(values: string[], family: string | undefined, file: string, property: string, event: string | undefined): Promise<void>;
export declare function isEntityFamilyType(entity: any, family: string): boolean;
