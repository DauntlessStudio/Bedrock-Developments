import { OptionValues, Option } from "commander";
import { printVersion } from "../base";
import { program_entity } from "./entity";
import { Directories, File, copySourceFile, getFiles, setFiles } from "../../new_file_manager";
import { NameData } from "../../utils";
import { ServerEntity } from "../../types";

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
  const family: string[] = options.type ?? [];
  const file: string = options.file;
  const script: boolean = options.script;
  const create: 'ctrl'|'anim' = options.create ?? 'ctrl';

  const entities = getFiles(ServerEntity.DirectoryPath + file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...family));

  names.forEach((name) => {
    const nameData = new NameData(name);

    entities.forEach(entity => {
        switch (create) {
            case 'ctrl':
                entity.setAnimations({[`ctrl.${nameData.shortname}`]: `controller.animation.${nameData.shortname}`}, 'overwrite', {createScriptEntry: script, createFileEntry: script});
                break;
            case 'anim':
                entity.setAnimations({[`${nameData.shortname}`]: `animation.${nameData.shortname}`}, 'overwrite', {createScriptEntry: script, createFileEntry: script});
                break;
            default:
                break;
        }
    });
  });

  setFiles(entities.map(entity => entity.toFile('overwrite')));
}