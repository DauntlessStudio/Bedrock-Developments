#! /usr/bin/env node
import { runProgram } from './app/commands/index.js';
import { implementConfig } from './app/utils.js';

implementConfig();
runProgram();