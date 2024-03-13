import { program } from "./base";
export * from './new/index';
export * from './entity/index';
export * from './world/index';

export function runProgram(): void {
    program.parse();
}