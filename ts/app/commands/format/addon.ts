import { chalk, getConfig, setConfig } from "../../utils.js";
import { CommandMap } from "../command_map.js";

CommandMap.addCommand<string>("root.format.addon", {
    parent: CommandMap.getCommandEntry("root.format")?.command,
    commandOptions(command) {
        command
        .name("addon")
        .description("converts a project into addon format")
        .argument("<name>", "addon namespace as <team_name>_<project_name>");
    },
    commandAction: triggerAddonFormatting,
});

// TODO: Have this function actually update a project to the addon rules.
async function triggerAddonFormatting(name: string) {
    const config = getConfig() ?? {addon_namespace: name};
    config.addon_namespace = name;
    
    console.log(`${chalk.green(`Set addon namespace (${config.addon_namespace}) to config file`)}`);
    
    setConfig(config);
}