import { chalk } from "../../utils.js";
import { MinecraftWorld } from "../../types/index.js";
import { Option } from "commander";
import { createInterface } from "readline";
import { CommandMap } from "../command_map.js";

export interface WorldExportOptions {
    world?: string;
    type: "world"|"template";
    packs: boolean;
}

CommandMap.addCommand<WorldExportOptions>("root.world.export", {
    parent: CommandMap.getCommandEntry("root.world")?.command,
    commandOptions(command) {
        command
        .name("export")
        .description("export selected world as .mcworld or .mctemplate")
        .option("-w --world <name|index>", "the name or index of the world to add packs to")
        .option("-p, --packs", "package the world's behavior and resource packs")
        .addOption(new Option("-t, --type <export type>", "what format should be exported").default("world").choices(["world", "template"]));
    },
    commandAction: triggerWorldsExport,
});

async function triggerWorldsExport(options: WorldExportOptions) {
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

    const selectedWorld = worlds.find((worldOption, index) => index === Number(options.world) || worldOption.Name === options.world);
    if (selectedWorld) {
        await selectedWorld.exportWorld(options.packs, options.type);
    } else {
        console.error(`${chalk.red(`${options.world} does not match the any names or indices in the world list`)}`);
    }
}