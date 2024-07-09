import axios from "axios";
import { v4 } from "uuid";
import { MinecraftDataType } from "./minecraft.js";
import { FormatVersion, MolangTripleArray } from "./shared_types.js";
import { Directories } from "../file_manager.js";

const VERSION: MolangTripleArray = [1, 21, 2];

export interface IManifest {
    format_version: number;
    header: IManifestHeader
    modules: IManifestModule[];
    dependencies?: (IManifestDependencyPack|IManifestDependencyScript)[];
    metadata?: {
        authors: string[];
    }
}

export interface IManifestHeader {
    name: string;
    description?: string;
    uuid: string;
    version: MolangTripleArray;
    pack_scope?: string;
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
export class Manifest extends MinecraftDataType implements IManifest {
    format_version: number;
    header: IManifestHeader
    modules: IManifestModule[];
    dependencies?: (IManifestDependencyPack|IManifestDependencyScript)[];
    metadata?: {
        authors: string[];
    }
    
    constructor(filepath: string, template: IManifest) {
        super(filepath, template);
        this.format_version = template.format_version;
        this.header = template.header;
        this.modules = template.modules;
        this.dependencies = template.dependencies;
        this.metadata = template.metadata;
    }
}

export class WorldManifest extends Manifest {
    public static get DirectoryPath(): string {
        return `Content/world_template/manifest.json`;
    }

    public static createFromTemplate(): WorldManifest {
        return new WorldManifest(this.DirectoryPath, {
            format_version: 2,
            header: {
                name: "pack.name",
                description: "pack.description",
                uuid: v4(),
                lock_template_options: true,
                version: [1, 0, 0],
                base_game_version: VERSION,
                pack_scope: "world"
            },
            modules: [
                {
                    type: "world_template",
                    uuid: v4(),
                    version: [1, 0, 0]
                }
            ],
            metadata: {
                authors: []
            }
        });
    }

    public addAuthors(authors: string[]) {
        this.metadata?.authors?.push(...authors);
    }
}

export class SkinsManifest extends Manifest {
    public static get DirectoryPath(): string {
        return `Content/skin_pack/manifest.json`;
    }

    public static createFromTemplate(): WorldManifest {
        return new WorldManifest(this.DirectoryPath, {
            format_version: 1,
            header: {
                name: "pack.name",
                uuid: v4(),
                version: [1, 0, 0],
            },
            modules: [
                {
                    type: "skin_pack",
                    uuid: v4(),
                    version: [1, 0, 0]
                }
            ]
        });
    }
}

export class BehaviorManifest extends Manifest {
    public static get DirectoryPath(): string {
        return Directories.BEHAVIOR_PATH + 'manifest.json';
    }

    public static createFromTemplate(): BehaviorManifest {
        return new BehaviorManifest(this.DirectoryPath, {
            format_version: 2,
            header: {
                name: "pack.name",
                description: "pack.description",
                uuid: v4(),
                pack_scope: "world",
                version: [1, 0, 0],
                min_engine_version: VERSION
            },
            modules: [
                {
                    type: "data",
                    uuid: v4(),
                    version: [1, 0, 0]
                },
                {
                    language: "javascript",
                    type: "script",
                    uuid: v4(),
                    version: [1, 0, 0],
                    entry: "scripts/main.js"
                }
            ],
            dependencies: [],
        });
    }

    public addDependencies(uuids: string[], scripts: string[]) {
        uuids.forEach(uuid => {
            this.dependencies?.push({uuid, version: [1, 0, 0]});
        });

        scripts.forEach(async script => {
            const version = await getnpmLatestVersion(script);
            this.dependencies?.push({module_name: script, version});
        });
    }
}

export class ResourceManifest extends Manifest {
    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'manifest.json';
    }

    public static createFromTemplate(): ResourceManifest {
        return new ResourceManifest(this.DirectoryPath, {
            format_version: 2,
            header: {
                name: "pack.name",
                description: "pack.description",
                uuid: v4(),
                pack_scope: "world",
                version: [1, 0, 0],
                min_engine_version: VERSION
            },
            modules: [
                {
                    type: "resources",
                    uuid: v4(),
                    version: [1, 0, 0]
                }
            ],
            dependencies: [],
        });
    }

    public addDependencies(uuids: string[]) {
        uuids.forEach(uuid => {
            this.dependencies?.push({uuid, version: [1, 0, 0]});
        });
    }
}

async function getnpmLatestVersion(pack: string) {
    const result = await axios.get(`https://registry.npmjs.org/${pack}/latest`);
    return result.data.version;
}