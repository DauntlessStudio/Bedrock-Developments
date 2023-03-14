import * as Global from './globals';
import { readJSONFromFile, writeFileFromJSON } from './file_manager';
import { getNamesObjects } from './utils';

export async function createNewAnimation(names: string[], loop: boolean, commands: string[], time: number) {
    let names_list = getNamesObjects(names);

    for (const name of names_list) {
        let animation = await (await readJSONFromFile(`${Global.project_bp}animations/${name.pathname}${name.namespace}.json`, `${Global.app_root}/src/animations/template_bp.json`)).shift();;
        animation!.json['animations'][`animation.${name.fullname}`] = {};
        animation!.json['animations'][`animation.${name.fullname}`]['animation_length'] = time;
        animation!.json['animations'][`animation.${name.fullname}`]['loop'] = loop;
        animation!.json['animations'][`animation.${name.fullname}`]['timeline'] = {};
        animation!.json['animations'][`animation.${name.fullname}`]['timeline']['0.0'] = getCommands(commands, name.shortname!);

        writeFileFromJSON(`${Global.project_bp}animations/${name.pathname}${name.namespace}.json`, animation?.json, true);
    }
}

export async function createNewController(names:string[], entry: string[], exit: string[]|undefined, anim: string[]|undefined, query: string, transition: string|undefined) {
    let names_list = getNamesObjects(names);

    for (const name of names_list) {
        let animation = await (await readJSONFromFile(`${Global.project_bp}animation_controllers/${name.pathname}${name.namespace}.json`, `${Global.app_root}/src/animations/controller_template_bp.json`)).shift();;
        animation!.json['animation_controllers'][`controller.animation.${name.fullname}`] = {initial_state: 'default', states: {default: {transitions: [{}]}}};
        animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states']['default']['transitions'][0][name.shortname!] = String(query);
        animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname!] = {};
        animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname!]['on_entry'] = getCommands(entry, `${name.shortname}`);
        if (anim) {
            animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname!]['animations'] = anim;
        }
        if (transition) {
            animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname!]['transitions'] = [{default: String(transition)}];
        }
        if (exit) {
            animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname!]['on_exit'] = getCommands(exit, `${name.shortname}`);
        }

        writeFileFromJSON(`${Global.project_bp}animation_controllers/${name.pathname}${name.namespace}.json`, animation?.json, true);
    }
}

function getCommands(commands: string[], name: string) {
    let new_commands: string[] = [];
    for (const command of commands) {
        let new_command = command;
        if (!command.startsWith('/')) {
            new_command = `/${new_command}`;
        }
        new_command = new_command.replace('anim_name', name);
        new_commands.push(new_command);
    }
    return new_commands;
}