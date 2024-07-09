import { CommandMap } from "../command_map.js";

CommandMap.addCommand("root.entity", {
    parent: CommandMap.getCommandEntry("root")?.command,
    commandOptions(command) {
        command
        .name("entity")
        .description('modifies bedrock entities');
    },
});