import {Instance} from 'chalk';
import * as path from 'path';

export const chalk = new Instance();

export class nameObject {
    fullname: string;
    namespace: string;
    shortname: string;
    displayname: string;
    pathname: string;
    constructor(fullname: string, namespace: string, shortname: string, displayname: string, pathname: string) {
        this.fullname = fullname;
        this.namespace = namespace;
        this.shortname = shortname;
        this.displayname = displayname;
        this.pathname = pathname
    }
}

export class NameData {
    original: string;
    fullname: string;
    namespace: string;
    shortname: string;
    display: string;
    directory: string;

    constructor(name: string) {
        this.original = name;
        this.directory = path.dirname(name) + '/';
        this.fullname = path.basename(name);
        this.namespace = this.fullname.split(/\.|:/).shift() ?? '';
        this.shortname = this.fullname.split(/\.|:/).pop() ?? '';

        const words = this.splitWords(this.shortname);
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }
        this.display = words.join(' ');
    }

    splitWords(name: string): string[] {
        name.replace(/_/g, ' ');
        return name.split(' ');
    }
}

/**
 * @remarks breaks a name input into usable parts
 * @param input the name to be taken apart i.e. namespace:template_entity
 * @returns an object containing parts of the name
 */
export function getNameObject(input: string) {
    let paths = input.replace(/\/|\\+/, '/').split('/');
    let local_fullname = paths.pop();
    let local_pathname = paths.join('/');
    local_pathname = local_pathname ? local_pathname + '/' : '';
    let local_namespace = local_fullname?.split(/\.|:/).shift();
    let local_shortname = local_fullname?.split(/\.|:/).pop();
    let local_displayname = local_shortname?.replace(/_/g, ' ');
    
    if (local_displayname) {
        const words = local_displayname.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }
        local_displayname = words.join(' ');
    }

    return new nameObject(local_fullname!, local_namespace!, local_shortname!, local_displayname!, local_pathname);
}

/**
 * @remarks breaks multiple nmaes into usable parts
 * @param inputs an array of names to be taken apart
 * @returns an array of custom name objects
 */
export function getNamesObjects(inputs: string[]) {
    let names = [];
    for (const name of inputs) {
        names.push(getNameObject(name));
    }

    return names;
}

export function isNumeric(str: string|undefined) {
    if (str === undefined) {
        return false;
    }
    return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}

export function pushUnique(arr: any[], value: any) {
    if (!arr.includes(value)) {
        arr.push(value);
    }
}

export function jsonJoin(source: any, target: any) {
    let new_obj = {...source, ...target};
    Object.assign(source, new_obj);
}