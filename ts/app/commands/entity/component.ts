import { OptionValues, Option } from "commander";
import { printVersion } from "../base.js";
import { program_entity } from "./entity.js";
import { File, getFiles, getStringFromTemporaryFile, setFiles } from "../../file_manager.js";
import { ServerEntity } from "../../types/index.js";
import { chalk } from "../../utils.js";

program_entity.command('component')
.description('adds a component to entities')
.option('-c --component [component]', 'the component as a json object {"minecraft:is_baby":{}}')
.option('-t, --type <family type...>', 'filter entities by family type')
.addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
.option('-o, --overwrite', 'should the new component overwrite the old one rather than merge with it')
.action(triggerEntityAddComponent)
.hook('postAction', printVersion);

async function triggerEntityAddComponent(options: OptionValues) {
  const family: string[] = options.type ?? [];
  const file: string = options.file;
  const overwrite: boolean = options.overwrite;
  const component: string = options.component ?? await getStringFromTemporaryFile();

  const files: File[] = [];
  const entities = getFiles(ServerEntity.DirectoryPath + file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...family));

  entities.forEach(entity => {
    try {
        entity.setComponents(JSON.parse(component), overwrite ? "overwrite" : "merge");
    } catch (error) {
        console.error(chalk.red(`Failed to parse ${component} due to ${error}`));
    }
    files.push(entity.toFile("overwrite"));
  });

  setFiles(files);
}