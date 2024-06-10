import { OptionValues, Option } from "commander";
import { printVersion } from "../base.js";
import { program_new } from "./new.js";
import { ClientItemTexture, ServerItem, LangFile, ClientEntity, ClientAnimationController, ClientAnimation, ClientAnimationName, ClientAttachable, ClientGeometryAttachable, ClientAttachableArmorHelmet, ClientGeometryArmor, ClientAttachableArmorBoots, ClientAttachableArmorLeggings, ClientAttachableArmorChestplate } from "../../types/index.js";
import { Directories, File, copySourceFile, setFiles } from "../../file_manager.js";
import { NameData, currentFormatVersion, implementConfig } from "../../utils.js";

interface ItemCommandOptions {
    lang: boolean;
    stack: number;
    cooldown: number|undefined;
}

enum ServerItemOptions {
    basic='basic',
    attachable='attachable',
    food='food',
    armor_set='armor_set',
    helmet='helmet',
    chestplate='chestplate',
    leggings='leggings',
    boots='boots'
};

program_new.command("item")
.description("creates new bedrock items")
.argument("<names...>", 'item names as "namespace:item"')
.option("--no-lang", "do not add lang file")
.option("-s, --stack <stack_size>", "max stack size", "64")
.option("-c, --cooldown <cooldown_duration>", "cooldown duration")
.addOption(
	new Option("-t, --type <item_type>", "basic").choices(
		Object.keys(ServerItemOptions)
	)
)
.action(triggerCreateNewItem)
.hook("postAction", printVersion);

