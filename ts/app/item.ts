import * as fs from 'fs';
import * as Global from './globals';
import { readJSONFromFile, readSourceFile, writeFileFromJSON, writeToLang, copyFile } from './file_manager';
import { getNameObject, getNamesObjects } from './utils';
import { requestURL } from './github';
import * as JSONC from 'comment-json';

export async function createNewItem(names: string[], lang: boolean, edible: boolean, stack: number=64, attachable: boolean) {
    let names_list = getNamesObjects(names);
    let json_item_bp = await (await readJSONFromFile(`${Global.app_root}/src/items/template_bp.json`)).shift();
    let json_item_rp = await (await readJSONFromFile(`${Global.app_root}/src/items/template_rp.json`)).shift();
    let json_item_texture = await (await readJSONFromFile(`${Global.project_rp}textures/item_texture.json`, `${Global.app_root}/src/items/item_texture.json`)).shift();

    for (const name of names_list) {
        let item_bp = json_item_bp;
        item_bp!.json['minecraft:item']['description']['identifier'] = name.fullname;
        item_bp!.json['minecraft:item']['components']['minecraft:max_stack_size'] = Number(stack);

        if (edible) {
            item_bp!.json['minecraft:item']['components']['minecraft:use_duration'] = 30000;
            item_bp!.json['minecraft:item']['components']['minecraft:food'] = {nutrition: 0, saturation_modifier: 'supernatural', can_always_eat: true};
        }

        writeFileFromJSON(`${Global.project_bp}items/${name.pathname}${name.shortname}.json`, item_bp?.json);
        
        let item_rp = json_item_rp;
        item_rp!.json['minecraft:item']['description']['identifier'] = name.fullname;
        item_rp!.json['minecraft:item']['components']['minecraft:icon'] = name.shortname;
        writeFileFromJSON(`${Global.project_rp}items/${name.pathname}${name.shortname}.json`, item_rp?.json);

        json_item_texture!.json['texture_data'][name.shortname!] = {};
        json_item_texture!.json['texture_data'][name.shortname!]['textures'] = `textures/items/${name.pathname}${name.shortname}`;

        copyFile(`${Global.app_root}/src/items/item.png`, `${Global.project_rp}textures/items/${name.shortname}.png`);

        if (lang) {
            writeToLang(`item.${name.fullname}.name=${name.displayname}`, 'item names');
        }

        if (attachable) {
            createAttachable(name.fullname!);
        }
    }
    
    writeFileFromJSON(`${Global.project_rp}textures/item_texture.json`, json_item_texture?.json, true);
}

async function createAttachable(name: string) {
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
    copyFile(`${Global.app_root}/src/attachables/attachable.png`, `${Global.project_rp}textures/entity/player/items/${name_obj.shortname}.png`);

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
    player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states']['no_item']['transitions'] ||= [JSONC.parse(`{ "no_item": "!v.has_custom_item" }`)];
    player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states']['no_item']['transitions'].push(JSONC.parse(`{ "${name_obj.shortname!}": "v.${name_obj.shortname!}" }`));
	let transitions = player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states']['no_item']['transitions'] as Array<Object>;
	player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states'][name_obj.shortname!] ||= {};
	player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states'][name_obj.shortname!]['animations'] ||= [];
	player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states'][name_obj.shortname!]['animations'].push('ctrl.' + name_obj.shortname);
    for (const key in player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states']) {
        player_ac!.json['animation_controllers']['controller.animation.player.custom_item.select']['states'][key]['transitions'] = transitions.filter(function missingKey(transition: any) {return transition[key] === undefined;});
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