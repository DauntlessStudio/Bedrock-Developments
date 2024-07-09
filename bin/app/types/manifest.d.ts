import { MinecraftDataType } from "./minecraft.js";
import { FormatVersion, MolangTripleArray } from "./shared_types.js";
export interface IManifest {
    format_version: number;
    header: IManifestHeader;
    modules: IManifestModule[];
    dependencies?: (IManifestDependencyPack | IManifestDependencyScript)[];
    metadata?: {
        authors: string[];
    };
}
export interface IManifestHeader {
    name: string;
    description: string;
    uuid: string;
    pack_scope: string;
    version: MolangTripleArray;
    min_engine_version?: MolangTripleArray;
    allow_random_seed?: boolean;
    lock_template_options?: boolean;
    base_game_version?: MolangTripleArray;
}
export interface IManifestModule {
    type: string;
    uuid: string;
    version: MolangTripleArray;
    entry?: string;
    language?: string;
}
export interface IManifestDependencyScript {
    module_name: string;
    version: FormatVersion;
}
export interface IManifestDependencyPack {
    uuid: string;
    version: MolangTripleArray;
}
/**
 * @remarks A class for working with manifest files.
 */
export declare class Manifest extends MinecraftDataType implements IManifest {
    format_version: number;
    header: IManifestHeader;
    modules: IManifestModule[];
    dependencies?: (IManifestDependencyPack | IManifestDependencyScript)[];
    metadata?: {
        authors: string[];
    };
    constructor(filepath: string, template: IManifest);
}
export declare class WorldManifest extends Manifest {
    static get DirectoryPath(): string;
    static createFromTemplate(): WorldManifest;
    addAuthors(authors: string[]): void;
}
export declare class BehaviorManifest extends Manifest {
    static get DirectoryPath(): string;
    static createFromTemplate(): BehaviorManifest;
    addDependencies(uuids: string[], scripts: string[]): void;
}
export declare class ResourceManifest extends Manifest {
    static get DirectoryPath(): string;
    static createFromTemplate(): ResourceManifest;
    addDependencies(uuids: string[]): void;
}
