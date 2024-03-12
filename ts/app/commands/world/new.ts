import { printVersion, } from "../base";
import { program_world } from "./world";
import { MinecraftWorld } from "../../types";
import { Argument, Option, OptionValues } from "commander";

program_world.command('new')
.description('create new world')
.addArgument(new Argument('<name>', 'the world name'))
.addOption(new Option('-t, --test', 'create a test world with pre-configured gamerules'))
.addOption(new Option('-f, --flat', 'create a flat world'))
.addOption(new Option('-m, --mode <gamemode>', 'gamemode').choices(['0', '1', '2', '3']))
.addOption(new Option('-b, --bpack <folder name>', 'the name of the behavior pack to add'))
.addOption(new Option('-r, --rpack <folder name>', 'the name of the resource pack to add'))
// .addOption(new Option('-e, --experimental [toggle]', 'turn on experimental toggle').preset(World.experimentalToggle.betaAPI).choices(Object.values(World.experimentalToggle)))
.action(triggerWorldsNew)
.hook('postAction', printVersion);

async function triggerWorldsNew(name: string, options: OptionValues) {
    MinecraftWorld.create(name, {
			behavior_pack_manifest_path: options.bpack,
			resource_pack_manifest_path: options.rpack,
			gamemode: options.mode,
			flatworld: options.flat,
			testworld: options.test,
		}
    );
}