import * as Global from './globals';
import { readJSONFromFile, writeFileFromJSON } from './file_manager';
import { getNamesObjects } from './utils';

export async function createNewAnimation(names: string[], loop: boolean, commands: string, time: number) {
    let names_list = getNamesObjects(names);

    for (const name of names_list) {
        let animation = await (await readJSONFromFile(`${Global.project_bp}animations/${name.pathname}${name.namespace}.json`, `${Global.app_root}/src/animations/template_bp.json`)).shift();;
        animation!.json['animations'][`animation.${name.fullname}`] = {};
        animation!.json['animations'][`animation.${name.fullname}`]['animation_length'] = Number(time);
        animation!.json['animations'][`animation.${name.fullname}`]['loop'] = loop;
        animation!.json['animations'][`animation.${name.fullname}`]['timeline'] = {};
        animation!.json['animations'][`animation.${name.fullname}`]['timeline']['0.0'] = getCommands(commands, name.shortname!);

        writeFileFromJSON(`${Global.project_bp}animations/${name.pathname}${name.namespace}.json`, animation?.json, true);
    }
}

export async function createNewController(names:string[], entry: string, exit: string|undefined, anim: string|undefined, query: string|undefined, transition: string) {
    let names_list = getNamesObjects(names);

    for (const name of names_list) {
        let animation = await (await readJSONFromFile(`${Global.project_bp}animation_controllers/${name.pathname}${name.namespace}.json`, `${Global.app_root}/src/animations/controller_template_bp.json`)).shift();;
        animation!.json['animation_controllers'][`controller.animation.${name.fullname}`] = {initial_state: 'default', states: {default: {transitions: [{}]}}};
        animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states']['default']['transitions'][0][name.shortname!] = query;
        animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname!] = {};
        animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname!]['on_entry'] = getCommands(entry, `Entered ${name.shortname}`);
        if (anim) {
            animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname!]['animations'] = getAnimations(anim);
        }
        if (transition) {
            animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname!]['transitions'] = [{default: transition}];
        }
        if (exit) {
            animation!.json['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname!]['on_exit'] = getCommands(exit, `Exited ${name.shortname}`);
        }

        writeFileFromJSON(`${Global.project_bp}animation_controllers/${name.pathname}${name.namespace}.json`, animation?.json, true);
    }
}

function getCommands(commands: string, name: string) {
    let new_commands = [];
    if (commands === '/say anim_name') {
        new_commands.push(`/say ${name}`);
    }else {
        new_commands = commands.split(/ ?\//);
        new_commands.shift();
        new_commands.forEach(function(part, index, array) {
            array[index] = `/${part}`;
        });
    }
    return new_commands;
}

function getAnimations(animations: string) {
    let new_commands = animations.split(' ');
    new_commands.shift();
    new_commands.forEach(function(part, index, array) {
        array[index] = `/${part}`;
    });
    return new_commands;
}