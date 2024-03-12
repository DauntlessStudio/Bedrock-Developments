import { printVersion, } from "../base";
import { program_world } from "./world";
import { chalk } from "../../utils";
import { IBehaviorPack, IResourcePack, MOJANG, MinecraftWorld } from "../../types";
import { OptionValues, Option } from "commander";
import { createInterface } from "readline";
import { Directories, getFiles } from "../../file_manager";

program_world.command('packs')
.description('attach packs to world')
.option('-w --world <name|index>', 'the name or index of the world to add packs to')
.addOption(new Option('-b, --bpack <folder name>', 'the name of the behavior pack to add'))
.addOption(new Option('-r, --rpack <folder name>', 'the name of the resource pack to add'))
.addOption(new Option('-l, --local', 'use the local packs in this workspace'))
.addOption(new Option('-d, --delete', 'should the packs be removed'))
// .addOption(new Option('-e, --experimental [toggle]', 'turn on experimental toggle').preset(World.experimentalToggle.betaAPI).choices(Object.values(World.experimentalToggle)))
.action(triggerWorldsPacks)
.hook('postAction', printVersion);

async function triggerWorldsPacks(options: OptionValues) {
  let behavior_pack: string|undefined = options.bpack;
  let resource_pack: string|undefined = options.rpack;
  let world: string|undefined = options.world;
  const local: boolean = options.local;
  const del: boolean = options.delete;

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

  if (local) {
    behavior_pack = Directories.BEHAVIOR_PATH + 'manifest.json';
    resource_pack = Directories.RESOURCE_PATH + 'manifest.json';
  } else {
    behavior_pack = MOJANG + '/development_behavior_packs/' + behavior_pack + '/manifest.json';
    resource_pack = MOJANG + '/development_resource_packs/' + resource_pack + '/manifest.json';
  }

  const selectedWorld = worlds.find((worldOption, index) => index === Number(world) || worldOption.Name === world);
  if (selectedWorld) {
    if (behavior_pack) {
        selectedWorld.addPack(MinecraftWorld.getPackFromManifest(behavior_pack) as IBehaviorPack)
    }
    if (resource_pack) {
        selectedWorld.addPack(MinecraftWorld.getPackFromManifest(resource_pack) as IResourcePack);
    }
  } else {
    console.error(`${chalk.red(`${world} does not match the any names or indices in the world list`)}`);
  }
}