import { Option } from "commander";
import { setFiles, File } from "../../file_manager.js";
import { NameData, implementConfig } from "../../utils.js";
import { ServerAnimationController } from "../../types/index.js";
import { CommandMap } from "../command_map.js";

export interface NewAnimationControllerOptions {
    entry: string[];
    exit: string[];
    anim: string[];
    query: string;
    transition: string;
}

CommandMap.addCommand<string[], NewAnimationControllerOptions>("root.new.ctrl", {
    parent: CommandMap.getCommandEntry("root.new")?.command,
    commandOptions(command) {
        command
        .name("ctrl")
        .description('creates new bedrock behavior animation controllers')
        .argument('<names...>', 'controller names as "entity.anim"')
        .addOption(new Option('-e, --entry [on entry commands...]', 'the commands to play on entry').default(['/say anim_name']))
        .addOption(new Option('-x, --exit [on exit commands...]', 'the commands to play on exit').preset(['/say anim_name']))
        .option('-a, --anim <animations...>', 'the animations to play')
        .option('-q, --query [query]', 'the query to transition from default', 'true')
        .addOption(new Option('-t, --transition [transition]', 'the query to transition back to default').preset('true'))
    },
    commandAction: triggerCreateNewController,
});

async function triggerCreateNewController(names: string[], options: NewAnimationControllerOptions) {
    implementConfig();

    names.forEach((name) => {
        const nameData = new NameData(name);
        const files: File[] = [];

        const controller = ServerAnimationController.createFromTemplate(nameData);
        controller.addState(`controller.animation.${nameData.namespace}.${nameData.shortname}`, "default", {
            transitions: [
                { [nameData.shortname]: options.query }
            ]
        });
        controller.addState(`controller.animation.${nameData.namespace}.${nameData.shortname}`, nameData.shortname, {
                on_entry: options.entry,
                animations: options.anim,
                transitions: options.transition ? [
                    { "default": options.transition }
                ] : undefined,
                on_exit: options.exit,
        });

        const file = controller.toFile();
        file.handleExisting = 'overwrite';
        files.push(file);

        setFiles(files);
    });
}