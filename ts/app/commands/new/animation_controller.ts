import { OptionValues, Option } from "commander";
import { printVersion, } from "../base";
import { program_new } from "./new";
import { setFiles, File } from "../../new_file_manager";
import { NameData } from "../../utils";
import { ServerACName, ServerAnimationController } from "../../types";

program_new.command('ctrl')
  .description('creates new bedrock behavior animation controllers')
  .argument('<names...>', 'controller names as "entity.anim"')
  .addOption(new Option('-e, --entry [on entry commands...]', 'the commands to play on entry').default(['/say anim_name']))
  .addOption(new Option('-x, --exit [on exit commands...]', 'the commands to play on exit').preset(['/say anim_name']))
  .option('-a, --anim <animations...>', 'the animations to play')
  .option('-q, --query [query]', 'the query to transition from default', 'true')
  .addOption(new Option('-t, --transition [transition]', 'the query to transition back to default').preset('true'))
  .action(triggerCreateNewController)
  .hook('postAction', printVersion);

async function triggerCreateNewController(names: string[], options: OptionValues) {
  const on_entry: string[] = options.entry;
  const on_exit: string[] = options.exit;
  const animations: string[] = options.anim;
  const query: string = options.query;
  const transition: string = options.transition;

  names.forEach((name) => {
    const nameData = new NameData(name);
    const files: File[] = [];

    const controller = ServerAnimationController.createFromTemplate(nameData);
    controller.addState(`controller.animation.${nameData.shortname}`, "default", {
        transitions: [
            { [nameData.shortname]: query }
        ]
    });
    controller.addState(`controller.animation.${nameData.shortname}`, nameData.shortname, {
        on_entry,
        animations,
        transitions: transition ? [
            { "default": transition }
        ] : undefined,
        on_exit,
    });

    const file = controller.toFile();
    file.handleExisting = 'overwrite';
    files.push(file);

    setFiles(files);
  });
}