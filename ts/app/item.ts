import * as fs from 'fs';
import * as Global from './globals';
import { readJSONFromFile, readSourceFile, writeFileFromJSON, writeToLang, copyFile } from './file_manager';
import { getNameObject, getNamesObjects, nameObject } from './utils';
import { requestURL } from './github';
import * as JSONC from 'comment-json';
import { createNewEntity, createVanillaEntity, entityAddAnim, entityAddGroup, entityType } from './entity';
import { createNewAnimation, createNewController } from './animations';

export enum itemType {
    basic='basic',
    attachable='attachable',
    weapon='weapon',
    projectile='projectile',
    food='food',
    armor_set='armor_set',
    helmet='helmet',
    chestplate='chestplate',
    leggings='leggings',
    boots='boots'
}

enum armorPiece {
    helmet='helmet',
    chestplate='chestplate',
    leggings='leggings',
    boots='boots'
}

var item_texture_file_cache: any;

export async function createNewItem(names: string[], lang: boolean, stack: number=64, type: itemType) {
    let names_list = getNamesObjects(names);
    let json_item_bp = await (await readJSONFromFile(`${Global.app_root}/src/items/template_bp.json`)).shift();
    let json_item_rp = await (await readJSONFromFile(`${Global.app_root}/src/items/template_rp.json`)).shift();
    for (const name of names_list) {
        let item_bp = json_item_bp;

        switch (type) {
            case itemType.armor_set:
                createArmorPiece(item_bp?.json, armorPiece.helmet, name, json_item_rp?.json);
                createArmorPiece(item_bp?.json, armorPiece.chestplate, name, json_item_rp?.json);
                createArmorPiece(item_bp?.json, armorPiece.leggings, name, json_item_rp?.json);
                createArmorPiece(item_bp?.json, armorPiece.boots, name, json_item_rp?.json);
                copyFile(`${Global.app_root}/src/attachables/armor/example_main.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_main.png`);
                copyFile(`${Global.app_root}/src/attachables/armor/example_legs.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_legs.png`);
                return;
            case itemType.helmet: {
                createArmorPiece(item_bp?.json, armorPiece.helmet, name, json_item_rp?.json);
                copyFile(`${Global.app_root}/src/attachables/armor/example_main.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_main.png`);
                return;
            }
            case itemType.chestplate: {
                createArmorPiece(item_bp?.json, armorPiece.chestplate, name, json_item_rp?.json);
                copyFile(`${Global.app_root}/src/attachables/armor/example_main.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_main.png`);
                return;
            }
            case itemType.leggings: {
                createArmorPiece(item_bp?.json, armorPiece.leggings, name, json_item_rp?.json);
                copyFile(`${Global.app_root}/src/attachables/armor/example_legs.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_legs.png`);
                return;
            }
            case itemType.boots: {
                createArmorPiece(item_bp?.json, armorPiece.boots, name, json_item_rp?.json);
                copyFile(`${Global.app_root}/src/attachables/armor/example_main.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_main.png`);
                return;
            }
        }

        item_bp!.json['minecraft:item']['description']['identifier'] = name.fullname;
        item_bp!.json['minecraft:item']['components']['minecraft:max_stack_size'] = Number(stack);

        if (type === itemType.projectile) {
            item_bp!.json['minecraft:item']['components']['minecraft:use_duration'] = 30000;
            item_bp!.json['minecraft:item']['components']['minecraft:food'] = {nutrition: 0, saturation_modifier: 'supernatural', can_always_eat: true};

            await createVanillaEntity(['player.json'], false);
            await createNewEntity([`projectile/${name.fullname}_projectile`], true, true, true, entityType.projectile, true);

            let query = `q.is_item_name_any('slot.weapon.mainhand', 0, '${name.namespace}:${name.shortname}') && (q.is_using_item || variable.attack_time > 0)`;
            await createNewController([`player.${name.shortname}`], [`event entity @s add_${name.shortname}_projectile`], undefined, undefined, query, `!(${query})`);
            await entityAddAnim([`player.${name.shortname}`], undefined, 'player.json', true, undefined);
            await entityAddGroup(`{"${name.shortname}_projectile":{"minecraft:spawn_entity":{"entities":{"spawn_entity":"${name.namespace}:${name.shortname}_projectile","max_wait_time":0,"min_wait_time":0,"num_to_spawn":1,"single_use":true}}}}`, undefined, 'player.json');
        }
        if (type === itemType.food) {
            item_bp!.json['minecraft:item']['components']['minecraft:use_duration'] = 20;
            item_bp!.json['minecraft:item']['components']['minecraft:food'] = {nutrition: 5, saturation_modifier: 'supernatural', can_always_eat: true};
        }

        writeFileFromJSON(`${Global.project_bp}items/${name.pathname}${name.shortname}.json`, item_bp?.json);
        
        let item_rp = json_item_rp;
        item_rp!.json['minecraft:item']['description']['identifier'] = name.fullname;
        item_rp!.json['minecraft:item']['components']['minecraft:icon'] = name.shortname;
        writeFileFromJSON(`${Global.project_rp}items/${name.pathname}${name.shortname}.json`, item_rp?.json);

        copyFile(`${Global.app_root}/src/items/item.png`, `${Global.project_rp}textures/items/${name.shortname}.png`);

        if (lang) {
            writeToLang(`item.${name.fullname}.name=${name.displayname}`, 'item names');
        }

        if (type === itemType.weapon || type === itemType.attachable) {
            createComplexAttachable(name.fullname!);
        }
    }
    
    writeToItemTextureFromNames(names_list);
}

