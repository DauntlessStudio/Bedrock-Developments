import * as Global from './globals';
import { modifyAndWriteFile } from './file_manager';
import { getNamesObjects, jsonJoin } from './utils';

/**
 * @remarks adds new server side animations
 * @param names the animation names to add as entity.name
 * @param loop should the animation loop
 * @param commands the commands to run at 0.0
 * @param time the animation length
 */
export async function createNewAnimation(names: string[], loop: boolean, commands: string[], time: number) {
    const names_list = getNamesObjects(names);

    for (const name of names_list) {
        const source_path = `${Global.project_bp}animations/${name.pathname}${name.namespace}.json`;
        const default_path = `${Global.app_root}/src/animations/template_bp.json`;

        await modifyAndWriteFile({source_path: source_path, default_path: default_path, target_path: source_path}, (animation: any) => {
            jsonJoin(animation['animations'], {[`animation.${name.fullname}`]: {animation_length: time, loop: loop, timeline: {['0.0']: getCommands(commands, name.shortname)}}});
        }, {overwrite: true});
    }
}

/**
 * @remarks adds new client side animations
 * @param names the animation names to add as entity.name
 * @param animation_contents the animation itself as a json object
 */
export async function createNewClientAnimation(names: string[], animation_contents: any) {
    const names_list = getNamesObjects(names);

    for (const name of names_list) {
        const source_path = `${Global.project_rp}animations/${name.pathname}${name.namespace}.json`;
        const default_path = `${Global.app_root}/src/animations/template_bp.json`;

        await modifyAndWriteFile({source_path: source_path, default_path: default_path, target_path: source_path}, (animation: any) => {
            jsonJoin(animation['animations'], {[`animation.${name.fullname}`]: animation_contents});
        }, {overwrite: true});
    }
}

/**
 * @remarks adds new server side animation controller
 * @param names the controller names as entity.name
 * @param entry the commands to run in on_enter
 * @param exit the command to run in on_exit
 * @param anim the animations to run
 * @param query the query to enter the state
 * @param transition the querty to exit the state
 */
export async function createNewController(names:string[], entry: string[], exit: string[]|undefined, anim: string[]|undefined, query: string, transition: string|undefined) {
    let names_list = getNamesObjects(names);

    for (const name of names_list) {
        const source_path = `${Global.project_bp}animation_controllers/${name.pathname}${name.namespace}.json`;
        const default_path = `${Global.app_root}/src/animations/controller_template_bp.json`;

        await modifyAndWriteFile({source_path: source_path, default_path: default_path, target_path: source_path}, (animation: any) => {
            jsonJoin(animation['animation_controllers'], {
                [`controller.animation.${name.fullname}`]: {
                    initial_state: 'default',
                    states: {
                        default: {
                            transitions: [
                                {[name.shortname]: query}
                            ]
                        },
                        [name.shortname]: {
                            on_entry: getCommands(entry, `${name.shortname}`)
                        }
                    }
                }
            });
            
            if (anim) {
                animation['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname]['animations'] = anim;
            }
            if (transition) {
                animation['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname]['transitions'] = [{default: transition}];
            }
            if (exit) {
                animation['animation_controllers'][`controller.animation.${name.fullname}`]['states'][name.shortname]['on_exit'] = getCommands(exit, `${name.shortname}`);
            }
        }, {overwrite: true});
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