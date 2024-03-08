import { Directories } from "../../new_file_manager";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion, MolangDoubleArray, MolangTripleArray } from "../shared_types";

export interface IGeometry {
    format_version: FormatVersion;
    "minecraft:geometry"?: IGeometryNew[];
    [key: `geometry.${string}`]: IGeometryOld;
}

export interface IGeometryNew {
    description: {
        identifier: `geometry.${string}`;
        texture_width: number;
        texture_height: number;
        visible_bounds_width: number;
        visible_bounds_height: number;
        visible_bounds_offset: MolangTripleArray;
    },
    bones: IGeometryBone[],
    cape?: string;
}

export interface IGeometryOld {
    texturewidth: number;
    textureheight: number;
    visible_bounds_width: number;
    visible_bounds_height: number;
    visible_bounds_offset: MolangTripleArray;
    bones: IGeometryBone[];
}

export interface IGeometryBone {
    name?: string;
    pivot?: MolangTripleArray;
    locators?: Record<string, {offset: MolangTripleArray, rotation: MolangTripleArray, ignore_inherited_scale: boolean}>;
    binding?: string;
    inflate?: number;
    mirror?: boolean;
    origin?: MolangTripleArray;
    reset?: boolean;
    rotation?: MolangTripleArray;
    size?: MolangTripleArray;
    uv?: MolangDoubleArray|{
        up: IGeometryPerFaceUV;
        down: IGeometryPerFaceUV;
        east: IGeometryPerFaceUV;
        west: IGeometryPerFaceUV;
        north: IGeometryPerFaceUV;
        south: IGeometryPerFaceUV;
    }
}

export interface IGeometryPerFaceUV {
    material_instance?: string;
    uv: MolangDoubleArray;
    uv_size: MolangDoubleArray;
}

export class Goemetry extends MinecraftDataType implements IGeometry {
    format_version: FormatVersion;
    "minecraft:geometry"?: IGeometryNew[];
    [key: `geometry.${string}`]: IGeometryOld;

    public static get DirectoryPath(): string {
        return Directories.RESOURCE_PATH + 'models/';
    }
    
    constructor(filepath: string, template: IGeometry) {
        super(filepath, template);
        this.format_version = template.format_version;
        if ("minecraft:geometry" in template) {
            this["minecraft:geometry"] = template["minecraft:geometry"];
        } else {
            Object.getOwnPropertyNames(template).forEach(prop => {
                if (prop.startsWith('geometry.')) {
                    this[prop as `geometry.${string}`] = template[prop as `geometry.${string}`];
                }
            });
        }
    }
}