import { OptionValues, Option } from "commander";
import { printVersion, } from "../base.js";
import { program_new } from "./new.js";
import { setFiles, File } from "../../file_manager.js";
import { ServerAnimation } from "../../types/index.js";
import { NameData } from "../../utils.js";

program_new.command('anim')
.description('creates new bedrock behavior animations')
.argument('<names...>', 'animation names names as "entity.anim"')
.option('-l, --loop', 'should the animation loop')
.addOption(new Option('-c, --commands <commands...>', 'the commands to play').default(['/say anim_name']))
.addOption(new Option('-t, --time <time>', 'the animation length').default(1.0).argParser(parseFloat))
.action(triggerCreateNewAnimation)
.hook('postAction', printVersion);

function triggerCreateNewAnimation(names: string[], options: OptionValues) {
  const loop: boolean = Boolean(options.loop);
  const commands: string[] = options.commands;
  const animation_length: number = options.time;

  names.forEach((name) => {
    const nameData = new NameData(name);
    const files: File[] = [];

    const animation = ServerAnimation.createFromTemplate(nameData);
    animation.animations[`animation.${nameData.shortname}`] = {
        animation_length,
        loop,
        timeline: {
            ["0.0"]: commands.map(string => string.replace('anim_name', nameData.shortname)),
        }
    };

    files.push(animation.toFile());
    setFiles(files);
  });
}