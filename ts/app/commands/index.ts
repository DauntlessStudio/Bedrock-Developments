import { program } from "./base";
export * from './new';
export * from './entity';
export * from './world';

export function runProgram(): void {
    program.parse();
}