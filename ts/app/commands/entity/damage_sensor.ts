import { OptionValues, Option } from "commander";
import { printVersion } from "../base";
import { program_entity } from "./entity";
import { File, getFiles, getStringFromTemporaryFile, setFiles } from "../../file_manager";
import { ServerEntity } from "../../types/index";
import { chalk } from "../../utils";

program_entity.command('sensor')
.description('adds a damage sensor to entities')
.option('-d, --damage_sensor [damage sensor]', 'the damage sensor as a json object {"cause": "all", "deals_damage": false}')
.option('-t, --type <family type...>', 'filter entities by family type')
.addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
.option('-s, --start', 'adds the new sensor to the start of the array, rather than the end')
.action(triggerEntityAddDamageSensor)
.hook('postAction', printVersion);

async function triggerEntityAddDamageSensor(options: OptionValues) {
  const family: string[] = options.type ?? [];
  const file: string = options.file;
  const start: boolean = options.start;
  const sensor: string = options.sensor ?? await getStringFromTemporaryFile();

  const files: File[] = [];
  const entities = getFiles(ServerEntity.DirectoryPath + file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...family));

  entities.forEach(entity => {
    try {
        entity.setDamageSensor(JSON.parse(sensor), {prepend: start});
    } catch (error) {
        console.error(chalk.red(`Failed to parse ${sensor} due to ${error}`));
    }
    files.push(entity.toFile("overwrite"));
  });

  setFiles(files);
}