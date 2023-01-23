/**
 * @remarks breaks a name input into usable parts
 * @param input the name to be taken apart i.e. namespace:template_entity
 * @returns an object containing parts of the name
 */
export declare function getNameObject(input: string): {
    fullname: string | undefined;
    namespace: string | undefined;
    shortname: string | undefined;
    displayname: string | undefined;
    pathname: string;
};
/**
 * @remarks breaks multiple nmaes into usable parts
 * @param inputs an array of names to be taken apart
 * @returns an array of custom name objects
 */
export declare function getNamesObjects(inputs: string[]): {
    fullname: string | undefined;
    namespace: string | undefined;
    shortname: string | undefined;
    displayname: string | undefined;
    pathname: string;
}[];