export async function writeToItemTextureFromNames(names: nameObject[]) {
    item_texture_file_cache ||= await (await readJSONFromFile(`${Global.project_rp}textures/item_texture.json`, `${Global.app_root}/src/items/item_texture.json`)).shift();

    for (const name of names) {
        item_texture_file_cache!.json['texture_data'][name.shortname!] = {};
        item_texture_file_cache!.json['texture_data'][name.shortname!]['textures'] = `textures/items/${name.pathname}${name.shortname}`;
    }
    
    writeFileFromJSON(`${Global.project_rp}textures/item_texture.json`, item_texture_file_cache?.json, true);
}

export async function writeToItemTextureFromObjects(objects: {name: string, path: string}[]) {
    item_texture_file_cache ||= await (await readJSONFromFile(`${Global.project_rp}textures/item_texture.json`, `${Global.app_root}/src/items/item_texture.json`)).shift();

    for (const object of objects) {
        item_texture_file_cache!.json['texture_data'][object.name] = {};
        item_texture_file_cache!.json['texture_data'][object.name]['textures'] = object.path;
    }
    
    writeFileFromJSON(`${Global.project_rp}textures/item_texture.json`, item_texture_file_cache?.json, true);
}

async function createArmorPiece(armorItem: any, piece: armorPiece, name: nameObject, item_rp: any) {
    armorItem['format_version'] = '1.16.100';
    armorItem['minecraft:item']['description']['category'] = 'equipment';
    armorItem['minecraft:item']['components']['minecraft:max_stack_size'] = 1;
    armorItem['minecraft:item']['components']['minecraft:armor'] = {protection: 5};
    armorItem['minecraft:item']['components']['minecraft:repairable'] = {repair_items: [{items: ['minecraft:stick'], repair_amount: 'query.remaining_durability + 0.05 * query.max_durability'}]};
    armorItem['minecraft:item']['components']['minecraft:durability'] = {max_durability: 200};
    let item_texture: {name: string, path: string}[] = [];

    let attachable = JSONC.parse(readSourceFile(`${Global.app_root}/src/attachables/armor.json`)) as any;

    switch (piece) {
        case armorPiece.helmet:
            armorItem['minecraft:item']['description']['identifier'] = name.fullname + '_helmet';
            armorItem['minecraft:item']['components']['minecraft:creative_category'] = {parent: 'itemGroup.name.helmet'};
            armorItem['minecraft:item']['components']['minecraft:display_name'] = {value: `item.${name.fullname}_helmet.name`};
            armorItem['minecraft:item']['components']['minecraft:icon'] = {texture: name.shortname + '_helmet'};
            armorItem['minecraft:item']['components']['minecraft:wearable'] = {dispensable: true, slot: 'slot.armor.head'};
            armorItem['minecraft:item']['components']['minecraft:enchantable'] = {value: 10, slot: 'armor_head'};
            writeFileFromJSON(`${Global.project_bp}items/${name.pathname}${name.shortname}_helmet.json`, armorItem);

            attachable['minecraft:attachable']['description']['identifier'] = name.fullname + '_helmet'
            attachable['minecraft:attachable']['description']['textures']['default'] = `textures/models/armor/${name.shortname}_main`
            attachable['minecraft:attachable']['description']['geometry']['default'] = 'geometry.player.armor.helmet'
            attachable['minecraft:attachable']['description']['scripts']['parent_setup'] = 'variable.helmet_layer_visible = 0.0;'
            writeFileFromJSON(`${Global.project_rp}attachables/${name.pathname}${name.shortname}_helmet.json`, attachable);

            item_rp['minecraft:item']['description']['identifier'] = name.fullname + '_helmet';
            item_rp['minecraft:item']['components']['minecraft:icon'] = name.shortname + '_helmet';
            writeFileFromJSON(`${Global.project_rp}items/${name.pathname}${name.shortname}_helmet.json`, item_rp);

            item_texture.push({name: name.shortname + '_helmet', path: `textures/items/${name.pathname}${name.shortname}_helmet`});
            copyFile(`${Global.app_root}/src/items/armor/example_helmet.png`, `${Global.project_rp}textures/items/${name.shortname}_helmet.png`);

            writeToLang(`item.${name.fullname}_helmet.name=${name.displayname} Helmet`, 'item names');
            break;
        case armorPiece.chestplate:
            armorItem['minecraft:item']['description']['identifier'] = name.fullname + '_chestplate';
            armorItem['minecraft:item']['components']['minecraft:creative_category'] = {parent: 'itemGroup.name.chestplate'};
            armorItem['minecraft:item']['components']['minecraft:display_name'] = {value: `item.${name.fullname}_chestplate.name`};
            armorItem['minecraft:item']['components']['minecraft:icon'] = {texture: name.shortname + '_chestplate'};
            armorItem['minecraft:item']['components']['minecraft:wearable'] = {dispensable: true, slot: 'slot.armor.chest'};
            armorItem['minecraft:item']['components']['minecraft:enchantable'] = {value: 10, slot: 'armor_torso'};
            writeFileFromJSON(`${Global.project_bp}items/${name.pathname}${name.shortname}_chestplate.json`, armorItem);
    
            attachable['minecraft:attachable']['description']['identifier'] = name.fullname + '_chestplate'
            attachable['minecraft:attachable']['description']['textures']['default'] = `textures/models/armor/${name.shortname}_main`
            attachable['minecraft:attachable']['description']['geometry']['default'] = 'geometry.player.armor.chestplate'
            attachable['minecraft:attachable']['description']['scripts']['parent_setup'] = 'variable.chest_layer_visible = 0.0;'
            writeFileFromJSON(`${Global.project_rp}attachables/${name.pathname}${name.shortname}_chestplate.json`, attachable);

            item_rp['minecraft:item']['description']['identifier'] = name.fullname + '_chestplate';
            item_rp['minecraft:item']['components']['minecraft:icon'] = name.shortname + '_chestplate';
            writeFileFromJSON(`${Global.project_rp}items/${name.pathname}${name.shortname}_chestplate.json`, item_rp);

            item_texture.push({name: name.shortname + '_chestplate', path: `textures/items/${name.pathname}${name.shortname}_chestplate`});
            copyFile(`${Global.app_root}/src/items/armor/example_chestplate.png`, `${Global.project_rp}textures/items/${name.shortname}_chestplate.png`);
    
            writeToLang(`item.${name.fullname}_chestplate.name=${name.displayname} Chestplate`, 'item names');
            break;
        case armorPiece.leggings:
            armorItem['minecraft:item']['description']['identifier'] = name.fullname + '_leggings';
            armorItem['minecraft:item']['components']['minecraft:creative_category'] = {parent: 'itemGroup.name.leggings'};
            armorItem['minecraft:item']['components']['minecraft:display_name'] = {value: `item.${name.fullname}_leggings.name`};
            armorItem['minecraft:item']['components']['minecraft:icon'] = {texture: name.shortname + '_leggings'};
            armorItem['minecraft:item']['components']['minecraft:wearable'] = {dispensable: true, slot: 'slot.armor.legs'};
            armorItem['minecraft:item']['components']['minecraft:enchantable'] = {value: 10, slot: 'armor_legs'};
            writeFileFromJSON(`${Global.project_bp}items/${name.pathname}${name.shortname}_leggings.json`, armorItem);
    
            attachable['minecraft:attachable']['description']['identifier'] = name.fullname + '_leggings'
            attachable['minecraft:attachable']['description']['textures']['default'] = `textures/models/armor/${name.shortname}_legs`
            attachable['minecraft:attachable']['description']['geometry']['default'] = 'geometry.player.armor.leggings'
            attachable['minecraft:attachable']['description']['scripts']['parent_setup'] = 'variable.leg_layer_visible = 0.0;'
            writeFileFromJSON(`${Global.project_rp}attachables/${name.pathname}${name.shortname}_leggings.json`, attachable);

            item_rp['minecraft:item']['description']['identifier'] = name.fullname + '_leggings';
            item_rp['minecraft:item']['components']['minecraft:icon'] = name.shortname + '_leggings';
            writeFileFromJSON(`${Global.project_rp}items/${name.pathname}${name.shortname}_leggings.json`, item_rp);

            item_texture.push({name: name.shortname + '_leggings', path: `textures/items/${name.pathname}${name.shortname}_leggings`});
            copyFile(`${Global.app_root}/src/items/armor/example_leggings.png`, `${Global.project_rp}textures/items/${name.shortname}_leggings.png`);
    
            writeToLang(`item.${name.fullname}_leggings.name=${name.displayname} Leggings`, 'item names');
            break;
            case armorPiece.boots:
                armorItem['minecraft:item']['description']['identifier'] = name.fullname + '_boots';
                armorItem['minecraft:item']['components']['minecraft:creative_category'] = {parent: 'itemGroup.name.boots'};
                armorItem['minecraft:item']['components']['minecraft:display_name'] = {value: `item.${name.fullname}_boots.name`};
                armorItem['minecraft:item']['components']['minecraft:icon'] = {texture: name.shortname + '_boots'};
                armorItem['minecraft:item']['components']['minecraft:wearable'] = {dispensable: true, slot: 'slot.armor.feet'};
                armorItem['minecraft:item']['components']['minecraft:enchantable'] = {value: 10, slot: 'armor_feet'};
                writeFileFromJSON(`${Global.project_bp}items/${name.pathname}${name.shortname}_boots.json`, armorItem);
    
                attachable['minecraft:attachable']['description']['identifier'] = name.fullname + '_boots'
                attachable['minecraft:attachable']['description']['textures']['default'] = `textures/models/armor/${name.shortname}_main`
                attachable['minecraft:attachable']['description']['geometry']['default'] = 'geometry.player.armor.boots'
                attachable['minecraft:attachable']['description']['scripts']['parent_setup'] = 'variable.boot_layer_visible = 0.0;'
                writeFileFromJSON(`${Global.project_rp}attachables/${name.pathname}${name.shortname}_boots.json`, attachable);

                item_rp['minecraft:item']['description']['identifier'] = name.fullname + '_boots';
                item_rp['minecraft:item']['components']['minecraft:icon'] = name.shortname + '_boots';
                writeFileFromJSON(`${Global.project_rp}items/${name.pathname}${name.shortname}_boots.json`, item_rp);

                item_texture.push({name: name.shortname + '_boots', path: `textures/items/${name.pathname}${name.shortname}_boots`});
                copyFile(`${Global.app_root}/src/items/armor/example_boots.png`, `${Global.project_rp}textures/items/${name.shortname}_boots.png`);    
    
                writeToLang(`item.${name.fullname}_boots.name=${name.displayname} Boots`, 'item names');
                break;
        default:
            break;
    }
            
    writeFileFromJSON(`${Global.project_rp}textures/item_texture.json`, item_texture, true);
}

