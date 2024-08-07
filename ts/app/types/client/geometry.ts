import { Directories } from "../../file_manager.js";
import { NameData } from "../../utils.js";
import { MinecraftDataType } from "../minecraft.js";
import { FormatVersion, MolangDoubleArray, MolangTripleArray } from "../shared_types.js";

export type GeometryName = `geometry.${string}`;

export interface IClientGeometry {
    format_version: FormatVersion;
    "minecraft:geometry"?: IClientGeometryNew[];
    [key: GeometryName]: IClientGeometryOld;
}

export interface IClientGeometryNew {
    description: {
        identifier: GeometryName;
        texture_width: number;
        texture_height: number;
        visible_bounds_width: number;
        visible_bounds_height: number;
        visible_bounds_offset: MolangTripleArray;
    },
    bones: IClientGeometryBone[],
    cape?: string;
}

export interface IClientGeometryOld {
    texturewidth?: number;
    textureheight?: number;
    visible_bounds_width?: number;
    visible_bounds_height?: number;
    visible_bounds_offset?: MolangTripleArray;
    bones: IClientGeometryBone[];
}

export interface IClientGeometryBone {
    name?: string;
    pivot?: MolangTripleArray;
    parent?: string;
    locators?: Record<string, {offset: MolangTripleArray, rotation: MolangTripleArray, ignore_inherited_scale: boolean}|MolangTripleArray>;
    binding?: string;
    inflate?: number;
    mirror?: boolean;
    origin?: MolangTripleArray;
    reset?: boolean;
    rotation?: MolangTripleArray;
    size?: MolangTripleArray;
    neverRender?: boolean
    uv?: MolangDoubleArray|{
        up: IClientGeometryPerFaceUV;
        down: IClientGeometryPerFaceUV;
        east: IClientGeometryPerFaceUV;
        west: IClientGeometryPerFaceUV;
        north: IClientGeometryPerFaceUV;
        south: IClientGeometryPerFaceUV;
    }
    cubes?: IClientGeometryCube[];
}

export interface IClientGeometryPerFaceUV {
    material_instance?: string;
    uv: MolangDoubleArray;
    uv_size: MolangDoubleArray;
}

export interface IClientGeometryCube {
    origin?: MolangTripleArray;
    size?: MolangTripleArray;
    uv?: MolangDoubleArray;
    inflate?: number;
    mirror?: boolean;
    pivot?: MolangTripleArray;
    reset?: boolean;
    rotation?: MolangTripleArray;
}

export class ClientGeometry extends MinecraftDataType implements IClientGeometry {
    format_version: FormatVersion;
    "minecraft:geometry"?: IClientGeometryNew[];
    [key: GeometryName]: IClientGeometryOld;

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'models/';
    }
    
    constructor(filepath: string, template: IClientGeometry) {
        super(filepath, template);
        this.format_version = template.format_version;
        if ("minecraft:geometry" in template) {
            this["minecraft:geometry"] = template["minecraft:geometry"];
        } else {
            Object.getOwnPropertyNames(template).forEach(prop => {
                if (prop.startsWith('geometry.')) {
                    this[prop as GeometryName] = template[prop as GeometryName];
                }
            });
        }
    }

    public static createFromTemplate(nameData: NameData): ClientGeometry {
        return new ClientGeometry(this.createFilePath(nameData), {
            format_version: "1.20.50",
            "minecraft:geometry": [
              {
                description: {
                  identifier: `geometry.${nameData.namespace}.${nameData.shortname}`,
                  texture_width: 64,
                  texture_height: 64,
                  visible_bounds_width: 2,
                  visible_bounds_height: 3,
                  visible_bounds_offset: [0, 0.5, 0]
                },
                bones: [
                  {
                    name: "body",
                    pivot: [0, 0, 0],
                    cubes: [
                      {
                        origin: [-8, 0, -8],
                        size: [16, 16, 16],
                        uv: [0, 0],
                      }
                    ]
                  }
                ]
              }
            ]
        });
    }
    
    public static createFilePath(nameData: NameData): string {
        return this.DirectoryPath + nameData.directory + nameData.shortname + ".geo.json";
    }
}

