import { CommandMap } from "../command_map.js";

CommandMap.addCommand("root.world", {
    parent: CommandMap.getCommandEntry("root")?.command,
    commandOptions(command) {
        command
        .name("world")
        .description("tools for working with worlds");
    },
});