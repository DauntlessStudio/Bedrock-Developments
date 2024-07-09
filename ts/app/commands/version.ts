import { Directories, getFiles } from '../file_manager.js';
import axios from 'axios';
import { chalk } from '../utils.js';

export const VERSION = JSON.parse(getFiles(Directories.PACKAGE_PATH)[0].fileContents).version;

export async function printVersion() {
    const result = await axios.get('https://registry.npmjs.org/bedrock-development/latest');
    const latest_version = result.data.version;
    if (VERSION !== latest_version) {
        console.log(`${chalk.yellow(`A new release of bed is available:`)} ${chalk.cyan(`${VERSION} → ${latest_version}`)}`);
        console.log(`${chalk.yellow('npm i bedrock-development@latest -g')}`);
    }
}