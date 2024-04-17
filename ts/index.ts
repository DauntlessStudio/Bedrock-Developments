#! /usr/bin/env node
import { runProgram } from './app/commands/index.js';
export * from './app/index.js';

try {
    runProgram();
} catch (error) {
    console.error("Command Failed", error);
}