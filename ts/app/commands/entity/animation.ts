import { OptionValues, Option } from "commander";
import { printVersion } from "../base.js";
import { program_entity } from "./entity.js";
import { Directories, File, copySourceFile, getFiles, setFiles } from "../../file_manager.js";
import { NameData, implementConfig } from "../../utils.js";
import { ServerAnimation, ServerAnimationController, ServerEntity } from "../../types/index.js";

program_entity.command('anim')
.description('adds an animation or animation controller reference to entities')
.argument('<names...>', 'animation names as "entity.anim"')
.option('-t, --type <family type...>', 'filter entities by family type')
.addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
.option('-s, --script', 'should these animations be added to script')
.addOption(new Option('-c, --create [anim type]', 'create the animation as well').choices(['ctrl', 'anim']).preset('ctrl'))
.action(triggerEntityAddAnim)
.hook('postAction', printVersion);

function triggerEntityAddAnim(names: string[], options: OptionValues) {
  implementConfig();
  const family: string[] = options.type ?? [];
  const file: string = options.file;
  const script: boolean = options.script;
  const create: 'ctrl'|'anim' = options.create ?? 'ctrl';

  const files: File[] = [];
  const entities = getFiles(ServerEntity.DirectoryPath + file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...family));

  names.forEach((name) => {
    const nameData = new NameData(name);

    entities.forEach(entity => {
        switch (create) {
            case 'ctrl':
                entity.setAnimations({[`ctrl.${nameData.shortname}`]: `controller.animation.${nameData.fullname}`}, 'overwrite', {createScriptEntry: script});
                const ac = ServerAnimationController.fromPathOrTemplate(ServerAnimationController, ServerAnimationController.DirectoryPath + nameData.directory + nameData.shortname);
                ac.addAnimationController(`controller.animation.${nameData.fullname}`);
                files.push(ac.toFile("overwrite"));
                break;
            case 'anim':
                entity.setAnimations({[`${nameData.shortname}`]: `animation.${nameData.fullname}`}, 'overwrite', {createScriptEntry: script});
                const anim = ServerAnimation.fromPathOrTemplate(ServerAnimation, ServerAnimation.DirectoryPath + nameData.directory + nameData.shortname);
                anim.addAnimation(`animation.${nameData.fullname}`);
                files.push(anim.toFile("overwrite"));
                break;
            default:
                break;
        }
    });
  });

  files.push(...entities.map(entity => entity.toFile('overwrite')))
  setFiles(files);
}