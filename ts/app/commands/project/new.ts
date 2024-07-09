import { CommandMap } from "../command_map.js";

CommandMap.copyCommand("root.project.new", "root.new.project", "new", CommandMap.getCommandEntry("root.project")?.command);