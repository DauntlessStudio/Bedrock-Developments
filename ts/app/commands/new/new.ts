import { CommandMap } from "../command_map.js";

CommandMap.addCommand("root.new", {
    parent: CommandMap.getCommandEntry("root")?.command,
    commandOptions(command) {
        command
        .name("new")
        .description('creates new bedrock files');
    },
});