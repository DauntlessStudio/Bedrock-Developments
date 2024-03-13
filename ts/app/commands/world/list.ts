import { printVersion, } from "../base.js";
import { program_world } from "./world.js";
import { chalk } from "../../utils.js";
import { MinecraftWorld } from "../../types/index.js";

program_world.command('list')
.description('list installed worlds')
.action(triggerWorldsList)
.hook('postAction', printVersion);

function triggerWorldsList() {
  MinecraftWorld.getAllWorlds().forEach((world, index) => console.log(`[${index}] ${chalk.green(`${world.Name}`)}`));
}