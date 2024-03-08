import { OptionValues } from "commander";
import { printVersion } from "../base";
import { program_new } from "./new";

export const program_new_entity = program_new.command('entity')
.description('creates new bedrock entities')
.argument('<names...>', 'entity names as "namespace:entity"')
.option('--no-lang', 'do not add lang file')
//   .addOption(new Option('-t, --type <type>', 'set entity type',).choices(Object.keys(Entity.entityType)).default(Entity.entityType.dummy))
.option('-c, --client', 'create client entity in the resource path. Will also create a default geo and texture for the entity')
.option('--no-geo', 'do not add geo file')
.option('--no-texture', 'do not add texture file')
.action(triggerCreateNewEntity)
.hook('postAction', printVersion);

async function triggerCreateNewEntity(names: string[], options: OptionValues) {
  const type = options.type;
  const lang = options.lang;
  const geo = options.geo;
  const texture = options.texture;
  const client = options.client;
}