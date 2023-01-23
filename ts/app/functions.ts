import * as Global from './globals';
import { writeFileFromString } from './file_manager';
import { getNamesObjects } from './utils';

export async function createNewFunction(names: string[], commands: string, number: number, description: string|undefined, source: string|undefined) {
    let names_list = getNamesObjects(names);
    commands ||= 'say $f';
    let command_list = commands.split(/;|\n/);
    for (const name of names_list) {
        let desc = description ? `## ${description.toUpperCase()}` : `## ${name.fullname?.toUpperCase()}`;
        let src = source ? `## ${source.toUpperCase()}` : `## CALLED FROM ???`;
        let data = `${desc}\n${src}\n`;
        for (let index = 1; index <= number; index++) {
            for (let command of command_list) {
                command = command.replace(/\$[fF]/, name.fullname!);
                command = command.replace(/\$[iI]/, `${index}`);
                command = command.replace(/^\//, '');
                data += `\n${command}`;
            }
        }
        writeFileFromString(`${Global.project_bp}functions/${name.pathname}${name.fullname}.mcfunction`, data, true);
    }
}