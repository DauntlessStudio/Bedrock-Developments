import { CommandMap } from "../command_map.js";

CommandMap.copyCommand("root.entity.new", "root.new.entity", "new", CommandMap.getCommandEntry("root.entity")?.command);