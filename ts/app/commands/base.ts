import { Command } from 'commander';
import { Directories, getFiles } from '../file_manager.js';
import axios from 'axios';
import { chalk, setAddonName } from '../utils.js';

const version = JSON.parse(getFiles(Directories.PACKAGE_PATH)[0].fileContents).version;
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
  const result = await axios.get('https://registry.npmjs.org/bedrock-development/latest');
  const latest_version = result.data.version;
  if (version !== latest_version) {
    console.log(`${chalk.yellow(`A new release of bed is available:`)} ${chalk.cyan(`${version} → ${latest_version}`)}`);
    console.log(`${chalk.yellow('npm i bedrock-development@latest -g')}`);
  }
}