export declare const chalk: import("chalk").ChalkInstance;
export declare const currentFormatVersion = "1.20.50";
export declare class NameData {
    original: string;
    fullname: string;
    namespace: string;
    shortname: string;
    display: string;
    directory: string;
    constructor(name: string);
    splitWords(name: string): string[];
}
export declare function isObject(item: any): any;
export default function mergeDeep(target: any, source: any): any;
