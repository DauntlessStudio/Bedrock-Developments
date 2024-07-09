import { CommandMap } from "../command_map.js";

CommandMap.addCommand("root.project", {
    parent: CommandMap.getCommandEntry("root")?.command,
    commandOptions(command) {
        command
        command.name("project")
        .description("tools for managing projects");
    },
});