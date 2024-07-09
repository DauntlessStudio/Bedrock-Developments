import { CommandMap } from "./command_map.js";
export * from './base.js';
export * from './new/index.js';
export * from './entity/index.js';
export * from './world/index.js';
export * from './format/index.js';
export * from './project/index.js';

export async function runProgram(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 2)); // Wait to parse command until command map copies finished
    
    CommandMap.getCommandEntry("root")?.command?.parse();
}