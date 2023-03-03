import * as Global from './globals';
import { copyFile, readJSONFromFile, writeFileFromJSON, writeToLang } from './file_manager';
import { getNamesObjects, getNameObject, nameObject } from './utils';
import { requestGet, requestURL, requestVanilla } from './github';
import * as Chalk from 'chalk';
import * as JSONC from 'comment-json';
import mergeDeep from './merge_deep';
import { createNewAnimation, createNewController } from './animations';

const chalk = new Chalk.Instance();

/**
 * @remarks creates new entities
 * @param names an array of names of entities to create
 * @param lang the lang file to edit
 * @param type the type of entity to create
 * @param client should a client entity be created
 */
export async function createNewEntity(names: string[], lang: boolean, geo: boolean, texture: boolean, type: string|undefined, client: boolean) {
    let names_list = getNamesObjects(names);
    let json_entity;
    switch (type) {
        case 'h':
            json_entity = await (await readJSONFromFile(`${Global.app_root}/src/entities/template_hostile.json`)).shift()
            break;
        case 'p':
            json_entity = await (await readJSONFromFile(`${Global.app_root}/src/entities/template_passive.json`)).shift()
            break;
        default:
            json_entity = await (await readJSONFromFile(`${Global.app_root}/src/entities/template_dummy.json`)).shift()
            break;
    }
    let json_client_entity = await (await readJSONFromFile(`${Global.app_root}/src/entities/template.entity.json`)).shift();
    let json_geometry = await (await readJSONFromFile(`${Global.app_root}/src/geos/cube.geo.json`)).shift();

    for (const name of names_list) {
        let entity = json_entity;
        entity!.json['minecraft:entity']['description']['identifier'] = name.fullname;
        entity!.json['minecraft:entity']['components']['minecraft:type_family']['family'] = [name.namespace, name.shortname];
        writeFileFromJSON(`${Global.project_bp}entities/${name.pathname}${name.shortname}.json`, entity?.json);

        if (client) {
            let client_entity = json_client_entity;
            client_entity!.json['minecraft:client_entity']['description']['identifier'] = name.fullname;
            client_entity!.json['minecraft:client_entity']['description']['textures']['default'] = `textures/entity/${name.shortname}/default`;
            client_entity!.json['minecraft:client_entity']['description']['geometry']['default'] = `geometry.${name.shortname}`;
            writeFileFromJSON(`${Global.project_rp}entity/${name.pathname}${name.shortname}.entity.json`, client_entity?.json);

            if (geo) {
                let geometry = json_geometry;
                geometry!.json['minecraft:geometry'][0]['description']['identifier'] = `geometry.${name.shortname}`;
                writeFileFromJSON(`${Global.project_rp}models/entity/${name.pathname}${name.shortname}.geo.json`, geometry?.json);
            }

            if (texture) {
                copyFile(`${Global.app_root}/src/geos/texture.png`, `${Global.project_rp}textures/entity/${name.shortname}/default.png`);
            }
        }

        if (lang) {
            writeToLang(`entity.${name.fullname}.name=${name.displayname}`, "entity names");
            if (type != 'd') {
                writeToLang(`item.spawn_egg.${name.fullname}.name=${name.displayname}`, "spawn eggs");
            }
        }
    }

}

export async function createVanillaEntity(names: string[], client: boolean) {
    try {
        for (const name of names) {
            let files = await requestVanilla(name, 'behavior_pack/entities');
            for (const file of files) {
                let data = await requestURL(`https://raw.githubusercontent.com/Mojang/bedrock-samples/main/${file.path}`);
                writeFileFromJSON(file.path.replace('behavior_pack/', Global.project_bp), JSONC.parse(data.data));
            }

            if (client) {
                let files = await requestVanilla(name, 'resource_pack/entity');
                for (const file of files) {
                    if (file.name.includes('v1.0')) {
                        continue;
                    }
                    let data = await requestURL(`https://raw.githubusercontent.com/Mojang/bedrock-samples/main/${file.path}`);
                    writeFileFromJSON(file.path.replace('resource_pack/', Global.project_rp), JSONC.parse(data.data));
                }
            }
        }
    } catch (error) {
        
    }
}

