import * as Global from './globals';
import { readSourceFile, writeFileFromJSON, writeToLang, copyFile, modifyAndWriteFile, readJSONFromPath } from './file_manager';
import { getNameObject, getNamesObjects, jsonJoin, nameObject } from './utils';
import * as JSONC from 'comment-json';
import { createNewEntity, createVanillaEntity, entityAddAnim, entityAddGroup, entityType } from './entity';
import { createNewController } from './animations';
import { createNewFunction } from './functions';
import mergeDeep from './merge_deep';

export enum itemType {
    basic='basic',
    attachable='attachable',
    weapon='weapon',
    projectile='projectile',
    usable='usable',
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

const armor = {
    helmet: {name: 'helmet', slot: 'head', display: 'Helmet', enchant_slot: 'head'},
    chestplate: {name: 'chestplate', slot: 'chest', display: 'Chestplate', enchant_slot: 'torso'},
    leggings: {name: 'leggings', slot: 'legs', display: 'Leggings', enchant_slot: 'legs'},
    boots: {name: 'boots', slot: 'feet', display: 'Boots', enchant_slot: 'feet'},
}

const item_bp_template = `${Global.app_root}/src/items/template_bp.json`;
const item_rp_template = `${Global.app_root}/src/items/template_rp.json`;

export async function createNewItem(names: string[], lang: boolean, stack: number=64, type: itemType) {
    const names_list = getNamesObjects(names);

    for (const name of names_list) {
        switch (type) {
            case itemType.armor_set:
                await createArmorPiece(armorPiece.helmet, name, lang);
                await createArmorPiece(armorPiece.chestplate, name, lang);
                await createArmorPiece(armorPiece.leggings, name, lang);
                await createArmorPiece(armorPiece.boots, name, lang);
                copyFile(`${Global.app_root}/src/attachables/armor/example_main.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_main.png`);
                return;
            case itemType.helmet: {
                createArmorPiece(armorPiece.helmet, name, lang);
                copyFile(`${Global.app_root}/src/attachables/armor/example_main.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_main.png`);
                return;
            }
            case itemType.chestplate: {
                createArmorPiece(armorPiece.chestplate, name, lang);
                copyFile(`${Global.app_root}/src/attachables/armor/example_main.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_main.png`);
                return;
            }
            case itemType.leggings: {
                createArmorPiece(armorPiece.leggings, name, lang);
                copyFile(`${Global.app_root}/src/attachables/armor/example_main.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_main.png`);
                return;
            }
            case itemType.boots: {
                createArmorPiece(armorPiece.boots, name, lang);
                copyFile(`${Global.app_root}/src/attachables/armor/example_main.png`, `${Global.project_rp}textures/models/armor/${name.shortname}_main.png`);
                return;
            }
            case itemType.projectile: {
                await modifyAndWriteFile({source_path: item_bp_template, target_path: `${Global.project_bp}items/${name.pathname}${name.shortname}.json`}, (item: any) => {
                    setBehaviorItemBasics(item, name, stack);
                    item['minecraft:item']['components']['minecraft:use_duration'] = 30000;
                    item['minecraft:item']['components']['minecraft:food'] = {nutrition: 0, saturation_modifier: 'supernatural', can_always_eat: true};
                });
                await modifyAndWriteFile({source_path: item_rp_template, target_path: `${Global.project_rp}items/${name.pathname}${name.shortname}.json`}, (item: any) => {
                    setResourceItemBasics(item, name);
                });

                await createVanillaEntity(['player.json'], false);
                await createNewEntity([`projectile/${name.fullname}_projectile`], true, {geo: true, texture: true, type: entityType.projectile, client: true});
    
                await entityAddGroup(`{"${name.shortname}_projectile":{"minecraft:spawn_entity":{"entities":{"spawn_entity":"${name.namespace}:${name.shortname}_projectile","max_wait_time":0,"min_wait_time":0,"num_to_spawn":1,"single_use":true}}}}`, {file: 'player.json'});

                let query = `q.is_item_name_any('slot.weapon.mainhand', 0, '${name.namespace}:${name.shortname}') && (q.is_using_item || variable.attack_time > 0)`;
                await createNewController([`player.${name.shortname}`], [`event entity @s add_${name.shortname}_projectile`], undefined, undefined, query, `!(${query})`);
                await entityAddAnim([`player.${name.shortname}`], {file: 'player.json'}, true, undefined);
                break;
            }
            case itemType.usable: {
                await modifyAndWriteFile({source_path: item_bp_template, target_path: `${Global.project_bp}items/${name.pathname}${name.shortname}.json`}, (item: any) => {
                    setBehaviorItemBasics(item, name, stack);
                    item['minecraft:item']['components']['minecraft:use_duration'] = 30000;
                    item['minecraft:item']['components']['minecraft:food'] = {nutrition: 0, saturation_modifier: 'supernatural', can_always_eat: true};
                });
                await modifyAndWriteFile({source_path: item_rp_template, target_path: `${Global.project_rp}items/${name.pathname}${name.shortname}.json`}, (item: any) => {
                    setResourceItemBasics(item, name);
                });

                await createVanillaEntity(['player.json'], false);
                await createNewFunction([`player/${name.shortname}`], `say ${name.shortname}`, 1, {description: `Runs when ${name.shortname} is used`, source: `controller.player.${name.shortname}`, origin: `player`});

                let query = `q.is_item_name_any('slot.weapon.mainhand', 0, '${name.namespace}:${name.shortname}') && (q.is_using_item || variable.attack_time > 0)`;
                await createNewController([`player.${name.shortname}`], [`function player/${name.shortname}`], undefined, undefined, query, `!(${query})`);
                await entityAddAnim([`player.${name.shortname}`], {file: 'player.json'}, true, undefined);
                break;
            }
            case itemType.food: {
                await modifyAndWriteFile({source_path: item_bp_template, target_path: `${Global.project_bp}items/${name.pathname}${name.shortname}.json`}, (item: any) => {
                    setBehaviorItemBasics(item, name, stack);
                    item['minecraft:item']['components']['minecraft:use_duration'] = 20;
                    item['minecraft:item']['components']['minecraft:food'] = {nutrition: 5, saturation_modifier: 'supernatural', can_always_eat: true};
                });
                await modifyAndWriteFile({source_path: item_rp_template, target_path: `${Global.project_rp}items/${name.pathname}${name.shortname}.json`}, (item: any) => {
                    setResourceItemBasics(item, name);
                });
                break;
            }
            case itemType.attachable || itemType.weapon: {
                await modifyAndWriteFile({source_path: item_bp_template, target_path: `${Global.project_bp}items/${name.pathname}${name.shortname}.json`}, (item: any) => {
                    setBehaviorItemBasics(item, name, stack);
                });
                await modifyAndWriteFile({source_path: item_rp_template, target_path: `${Global.project_rp}items/${name.pathname}${name.shortname}.json`}, (item: any) => {
                    setResourceItemBasics(item, name);
                });
                createComplexAttachable(name.fullname);
                break;
            }
            default: {
                await modifyAndWriteFile({source_path: item_bp_template, target_path: `${Global.project_bp}items/${name.pathname}${name.shortname}.json`}, (item: any) => {
                    setBehaviorItemBasics(item, name, stack);
                });
                await modifyAndWriteFile({source_path: item_rp_template, target_path: `${Global.project_rp}items/${name.pathname}${name.shortname}.json`}, (item: any) => {
                    setResourceItemBasics(item, name);
                });
                break;
            }
        }

        copyFile(`${Global.app_root}/src/items/item.png`, `${Global.project_rp}textures/items/${name.shortname}.png`);

        if (lang) {
            writeToLang(`item.${name.fullname}.name=${name.displayname}`, 'item names');
        }
    }
    
    writeToItemTextureFromNames(names_list);
}

function setBehaviorItemBasics(item: any, name: nameObject, stack: number) {
    item['minecraft:item']['description']['identifier'] = name.fullname;
    item['minecraft:item']['components']['minecraft:max_stack_size'] = Number(stack);
}

function setResourceItemBasics(item: any, name: nameObject) {
    item['minecraft:item']['description']['identifier'] = name.fullname;
    item['minecraft:item']['components']['minecraft:icon'] = name.shortname;
}

export async function writeToItemTextureFromNames(names: nameObject[]) {
    await modifyAndWriteFile({source_path: `${Global.project_rp}textures/item_texture.json`, default_path: `${Global.app_root}/src/items/item_texture.json`, target_path: `${Global.project_rp}textures/item_texture.json`}, (item_texture: any) => {
        for (const name of names) {
            item_texture['texture_data'][name.shortname] = {textures: `textures/items/${name.pathname}${name.shortname}`};
        }
    }, {overwrite: true});
}

export async function writeToItemTextureFromObjects(objects: {name: string, path: string}[]) {
    await modifyAndWriteFile({source_path: `${Global.project_rp}textures/item_texture.json`, default_path: `${Global.app_root}/src/items/item_texture.json`, target_path: `${Global.project_rp}textures/item_texture.json`}, (item_texture: any) => {
        for (const object of objects) {
            item_texture['texture_data'][object.name] = {textures: object.path};
        }
    }, {overwrite: true});
}

async function createArmorPiece(piece: armorPiece, name: nameObject, lang: boolean) {
    await modifyAndWriteFile({source_path: item_bp_template, target_path: `${Global.project_bp}items/${name.pathname}${name.shortname}_${armor[piece].name}.json`}, (item: any) => {
        setBehaviorItemBasics(item, name, 1);
        item['format_version'] = '1.16.100';
        item['minecraft:item']['description']['identifier'] = `${name.fullname}_${armor[piece].name}`;
        item['minecraft:item']['description']['category'] = 'equipment';
        jsonJoin(item['minecraft:item']['components'], {
            ['minecraft:armor']: {protection: 5},
            ['minecraft:max_stack_size']: 1,
            ['minecraft:repairable']: {repair_items: [{items: ['minecraft:stick'], repair_amount: 'query.remaining_durability + 0.05 * query.max_durability'}]},
            ['minecraft:durability']: {max_durability: 200},
            ['minecraft:creative_category']: {parent: `itemGroup.name.${armor[piece].name}`},
            ['minecraft:display_name']: {value: `item.${name.fullname}_${armor[piece].name}.name`},
            ['minecraft:icon']: {texture: `${name.shortname}_${armor[piece].name}`},
            ['minecraft:wearable']: {dispensable: true, slot: `slot.armor.${armor[piece].slot}`},
            ['minecraft:enchantable']: {value: 10, slot: `armor_${armor[piece].enchant_slot}`},
        })
    });

    await modifyAndWriteFile({source_path: `${Global.app_root}/src/attachables/armor.json`, target_path: `${Global.project_rp}attachables/${name.pathname}${name.shortname}_${armor[piece].name}.json`}, (attachable: any) => {
        jsonJoin(attachable['minecraft:attachable']['description'], {
            ['identifier']: `${name.fullname}_${armor[piece].name}`,
            ['textures']: {['default']: `textures/models/armor/${name.shortname}_main`, ['enchanted']: 'textures/misc/enchanted_item_glint'},
            ['geometry']: {['default']: `geometry.player.${name.shortname}.armor.${armor[piece].name}`},
            ['scripts']: {['parent_setup']: `variable.${armor[piece].name}_layer_visible = 0.0;`},
        });
    });

    await modifyAndWriteFile({source_path: `${Global.app_root}/src/attachables/player_armor.geo.json`, target_path: `${Global.project_rp}models/entity/armor/${name.shortname}.geo.json`}, (armor: any) => {
        for (const key of Object.keys(armor)) {
            if (key.includes('geometry')) {
                armor[key.replace(/\?/g, `${name.shortname}`)] = armor[key];
                delete armor[key];
            }
        }
    });

    await modifyAndWriteFile({source_path: item_rp_template, target_path: `${Global.project_rp}items/${name.pathname}${name.shortname}_${armor[piece].name}.json`}, (item: any) => {
        item['minecraft:item']['description']['identifier'] = `${name.fullname}_${armor[piece].name}`;
        item['minecraft:item']['components']['minecraft:icon'] = `${name.shortname}_${armor[piece].name}`;
    });

    copyFile(`${Global.app_root}/src/items/armor/example_${armor[piece].name}.png`, `${Global.project_rp}textures/items/${name.shortname}_${armor[piece].name}.png`);

    if (lang) {
        writeToLang(`item.${name.fullname}_${armor[piece].name}.name=${name.displayname} ${armor[piece].display}`, 'item names');
    }
    
    await writeToItemTextureFromObjects([{name: `${name.shortname}_${armor[piece].name}`, path: `textures/items/${name.pathname}${name.shortname}_${armor[piece].name}`}]);
}

async function createComplexAttachable(name_str: string) {
    const name = getNameObject(name_str);

    await createVanillaEntity(['player.json'], true, false);
    await modifyAndWriteFile({source_path: `${Global.project_rp}entity/player.entity.json`, target_path: `${Global.project_rp}entity/player.entity.json`}, async (player: any) => {
        if (!JSONC.stringify(player).includes('has_custom_item')) {
            Object.assign(player, mergeDeep(player, attachable_player))
            await initializeAttachablePlayerAnims();
        }
        
	    player['minecraft:client_entity']['description']['animations'][`ctrl.${name.shortname}`] = `controller.animation.player.custom_items.${name.shortname}`;
	    player['minecraft:client_entity']['description']['animations'][`${name.shortname}.idle.first_person`] = `animation.player.${name.shortname}.idle.first_person`;
	    player['minecraft:client_entity']['description']['animations'][`${name.shortname}.idle.third_person`] = `animation.player.${name.shortname}.idle.third_person`;
	    player['minecraft:client_entity']['description']['animations'][`${name.shortname}.attack.first_person`] = `animation.player.${name.shortname}.attack.first_person`;
	    player['minecraft:client_entity']['description']['animations'][`${name.shortname}.attack.third_person`] = `animation.player.${name.shortname}.attack.third_person`;

        addItemToPreAnimation(player, name);
    }, {overwrite: true});

    // attachable file
    const attachable = JSONC.parse(readSourceFile(`${Global.app_root}/src/attachables/attachable.json`).replace(/namespace/g, name.namespace!).replace(/example_item/g, name.shortname!));
    writeFileFromJSON(`${Global.project_rp}attachables/${name.shortname}.json`, attachable);

    // player geo file
    const player_geo = JSONC.parse(readSourceFile(`${Global.app_root}/src/attachables/player.geo.json`).replace(/example_item/g, name.shortname!));
    writeFileFromJSON(`${Global.project_rp}models/entity/player/${name.shortname}.geo.json`, player_geo);

    // texture file
    copyFile(`${Global.app_root}/src/attachables/attachable.png`, `${Global.project_rp}textures/attachables/${name.shortname}.png`);
    
    // modify player.ac.json
    await modifyAndWriteFile({source_path: `${Global.project_rp}animation_controllers/player.ac.json`, target_path: `${Global.project_rp}animation_controllers/player.ac.json`}, (animation_controller: any) => {
        animation_controller['animation_controllers'] = mergeDeep(animation_controller['animation_controllers'], {
            ['controller.animation.player.custom_item.select']: {
                states: {
                    no_item: {},
                    [name.shortname]: {
                        animations: [`ctrl.${name.shortname}`]
                    }
                }
            },
            [`controller.animation.player.custom_items.${name.shortname}`]: JSONC.parse(readSourceFile(`${Global.app_root}/src/attachables/controller_entry.json`).replace(/example_item/g, name.shortname))
        });
        
        const state_list = Object.keys(animation_controller['animation_controllers']['controller.animation.player.custom_item.select']['states']);
        for (const state of state_list) {
            const transitions = state_list.
            filter(val => val !== state).
            map(val => {
                const variable = val.includes('no_item') ? '!v.has_custom_item' : `v.${val}`;
                return {[val]: variable};
            });

            animation_controller['animation_controllers']['controller.animation.player.custom_item.select']['states'][state]['transitions'] = transitions;
        }
    }, {overwrite: true});

    // modify player.anim.json
    await modifyAndWriteFile({source_path: `${Global.project_rp}animations/player.anim.json`, target_path: `${Global.project_rp}animations/player.anim.json`}, (animation: any) => {
        animation['animations'][`animation.player.${name.shortname}.idle.first_person`] = JSON.parse('{ "loop": true, "bones": { "rightArm": { "rotation": [ -90, 0, 0 ] } } }');
        animation['animations'][`animation.player.${name.shortname}.idle.third_person`] = JSON.parse('{ "loop": true, "bones": { "rightArm": { "rotation": [ -30, 0, 0 ] } } }');
        animation['animations'][`animation.player.${name.shortname}.attack.first_person`] = JSON.parse('{ "loop": "hold_on_last_frame", "animation_length": 0.5, "bones": { "rightArm": { "rotation": { "0.0": [ -90, 0, 0 ], "0.1": [ -100, 20, 0 ], "0.2": [ -100, -20, 0 ], "0.3": [ -90, 0, 0 ] }, "position": { "0.0": [0, 0, 0], "0.2": [10, 0, 0], "0.3": [0, 0, 0] } } } }');
        animation['animations'][`animation.player.${name.shortname}.attack.third_person`] = JSON.parse('{ "loop": "hold_on_last_frame", "animation_length": 0.3, "bones" : { "rightArm": { "rotation": { "0.0": [ -90, 0, 0 ], "0.1": [ -100, 20, 0 ], "0.2": [ -100, -20, 0 ], "0.3": [ -90, 0, 0 ] } } } }');
    }, {overwrite: true});

    // modify item.anim.json
    await modifyAndWriteFile({source_path: `${Global.project_rp}animations/item.anim.json`, default_path: `${Global.app_root}/src/attachables/item.anim.json`, target_path: `${Global.project_rp}animations/item.anim.json`}, (animation: any) => {
        animation['animations'][`animation.item.${name.shortname!}.idle.first_person`] = {};
        animation['animations'][`animation.item.${name.shortname!}.idle.third_person`] = {};
        animation['animations'][`animation.item.${name.shortname!}.attack.first_person`] = {};
        animation['animations'][`animation.item.${name.shortname!}.attack.third_person`] = {};
    }, {overwrite: true});
}

async function initializeAttachablePlayerAnims() {
    await modifyAndWriteFile({source_path: `${Global.project_rp}animation_controllers/player.ac.json`, default_path: `${Global.app_root}/src/attachables/player.ac.json`, target_path: `${Global.project_rp}animation_controllers/player.ac.json`}, async (animation_controller: any) => {
        const player_controller_source = await readJSONFromPath(`${Global.app_root}/src/attachables/player.ac.json`);

        animation_controller = mergeDeep(animation_controller, player_controller_source);
    }, {overwrite: true});

    await modifyAndWriteFile({source_path: `${Global.project_rp}animations/player.anim.json`, default_path: `${Global.app_root}/src/attachables/player.anim.json`, target_path: `${Global.project_rp}animations/player.anim.json`}, async (animation: any) => {
        const player_anim_source = readJSONFromPath(`${Global.app_root}/src/attachables/player.anim.json`);

        animation = mergeDeep(animation, player_anim_source);
    }, {overwrite: true});

    copyFile(`${Global.app_root}/src/attachables/vanilla_fixes.anim.json`, `${Global.project_rp}animations/vanilla_fixes.anim.json`);
}

function addItemToPreAnimation(player: any, name: nameObject) {
    const pre_anim = player['minecraft:client_entity']['description']['scripts']['pre_animation'] as Array<string>;
    const index = pre_anim.findIndex(element => element.includes('has_custom_item'));

    pre_anim[index] =  pre_anim[index].replace(';', ` || v.${name.shortname};`);
    pre_anim.splice(index, 0, `v.${name.shortname} = (q.get_equipped_item_name == '${name.shortname}');`);

    player['minecraft:client_entity']['description']['scripts']['pre_animation'] = pre_anim;
}

const attachable_player = {
    ['minecraft:client_entity']: {
        description: {
            scripts: {
                initialize: ['variable.bob_animation = 0.0;'],
                variables: {
                    ['variable.attack_time']: 'public',
                },
                pre_animation: [
                    'v.has_custom_item = 0;',
                    'v.dampen_left_arm_swing  = 0;',
                    'v.dampen_right_arm_swing = 0;',
                    'v.disable_arm_swing = 0;',
                    'v.disable_leg_swing = q.is_riding;',
                    'v.aim_left_arm = 0;',
                    'v.aim_right_arm = 0;',
                ],
                animate: [
                    'ctrl.custom_item.select',
                    {["custom_item.first_person.base"]: "v.is_first_person && v.has_custom_item"},
                    {["custom_item.third_person.right"]: "!v.is_first_person && v.has_custom_item && v.aim_left_arm"},
                    {["custom_item.third_person.left"]: "!v.is_first_person && v.has_custom_item && v.aim_right_arm"},
                ]
            },
            animations: {
                ['ctrl.custom_item.select']: 'controller.animation.player.custom_item.select',
                ['custom_item.first_person.base']: 'animation.player.custom_item.base_first_person_pose',
                ['custom_item.third_person.right']: 'animation.player.custom_item.third_person_aim_arm.right',
                ['custom_item.third_person.left']: 'animation.player.custom_item.third_person_aim_arm.left',
            }
        }
    }
}