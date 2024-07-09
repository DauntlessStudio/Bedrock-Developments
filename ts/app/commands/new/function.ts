import { Option } from "commander";
import { setFiles } from "../../file_manager.js";
import { MCFunction } from "../../types/index.js";
import { implementConfig } from "../../utils.js";
import { CommandMap } from "../command_map.js";

export interface NewFunctionOptions {
    commands: string[],
    description: string;
    source: string;
    origin: string;
}

CommandMap.addCommand<string[], NewFunctionOptions>("root.new.function", {
    parent: CommandMap.getCommandEntry("root.new")?.command,
    commandOptions(command) {
        command
        .name("function")
        .description('creates new bedrock functions')
        .argument('<names...>', 'function names as "foo/bar"')
        .addOption(new Option('-c, --commands [function commands...]', 'the commands in the function'))
        .option('-d, --description <description>', 'the description of the function, used as a comment')
        .option('-s, --source <source>', 'where is this function called from, used as a comment')
        .option('-o, --origin <origin>', 'who is @s within this function, used as a comment');
    },
    commandAction: triggerCreateNewFunction,
});

function triggerCreateNewFunction(names: string[], options: NewFunctionOptions) {
    implementConfig();
    const description: string = options.description;
    const source: string = options.source;
    const selector: string = options.origin;

    names.forEach((name) => {
        if (!name.endsWith('.mcfunction')) {
            name += ".mcfunction";
        }
        
        const mcfunction = new MCFunction(name);
        mcfunction.addCommand(options.commands, {description, source, selector});
        setFiles(mcfunction.files);
    });
}