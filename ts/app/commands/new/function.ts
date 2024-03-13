import { OptionValues, Option } from "commander";
import { printVersion } from "../base";
import { program_new } from "./new";
import { setFiles } from "../../file_manager";
import {  MCFunction } from "../../types/index";

program_new.command('function')
.description('creates new bedrock functions')
.argument('<names...>', 'function names as "foo/bar"')
.addOption(new Option('-c, --commands [function commands...]', 'the commands in the function'))
.option('-d, --description <description>', 'the description of the function, used as a comment')
.option('-s, --source <source>', 'where is this function called from, used as a comment')
.option('-o, --origin <origin>', 'who is @s within this function, used as a comment')
.addHelpText('before', 'special characters can be used to provide additional formatting. $(F)f inserts the filename into the command, $(I)i inserts the index of the batch generated command')
.action(triggerCreateNewFunction)
.hook('postAction', printVersion);

function triggerCreateNewFunction(names: string[], options: OptionValues) {
  const commands: string[] = options.commands;
  const description: string = options.description;
  const source: string = options.source;
  const selector: string = options.origin;

  names.forEach((name) => {
    if (!name.endsWith('.mcfunction')) {
        name += ".mcfunction";
    }
    
    const mcfunction = new MCFunction(name);
    mcfunction.addCommand(commands, {description, source, selector});
    setFiles(mcfunction.files);
  });
}