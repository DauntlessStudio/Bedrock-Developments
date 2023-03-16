import * as Global from './globals';
import { writeFileFromString } from './file_manager';
import { getNamesObjects } from './utils';

interface functionOptions {
    description?: string,
    source?: string,
    origin?: string,
}

export async function createNewFunction(names: string[], commands: string, number: number, options: functionOptions) {
    let names_list = getNamesObjects(names);
    commands ||= 'say $f';
    let command_list = commands.split(/;|\n/);
    for (const name of names_list) {
        let desc = options.description ? `## ${options.description.toUpperCase()}` : `## ${name.fullname?.toUpperCase()}`;
        let src = options.source ? `## ${options.source.toUpperCase()}` : `## CALLED FROM ???`;
        let org = origin ? `## @s=${origin.toUpperCase()}` : `## @s=???`;
        let data = `${desc}\n${src}\n${org}\n`;
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