export class ClientGeometryAttachable extends ClientGeometry {
    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'models/entity/player/';
    }

    public static createFromTemplate(nameData: NameData): ClientGeometry {
        return new ClientGeometry(this.createFilePath(nameData), {
            format_version: "1.20.50",
            "minecraft:geometry": [
              {
                description: {
                  identifier: `geometry.${nameData.namespace}.player.${nameData.shortname}`,
                  texture_width: 32,
                  texture_height: 32,
                  visible_bounds_width: 3,
                  visible_bounds_height: 4.5,
                  visible_bounds_offset: [0, 1.75, 0]
                },
                bones: [
                    {
                        name: "root",
                        pivot: [0, 0, 0]
                    },
                    {
                        name: "waist",
                        parent: "root",
                        pivot: [0, 12, 0]
                    },
                    {
                        name: "body",
                        parent: "waist",
                        pivot: [0, 24, 0]
                    },
                    {
                        name: "head",
                        parent: "body",
                        pivot: [0, 24, 0]
                    },
                    {
                        name: "hat",
                        parent: "head",
                        pivot: [0, 24, 0]
                    },
                    {
                        name: "cape",
                        parent: "body",
                        pivot: [0, 24, 3]
                    },
                    {
                        name: "leftArm",
                        parent: "body",
                        pivot: [5, 22, 0]
                    },
                    {
                        name: "leftSleeve",
                        parent: "leftArm",
                        pivot: [5, 22, 0]
                    },
                    {
                        name: "leftItem",
                        parent: "leftArm",
                        pivot: [6, 15, 1]
                    },
                    {
                        name: "rightArm",
                        parent: "body",
                        pivot: [-5, 22, 0]
                    },
                    {
                        name: "rightSleeve",
                        parent: "rightArm",
                        pivot: [-5, 22, 0]
                    },
                    {
                        name: "rightItem",
                        parent: "rightArm",
                        pivot: [-6, 15, 1],
                        locators: {
                            lead_hold: [-6, 15, 1]
                        }
                    },
                    {
                        name: "first_person_fix",
                        parent: "rightItem",
                        pivot: [-6, 8, 0]
                    },
                    {
                        name: nameData.shortname,
                        parent: "first_person_fix",
                        pivot: [-6, 8, 0],
                        cubes: [
                            {origin: [-10, 4, -4], size: [8, 8, 8], uv: [0, 0]}
                        ]
                    },
                    {
                        name: "jacket",
                        parent: "body",
                        pivot: [0, 24, 0]
                    },
                    {
                        name: "leftLeg",
                        parent: "root",
                        pivot: [1.9, 12, 0]
                    },
                    {
                        name: "leftPants",
                        parent: "leftLeg",
                        pivot: [1.9, 12, 0]
                    },
                    {
                        name: "rightLeg",
                        parent: "root",
                        pivot: [-1.9, 12, 0]
                    },
                    {
                        name: "rightPants",
                        parent: "rightLeg",
                        pivot: [-1.9, 12, 0]
                    }
                ]
              }
            ]
        });
    }
    
    public static createFilePath(nameData: NameData): string {
        return this.DirectoryPath + nameData.directory + nameData.shortname + ".geo.json";
    }
}

