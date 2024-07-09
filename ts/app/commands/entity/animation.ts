import { Option } from "commander";
import { File, getFiles, setFiles } from "../../file_manager.js";
import { NameData, implementConfig } from "../../utils.js";
import { ServerAnimation, ServerAnimationController, ServerEntity } from "../../types/index.js";
import { CommandMap } from "../command_map.js";

export interface EntityAnimationOptions {
    type: string[];
    file: string;
    script: boolean;
    create: "ctrl"|"anim";
}

CommandMap.addCommand<string[], EntityAnimationOptions>("root.entity.animation", {
    parent: CommandMap.getCommandEntry("root.entity")?.command,
    commandOptions(command) {
        command
        .name("anim")
        .description("adds an animation or animation controller reference to entities")
        .argument("<names...>", 'animation names as "entity.anim"')
        .option("-t, --type <family type...>", "filter entities by family type")
        .addOption(new Option("-f, --file [file]", "the entity files that should be modified").makeOptionMandatory().preset("**/*.json"))
        .option("-s, --script", "should these animations be added to script")
        .addOption(new Option("-c, --create [anim type]", "create the animation as well").choices(["ctrl", "anim"]).preset("ctrl"))
    },
    commandAction: triggerEntityAddAnim,
})

function triggerEntityAddAnim(names: string[], options: EntityAnimationOptions) {
    implementConfig();

    const files: File[] = [];
    const entities = getFiles(ServerEntity.DirectoryPath + options.file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...options.type));

    names.forEach((name) => {
        const nameData = new NameData(name);
        
        entities.forEach(entity => {
            switch (options.create) {
                case 'ctrl':
                    entity.setAnimations({[`ctrl.${nameData.shortname}`]: `controller.animation.${nameData.fullname}`}, 'overwrite', {createScriptEntry: options.script});
                    const ac = ServerAnimationController.fromPathOrTemplate(ServerAnimationController, ServerAnimationController.DirectoryPath + nameData.directory + nameData.shortname);
                    ac.addAnimationController(`controller.animation.${nameData.fullname}`);
                    files.push(ac.toFile("overwrite"));
                    break;
                case 'anim':
                    entity.setAnimations({[`${nameData.shortname}`]: `animation.${nameData.fullname}`}, 'overwrite', {createScriptEntry: options.script});
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