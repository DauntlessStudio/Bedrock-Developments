import { OptionValues, Option } from "commander";
import { printVersion } from "../base";
import { program_new } from "./new";
import { ClientItemTexture, IServerItem, ServerItem } from "../../types";
import { Directories, File, copySourceFile, setFiles } from "../../new_file_manager";
import { NameData } from "../../utils";
import { LangFile } from "../../types/minecraft";

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

export const program_new_item = program_new
	.command("item")
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
        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + nameData.directory + 'items/' + nameData.shortname + '.png');

        files.push(ClientItemTexture.fileWithAddedTexture(nameData.shortname, 'textures/' + nameData.directory + 'items/' + nameData.shortname));
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
        // TODO add attachable files
        return createFileTemplates.basic(nameData, options);
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
