import { Option } from "commander";
import { File, getFiles, setFiles } from "../../file_manager.js";
import { Identifier, ServerEntity } from "../../types/index.js";
import { NameData, implementConfig } from "../../utils.js";
import { CommandMap } from "../command_map.js";

type PropertyType = "bool"|"enum"|"float"|"int";

export interface EntityPropertyOptions {
    type: string[];
    file: string;
    property: PropertyType;
    values?: string[];
    client: boolean;
    event: boolean;
    default: number|string|boolean;
}

CommandMap.addCommand<string[], EntityPropertyOptions>("root.entity.property", {
    parent: CommandMap.getCommandEntry("root.entity")?.command,
    commandOptions(command) {
        command
        .name("property")
        .description("adds a property to entities")
        .argument("<names...>", 'property names as "namespace:property"')
        .option("-t, --type <family type...>", "filter entities by family type")
        .addOption(new Option("-f, --file [file]", "the entity files that should be modified").makeOptionMandatory().preset("**/*.json"))
        .addOption(new Option("-p, --property <property type>", "the type of property").choices(["bool", "enum", "float", "int"]).default("bool"))
        .option("-v, --values <values...>", "the values, either a list of enum values or a min-max")
        .option("-d, --default <default>", "the default value")
        .option("-c, --client", "should use client_sync")
        .option("-e, --event", "automatically generate events for the values")
    },
    commandAction: triggerEntityAddProperty,
});

function triggerEntityAddProperty(names: string[], options: EntityPropertyOptions) {
    implementConfig();
    // const default_value: any = options.property === "float" || options.property === "int" ? Number(options.default) : options.property === "bool" ? Boolean(options.default) : options.default;
    const values: string[]|undefined = options.property === "enum" ? options.values : undefined;
    const range: [number, number]|undefined = options.property === "float" || options.property === "int" ? ((options.values as string[]).map(value => Number(value)) as [number, number]) : undefined;

    const files: File[] = [];
    const entities = getFiles(ServerEntity.DirectoryPath + options.file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...options.type));

    entities.forEach(entity => {
        names.forEach(name => {
            entity.setProperties({
                [new NameData(name).fullname as Identifier]: {
                    type: options.property,
                    client_sync: options.client,
                    default: options.default,
                    values,
                    range,
                }
            }, "overwrite", {createEvents: options.event});
        })
        files.push(entity.toFile("overwrite"));
    });

    setFiles(files);
}