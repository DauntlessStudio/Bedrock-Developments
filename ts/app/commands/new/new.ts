import { program } from "../base.js";
import { CommandMap } from "../command_map.js";

CommandMap.addCommand("root.new", {
    parent: CommandMap.getCommandEntry("root")?.command,
    commandOptions(command) {
        command
        .name("new")
        .description('creates new bedrock files');
    },
});

export const program_new = program.command('new')
.description('creates new bedrock files');