export async function entityAddAnim(names: string[], family: string|undefined, file: string, script: boolean, create: string|undefined) {
    if (create && create === 'ctrl') {
        await createNewController(names, ['say anim_name'], undefined, undefined, undefined, "true");
    }
    if (create && create === 'anim') {
        await createNewAnimation(names, false, ['say anim_name'], 1.0);
    }
    let names_list = getNamesObjects(names);
    let anims = await getAnimationReferences(names_list);

    try {
	    let entities = await readJSONFromFile(`${Global.project_bp}entities/${file}`);
        for (const entity of entities) {
            let set_anim = false;
            if (family && !isEntityFamilyType(entity.json, family)) {
                console.log(`${chalk.red(`No entities family type included ${family}`)}`);
                continue;
            }
            for (const name of names_list) {
                if (anims.has(name.fullname!)) {
                    set_anim = true;
                    let shortname = anims.get(name.fullname!)?.includes('controller') ? `ctrl.${name.shortname}` : name.shortname;
                    entity.json['minecraft:entity']['description']['animations'] ||= {};
                    entity.json['minecraft:entity']['description']['animations'][shortname!] = anims.get(name.fullname!);
                    if (script) {
                        entity.json['minecraft:entity']['description']['scripts'] ||= {animate: []};
                        if (!entity.json['minecraft:entity']['description']['scripts']['animate'].includes(shortname)) {
	                        entity.json['minecraft:entity']['description']['scripts']['animate'].push(shortname);
                        }
                    }
                } else {
                    console.log(`${chalk.red(`No animation matched ${name.fullname!}`)}`)
                }
            }
            if (set_anim) {
                writeFileFromJSON(entity.file, entity.json, true);
            }
        }
    } catch (error) {
        console.log(`${chalk.red(`No entities matched ${file}`)}`);
    }
}

