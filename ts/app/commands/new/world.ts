import { CommandMap } from "../command_map.js";

CommandMap.copyCommand("root.new.world", "root.world.new", "world", CommandMap.getCommandEntry("root.new")?.command);