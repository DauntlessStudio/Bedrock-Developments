import { OptionValues, Option } from "commander";
import { printVersion } from "../base";
import { program_entity } from "./entity";
import { File, getFiles, getStringFromTemporaryFile, setFiles } from "../../new_file_manager";
import { ServerEntity } from "../../types";
import { chalk } from "../../utils";

program_entity.command('group')
  .description('adds a component group to entities')
  .option('-g --group [component group]', 'the component group as a json object {"group_name":{"minecraft:is_baby":{}}}')
  .option('-t, --type <family type...>', 'filter entities by family type')
  .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
  .option('-o, --overwrite', 'should the new component group overwrite the old one rather than merge with it')
  .option('--no-add', 'do not add an "add" event')
  .option('--no-remove', 'do not add an "remove" event')
  .action(triggerEntityAddGroup)
  .hook('postAction', printVersion);

async function triggerEntityAddGroup(options: OptionValues) {
  const family: string[] = options.type ?? [];
  const file: string = options.file;
  const overwrite: boolean = options.overwrite;
  const addEvent: boolean = options.add;
  const removeEvent: boolean = options.remove;
  const group: string = options.group ?? await getStringFromTemporaryFile();

  const files: File[] = [];
  const entities = getFiles(ServerEntity.DirectoryPath + file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...family));

  entities.forEach(entity => {
    try {
        entity.setComponentGroups(JSON.parse(group), overwrite ? "overwrite" : "merge", {addEvent, removeEvent});
    } catch (error) {
        console.error(chalk.red(`Failed to parse ${group} due to ${error}`));
    }
    files.push(entity.toFile("overwrite"));
  });

  setFiles(files);
}