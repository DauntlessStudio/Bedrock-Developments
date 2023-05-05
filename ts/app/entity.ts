import * as Global from './globals';
import { copyFile, modifyAndWriteFile, modifyAndWriteGlob, readJSONFromGlob, writeFileFromJSON, writeToLang } from './file_manager';
import { getNamesObjects, getNameObject, nameObject, pushUnique, jsonJoin } from './utils';
import { requestURL, requestVanilla } from './github';
import * as JSONC from 'comment-json';
import mergeDeep from './merge_deep';
import { createNewAnimation, createNewClientAnimation, createNewController } from './animations';
import {writeToItemTextureFromObjects } from './item';
import path from 'path';

export enum entityType {
    dummy='dummy',
    hostile='hostile',
    passive='passive',
    projectile='projectile'
}

interface fileOptions {
    file: string,
    family?: string[],
}

interface newEntityOptions {
    client?: boolean,
    geo?: boolean,
    texture?: boolean,
    type?: entityType,
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
export async function createNewEntity(names: string[], lang: boolean, entity_options: newEntityOptions = {client: false, type: entityType.dummy}) {
    let names_list = getNamesObjects(names);
    const create_spawn_egg = entity_options.type === entityType.hostile || entity_options.type === entityType.passive

    for (const name of names_list) {
        let source_file = `${Global.app_root}/src/entities/template_${entity_options.type}.json`;

        await modifyAndWriteFile({source_path: source_file, target_path: `${Global.project_bp}entities/${name.pathname}${name.shortname}.json`}, (entity: any) => {
            entity['minecraft:entity']['description']['identifier'] = name.fullname;
            entity['minecraft:entity']['components']['minecraft:type_family']['family'] = [name.namespace, name.shortname];
        });

        if (entity_options.client) {
            await createClientEntity(name, entity_options, create_spawn_egg);
        }

        if (lang) {
            writeToLang(`entity.${name.fullname}.name=${name.displayname}`, "entity names");
            if (create_spawn_egg) {
                writeToLang(`item.spawn_egg.${name.fullname}.name=${name.displayname}`, "spawn eggs");
            }
        }
    }

}

/**
 * @remarks creates a new client entity
 * @param name the name of the client entity
 * @param options options related to the type of entity being created
 * @param create_spawn_egg should a spawn egg be created for the entity
 */
async function createClientEntity(name: nameObject, options: newEntityOptions, create_spawn_egg: boolean) {
    const prefix = options.type === entityType.projectile ? 'small_' : '';

    await modifyAndWriteFile({source_path: `${Global.app_root}/src/entities/template.entity.json`, target_path: `${Global.project_rp}entity/${name.pathname}${name.shortname}.entity.json`}, (client_entity: any) => {
        client_entity['minecraft:client_entity']['description']['identifier'] = name.fullname;
        client_entity['minecraft:client_entity']['description']['textures']['default'] = `textures/entity/${name.shortname}/default`;
        client_entity['minecraft:client_entity']['description']['geometry']['default'] = `geometry.${name.shortname}`;
    
        if (options.type === entityType.projectile)
        {
            client_entity['minecraft:client_entity']['description']['animations'] = { facing: `animation.${name.shortname}.facing` };
            client_entity['minecraft:client_entity']['description']['scripts'] = { animate: ['facing'] };
            createNewClientAnimation([`${name.shortname}.facing`], {
                loop: true,
                bones: {
                    body: {
                        rotation: ["-q.body_x_rotation", "-q.body_y_rotation", 0]
                    }
                }
            });
        }
    
        if (create_spawn_egg)
        {
            client_entity['minecraft:client_entity']['description']['spawn_egg'] = { texture: name.shortname };
            copyFile(`${Global.app_root}/src/items/item.png`, `${Global.project_rp}textures/items/spawn_egg/${name.pathname}${name.shortname}.png`);
            writeToItemTextureFromObjects([{ name: name.shortname, path: `textures/items/spawn_egg/${name.pathname}${name.shortname}` }]);
        }
    });

    if (options.geo) {
        await modifyAndWriteFile({source_path: `${Global.app_root}/src/geos/${prefix}cube.geo.json`, target_path: `${Global.project_rp}models/entity/${name.pathname}${name.shortname}.geo.json`}, (geometry: any) => {
            geometry['minecraft:geometry'][0]['description']['identifier'] = `geometry.${name.shortname}`;
        })
    }

    if (options.texture) {
        copyFile(`${Global.app_root}/src/geos/${prefix}texture.png`, `${Global.project_rp}textures/entity/${name.shortname}/default.png`);
    }
}

/**
 * @remarks imports an entity from the vanilla samples repository
 * @param names the vanilla entities to import
 * @param client should the corresponding client entity file be imported
 */
export async function createVanillaEntity(names: string[], client: boolean, server: boolean = true) {
    try {
        for (const name of names) {
            if (server) {
                const files = await requestVanilla(path.basename(name), `behavior_pack/entities`);
                for (const file of files) {
                    const data = await requestURL(`https://raw.githubusercontent.com/Mojang/bedrock-samples/main/${file.path}`);
                    writeFileFromJSON(file.path.replace('behavior_pack/', Global.project_bp), JSONC.parse(data.data), false, true);
                }

                if (!files.length) {
                    console.log(`${Global.chalk.red(`Couldn't Find Files Matching behavior_pack/${name}`)}`);
                }
            }

            if (client) {
                const files = await requestVanilla(path.basename(name), `resource_pack/entity`);
                for (const file of files) {
                    if (file.name.includes('v1.0')) {
                        continue;
                    }
                    const data = await requestURL(`https://raw.githubusercontent.com/Mojang/bedrock-samples/main/${file.path}`);
                    writeFileFromJSON(file.path.replace('resource_pack/', Global.project_rp), JSONC.parse(data.data), false, true);
                }

                if (!files.length) {
                    console.log(`${Global.chalk.red(`Couldn't Find Files Matching resource_pack/${name}`)}`);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @remarks adds an animation to an entity
 * @param names the animation names as entity.name
 * @param file_options the options for finding files
 * @param script should the animation be animated in scripts
 * @param create should the animation be created
 */
export async function entityAddAnim(names: string[], file_options: fileOptions, script: boolean, create: string|undefined) {
    if (create && create === 'ctrl') {
        await createNewController(names, ['say anim_name'], undefined, undefined, "true", undefined);
    }
    if (create && create === 'anim') {
        await createNewAnimation(names, false, ['say anim_name'], 1.0);
    }

    const names_list = getNamesObjects(names);
    const anims = await getAnimationReferences(names_list);
    
    const success = await modifyAndWriteGlob(`${Global.project_bp}entities/${file_options.file}`, (entity: any) => {
        if (file_options.family && !isEntityFamilyType(entity, file_options.family)) {
            console.log(`${Global.chalk.red(`${entity['minecraft:entity']['description']['identifier']} didn't include family type: ${file_options.family}`)}`);
            return false;
        }
        for (const name of names_list) {
            if (anims.has(name.fullname!)) {
                let shortname = anims.get(name.fullname!)?.includes('controller') ? `ctrl.${name.shortname}` : name.shortname;
                entity['minecraft:entity']['description']['animations'] ||= {}
                jsonJoin(entity['minecraft:entity']['description']['animations'], {[shortname]: anims.get(name.fullname!)});
                if (script) {
                    entity['minecraft:entity']['description']['scripts'] ||= {animate: []};
                    pushUnique(entity['minecraft:entity']['description']['scripts']['animate'], shortname);
                }
            } else {
                console.log(`${Global.chalk.red(`No animation matched ${name.fullname!}`)}`)
            }
        }
        return true;
    }, {overwrite: true});

    if (!success) {
        console.log(`${Global.chalk.red(`No entities matched ${file_options.file}`)}`);
    }
}

/**
 * @remarks adds a component group to an entity
 * @param group the group to add as a string that will be parsed to json
 * @param file_options the options for finding files
 * @returns void
 */
export async function entityAddGroup(group: string, file_options: fileOptions, overwrite: boolean) {
    let group_json: any = parseConsoleJSONString(group);
    if (!group_json) {
        return;
    }

    const success = await modifyAndWriteGlob(`${Global.project_bp}entities/${file_options.file}`, (entity: any) => {
        if (file_options.family && !isEntityFamilyType(entity, file_options.family)) {
            console.log(`${Global.chalk.red(`${entity['minecraft:entity']['description']['identifier']} didn't include family type: ${file_options.family}`)}`);
            return false;
        }

        for (const key of Object.keys(group_json)) {
            entity['minecraft:entity']['component_groups'] ||= {};
            entity['minecraft:entity']['events'] ||= {};
            let component_group = {...group_json[key]};

            // check if we should merge each component in the group with source from entity/components
            for (const child of Object.keys(group_json[key])) {
                const clean_child = child.replace('$', '');
                if (child.startsWith('$')) {
                    let child_component = entity['minecraft:entity']['components'][clean_child] ? mergeDeep(entity['minecraft:entity']['components'][clean_child], group_json[key][child]) : group_json[key][child];

                    delete component_group[child];
                    component_group[clean_child] = child_component;
                }
            }

            // check if the component group already exists and if we sould merge with it
            if (!overwrite && entity['minecraft:entity']['component_groups'][key]) {
                console.log(`Found ${key} to merge with`);
                component_group = mergeDeep(entity['minecraft:entity']['component_groups'][key], component_group);
            }

            jsonJoin(entity['minecraft:entity']['component_groups'], {[key]: component_group})
            jsonJoin(entity['minecraft:entity']['events'], {[`add_${key}`]: {add: {component_groups: [key]}}, [`remove_${key}`]: {remove: {component_groups: [key]}}});
        }
        return true;
    }, {overwrite: true});

    if (!success) {
        console.log(`${Global.chalk.red(`No entities matched ${file_options.file}`)}`);
    }
}

/**
 * @remarks adds/modifies components on an an entity
 * @param component the component to add/modify as a string that will be parsed to json
 * @param file_options the options for finding files
 * @param overwrite should an existing component be overwrited
 * @returns void
 */
export async function entityAddComponent(component: string, file_options: fileOptions, overwrite: boolean) {
    const component_json: any = parseConsoleJSONString(component);
    if (!component_json) {
        return;
    }

    const success = await modifyAndWriteGlob(`${Global.project_bp}entities/${file_options.file}`, (entity: any) => {
        if (file_options.family && !isEntityFamilyType(entity, file_options.family)) {
            console.log(`${Global.chalk.red(`${entity['minecraft:entity']['description']['identifier']} didn't include family type: ${file_options.family}`)}`);
            return false;
        }

        for (const key of Object.keys(component_json)) {
            entity['minecraft:entity']['components'] ||= {};
            if (entity['minecraft:entity']['components'][key] && !overwrite) {
                entity['minecraft:entity']['components'][key] = mergeDeep(entity['minecraft:entity']['components'][key], component_json[key]);
            }else {
                entity['minecraft:entity']['components'][key] = component_json[key];
            }
        }
        return true;
    }, {overwrite: true});

    if (!success) {
        console.log(`${Global.chalk.red(`No entities matched ${file_options.file}`)}`);
    }
}

/**
 * @remarks adds entries to the entity's damage sensor
 * @param sensor the sensor as a string that will be parsed to json
 * @param file_options the options for finding files
 * @param start should the new sensor be added to the beginning of the array
 * @returns void
 */
export async function entityAddDamageSensor(sensor: string, file_options: fileOptions, start: boolean) {
    const sensor_json: any = parseConsoleJSONString(sensor);
    if (!sensor_json) {
        return;
    }

    const success = await modifyAndWriteGlob(`${Global.project_bp}entities/${file_options.file}`, (entity: any) => {
        if (file_options.family && !isEntityFamilyType(entity, file_options.family)) {
            console.log(`${Global.chalk.red(`${entity['minecraft:entity']['description']['identifier']} didn't include family type: ${file_options.family}`)}`);
            return false;
        }
        
        // null protection
        entity['minecraft:entity']['components'] ||= {};
        entity['minecraft:entity']['components']['minecraft:damage_sensor'] ||= {};
        entity['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'] ||= [];

        // turn an object type trigger into an array type trigger
        if (!Array.isArray(entity['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'])) {
            let old_object = entity['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'];
            entity['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'] = [old_object];
        }

        if (!start) {
            entity['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'].push(sensor_json);
        } else {
            entity['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'].unshift(sensor_json);
        }

        return true;
    }, {overwrite: true});

    if (!success) {
        console.log(`${Global.chalk.red(`No entities matched ${file_options.file}`)}`);
    }
}

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
export async function entityAddProperty(names: string[], file_options: fileOptions, property: string, values: string[]|undefined, default_value: string|undefined, client: boolean, event: boolean) {
    const names_list = getNamesObjects(names);

    // creates property object based on type
    const property_object = createPropertyObject(property, values, client, default_value);
    const object = property_object.object;
    values = property_object.values;

    const success = await modifyAndWriteGlob(`${Global.project_bp}entities/${file_options.file}`, (entity: any) => {
        if (file_options.family && !isEntityFamilyType(entity, file_options.family)) {
            console.log(`${Global.chalk.red(`${entity['minecraft:entity']['description']['identifier']} didn't include family type: ${file_options.family}`)}`);
            return false;
        }

        // initialize fields
        entity['minecraft:entity']['description']['properties'] ||= {};

        // add properties
        for (const name of names_list) {
            // assign property
            entity['minecraft:entity']['description']['properties'][name.fullname!] = object;
            if (event && values) {
                for (const value of values) {
                    addPropertyEvent(name, value, undefined, entity, property);
                }
            }
        }
        return true;
    }, {overwrite: true});

    if (!success) {
        console.log(`${Global.chalk.red(`No entities matched ${file_options.file}`)}`);
    }
}

/**
 * @remarks adds set property event to the entity
 * @param values the values to assign the properties to
 * @param file_options the optoins for finding files
 * @param property the property to modify
 * @param event the name of the event to create
 */
export async function entityAddPropertyEvent(values: string[], file_options: fileOptions, property: string, event: string|undefined) {
    const name = getNameObject(property);

    const success = await modifyAndWriteGlob(`${Global.project_bp}entities/${file_options.file}`, (entity: any) => {
        if (file_options.family && !isEntityFamilyType(entity, file_options.family)) {
            console.log(`${Global.chalk.red(`${entity['minecraft:entity']['description']['identifier']} didn't include family type: ${file_options.family}`)}`);
            return false;
        }

        let set_event = false;

        // add properties
        for (const value of values) {
            // initialize fields
            let property_type = 'bool';
            try {
                property_type = entity['minecraft:entity']['description']['properties'][name.fullname!]['type'];
            } catch (error) {
                console.log(`${Global.chalk.red(`${name.fullname} not found on ${entity['minecraft:entity']['description']['identifier']}`)}`);
                continue;
            }

            set_event = true;
            addPropertyEvent(name, value, event, entity, property_type);
        }

        return set_event;
    }, {overwrite: true});

    if (!success) {
        console.log(`${Global.chalk.red(`No entities matched ${file_options.file}`)}`);
    }
}

function addPropertyEvent(name: nameObject, value: string, event: string | undefined, entity: any, property_type: string) {
    let event_name = `set_${name.shortname}_to_${value}`;
    if (event)
    {
        event_name = event;
    }

    entity['minecraft:entity']['events'] ||= {};
    entity['minecraft:entity']['events'][event_name] = { set_property: {} };

    // assign property
    switch (property_type)
    {
        case 'enum':
            entity['minecraft:entity']['events'][event_name]['set_property'][name.fullname!] = value;
            break;
        case 'int':
            let int = !isNaN(parseInt(value)) ? parseInt(value) : value;
            entity['minecraft:entity']['events'][event_name]['set_property'][name.fullname!] = int;
            break;
        case 'float':
            let float = !isNaN(parseFloat(value)) ? parseFloat(value) : value;
            entity['minecraft:entity']['events'][event_name]['set_property'][name.fullname!] = float;
            break;
        default:
            let bool = Boolean(value) ? value === 'true' : value;
            entity['minecraft:entity']['events'][event_name]['set_property'][name.fullname!] = bool;
            break;
    }
}

async function getAnimationReferences(names_list: nameObject[]) {
    let anims = new Map<string, string>();
    for (const name of names_list)
    {
      let found_key = false;
      let controllers: { json: any; file: string }[] = [];
      try {
        controllers = await readJSONFromGlob(
          `${Global.project_bp}animation_controllers/**/${name.namespace}.json`
        );
      } catch (error) {}
      if (controllers.length) {
        let controller = controllers.shift();
        for (const key in controller?.json["animation_controllers"]) {
          if (key.includes(name.fullname!)) {
            anims.set(name.fullname!, key);
            found_key = true;
            break;
          }
        }
      }
      let animations = [];
      try {
        animations = await readJSONFromGlob(
          `${Global.project_bp}animations/**/${name.namespace}.json`
        );
      } catch (error) {
        continue;
      }
      if (animations.length) {
        let animation = animations.shift();
        for (const key in animation?.json["animations"]) {
          if (key.includes(name.fullname!)) {
            anims.set(name.fullname!, key);
            found_key = true;
            break;
          }
        }
      }
    }

    return anims;
}

function parseConsoleJSONString(json: string) {
    let group_json;
    try {
        try {
            group_json = JSONC.parse(json)
        } catch {
            group_json = JSONC.parse(json.replace(/(['"])?([a-z0-9A-Z_:\$\.]+)(['"])?:/g, '"$2":'));
        }
    } catch (error) {
        console.log(`${Global.chalk.red(`Invalid JSON: ${json}`)}`);
    }
    return group_json;
}

function createPropertyObject(property: string, values: string[] | undefined, client: boolean, default_value: string | undefined) {
    let object: any = {};
    switch (property)
    {
        case 'enum':
            object = { type: 'enum', values: values ? values : ['value'], client_sync: client, default: default_value ? default_value : 'value' };
            break;
        case 'float':
            object = { type: 'float', range: values ? values.map(Number) : [0.0, 1.0], client_sync: client, default: default_value ? Number(default_value) : 1.0 };
            values = [];
            for (let index = object.range[0]; index <= object.range[1]; index++)
            {
                values.push(index);
            }
            break;
        case 'int':
            object = { type: 'int', range: values ? values.map(Number) : [0, 1], client_sync: client, default: default_value ? Number(default_value) : 1 };
            values = [];
            for (let index = object.range[0]; index <= object.range[1]; index++)
            {
                values.push(index);
            }
            break;
        default:
            object = { type: 'bool', client_sync: client, default: default_value ? (default_value === 'true' || default_value === 'false' ? default_value === 'true' : default_value) : false };
            break;
    }
    return { object, values };
}

export function isEntityFamilyType(entity: any, family: string[]) {
    try {
        if (family.every(family_type => entity['minecraft:entity']['components']['minecraft:type_family']['family'].includes(family_type))) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}