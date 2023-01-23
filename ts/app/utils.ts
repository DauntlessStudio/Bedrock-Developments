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

    return {fullname: local_fullname, namespace: local_namespace, shortname: local_shortname, displayname: local_displayname, pathname: local_pathname};
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