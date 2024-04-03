import { OptionValues, Option } from "commander";
import { printVersion } from "../base.js";
import { program_new } from "./new.js";
import { Directories, File, setFiles } from "../../file_manager.js";
import { ClientSoundCategory, ClientSoundDefinitions } from "../../types/index.js";
import { chalk } from "../../utils.js";

const categories: string[] = ['ambient', 'block', 'bottle', 'bucket', 'hostile', 'music', 'neutral', 'player', 'record', 'ui', 'weather'];

program_new.command('sound')
.description('creates a new sound definition')
.argument('<names...>', 'definition names as category.sound')
.addOption(new Option('-c, --category <category>', 'the sound category').choices(categories).default("neutral"))
.option('-f, --filepath <filepath>', 'the filepath to use for this sound, if a directory is specified it will use all files in that directory')
.option('-v, --vanilla <vanilla definition>', 'the name of a vanilla sound definition, this will create a copy of the vanilla definition using the new name')
.action(triggerCreateNewSoundDefinition)
.hook('postAction', printVersion);

function triggerCreateNewSoundDefinition(names: string[], options: OptionValues) {
  const category: string = options.category;
  const vanilla: string|undefined = options.vanilla;
  const filepath: string = options.filepath;

  names.forEach((name) => {
    if (!vanilla) {
      const soundDef = ClientSoundDefinitions.fileWithAddedSound(name, {
        category: category as ClientSoundCategory,
        sounds: [
            {
                name: filepath,
                volume: 1.0,
                pitch: 1.0,
                load_on_low_memory: true,
            }
        ]
        });

        setFiles([soundDef]);
    } else {
        const vanillaSounds = ClientSoundDefinitions.fromPathOrTemplate(ClientSoundDefinitions, Directories.VANILLA_RESOURCE_PATH + 'sounds/sound_definitions.json');
        const sound = vanillaSounds.sound_definitions[vanilla];

        if (sound) {
            const soundDef = ClientSoundDefinitions.fileWithAddedSound(name, sound);
            
            setFiles([soundDef]);
        } else {
            console.error(chalk.red(`Could not find ${vanilla} in vanilla sound definitions`));
        }
    }
  });
}