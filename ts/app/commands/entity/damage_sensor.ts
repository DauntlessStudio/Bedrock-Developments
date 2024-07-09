import { OptionValues, Option } from "commander";
import { File, getFiles, getStringFromTemporaryFile, setFiles } from "../../file_manager.js";
import { ServerEntity } from "../../types/index.js";
import { chalk, implementConfig } from "../../utils.js";
import { CommandMap } from "../command_map.js";

interface EntityDamageSensorOptions {
    damage_sensor?: string;
    type: string[];
    file: string;
    start: boolean;
}

CommandMap.addCommand<EntityDamageSensorOptions>("root.entity.sensor", {
    parent: CommandMap.getCommandEntry("root.entity")?.command,
    commandOptions(command) {
        command
        .name("sensor")
        .description("adds a damage sensor to entities")
        .option("-d, --damage_sensor [damage sensor]", 'the damage sensor as a json object {"cause": "all", "deals_damage": false}')
        .option("-t, --type <family type...>", "filter entities by family type")
        .addOption(new Option("-f, --file [file]", "the entity files that should be modified").makeOptionMandatory().preset("**/*.json"))
        .option("-s, --start", "adds the new sensor to the start of the array, rather than the end")
    },
    commandAction: triggerEntityAddDamageSensor,
});

async function triggerEntityAddDamageSensor(options: OptionValues) {
    implementConfig();
    const sensor: string = options.sensor ?? await getStringFromTemporaryFile();

    const files: File[] = [];
    const entities = getFiles(ServerEntity.DirectoryPath + options.file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...options.type));

    entities.forEach(entity => {
        try {
            entity.setDamageSensor(JSON.parse(sensor), {prepend: options.start});
        } catch (error) {
            console.error(chalk.red(`Failed to parse ${sensor} due to ${error}`));
        }
        files.push(entity.toFile("overwrite"));
    });

    setFiles(files);
}