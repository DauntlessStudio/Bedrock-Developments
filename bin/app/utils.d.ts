/**
 * @remarks A globally accessible instance of the {@link Chalk} class that provides colored text in the terminal.
 */
export declare const chalk: import("chalk").ChalkInstance;
/**
 * @remarks The format version shared by all Minecraft Types.
 */
export declare const currentFormatVersion = "1.20.50";
/**
 * @remarks A class for working with name data like identifiers.
 */
export declare class NameData {
    /**
     * @remarks The original source string, i.e. `subfolder/minecraft:test`.
     */
    original: string;
    /**
     * @remarks The full identifier of the source string, i.e. `minecraft:test`.
     */
    fullname: string;
    /**
     * @remarks The namespace of the source stirng, i.e. `minecraft:test`.
     */
    namespace: string;
    /**
     * @remarks The shortname of the source string, i.e. `test` from either `minecraft:test` or `geometry.test`.
     */
    shortname: string;
    /**
     * @remarks The display name of the source string as used in the lang, i.e. `Test`.
     */
    display: string;
    /**
     * @remarks The directory name of the source string, i.e. `subfolder/`.
     */
    directory: string;
    /**
     * @remarks Creates a namedata object from a source string.
     * @param name The source string to create namedata from.
     * @example
     * ```typescript
     * let name = new NameData("subfolder/minecraft:test");
     * ```
     */
    constructor(name: string);
    private splitWords;
}
/**
 * @remarks Determines if a value is an object or a primitive.
 * @param item The item to check.
 * @returns True if the item is an object.
 */
export declare function isObject(item: any): boolean;
/**
 * @remarks Performs a deep merge between two objects.
 * @param target The target object to merge with.
 * @param source The source object to merge with the target.
 * @returns An object with the properties of the source and target merged deeply.
 * @example
 * ```typescript
 * mergeDeep({subProperty: {targetKey: 1}}, {subProperty: {sourceKey: 2}});
 * // Returns {subProperty: {targetKey: 1, sourceKey: 2}};
 * ```
 */
export declare function mergeDeep(target: any, source: any): any;
