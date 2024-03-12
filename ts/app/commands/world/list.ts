import { OptionValues, Option } from "commander";
import { printVersion, } from "../base";
import { program_world } from "./world";
import { setFiles, File } from "../../new_file_manager";
import { NameData, chalk } from "../../utils";
import { MinecraftWorld } from "../../types";

program_world.command('list')
.description('list installed worlds')
.action(triggerWorldsList)
.hook('postAction', printVersion);

function triggerWorldsList() {
  MinecraftWorld.getAllWorlds().forEach((world, index) => console.log(`[${index}] ${chalk.green(`${world.Name}`)}`));
}