export async function entityAddGroup(group: string, family: string|undefined, file: string) {
    let group_json: any = {};
    // parse json input
    try {
        group_json = JSONC.parse(group.replace(/(['"])?([a-z0-9A-Z_:]+)(['"])?:/g, '"$2":'));
    } catch (error) {
        console.log(`${chalk.red(`Invalid JSON: ${group}`)}`);
        return;
    }

    try {
        // get entities
	    let entities = await readJSONFromFile(`${Global.project_bp}entities/${file}`);
        for (const entity of entities) {
            // check family type
            if (family && !isEntityFamilyType(entity.json, family)) {
                console.log(`${chalk.red(`No entities family type included ${family}`)}`);
                continue;
            }


            for (const key of Object.keys(group_json)) {
                // add group
                entity.json!['minecraft:entity']['component_groups'] ||= {};
                entity.json!['minecraft:entity']['component_groups'][key] = group_json[key];
                
                // add events
                entity.json!['minecraft:entity']['events'] ||= {};
                entity.json!['minecraft:entity']['events'][`add_${key}`] = {add: {component_groups: [key]}};
                entity.json!['minecraft:entity']['events'][`remove_${key}`] = {remove: {component_groups: [key]}};
            }

            // write file
            writeFileFromJSON(entity.file, entity.json, true);
        }
    } catch (error) {
        console.log(String(error));
        console.log(`${chalk.red(`No entities matched ${file}`)}`);
    }
}

export async function entityAddComponent(component: string, family: string|undefined, file: string, overwrite: boolean) {
    let component_json: any = {};
    // parse json input
    try {
        component_json = JSONC.parse(component.replace(/(['"])?([a-z0-9A-Z_:]+)(['"])?:/g, '"$2":'));
    } catch (error) {
        console.log(`${chalk.red(`Invalid JSON: ${component}`)}`);
        return;
    }

    try {
        // get entities
	    let entities = await readJSONFromFile(`${Global.project_bp}entities/${file}`);
        for (const entity of entities) {
            // check family type
            if (family && !isEntityFamilyType(entity.json, family)) {
                console.log(`${chalk.red(`No entities family type included ${family}`)}`);
                continue;
            }


            for (const key of Object.keys(component_json)) {
                // add component
                entity.json!['minecraft:entity']['components'] ||= {};
                if (entity.json!['minecraft:entity']['components'][key] && !overwrite) {
                    entity.json!['minecraft:entity']['components'][key] = mergeDeep(entity.json!['minecraft:entity']['components'][key], component_json[key]);
                }else {
                    entity.json!['minecraft:entity']['components'][key] = component_json[key];
                }
            }

            // write file
            writeFileFromJSON(entity.file, entity.json, true);
        }
    } catch (error) {
        console.log(String(error));
        console.log(`${chalk.red(`No entities matched ${file}`)}`);
    }
}

export async function entityAddDamageSensor(sensor: string, family: string|undefined, file: string, start: boolean) {
    let sensor_json: any = {};
    // parse json input
    try {
        sensor_json = JSONC.parse(sensor.replace(/(['"])?([a-z0-9A-Z_:]+)(['"])?:/g, '"$2":'));
    } catch (error) {
        console.log(`${chalk.red(`Invalid JSON: ${sensor}`)}`);
        return;
    }

    try {
        // get entities
	    let entities = await readJSONFromFile(`${Global.project_bp}entities/${file}`);
        for (const entity of entities) {
            // check family type
            if (family && !isEntityFamilyType(entity.json, family)) {
                console.log(`${chalk.red(`No entities family type included ${family}`)}`);
                continue;
            }
            
            // add component
            entity.json!['minecraft:entity']['components'] ||= {};
            entity.json!['minecraft:entity']['components']['minecraft:damage_sensor'] ||= {};
            entity.json!['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'] ||= [];
            if (!Array.isArray(entity.json!['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'])) {
                let old_object = entity.json!['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'];
                entity.json!['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'] = [old_object];
            }
            if (!start) {
                entity.json!['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'].push(sensor_json);
            } else {
                entity.json!['minecraft:entity']['components']['minecraft:damage_sensor']['triggers'].unshift(sensor_json);
            }

            // write file
            writeFileFromJSON(entity.file, entity.json, true);
        }
    } catch (error) {
        console.log(String(error));
        console.log(`${chalk.red(`No entities matched ${file}`)}`);
    }
}

export async function entityAddProperty(names: string[], family: string|undefined, file: string, property: string, values: string[]|undefined, default_value: string|undefined, client: boolean, event: boolean) {
    let names_list = getNamesObjects(names);

    // creates property object based on type
    let object: any = {};
    switch (property) {
        case 'enum':
            object = {type: 'enum', values: values ? values : ['value'], client_sync: client, default: default_value ? default_value : 'value'};
            break;
        case 'float':
            object = {type: 'float', range: values ? values.map(Number) : [0.0, 1.0], client_sync: client, default: default_value ? Number(default_value) : 1.0};
            values = [];
            for (let index = object.range[0]; index <= object.range[1]; index++) {
                values.push(index);
            }
            break;
        case 'int':
            object = {type: 'int', range: values ? values.map(Number) : [0, 1], client_sync: client, default: default_value ? Number(default_value) : 1};
            values = [];
            for (let index = object.range[0]; index <= object.range[1]; index++) {
                values.push(index);
            }
            break;
        default:
            object = {type: 'bool', client_sync: client, default: default_value ? (default_value === 'true' || default_value === 'false' ? default_value === 'true' : default_value) : false};
            break;
    }

    try {
        // get entities
	    let entities = await readJSONFromFile(`${Global.project_bp}entities/${file}`);
        for (const entity of entities) {
            // check family type
            if (family && !isEntityFamilyType(entity.json, family)) {
                console.log(`${chalk.red(`No entities family type included ${family}`)}`);
                continue;
            }

            // initialize fields
            entity.json!['minecraft:entity']['description']['properties'] ||= {};

            // add properties
            for (const name of names_list) {
                // assign property
                entity.json!['minecraft:entity']['description']['properties'][name.fullname!] = object;
                if (event && values) {
                    for (const value of values) {
                        addPropertyEvent(name, value, undefined, entity, property);
                    }
                }
            }

            // write file
            writeFileFromJSON(entity.file, entity.json, true);
        }
    } catch (error) {
        console.log(String(error));
        console.log(`${chalk.red(`No entities matched ${file}`)}`);
    }
}

export async function entityAddPropertyEvent(values: string[], family: string|undefined, file: string, property: string, event: string|undefined) {
    let name = getNameObject(property);

    try {
        // get entities
	    let entities = await readJSONFromFile(`${Global.project_bp}entities/${file}`);
        for (const entity of entities) {
            // check family type
            if (family && !isEntityFamilyType(entity.json, family)) {
                console.log(`${chalk.red(`No entities family type included ${family}`)}`);
                continue;
            }

            let set_event = false;

            // add properties
            for (const value of values) {
                // initialize fields
                let property_type = 'bool';
                try {
                    property_type = entity.json!['minecraft:entity']['description']['properties'][name.fullname!]['type'];
                } catch (error) {
                    console.log(`${chalk.red(`${name.fullname} not found on ${entity.file}`)}`);
                    continue;
                }

                set_event = true;
                addPropertyEvent(name, value, event, entity, property_type);
            }

            // write file
            if (set_event) {
                writeFileFromJSON(entity.file, entity.json, true);
            }else {
                console.log(`${chalk.red(`Failed to write to ${entity.file}`)}`);
            }
        }
    } catch (error) {
        console.log(String(error));
        console.log(`${chalk.red(`No entities matched ${file}`)}`);
    }
}

function addPropertyEvent(name: nameObject, value: string, event: string | undefined, entity: { json: any; file: string; }, property_type: string) {
    let event_name = `set_${name.shortname}_to_${value}`;
    if (event)
    {
        event_name = event;
    }

    entity.json!['minecraft:entity']['events'] ||= {};
    entity.json!['minecraft:entity']['events'][event_name] = { set_property: {} };

    // assign property
    switch (property_type)
    {
        case 'enum':
            entity.json!['minecraft:entity']['events'][event_name]['set_property'][name.fullname!] = value;
            break;
        case 'int':
            let int = !isNaN(parseInt(value)) ? parseInt(value) : value;
            entity.json!['minecraft:entity']['events'][event_name]['set_property'][name.fullname!] = int;
            break;
        case 'float':
            let float = !isNaN(parseFloat(value)) ? parseFloat(value) : value;
            entity.json!['minecraft:entity']['events'][event_name]['set_property'][name.fullname!] = float;
            break;
        default:
            let bool = Boolean(value) ? value === 'true' : value;
            entity.json!['minecraft:entity']['events'][event_name]['set_property'][name.fullname!] = bool;
            break;
    }
}

async function getAnimationReferences(names_list: { fullname: string | undefined; namespace: string | undefined; shortname: string | undefined; displayname: string | undefined; pathname: string; }[]) {
    let anims = new Map<string, string>();
    for (const name of names_list)
    {
      let found_key = false;
      let controllers: { json: any; file: string }[] = [];
      try {
        controllers = await readJSONFromFile(
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
        animations = await readJSONFromFile(
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

export function isEntityFamilyType(entity: any, family: string) {
    try {
        if (entity['minecraft:entity']['components']['minecraft:type_family']['family'].includes(family)) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}