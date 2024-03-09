import { NameData } from "../../utils";
import { MinecraftDataType } from "../minecraft";
import { FormatVersion, MolangDoubleArray, MolangTripleArray } from "../shared_types";
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
    };
    bones: IClientGeometryBone[];
    cape?: string;
}
export interface IClientGeometryOld {
    texturewidth: number;
    textureheight: number;
    visible_bounds_width: number;
    visible_bounds_height: number;
    visible_bounds_offset: MolangTripleArray;
    bones: IClientGeometryBone[];
}
export interface IClientGeometryBone {
    name?: string;
    pivot?: MolangTripleArray;
    locators?: Record<string, {
        offset: MolangTripleArray;
        rotation: MolangTripleArray;
        ignore_inherited_scale: boolean;
    }>;
    binding?: string;
    inflate?: number;
    mirror?: boolean;
    origin?: MolangTripleArray;
    reset?: boolean;
    rotation?: MolangTripleArray;
    size?: MolangTripleArray;
    uv?: MolangDoubleArray | {
        up: IClientGeometryPerFaceUV;
        down: IClientGeometryPerFaceUV;
        east: IClientGeometryPerFaceUV;
        west: IClientGeometryPerFaceUV;
        north: IClientGeometryPerFaceUV;
        south: IClientGeometryPerFaceUV;
    };
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
export declare class ClientGeometry extends MinecraftDataType implements IClientGeometry {
    format_version: FormatVersion;
    "minecraft:geometry"?: IClientGeometryNew[];
    [key: GeometryName]: IClientGeometryOld;
    static get DirectoryPath(): string;
    constructor(filepath: string, template: IClientGeometry);
    static createFromTemplate(nameData: NameData): ClientGeometry;
    static createFilePath(nameData: NameData): string;
}
