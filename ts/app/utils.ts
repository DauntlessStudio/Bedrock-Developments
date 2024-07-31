import {Chalk} from 'chalk';
import * as path from 'path';
import { Directories, getFiles, setFiles } from './file_manager.js';

/**
 * @remarks A globally accessible instance of the {@link Chalk} class that provides colored text in the terminal.
 */
export const chalk = new Chalk();

/**
 * @remarks The format version shared by all Minecraft Types.
 */
export const currentFormatVersion = '1.20.50';

/**
 * @remarks A class for working with name data like identifiers.
 */
export class NameData {
    private static teamName: string = '';
    private static projectName: string = '';

    /**
     * @remarks The original source string, i.e. `subfolder/minecraft:test`.
     */
    public original: string;

    /**
     * @remarks The full identifier of the source string, i.e. `minecraft:test`.
     */
    public fullname: string;

    /**
     * @remarks The namespace of the source stirng, i.e. `minecraft:test`.
     */
    public namespace: string;

    /**
     * @remarks The shortname of the source string, i.e. `test` from either `minecraft:test` or `geometry.test`.
     */
    public shortname: string;

    /**
     * @remarks The display name of the source string as used in the lang, i.e. `Test`.
     */
    public display: string;

    /**
     * @remarks The directory name of the source string, i.e. `subfolder/`.
     */
    public directory: string;
    
    /**
     * @remarks The name of the development team.
     */
    public static get TeamName() : string {
        return NameData.teamName;
    }
    
    /**
     * @remarks The name of the Project
     */
    public static get ProjectName() : string {
        return NameData.projectName;
    }
    
    /**
     * @remarks Creates a namedata object from a source string.
     * @param name The source string to create namedata from.
     * @example
     * ```typescript
     * let name = new NameData("subfolder/minecraft:test");
     * ```
     */
    constructor(name: string) {
        this.original = name;
        this.fullname = path.basename(name);
        this.namespace = this.fullname.split(/\.|:/)[0] ?? `${NameData.teamName}_${NameData.ProjectName}`;
        this.shortname = this.fullname.split(/\.|:/).pop() ?? '';

        if (!this.fullname.includes(this.namespace)) {
            this.fullname = this.namespace + ':' + this.shortname;
        }
        
        this.directory = path.dirname(name) + '/';
        if (this.directory === './') {
            this.directory = '';
        }

        const words = this.splitWords(this.shortname);
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }

        this.display = words.join(' ');
    }

    private splitWords(name: string): string[] {
        name = name.replace(/_/g, ' ');
        return name.split(' ');
    }

    public static setAddonNamespace(namespace: string) {
        NameData.teamName = namespace.split(/_/).shift() ?? '';
        NameData.projectName = namespace.split(/_/).pop() ?? '';
    }
}

/**
 * @remarks Determines if a value is an object or a primitive.
 * @param item The item to check.
 * @returns True if the item is an object.
 */
export function isObject(item: any): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}

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
export function mergeDeep(target: any, source: any) {
	let output = Object.assign({}, target);
	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach((key) => {
			if (isObject(source[key])) {
				if (!(key in target)) Object.assign(output, { [key]: source[key] });
				else output[key] = mergeDeep(target[key], source[key]);
			} else if (Array.isArray(source[key])) {
				if (!(key in target)) Object.assign(output, { [key]: source[key] });
				else Object.assign(output, { [key]: target[key].concat(source[key]) });
			} else {
				Object.assign(output, { [key]: source[key] });
			}
		});
	}
	return output;
}

/**
 * @remarks The format of the bedrock.config.json file.
 */
export interface IConfigData {
    addon_namespace: string;
}

/**
 * @remarks Gets the config data from the working directory.
 */
export function getConfig(): IConfigData|undefined {
    const config = getFiles('bedrock.config.json')[0];
    if (config) {
      return JSON.parse(config.fileContents) as any;
    }
}

export function implementConfig() {
    const config = getConfig();
    if (config) {
        setAddonName(config.addon_namespace);
        console.log(`${chalk.green(`Got addon namespace (${config.addon_namespace}) from config file`)}`);
    }
}

/**
 * @remarks Sets the bedrock.config.json file contents.
 * @param config The config data to write.
 */
export function setConfig(config: IConfigData) {
    const files = getFiles('bedrock.config.json');
    if (!files.length) {
        files.push({filePath: 'bedrock.config.json', fileContents: ''});
    }

    files.forEach(file => {
        file.fileContents = JSON.stringify(config, null, '\t');
        file.handleExisting = 'overwrite';
    });

    setFiles(files);
}

/**
 * @remarks Sets the global addon data from the addon namespace.
 * @param addon The addon name as <team_name>_<project_name>.
 */
export function setAddonName(addon: string) {
    Directories.ADDON_PATH = addon.replace(/_/, '/');
    NameData.setAddonNamespace(addon);
}