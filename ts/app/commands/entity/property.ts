import { OptionValues, Option } from "commander";
import { printVersion } from "../base";
import { program_entity } from "./entity";
import { File, getFiles, setFiles } from "../../new_file_manager";
import { Identifier, ServerEntity } from "../../types";


program_entity.command('property')
.description('adds a property to entities')
.argument('<names...>', 'property names as "namespace:property"')
.option('-t, --type <family type...>', 'filter entities by family type')
.addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
.addOption(new Option('-p, --property <property type>', 'the type of property').choices(['bool', 'enum', 'float', 'int']).default('bool'))
.option('-v, --values <values...>', 'the values, either a list of enum values or a min-max')
.option('-d, --default <default>', 'the default value')
.option('-c, --client', 'should use client_sync')
.option('-e, --event', 'automatically generate events for the values')
.action(triggerEntityAddProperty)
.hook('postAction', printVersion);

function triggerEntityAddProperty(names: string[], options: OptionValues) {
  const family: string[] = options.type ?? [];
  const file: string = options.file;
  const property: "bool"|"enum"|"float"|"int" = options.property;
  const default_value: any = property === "float" || property === "int" ? Number(options.default) : property === "bool" ? Boolean(options.default) : options.default;
  const client_sync: boolean = options.client;
  const createEvents: boolean = options.event;
  const values: string[]|undefined = property === "enum" ? options.values : undefined;
  const range: [number, number]|undefined = property === "float" || property === "int" ? ((options.values as string[]).map(value => Number(value)) as [number, number]) : undefined;

  const files: File[] = [];
  const entities = getFiles(ServerEntity.DirectoryPath + file).map(file => ServerEntity.fromFile(ServerEntity, file)).filter(entity => entity.hasFamilyTypes(...family));

  entities.forEach(entity => {
    names.forEach(name => {
        entity.setProperties({
            [name as Identifier]: {
                type: property,
                client_sync,
                default: default_value,
                values,
                range,
            }
        }, "overwrite", {createEvents});
    })
    files.push(entity.toFile("overwrite"));
  });

  setFiles(files);
}