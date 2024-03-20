import { OptionValues, Option } from "commander";
import { printVersion } from "../base.js";
import { program_new } from "./new.js";
import { ClientItemTexture, ServerItem, LangFile, ClientEntity, ClientAnimationController, ClientAnimation, ClientAnimationName, ClientAttachable, ClientGeometryAttachable } from "../../types/index.js";
import { Directories, File, copySourceFile, setFiles } from "../../file_manager.js";
import { NameData, currentFormatVersion } from "../../utils.js";

interface ItemCommandOptions {
    lang: boolean;
    stack: number;
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
.addOption(
	new Option("-t, --type <item_type>", "basic").choices(
		Object.keys(ServerItemOptions)
	)
)
.action(triggerCreateNewItem)
.hook("postAction", printVersion);

async function triggerCreateNewItem(names: string[], options: OptionValues) {
    const commandOptions = {
        lang: options.lang,
        stack: Number(options.stack),
    };
	const type: ServerItemOptions = options.type ?? ServerItemOptions.basic;

	names.forEach((name) => {
		const nameData = new NameData(name);
		const files: File[] = createFileTemplates[type](nameData, commandOptions);
        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + 'items/' + nameData.directory + nameData.shortname + '.png');

        files.push(ClientItemTexture.fileWithAddedTexture(nameData.shortname, 'textures/' + 'items/' + nameData.directory + nameData.shortname));
		setFiles(files);
	});
}

const createFileTemplates: Record<ServerItemOptions, (nameData: NameData, options: ItemCommandOptions) => File[]> = {
    basic: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(options.stack);

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        return files;
    },
    boots: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(1);
        item.setWearable("slot.armor.feet");

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        return files;
    },
    leggings: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(1);
        item.setWearable("slot.armor.legs");

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        return files;
    },
    chestplate: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(1);
        item.setWearable("slot.armor.chest");

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        return files;
    },
    helmet: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(1);
        item.setWearable("slot.armor.head");

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

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
                `item.${nameData.fullname}"_boots.name=${nameData.display} Boots`,
                `item.${nameData.fullname}"_leggings.name=${nameData.display} Leggings`,
                `item.${nameData.fullname}"_chestplate.name=${nameData.display} Chestplate`,
                `item.${nameData.fullname}"_helmet.name=${nameData.display} Helmet`,
            );
            files.push(...lang.files);
        }

        return files;
    },
    attachable: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(options.stack);

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        copySourceFile('images/uv_medium_texture.png', Directories.RESOURCE_PATH + 'textures/' + 'attachables/' + nameData.directory + nameData.shortname + '.png');

        // player.entity.json
        copySourceFile('vanilla/resource_pack/entity/player.entity.json', Directories.RESOURCE_PATH + 'entity/player.entity.json');
        const playerEntity = ClientEntity.fromPathOrTemplate(ClientEntity, Directories.RESOURCE_PATH + 'entity/player.entity.json');
        playerEntity.addInitializeVariable("variable.attack_time = 0;");
        playerEntity.addPreAnimationVariable(`v.${nameData.shortname} = v.is_paperdoll ? 0 : (q.is_item_name_any('slot.weapon.mainhand', 0, '${nameData.fullname}'));`);
        playerEntity.addPublicVariable("variable.attack_time");
        playerEntity.addAnimation(
            {name: `ctrl.${nameData.shortname}`, reference: `controller.animation.player.custom_items.${nameData.shortname}`},
            {name: `${nameData.shortname}.idle.first_person`, reference: `animation.player.${nameData.shortname}.idle.first_person`},
            {name: `${nameData.shortname}.idle.third_person`, reference: `animation.player.${nameData.shortname}.idle.third_person`},
            {name: `${nameData.shortname}.attack.first_person`, reference: `animation.player.${nameData.shortname}.attack.first_person`},
            {name: `${nameData.shortname}.attack.third_person`, reference: `animation.player.${nameData.shortname}.attack.third_person`}
        );
        playerEntity.addAnimateScript({[`ctrl.${nameData.shortname}`]: `v.${nameData.shortname}`});
        files.push(playerEntity.toFile('overwrite'));

        // animation controller
        const controller = new ClientAnimationController(ClientAnimationController.createFilePath(nameData), {
            format_version: currentFormatVersion,
            animation_controllers: {
                [`controller.animation.player.custom_items.${nameData.shortname}`]: {
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
                                    attack: "v.attack_time > 0"
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
                                    idle: "q.any_animation_finished"
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
                [`animation.player.${nameData.shortname}.idle.first_person` as ClientAnimationName]: { loop: true, bones: { rightArm: { rotation: [ -90, 0, 0 ] } } },
                [`animation.player.${nameData.shortname}.idle.third_person` as ClientAnimationName]: { loop: true, bones: { rightArm: { rotation: [ -30, 0, 0 ] } } },
                [`animation.player.${nameData.shortname}.attack.first_person` as ClientAnimationName]: { loop: "hold_on_last_frame", animation_length: 0.5, bones: { rightArm: { rotation: { "0.0": [ -90, 0, 0 ], "0.1": [ -100, 20, 0 ], "0.2": [ -100, -20, 0 ], "0.3": [ -90, 0, 0 ] }, position: { "0.0": [0, 0, 0], "0.2": [10, 0, 0], "0.3": [0, 0, 0] } } } },
                [`animation.player.${nameData.shortname}.attack.third_person` as ClientAnimationName]: { loop: "hold_on_last_frame", animation_length: 0.3, bones : { rightArm: { rotation: { "0.0": [ -90, 0, 0 ], "0.1": [ -100, 20, 0 ], "0.2": [ -100, -20, 0 ], "0.3": [ -90, 0, 0 ] } } } },
                [`animation.item.${nameData.shortname}.idle.first_person` as ClientAnimationName]: {},
                [`animation.item.${nameData.shortname}.idle.third_person` as ClientAnimationName]: {},
                [`animation.item.${nameData.shortname}.attack.first_person` as ClientAnimationName]: {},
                [`animation.item.${nameData.shortname}.attack.third_person` as ClientAnimationName]: {},
            }
        });
        files.push(animation.toFile());

        // attachable
        const attachable = ClientAttachable.createFromTemplate(nameData);
        attachable.addAnimation(
            {name: `ctrl.${nameData.shortname}`, reference: `controller.animation.player.custom_items.${nameData.shortname}`},
            {name: `${nameData.shortname}.idle.first_person`, reference: `animation.player.${nameData.shortname}.idle.first_person`},
            {name: `${nameData.shortname}.idle.third_person`, reference: `animation.player.${nameData.shortname}.idle.third_person`},
            {name: `${nameData.shortname}.attack.first_person`, reference: `animation.player.${nameData.shortname}.attack.first_person`},
            {name: `${nameData.shortname}.attack.third_person`, reference: `animation.player.${nameData.shortname}.attack.third_person`}
        );
        attachable.addInitializeVariable("variable.attack_time = 0;");
        attachable.addAnimateScript(`ctrl.${nameData.shortname}`);
        files.push(attachable.toFile());

        // geometry
        const geometry = ClientGeometryAttachable.createFromTemplate(nameData);
        files.push(geometry.toFile());

        return files;
    },
    food: function (nameData: NameData, options: ItemCommandOptions) {
        const item = ServerItem.createFromTemplate(nameData);
        item.setDisplayData(nameData);
        item.setStackSize(options.stack);
        item.setFood();

        const files: File[] = [item.toFile()];

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('item names', `item.${nameData.fullname}.name=${nameData.display}`).files);
        }

        return files;
    }
 }