async function createComplexAttachable(name: string) {
    let name_obj = getNameObject(name);
    // get player entity
    let player_entity: any;
    if (!fs.existsSync(`${Global.project_rp}entity/player.entity.json`)) {
        let response = await requestURL(`https://raw.githubusercontent.com/Mojang/bedrock-samples/main/resource_pack/entity/player.entity.json`);
        player_entity = JSONC.parse(response.data);
        writeFileFromJSON(`${Global.project_rp}entity/player.entity.json`, player_entity);
    }else {
        player_entity ||= await (await readJSONFromFile(`${Global.project_rp}entity/player.entity.json`)).shift()?.json;
    }

    // if entity hasn't been initialized, setup attachable requirements
    if (!JSON.stringify(player_entity).includes('has_custom_item')) {
        attachablePlayerEntity();
        await attachablePlayerAnimations();
    }

    // attachable file
    let attachable = JSONC.parse(readSourceFile(`${Global.app_root}/src/attachables/attachable.json`).replace(/namespace/g, name_obj.namespace!).replace(/example_item/g, name_obj.shortname!));
    writeFileFromJSON(`${Global.project_rp}attachables/${name_obj.shortname}.json`, attachable);

    // player geo file
    let player_geo = JSONC.parse(readSourceFile(`${Global.app_root}/src/attachables/player.geo.json`).replace(/example_item/g, name_obj.shortname!));
    writeFileFromJSON(`${Global.project_rp}models/entity/player/${name_obj.shortname}.geo.json`, player_geo);

    // texture file
    copyFile(`${Global.app_root}/src/attachables/attachable.png`, `${Global.project_rp}textures/attachables/${name_obj.shortname}.png`);

    // modify player.entity.json
	player_entity['minecraft:client_entity']['description']['animations']['ctrl.' + name_obj.shortname!] = 'controller.animation.player.custom_items.' + name_obj.shortname!;
	player_entity['minecraft:client_entity']['description']['animations'][name_obj.shortname! + '.idle.first_person'] = 'animation.player.' + name_obj.shortname! + '.idle.first_person';
	player_entity['minecraft:client_entity']['description']['animations'][name_obj.shortname! + '.idle.third_person'] = 'animation.player.' + name_obj.shortname! + '.idle.third_person';
	player_entity['minecraft:client_entity']['description']['animations'][name_obj.shortname! + '.attack.first_person'] = 'animation.player.' + name_obj.shortname! + '.attack.first_person';
	player_entity['minecraft:client_entity']['description']['animations'][name_obj.shortname! + '.attack.third_person'] = 'animation.player.' + name_obj.shortname! + '.attack.third_person';

    // player.entity.json pre_animation
    let pre_anim = player_entity['minecraft:client_entity']['description']['scripts']['pre_animation'] as Array<string>;
    let index = pre_anim.findIndex(element => element.includes('has_custom_item'));
    pre_anim[index] =  pre_anim[index].replace(';', ` || v.${name_obj.shortname};`);
    pre_anim.splice(index, 0, `v.${name_obj.shortname} = (q.get_equipped_item_name == '${name_obj.shortname}');`);
    player_entity['minecraft:client_entity']['description']['scripts']['pre_animation'] = pre_anim;
    writeFileFromJSON(`${Global.project_rp}entity/player.entity.json`, player_entity, true);

    // modify player.ac.json
    let player_ac = await (await readJSONFromFile(`${Global.project_rp}animation_controllers/player.ac.json`)).shift();
    player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select'] ||= {states: {no_item: {}}};
    player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states']['no_item']['transitions'] ||= [JSONC.parse(`{ "no_item": "!v.has_custom_item" }`)];
    player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states']['no_item']['transitions'].push(JSONC.parse(`{ "${name_obj.shortname!}": "v.${name_obj.shortname!}" }`));
	let transitions = player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states']['no_item']['transitions'] as Array<Object>;
	player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states'][name_obj.shortname!] ||= {};
	player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states'][name_obj.shortname!]['animations'] ||= [];
	player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states'][name_obj.shortname!]['animations'].push('ctrl.' + name_obj.shortname);
    for (const key in player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states']) {
        player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states'][key]['transitions'] = transitions.filter(function missingKey(transition: any) {return transition[key] === undefined;});
        if (key !== 'no_item' && !player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states'][key]['transitions'].includes({no_item: '!v.has_custom_item'})) {
            player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states'][key]['transitions'].push({no_item: '!v.has_custom_item'});
        }
    }
    player_ac!.json['animation_controllers'][`controller.animation.player.custom_items.${name_obj.shortname!}`] = JSONC.parse(readSourceFile(`${Global.app_root}/src/attachables/controller_entry.json`).replace(/example_item/g, name_obj.shortname!));
    writeFileFromJSON(player_ac!.file, player_ac!.json, true);

    // modify player.anim.json
    let rp_anim = await (await readJSONFromFile(`${Global.project_rp}animations/player.anim.json`)).shift();
    rp_anim!.json['animations'][`animation.player.${name_obj.shortname!}.idle.first_person`] = JSON.parse('{ "loop": true, "bones": { "rightArm": { "rotation": [ -90, 0, 0 ] } } }');
    rp_anim!.json['animations'][`animation.player.${name_obj.shortname!}.idle.third_person`] = JSON.parse('{ "loop": true, "bones": { "rightArm": { "rotation": [ -30, 0, 0 ] } } }');
    rp_anim!.json['animations'][`animation.player.${name_obj.shortname!}.attack.first_person`] = JSON.parse('{ "loop": "hold_on_last_frame", "animation_length": 0.5, "bones": { "rightArm": { "rotation": { "0.0": [ -90, 0, 0 ], "0.1": [ -100, 20, 0 ], "0.2": [ -100, -20, 0 ], "0.3": [ -90, 0, 0 ] }, "position": { "0.0": [0, 0, 0], "0.2": [10, 0, 0], "0.3": [0, 0, 0] } } } }');
    rp_anim!.json['animations'][`animation.player.${name_obj.shortname!}.attack.third_person`] = JSON.parse('{ "loop": "hold_on_last_frame", "animation_length": 0.3, "bones" : { "rightArm": { "rotation": { "0.0": [ -90, 0, 0 ], "0.1": [ -100, 20, 0 ], "0.2": [ -100, -20, 0 ], "0.3": [ -90, 0, 0 ] } } } }');
    writeFileFromJSON(rp_anim!.file, rp_anim!.json, true);

    // modify item.anim.json
    rp_anim = await (await readJSONFromFile(`${Global.project_rp}animations/item.anim.json`, `${Global.app_root}/src/attachables/item.anim.json`)).shift();
    rp_anim!.json['animations'][`animation.item.${name_obj.shortname!}.idle.first_person`] = {};
    rp_anim!.json['animations'][`animation.item.${name_obj.shortname!}.idle.third_person`] = {};
    rp_anim!.json['animations'][`animation.item.${name_obj.shortname!}.attack.first_person`] = {};
    rp_anim!.json['animations'][`animation.item.${name_obj.shortname!}.attack.third_person`] = {};
    writeFileFromJSON(`${Global.project_rp}animations/item.anim.json`, rp_anim!.json, true);

    async function attachablePlayerAnimations() {
        let player_controller_source = await (await readJSONFromFile(`${Global.app_root}/src/attachables/player.ac.json`)).shift();
        let player_controller_target = await (await readJSONFromFile(`${Global.project_rp}animation_controllers/player.ac.json`, `${Global.app_root}/src/attachables/player.ac.json`)).shift();
        for (const key in Object.keys(player_controller_source!.json['animation_controllers'])) {
            player_controller_target!.json['animation_controllers'][key] = player_controller_source!.json['animation_controllers'][key]
        }
        writeFileFromJSON(`${Global.project_rp}animation_controllers/player.ac.json`, player_controller_target?.json, true);

        let player_anim_source = await (await readJSONFromFile(`${Global.app_root}/src/attachables/player.anim.json`)).shift();
        let player_anim_target = await (await readJSONFromFile(`${Global.project_rp}animations/player.anim.json`, `${Global.app_root}/src/attachables/player.anim.json`)).shift();
        for (const key in Object.keys(player_anim_source!.json['animations'])) {
            player_anim_target!.json['animations'][key] = player_anim_source!.json['animations'][key]
        }
        writeFileFromJSON(`${Global.project_rp}animations/player.anim.json`, player_anim_target?.json, true);

        copyFile(`${Global.app_root}/src/attachables/vanilla_fixes.anim.json`, `${Global.project_rp}animations/vanilla_fixes.anim.json`);
    }

    function attachablePlayerEntity() {
        player_entity['minecraft:client_entity']['description']['scripts'] ||= {};
        player_entity['minecraft:client_entity']['description']['scripts']['initialize'] ||= [];
        player_entity['minecraft:client_entity']['description']['scripts']['initialize'].push('variable.bob_animation = 0.0;');

        player_entity['minecraft:client_entity']['description']['scripts']['variables'] ||= {};
        player_entity['minecraft:client_entity']['description']['scripts']['variables']['variable.attack_time'] = 'public';

        player_entity['minecraft:client_entity']['description']['scripts']['pre_animation'] ||= {};
        player_entity['minecraft:client_entity']['description']['scripts']['pre_animation'].push('v.has_custom_item = 0;');
        player_entity['minecraft:client_entity']['description']['scripts']['pre_animation'].push('v.dampen_left_arm_swing  = 0;');
        player_entity['minecraft:client_entity']['description']['scripts']['pre_animation'].push('v.dampen_right_arm_swing = 0;');
        player_entity['minecraft:client_entity']['description']['scripts']['pre_animation'].push('v.disable_arm_swing = 0;');
        player_entity['minecraft:client_entity']['description']['scripts']['pre_animation'].push('v.disable_leg_swing = q.is_riding;');
        player_entity['minecraft:client_entity']['description']['scripts']['pre_animation'].push('v.aim_left_arm = 0;');
        player_entity['minecraft:client_entity']['description']['scripts']['pre_animation'].push('v.aim_right_arm = 0;');

        player_entity['minecraft:client_entity']['description']['scripts']['animate'] ||= [];
        player_entity['minecraft:client_entity']['description']['scripts']['animate'].push('ctrl.custom_item.select');
        player_entity['minecraft:client_entity']['description']['scripts']['animate'].push(JSONC.parse('{"custom_item.first_person.base": "v.is_first_person && v.has_custom_item"}'));
        player_entity['minecraft:client_entity']['description']['scripts']['animate'].push(JSONC.parse('{"custom_item.third_person.right": "!v.is_first_person && v.has_custom_item && v.aim_left_arm"}'));
        player_entity['minecraft:client_entity']['description']['scripts']['animate'].push(JSONC.parse('{"custom_item.third_person.left": "!v.is_first_person && v.has_custom_item && v.aim_right_arm"}'));

        player_entity['minecraft:client_entity'] ||= {};
        player_entity['minecraft:client_entity']['description']['animations']['ctrl.custom_item.select'] = 'controller.animation.player.custom_item.select';
        player_entity['minecraft:client_entity']['description']['animations']['custom_item.first_person.base'] = 'animation.player.custom_item.base_first_person_pose';
        player_entity['minecraft:client_entity']['description']['animations']['custom_item.third_person.right'] = 'animation.player.custom_item.third_person_aim_arm.right';
        player_entity['minecraft:client_entity']['description']['animations']['custom_item.third_person.left'] = 'animation.player.custom_item.third_person_aim_arm.left';
    }
}