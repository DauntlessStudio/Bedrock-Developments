import { chalk } from "../../utils.js";
import { IBehaviorPack, IResourcePack, MOJANG, MinecraftWorld } from "../../types/index.js";
import { Option } from "commander";
import { createInterface } from "readline";
import { Directories } from "../../file_manager.js";
import { CommandMap } from "../command_map.js";

export interface WorldPacksOptions {
    world?: string;
    bpack?: string;
    rpack?: string;
    local: boolean;
}

CommandMap.addCommand("root.world.packs", {
    parent: CommandMap.getCommandEntry("root.world")?.command,
    commandOptions(command) {
        command
        .name("packs")
        .description("attach packs to world")
        .option("-w --world <name|index>", "the name or index of the world to add packs to")
        .addOption(new Option("-b, --bpack <folder name>", "the name of the behavior pack to add"))
        .addOption(new Option("-r, --rpack <folder name>", "the name of the resource pack to add"))
        .addOption(new Option("-l, --local", "use the local packs in this workspace"))
        .addOption(new Option("-d, --delete", "should the packs be removed"))
    },
    commandAction: triggerWorldsPacks,
});

async function triggerWorldsPacks(options: WorldPacksOptions) {
    const worlds = MinecraftWorld.getAllWorlds();

    if (!options.world) {
        await new Promise<void>(resolve => {
            const readline = createInterface({
                input: process.stdin,
                output: process.stdout
            });
        
            const worldOptions = worlds.map((world, index) => `[${index}] ${chalk.green(`${world.Name}`)}`)
              
            readline.question(`Select World \n${worldOptions.join('\n')}\nIndex or Name: `, (selection) => {
                options.world = selection;
                readline.close();
                resolve();
            });
        })
    }

    if (options.local) {
        options.bpack = Directories.BEHAVIOR_PATH + 'manifest.json';
        options.rpack = Directories.RESOURCE_PATH + 'manifest.json';
    } else {
        options.bpack = MOJANG + '/development_behavior_packs/' + options.bpack + '/manifest.json';
        options.rpack = MOJANG + '/development_resource_packs/' + options.rpack + '/manifest.json';
    }

    const selectedWorld = worlds.find((worldOption, index) => index === Number(options.world) || worldOption.Name === options.world);
    if (selectedWorld) {
        if (options.bpack) {
            selectedWorld.addPack(MinecraftWorld.getPackFromManifest(options.bpack) as IBehaviorPack)
        }
        if (options.rpack) {
            selectedWorld.addPack(MinecraftWorld.getPackFromManifest(options.rpack) as IResourcePack);
        }
    } else {
        console.error(`${chalk.red(`${options.world} does not match the any names or indices in the world list`)}`);
    }
}