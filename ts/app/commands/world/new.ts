import { MOJANG, MinecraftWorld } from "../../types/index.js";
import { Argument, Option, OptionValues } from "commander";
import { Directories } from "../../file_manager.js";
import { CommandMap } from "../command_map.js";

export interface WorldNewOptions {
	test: boolean;
	flat: boolean;
	mode?: 0|1|2|3;
	local: boolean;
	bpack?: string;
	rpack?: string;
} 

CommandMap.addCommand("root.world.new", {
	parent: CommandMap.getCommandEntry("root.world")?.command,
	commandOptions(command) {
		command
		.name("new")
		.description("create new world")
		.addArgument(new Argument("<name>", "the world name"))
		.addOption(new Option("-t, --test", "create a test world with pre-configured gamerules"))
		.addOption(new Option("-f, --flat", "create a flat world"))
		.addOption(new Option("-m, --mode <gamemode>", "gamemode").choices(["0", "1", "2", "3"]))
		.addOption(new Option("-l, --local", "use the local packs in this workspace"))
		.addOption(new Option("-b, --bpack <folder name>", "the name of the behavior pack to add"))
		.addOption(new Option("-r, --rpack <folder name>", "the name of the resource pack to add"));
	},
	commandAction: triggerWorldsNew,
});

async function triggerWorldsNew(name: string, options: WorldNewOptions) {
	let behavior_pack_manifest_path: string|undefined = options.bpack;
	let resource_pack_manifest_path: string|undefined = options.rpack;

	if (options.local) {
	  behavior_pack_manifest_path = Directories.BEHAVIOR_PATH + 'manifest.json';
	  resource_pack_manifest_path = Directories.RESOURCE_PATH + 'manifest.json';
	} else {
	  behavior_pack_manifest_path = MOJANG + '/development_behavior_packs/' + behavior_pack_manifest_path + '/manifest.json';
	  resource_pack_manifest_path = MOJANG + '/development_resource_packs/' + resource_pack_manifest_path + '/manifest.json';
	}

    MinecraftWorld.create(name, {
			behavior_pack_manifest_path,
			resource_pack_manifest_path,
			gamemode: options.mode,
			flatworld: options.flat,
			testworld: options.test,
		}
    );
}