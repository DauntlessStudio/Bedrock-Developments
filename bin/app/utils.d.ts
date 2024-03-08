export declare const chalk: import("chalk").Chalk;
export declare class nameObject {
    fullname: string;
    namespace: string;
    shortname: string;
    displayname: string;
    pathname: string;
    constructor(fullname: string, namespace: string, shortname: string, displayname: string, pathname: string);
}
export declare class NameData {
    fullname: string;
    namespace: string;
    shortname: string;
    display: string;
    directory: string;
    constructor(name: string);
    splitWords(name: string): string[];
}
/**
 * @remarks breaks a name input into usable parts
 * @param input the name to be taken apart i.e. namespace:template_entity
 * @returns an object containing parts of the name
 */
export declare function getNameObject(input: string): nameObject;
/**
 * @remarks breaks multiple nmaes into usable parts
 * @param inputs an array of names to be taken apart
 * @returns an array of custom name objects
 */
export declare function getNamesObjects(inputs: string[]): nameObject[];
export declare function isNumeric(str: string | undefined): boolean;
export declare function pushUnique(arr: any[], value: any): void;
export declare function jsonJoin(source: any, target: any): void;
