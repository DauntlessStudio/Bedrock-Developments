import { OptionValues } from "commander";
import { printVersion } from "../base";
import { program_new } from "./new";
import { Directories, File, copySourceFile, setFiles } from "../../file_manager";
import { NameData } from "../../utils";
import { ClientEntity, ClientGeometry, ServerEntity } from "../../types";
import { LangFile } from "../../types/minecraft";

program_new.command('entity')
.description('creates new bedrock entities')
.argument('<names...>', 'entity names as "namespace:entity"')
.option('--no-lang', 'do not add lang file')
//   .addOption(new Option('-t, --type <type>', 'set entity type',).choices(Object.keys(Entity.entityType)).default(Entity.entityType.dummy))
.option('-c, --client', 'create client entity in the resource path. Will also create a default geo and texture for the entity')
.option('--no-geo', 'do not add geo file')
.option('--no-texture', 'do not add texture file')
.action(triggerCreateNewEntity)
.hook('postAction', printVersion);

function triggerCreateNewEntity(names: string[], options: OptionValues) {
  const type = options.type;
  const lang: boolean = options.lang;
  const geo: boolean = options.geo;
  const texture: boolean = options.texture;
  const client: boolean = options.client;

  names.forEach((name) => {
    const nameData = new NameData(name);
    const files: File[] = [];

    const serverEntity = ServerEntity.createFromTemplate(nameData);
    files.push(serverEntity.toFile());
    
    if (client) {
      files.push(ClientEntity.createFromTemplate(nameData).toFile());
    }

    if (client && geo) {
      files.push(ClientGeometry.createFromTemplate(nameData).toFile());
    }

    if (client && texture) {
      copySourceFile('images/uv_texture.png', Directories.RESOURCE_PATH + 'textures/' + nameData.directory + 'entity/' + nameData.shortname + '/default.png');
    }

    if (lang) {
      files.push(...LangFile.addToAllLangs('entity names', `entity.${nameData.fullname}.name=${nameData.display}`).files);
    }

    setFiles(files);
  });
}