export class ClientGeometryArmor extends ClientGeometry {
    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'models/entity/armor/';
    }

    public static createFromTemplate(nameData: NameData): ClientGeometry {
        const geo = new ClientGeometry(this.createFilePath(nameData), {
            format_version: "1.8.0",
        });

        geo[`geometry.${nameData.namespace}.player.${nameData.shortname}.armor.base`] = {
            texturewidth: 64,
            textureheight: 64,
            visible_bounds_width: 3,
            visible_bounds_height: 3,
            visible_bounds_offset: [0, 1.5, 0],
            bones: [
                {
                    "name": "waist",
                    "pivot": [0, 12, 0]
                },
                {
                    "name": "body",
                    "parent": "waist",
                    "pivot": [0, 24, 0],
                    "cubes": [
                        {"origin": [-4, 12, -2], "size": [8, 12, 4], "uv": [16, 16], "inflate": 1.01}
                    ]
                },
                {
                    "name": "head",
                    "parent": "body",
                    "pivot": [0, 24, 0],
                    "cubes": [
                        {"origin": [-4, 24, -4], "size": [8, 8, 8], "uv": [0, 0], "inflate": 1}
                    ]
                },
                {
                    "name": "hat",
                    "parent": "head",
                    "pivot": [0, 24, 0],
                    "cubes": [
                        {"origin": [-4, 24, -4], "size": [8, 8, 8], "uv": [32, 0], "inflate": 1}
                    ]
                },
                {
                    "name": "rightArm",
                    "parent": "body",
                    "pivot": [-5, 22, 0],
                    "cubes": [
                        {"origin": [-8, 12, -2], "size": [4, 12, 4], "uv": [40, 16], "inflate": 1}
                    ]
                },
                {
                    "name": "rightItem",
                    "parent": "rightArm",
                    "pivot": [-6, 15, 1]
                },
                {
                    "name": "leftArm",
                    "parent": "body",
                    "pivot": [5, 22, 0],
                    "mirror": true,
                    "cubes": [
                        {"origin": [4, 12, -2], "size": [4, 12, 4], "uv": [40, 16], "inflate": 1}
                    ]
                },
                {
                    "name": "torso",
                    "parent": "body",
                    "pivot": [0, 24, 0],
                    "cubes": [
                        {"origin": [-4, 12, -2], "size": [8, 12, 4], "uv": [16, 48], "inflate": 0.5}
                    ]
                },
                {
                    "name": "rightLeg",
                    "parent": "body",
                    "pivot": [-1.9, 12, 0],
                    "cubes": [
                        {"origin": [-3.9, 0, -2], "size": [4, 12, 4], "uv": [0, 48], "inflate": 0.49}
                    ]
                },
                {
                    "name": "rightBoot",
                    "parent": "rightLeg",
                    "pivot": [-1.9, 12, 0],
                    "cubes": [
                        {"origin": [-3.9, 0, -2], "size": [4, 12, 4], "uv": [0, 16], "inflate": 1}
                    ]
                },
                {
                    "name": "leftLeg",
                    "parent": "body",
                    "pivot": [1.9, 12, 0],
                    "mirror": true,
                    "cubes": [
                        {"origin": [-0.1, 0, -2], "size": [4, 12, 4], "uv": [0, 48], "inflate": 0.49}
                    ]
                },
                {
                    "name": "leftBoot",
                    "parent": "leftLeg",
                    "pivot": [1.9, 12, 0],
                    "mirror": true,
                    "cubes": [
                        {"origin": [-0.1, 0, -2], "size": [4, 12, 4], "uv": [0, 16], "inflate": 1}
                    ]
                }
            ],
        }

        geo[`geometry.${nameData.namespace}.player.${nameData.shortname}.armor.helmet:geometry.${nameData.namespace}.player.${nameData.shortname}.armor.base`] = {
            bones: [
                {
                    "name": "body",
                    "neverRender": true
                },
                {
                    "name": "torso",
                    "neverRender": true
                },
                {
                    "name": "rightArm",
                    "neverRender": true
                },
                {
                    "name": "leftArm",
                    "neverRender": true
                },
                {
                    "name": "rightLeg",
                    "neverRender": true
                },
                {
                    "name": "leftLeg",
                    "neverRender": true
                },
                {
                    "name": "rightBoot",
                    "neverRender": true
                },
                {
                    "name": "leftBoot",
                    "neverRender": true
                }
            ]
        }

        geo[`geometry.${nameData.namespace}.player.${nameData.shortname}.armor.chestplate:geometry.${nameData.namespace}.player.${nameData.shortname}.armor.base`] = {
            bones: [
                {
                    "name": "head",
                    "neverRender": true
                },
                {
                    "name": "hat",
                    "neverRender": true
                },
                {
                    "name": "torso",
                    "neverRender": true
                },
                {
                    "name": "rightLeg",
                    "neverRender": true
                },
                {
                    "name": "leftLeg",
                    "neverRender": true
                },
                {
                    "name": "rightBoot",
                    "neverRender": true
                },
                {
                    "name": "leftBoot",
                    "neverRender": true
                }
            ]
        }

        geo[`geometry.${nameData.namespace}.player.${nameData.shortname}.armor.leggings:geometry.${nameData.namespace}.player.${nameData.shortname}.armor.base`] = {
            bones: [
                {
                    "name": "body",
                    "neverRender": true
                },
                {
                    "name": "head",
                    "neverRender": true
                },
                {
                    "name": "hat",
                    "neverRender": true
                },
                {
                    "name": "rightArm",
                    "neverRender": true
                },
                {
                    "name": "leftArm",
                    "neverRender": true
                },
                {
                    "name": "rightBoot",
                    "neverRender": true
                },
                {
                    "name": "leftBoot",
                    "neverRender": true
                }
            ]
        }

        geo[`geometry.${nameData.namespace}.player.${nameData.shortname}.armor.boots:geometry.${nameData.namespace}.player.${nameData.shortname}.armor.base`] = {
            bones: [
                {
                    "name": "head",
                    "neverRender": true
                },
                {
                    "name": "hat",
                    "neverRender": true
                },
                {
                    "name": "body",
                    "neverRender": true
                },
                {
                    "name": "torso",
                    "neverRender": true
                },
                {
                    "name": "rightArm",
                    "neverRender": true
                },
                {
                    "name": "leftArm",
                    "neverRender": true
                },
                {
                    "name": "rightLeg",
                    "neverRender": true
                },
                {
                    "name": "leftLeg",
                    "neverRender": true
                }
            ]
        }

        return geo;
    }
    
    public static createFilePath(nameData: NameData): string {
        return this.DirectoryPath + nameData.directory + nameData.shortname + ".geo.json";
    }
}