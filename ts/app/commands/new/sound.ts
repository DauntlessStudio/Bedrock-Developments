import { OptionValues, Option } from "commander";
import { Directories, setFiles } from "../../file_manager.js";
import { ClientSoundCategory, ClientSoundDefinitions } from "../../types/index.js";
import { chalk, implementConfig } from "../../utils.js";
import { CommandMap } from "../command_map.js";

export interface NewSoundOptions {
    category: ClientSoundCategory;
    filepath: string;
    vanilla?: string;
}

const categories: string[] = ["ambient", "block", "bottle", "bucket", "hostile", "music", "neutral", "player", "record", "ui", "weather"];

CommandMap.addCommand<string[], NewSoundOptions>("root.new.sound", {
    parent: CommandMap.getCommandEntry("root.new")?.command,
    commandOptions(command) {
        command
        .name("sound")
        .description("creates a new sound definition")
        .argument("<names...>", "definition names as category.sound")
        .addOption(new Option("-c, --category <category>", "the sound category").choices(categories).default("neutral"))
        .option("-f, --filepath <filepath>", "the filepath to use for this sound, if a directory is specified it will use all files in that directory")
        .option("-v, --vanilla <vanilla definition>", "the name of a vanilla sound definition, this will create a copy of the vanilla definition using the new name")
    },
    commandAction: triggerCreateNewSoundDefinition,
});


function triggerCreateNewSoundDefinition(names: string[], options: NewSoundOptions) {
    implementConfig();

    names.forEach((name) => {
        if (!options.vanilla) {
            const soundDef = ClientSoundDefinitions.fileWithAddedSound(name, {
                category: options.category,
                sounds: [
                    {
                        name: options.filepath,
                        volume: 1.0,
                        pitch: 1.0,
                        load_on_low_memory: true,
                    }
                ]
            });

            setFiles([soundDef]);
        } else {
            const vanillaSounds = ClientSoundDefinitions.fromPathOrTemplate(ClientSoundDefinitions, Directories.VANILLA_RESOURCE_PATH + 'sounds/sound_definitions.json');
            const sound = vanillaSounds.sound_definitions[options.vanilla];

            if (sound) {
                const soundDef = ClientSoundDefinitions.fileWithAddedSound(name, sound);

                setFiles([soundDef]);
            } else {
                console.error(chalk.red(`Could not find ${options.vanilla} in vanilla sound definitions`));
            }
        }
    });
}