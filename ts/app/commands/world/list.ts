import { printVersion, } from "../base";
import { program_world } from "./world";
import { chalk } from "../../utils";
import { MinecraftWorld } from "../../types/index";

program_world.command('list')
.description('list installed worlds')
.action(triggerWorldsList)
.hook('postAction', printVersion);

function triggerWorldsList() {
  MinecraftWorld.getAllWorlds().forEach((world, index) => console.log(`[${index}] ${chalk.green(`${world.Name}`)}`));
}