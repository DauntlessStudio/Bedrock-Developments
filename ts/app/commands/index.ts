import { program } from "./base";
import * as New from './new';
import * as Entity from './entity';

export function runProgram(): void {
    New;
    Entity;
    program.parse();
}