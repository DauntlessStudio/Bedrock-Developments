import {Argument, Command, Option, OptionValues} from 'commander';
import { Directories } from '../file_manager.js';
import axios from 'axios';
import { chalk } from '../utils.js';

const version = '3.0.0';
export const program = new Command();

program
.name('bed')
.description('CLI to assist Minecraft Bedrock development')
.option('--rpath <rp>', 'Path to Resource Pack')
.on('option:rpath', setResourcePath)
.option('--bpath <bp>', 'Path to Behavior Pack')
.on('option:bpath', setBehaviorPath)
.version(version, '-V, --version')
.action(printVersion);

function setResourcePath(rp: string) {
  Directories.BEHAVIOR_PATH = rp;
}

function setBehaviorPath(bp: string) {
  Directories.BEHAVIOR_PATH = bp;
}

export async function printVersion() {
  let result = await axios.get('https://registry.npmjs.org/bedrock-development/latest');
  let latest_version = result.data.version;
  if (version !== latest_version) {
    console.log(`${chalk.yellow(`A new release of bed is available:`)} ${chalk.cyan(`${version} → ${latest_version}`)}`);
    console.log(`${chalk.yellow('npm i bedrock-development@latest -g')}`);
  }
}