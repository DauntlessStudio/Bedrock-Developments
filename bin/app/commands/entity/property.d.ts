type PropertyType = "bool" | "enum" | "float" | "int";
export interface EntityPropertyOptions {
    type: string[];
    file: string;
    property: PropertyType;
    values?: string[];
    client: boolean;
    event: boolean;
    default: number | string | boolean;
}
export {};
