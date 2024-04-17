#! /usr/bin/env node
import { runProgram } from './app/commands/index.js';
import { implementConfig } from './app/utils.js';
export * from './app/index.js';

implementConfig();
try {
    runProgram();
} catch (error) {
    console.error("Command Failed", error);
}