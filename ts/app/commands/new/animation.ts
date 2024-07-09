import { Option } from "commander";
import { setFiles, File } from "../../file_manager.js";
import { ServerAnimation } from "../../types/index.js";
import { NameData, implementConfig } from "../../utils.js";
import { CommandMap } from "../command_map.js";

export interface NewAnimationOptions {
    loop: boolean;
    commands: string[];
    time: number;
}

CommandMap.addCommand<string[], NewAnimationOptions>("root.new.anim", {
    parent: CommandMap.getCommandEntry("root.new")?.command,
    commandOptions(command) {
        command
        .name("anim")
        .description('creates new bedrock behavior animations')
        .argument('<names...>', 'animation names names as "entity.anim"')
        .option('-l, --loop', 'should the animation loop')
        .addOption(new Option('-c, --commands <commands...>', 'the commands to play').default(['/say anim_name']))
        .addOption(new Option('-t, --time <time>', 'the animation length').default(1.0).argParser(parseFloat));
    },
    commandAction: triggerCreateNewAnimation,
});

function triggerCreateNewAnimation(names: string[], options: NewAnimationOptions) {
    implementConfig();

    names.forEach((name) => {
        const nameData = new NameData(name);
        const files: File[] = [];

        const animation = ServerAnimation.createFromTemplate(nameData);
        animation.animations[`animation.${nameData.namespace}.${nameData.shortname}`] = {
            animation_length: options.time,
            loop: options.loop,
            timeline: {
                ["0.0"]: options.commands.map(string => string.replace('anim_name', nameData.shortname)),
            }
        };

        files.push(animation.toFile());
        setFiles(files);
    });
}