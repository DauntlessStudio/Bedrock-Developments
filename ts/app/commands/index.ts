import { program } from "./base.js";
export * from './new/index.js';
export * from './entity/index.js';
export * from './world/index.js';

export function runProgram(): void {
    program.parse();
}