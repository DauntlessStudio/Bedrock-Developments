import { printVersion, } from "../base.js";
import { program_project } from "./project.js";
import { chalk } from "../../utils.js";
import { MOJANG } from "../../types/index.js";
import * as fs from 'fs';
import * as path from 'path';
import { Directories, copySourceDirectory } from "../../file_manager.js";

const DEV_BP = MOJANG + "/development_behavior_packs";
const DEV_RP = MOJANG + "/development_resource_packs";

program_project.command('install')
.description('install your project into the development behavior/resource packs')
.action(triggerProjectInstall)
.hook('postAction', printVersion);

function triggerProjectInstall() {
  if (!fs.existsSync(DEV_BP) || !fs.existsSync(DEV_RP)) {
    console.error(`${chalk.red(`Cannot install into ${MOJANG} as it doesn't exist`)}`);
    return;
  }

  if (fs.lstatSync(Directories.BEHAVIOR_PATH).isSymbolicLink()) {
    console.warn(`${chalk.yellow(`Ignoring BP as ${Directories.BEHAVIOR_PATH} is already a symlink`)}`);
  } else {
    try {
      const current_bp = Directories.BEHAVIOR_PATH;
      copySourceDirectory(current_bp, DEV_BP + "/" + path.basename(current_bp));
      fs.rmSync(current_bp, {force: true, recursive: true});
      fs.symlinkSync(DEV_BP + "/" + path.basename(current_bp), current_bp, "junction");
      console.log(`${chalk.green(`Created link ${Directories.BEHAVIOR_PATH}`)}`);
    } catch (error) {
      console.error(`${chalk.red(`Failed to link ${Directories.BEHAVIOR_PATH}, resources are busy. Try closing any applictions using these folders (i.e. vscode) and try command again`)}`);
    }
  }

  if (fs.lstatSync(Directories.RESOURCE_PATH).isSymbolicLink()) {
    console.warn(`${chalk.yellow(`Ignoring RP as ${Directories.RESOURCE_PATH} is already a symlink`)}`);
  } else {
    try {
      const current_rp = Directories.RESOURCE_PATH;
      copySourceDirectory(current_rp, DEV_RP + "/" + path.basename(current_rp));
      fs.rmSync(current_rp, {force: true, recursive: true});
      fs.symlinkSync(DEV_RP + "/" + path.basename(current_rp), current_rp, "junction");
      console.log(`${chalk.green(`Created link ${Directories.RESOURCE_PATH}`)}`);
    } catch (error) {
      console.error(`${chalk.red(`Failed to link ${Directories.RESOURCE_PATH}, resources are busy. Try closing any applictions using these folders (i.e. vscode) and try command again`)}`);
    }
  }
}