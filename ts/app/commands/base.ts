import { Command } from 'commander';
import { Directories } from '../file_manager.js';
import axios from 'axios';
import { chalk, setAddonName } from '../utils.js';

const version = '3.0.0';
export const program = new Command();

program
.name('bed')
.description('CLI to assist Minecraft Bedrock development')
.option('--rpath <rp>', 'path to resource pack')
.on('option:rpath', setResourcePath)
.option('--bpath <bp>', 'path to behavior pack')
.on('option:bpath', setBehaviorPath)
.option('--addon <addon namespace>', 'namespace for addon content as <team_name>_<project_name>')
.on('option:addon', setAddonName)
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