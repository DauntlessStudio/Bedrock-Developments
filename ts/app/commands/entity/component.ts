import { Option } from "commander";
import { File, getFiles, getStringFromTemporaryFile, setFiles } from "../../file_manager.js";
import { ServerEntity } from "../../types/index.js";
import { chalk, implementConfig } from "../../utils.js";
import { CommandMap } from "../command_map.js";

export interface EntityComponentOptions {
    component?: string;
    type: string[];
    file: string;
    overwrite: boolean;
}

CommandMap.addCommand<EntityComponentOptions>("root.entity.component", {
    parent: CommandMap.getCommandEntry("root.entity")?.command,
    commandOptions(command) {
        command
        .name("component")
        .description("adds a component to entities")
        .option("-c --component [component]", 'the component as a json object {"minecraft:is_baby":{}}')
        .option("-t, --type <family type...>", "filter entities by family type")
        .addOption(new Option("-f, --file [file]", "the entity files that should be modified").makeOptionMandatory().preset("**/*.json"))
        .option("-o, --overwrite", "should the new component overwrite the old one rather than merge with it");
    },
    commandAction: triggerEntityAddComponent,
});

async function triggerEntityAddComponent(options: EntityComponentOptions) {
    implementConfig();
    const component: string = options.component ?? await getStringFromTemporaryFile();

    const files: File[] = [];
    const entities = getFiles(ServerEntity.DirectoryPath + options.file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...options.type));

    entities.forEach(entity => {
        try {
            entity.setComponents(JSON.parse(component), options.overwrite ? "overwrite" : "merge");
        } catch (error) {
            console.error(chalk.red(`Failed to parse ${component} due to ${error}`));
        }
        files.push(entity.toFile("overwrite"));
    });

    setFiles(files);
}