async function triggerCreateNewItem(names: string[], options: OptionValues) {
    implementConfig();
    const commandOptions = {
        lang: options.lang,
        stack: Number(options.stack),
        cooldown: Number(options.cooldown)
    };
	const type: ServerItemOptions = options.type ?? ServerItemOptions.basic;

	names.forEach((name) => {
		const nameData = new NameData(name);
		const files: File[] = createFileTemplates[type](nameData, commandOptions);

        if ([ServerItemOptions.armor_set, ServerItemOptions.helmet, ServerItemOptions.chestplate, ServerItemOptions.leggings, ServerItemOptions.boots].some(itemType => itemType === type)) {
            files.push(ClientGeometryArmor.createFromTemplate(nameData).toFile());
            copySourceFile('images/armor_uv_texture.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + 'models/armor/' + nameData.directory + nameData.shortname + '.png');
        }

		setFiles(files);
	});
}

const createFileTemplates: Record<ServerItemOptions, (nameData: NameData, options: ItemCommandOptions) => File[]> = {
    basic: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(options.stack);
        if (options.cooldown) item.setCooldown(options.cooldown);

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + '.png');
        files.push(ClientItemTexture.fileWithAddedTextures({name: nameData.shortname, texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname}));
        return files;
    },
    boots: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(1);
        if (options.cooldown) item.setCooldown(options.cooldown);
        item.setWearable("slot.armor.feet", 3);

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        files.push(ClientAttachableArmorBoots.createFromTemplate(nameData).toFile());

        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + '.png');
        files.push(ClientItemTexture.fileWithAddedTextures({name: nameData.shortname, texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname}));
        return files;
    },
    leggings: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(1);
        if (options.cooldown) item.setCooldown(options.cooldown);
        item.setWearable("slot.armor.legs", 6);

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        files.push(ClientAttachableArmorLeggings.createFromTemplate(nameData).toFile());

        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + '.png');
        files.push(ClientItemTexture.fileWithAddedTextures({name: nameData.shortname, texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname}));
        return files;
    },
    chestplate: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(1);
        if (options.cooldown) item.setCooldown(options.cooldown);
        item.setWearable("slot.armor.chest", 8);

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        files.push(ClientAttachableArmorChestplate.createFromTemplate(nameData).toFile());

        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + '.png');
        files.push(ClientItemTexture.fileWithAddedTextures({name: nameData.shortname, texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname}));
        return files;
    },
    helmet: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(1);
        if (options.cooldown) item.setCooldown(options.cooldown);
        item.setWearable("slot.armor.head", 3);

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        files.push(ClientAttachableArmorHelmet.createFromTemplate(nameData).toFile());

        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + '.png');
        files.push(ClientItemTexture.fileWithAddedTextures({name: nameData.shortname, texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname}));
        return files;
    },
    armor_set: function (nameData: NameData, options: ItemCommandOptions) {
        const files: File[] = [];

        const originalLang = options.lang;
        options.lang = false;

        files.push(...createFileTemplates.boots(new NameData(nameData.original + "_boots"), options));
        files.push(...createFileTemplates.leggings(new NameData(nameData.original + "_leggings"), options));
        files.push(...createFileTemplates.chestplate(new NameData(nameData.original + "_chestplate"), options));
        files.push(...createFileTemplates.helmet(new NameData(nameData.original + "_helmet"), options));

        if (originalLang) {
            const lang = new LangFile('*.lang');
            lang.addToCategory('item names', 
                `item.${nameData.fullname}_boots.name=${nameData.display} Boots`,
                `item.${nameData.fullname}_leggings.name=${nameData.display} Leggings`,
                `item.${nameData.fullname}_chestplate.name=${nameData.display} Chestplate`,
                `item.${nameData.fullname}_helmet.name=${nameData.display} Helmet`,
            );
            files.push(...lang.files);
        }

        files.push(ClientItemTexture.fileWithAddedTextures(
            {name: nameData.shortname + "_boots", texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + "_boots"},
            {name: nameData.shortname + "_leggings", texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + "_leggings"},
            {name: nameData.shortname + "_chestplate", texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + "_chestplate"},
            {name: nameData.shortname + "_helmet", texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + "_helmet"},
        ));

        return files;
    },
    attachable: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(options.stack);
        if (options.cooldown) item.setCooldown(options.cooldown);
        item.setModifiers();

        const files: File[] = [item.toFile()];

        if (options.lang) {
            const langs = new LangFile('*.lang');
            langs.addToCategory('item names', `item.${nameData.fullname}.name=${nameData.display}`);
            files.push(...langs.files);
        }

        copySourceFile('images/uv_medium_texture.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + 'attachables/' + nameData.directory + nameData.shortname + '.png');

        // animation controller
        const controller = new ClientAnimationController(ClientAnimationController.createFilePath(nameData), {
            format_version: currentFormatVersion,
            animation_controllers: {
                [`controller.animation.${nameData.namespace}.item.custom_items.${nameData.shortname}`]: {
                    initial_state: 'idle',
                    states: {
                        idle: {
                            animations: [
                                {
                                    [`${nameData.shortname}.idle.first_person`]: "v.is_first_person"
                                },
                                {
                                    [`${nameData.shortname}.idle.third_person`]: "!v.is_first_person"
                                }
                            ],
                            transitions: [
                                {
                                    attack: "query.is_using_item"
                                }
                            ],
                            blend_transition: 0.2
                        },
                        attack: {
                            animations: [
                                {
                                    [`${nameData.shortname}.attack.first_person`]: "v.is_first_person"
                                },
                                {
                                    [`${nameData.shortname}.attack.third_person`]: "!v.is_first_person"
                                }
                            ],
                            transitions: [
                                {
                                    idle: "q.any_animation_finished && !query.is_using_item"
                                },
                                {
                                    escape_attack: "q.any_animation_finished && query.is_using_item"
                                }
                            ],
                            blend_transition: 0.2
                        },
                        escape_attack: {
                            animations: [
                                {
                                    [`${nameData.shortname}.idle.first_person`]: "v.is_first_person"
                                },
                                {
                                    [`${nameData.shortname}.idle.third_person`]: "!v.is_first_person"
                                }
                            ],
                            transitions: [
                                {
                                    idle: "!query.is_using_item"
                                }
                            ],
                            blend_transition: 0.2
                        }
                    }
                }
            }
        });
        files.push(controller.toFile());

        // animation
        const animation = new ClientAnimation(ClientAnimation.createFilePath(nameData), {
            format_version: currentFormatVersion,
            animations: {
                [`animation.${nameData.namespace}.${nameData.shortname}.blockbench_fix` as ClientAnimationName]: { loop: true, bones: { root: { rotation: [0, 0, 0], position: [7, -15, 1] } } },
                [`animation.${nameData.namespace}.player.${nameData.shortname}.idle.first_person` as ClientAnimationName]: {loop:true,override_previous_animation:true,blend_weight:`v.is_first_person && q.is_item_name_any('slot.weapon.mainhand', 0, '${nameData.fullname}')`,bones:{first_person_fix:{rotation:[-40,60,-40],position:[-3,0,0]}}},
                [`animation.${nameData.namespace}.player.${nameData.shortname}.idle.third_person` as ClientAnimationName]: {loop:true,override_previous_animation:true,blend_weight:`!v.is_first_person && q.is_item_name_any('slot.weapon.mainhand', 0, '${nameData.fullname}')`,bones:{rightArm:{rotation:[-30,0,0]}}},
                [`animation.${nameData.namespace}.player.${nameData.shortname}.attack.first_person` as ClientAnimationName]: {loop:"hold_on_last_frame",animation_length:0.5,override_previous_animation:true,blend_weight:`v.is_first_person && q.is_item_name_any('slot.weapon.mainhand', 0, '${nameData.fullname}')`,bones:{first_person_fix:{rotation:[-40,60,-40],position:[-3,0,0]},[nameData.shortname]:{rotation:{0.0:{post:[0,0,0],lerp_mode:"catmullrom"},0.1:{post:[-50,-40,60],lerp_mode:"catmullrom"},0.2:[0,0,-10],0.3:[11.2376,4.58608,-83.35255],0.4:[0,0,-80],0.5:{pre:[0,0,0],post:[0,0,0],lerp_mode:"catmullrom"}},position:{0.0:{post:[0,0,0],lerp_mode:"catmullrom"},0.1:{post:[-7,1,-11],lerp_mode:"catmullrom"},0.2:[20,-10,10],0.3:[23.43926,-13.01119,15.34095],0.4:[20,-10,10],0.5:{pre:[0,0,0],post:[0,0,0],lerp_mode:"catmullrom"}}}},timeline:{0.0:"v.playing_custom_attack = 1;",0.5:"v.playing_custom_attack = 0;"}},
                [`animation.${nameData.namespace}.player.${nameData.shortname}.attack.third_person` as ClientAnimationName]: {loop:"hold_on_last_frame",override_previous_animation:true,blend_weight:`!v.is_first_person && q.is_item_name_any('slot.weapon.mainhand', 0, '${nameData.fullname}')`,animation_length:0.3,timeline:{"0":"v.playing_custom_attack = 1;",0.3:"v.playing_custom_attack = 0;"},bones:{rightArm:{rotation:{0.0:[-90,0,0],0.1:[-100,20,0],0.2:[-100,-20,0],0.3:[-90,0,0]}}}},
                [`animation.${nameData.namespace}.item.${nameData.shortname}.idle.first_person` as ClientAnimationName]: {loop:true,bones:{first_person_fix:{rotation:[-40,60,-40],position:[-3,0,0]}}},
                [`animation.${nameData.namespace}.item.${nameData.shortname}.idle.third_person` as ClientAnimationName]: {},
                [`animation.${nameData.namespace}.item.${nameData.shortname}.attack.first_person` as ClientAnimationName]: {loop:"hold_on_last_frame",animation_length:0.5,bones:{first_person_fix:{rotation:[-40,60,-40],position:[-3,0,0]},[nameData.shortname]:{rotation:{0.0:{post:[0,0,0],lerp_mode:"catmullrom"},0.1:{post:[-50,-40,60],lerp_mode:"catmullrom"},0.2:[0,0,-10],0.3:[11.2376,4.58608,-83.35255],0.4:[0,0,-80],0.5:{pre:[0,0,0],post:[0,0,0],lerp_mode:"catmullrom"}},position:{0.0:{post:[0,0,0],lerp_mode:"catmullrom"},0.1:{post:[-7,1,-11],lerp_mode:"catmullrom"},0.2:[20,-10,10],0.3:[23.43926,-13.01119,15.34095],0.4:[20,-10,10],0.5:{pre:[0,0,0],post:[0,0,0],lerp_mode:"catmullrom"}}}},timeline:{0.0:"v.playing_custom_attack = 1;",0.5:"v.playing_custom_attack = 0;"}},
                [`animation.${nameData.namespace}.item.${nameData.shortname}.attack.third_person` as ClientAnimationName]: {},
            }
        });
        files.push(animation.toFile());

        // attachable
        const attachable = ClientAttachable.createFromTemplate(nameData);
        attachable.addAnimation(
            {name: `ctrl.${nameData.shortname}`, reference: `controller.animation.${nameData.namespace}.item.custom_items.${nameData.shortname}`},
            {name: `${nameData.shortname}.idle.first_person`, reference: `animation.${nameData.namespace}.item.${nameData.shortname}.idle.first_person`},
            {name: `${nameData.shortname}.idle.third_person`, reference: `animation.${nameData.namespace}.item.${nameData.shortname}.idle.third_person`},
            {name: `${nameData.shortname}.attack.first_person`, reference: `animation.${nameData.namespace}.item.${nameData.shortname}.attack.first_person`},
            {name: `${nameData.shortname}.attack.third_person`, reference: `animation.${nameData.namespace}.item.${nameData.shortname}.attack.third_person`}
        );
        attachable.addAnimateScript(`ctrl.${nameData.shortname}`);
        files.push(attachable.toFile());

        // geometry
        const geometry = ClientGeometryAttachable.createFromTemplate(nameData);
        files.push(geometry.toFile());

        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + '.png');
        files.push(ClientItemTexture.fileWithAddedTextures({name: nameData.shortname, texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname}));
        return files;
    },
    food: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(options.stack);
        if (options.cooldown) item.setCooldown(options.cooldown);
        item.setFood();

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname + '.png');
        files.push(ClientItemTexture.fileWithAddedTextures({name: nameData.shortname, texture: 'textures/' + Directories.ADDON_PATH + 'items/' + nameData.directory + nameData.shortname}));
        return files;
    }
 }
