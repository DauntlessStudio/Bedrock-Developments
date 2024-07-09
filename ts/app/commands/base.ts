import { Directories } from '../file_manager.js';
import { setAddonName } from '../utils.js';
import { CommandMap } from './command_map.js';
import { VERSION } from './version.js';

CommandMap.addCommand("root", {
    commandOptions(command) {
        command
        .name('bed')
        .description('CLI to assist Minecraft Bedrock development')
        .option('--rpath <rp>', 'path to resource pack')
        .on('option:rpath', setResourcePath)
        .option('--bpath <bp>', 'path to behavior pack')
        .on('option:bpath', setBehaviorPath)
        .option('--addon <addon namespace>', 'namespace for addon content as <team_name>_<project_name>')
        .on('option:addon', setAddonName)
        .version(VERSION, '-V, --version')
    }
});

function setResourcePath(rp: string) {
  Directories.BEHAVIOR_PATH = rp;
}

function setBehaviorPath(bp: string) {
  Directories.BEHAVIOR_PATH = bp;
}