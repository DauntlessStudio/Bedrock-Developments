import { chalk } from "../../utils.js";
import { MinecraftWorld } from "../../types/index.js";
import { CommandMap } from "../command_map.js";

CommandMap.addCommand("root.world.list", {
    parent: CommandMap.getCommandEntry("root.world")?.command,
    commandOptions(command) {
        command
        .name("list")
        .description("list installed worlds");
    },
    commandAction: triggerWorldsList,
});

function triggerWorldsList() {
  MinecraftWorld.getAllWorlds().forEach((world, index) => console.log(`[${index}] ${chalk.green(`${world.Name}`)}`));
}