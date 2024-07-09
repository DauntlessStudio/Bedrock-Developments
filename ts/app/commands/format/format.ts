import { CommandMap } from "../command_map.js";

CommandMap.addCommand("root.format", {
    parent: CommandMap.getCommandEntry("root")?.command,
    commandOptions(command) {
        command
        .name("format")
        .description("project formatting commands");
    },
});