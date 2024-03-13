import { printVersion, } from "../base";
import { program_world } from "./world";
import { chalk } from "../../utils";
import { MinecraftWorld } from "../../types/index";
import { OptionValues, Option } from "commander";
import { createInterface } from "readline";

program_world.command('export')
.description('export selected world as .mcworld or .mctemplate')
.option('-w --world <name|index>', 'the name or index of the world to add packs to')
.option('-p, --packs', "package the world's behavior and resource packs")
.addOption(new Option('-t, --type <export type>', 'what format should be exported').default('world').choices(['world', 'template']))
.action(triggerWorldsExport)
.hook('postAction', printVersion);

async function triggerWorldsExport(options: OptionValues) {
  const packs: boolean = options.packs;
  const type: 'world'|'template' = options.type;
  let world: string|undefined = options.world;

  const worlds = MinecraftWorld.getAllWorlds();

  if (!world) {
    await new Promise<void>(resolve => {
        const readline = createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        const worldOptions = worlds.map((world, index) => `[${index}] ${chalk.green(`${world.Name}`)}`)
          
        readline.question(`Select World \n${worldOptions.join('\n')}\nIndex or Name: `, (selection) => {
            world = selection;
            readline.close();
            resolve();
        });
    })
  }

  const selectedWorld = worlds.find((worldOption, index) => index === Number(world) || worldOption.Name === world);
  if (selectedWorld) {
    await selectedWorld.exportWorld(packs, type);
  } else {
    console.error(`${chalk.red(`${world} does not match the any names or indices in the world list`)}`);
  }
}