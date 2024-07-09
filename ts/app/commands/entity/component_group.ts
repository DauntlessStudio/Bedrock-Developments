import { Option } from "commander";
import { File, getFiles, getStringFromTemporaryFile, setFiles } from "../../file_manager.js";
import { ServerEntity } from "../../types/index.js";
import { chalk, implementConfig } from "../../utils.js";
import { CommandMap } from "../command_map.js";

export interface EntityGroupOptions {
    group?: string;
    type: string[];
    file: string;
    overwrite: boolean;
    add: boolean;
    remove: boolean;
}

CommandMap.addCommand<EntityGroupOptions>("root.entity.group", {
    parent: CommandMap.getCommandEntry("root.entity")?.command,
    commandOptions(command) {
        command
        .name("group")
        .description("adds a component group to entities")
        .option("-g --group [component group]", 'the component group as a json object {"group_name":{"minecraft:is_baby":{}}}')
        .option("-t, --type <family type...>", "filter entities by family type")
        .addOption(new Option("-f, --file [file]", "the entity files that should be modified").makeOptionMandatory().preset("**/*.json"))
        .option("-o, --overwrite", "should the new component group overwrite the old one rather than merge with it")
        .option("--no-add", 'do not add an "add" event')
        .option("--no-remove", 'do not add an "remove" event')
    },
    commandAction: triggerEntityAddGroup,
});

async function triggerEntityAddGroup(options: EntityGroupOptions) {
    implementConfig();
    const group = options.group ?? await getStringFromTemporaryFile();

    const files: File[] = [];
    const entities = getFiles(ServerEntity.DirectoryPath + options.file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...options.type));

    entities.forEach(entity => {
        try {
            entity.setComponentGroups(JSON.parse(group), options.overwrite ? "overwrite" : "merge", {addEvent: options.add, removeEvent: options.remove});
        } catch (error) {
            console.error(chalk.red(`Failed to parse ${group} due to ${error}`));
        }
        files.push(entity.toFile("overwrite"));
    });

    setFiles(files);
}