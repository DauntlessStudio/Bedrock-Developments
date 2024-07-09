import { CommandMap } from "./command_map.js";
export * from './new/index.js';
export * from './entity/index.js';
export * from './world/index.js';
export * from './format/index.js';
export * from './project/index.js';

export function runProgram(): void {
    CommandMap.getCommandEntry("root")?.command?.parse();
}