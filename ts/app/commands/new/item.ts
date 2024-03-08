import { OptionValues } from "commander";
import { printVersion } from "../base";
import { program_new } from "./new";
import {Identifier, server} from '../../types';
import { Directories, setFiles } from "../../new_file_manager";
import { NameData } from "../../utils";

export const program_new_item = program_new.command('item')
  .description('creates new bedrock items')
  .argument('<names...>', 'item names as "namespace:item"')
  .option('--no-lang', 'do not add lang file')
  .option('-s, --stack <stack_size>', 'max stack size', '64')
//   .addOption(new Option('-t, --type <item_type>', 'basic').choices(Object.keys(Item.itemType)))
  .action(triggerCreateNewItem)
  .hook('postAction', printVersion);

async function triggerCreateNewItem(names: string[], options: OptionValues) {
	const lang: boolean = options.lang;
	const stack: number = options.stack;
	//   const type = options.type as Item.itemType;
	//   await Item.createNewItem(names, lang, stack, type);

    names.forEach(name => {
        const nameData = new NameData(name);
        const file = new server.Item(Directories.OUTPUT_BEHAVIOR_PATH + 'items/' + nameData.directory + nameData.shortname + '.json', {
            format_version: '1.20.50',
            "minecraft:item": {
                description: {
                    identifier: name as Identifier,
                },
                components: {
                    "minecraft:max_stack_size": {
                        value: stack
                    },
                }
            }
        }).toFile();

        setFiles([file]);
    });
}