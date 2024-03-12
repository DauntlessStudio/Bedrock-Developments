import { OptionValues } from "commander";
import { printVersion } from "../base";
import { program_new } from "./new";
import { NameData } from "../../utils";
import { Directories, File, copySourceFile, setFiles } from "../../file_manager";
import { ClientBlocks, ClientGeometry, ClientTerrainTexture, Identifier, ServerAnimation, ServerBlock, ServerLootTable } from "../../types";
import { LangFile } from "../../types/minecraft";

program_new.command('block')
  .description('creates new bedrock blocks')
  .argument('<names...>', 'block names as "namespace:block"')
  .option('--no-lang', 'do not add lang file')
  .option('-e, --emissive <emission>', 'block emmission level [1-15]')
  .option('-t, --table', 'create a loot table')
  .option('-g, --geo', 'create a custom geo')
  .action(triggerCreateNewBlock)
  .hook('postAction', printVersion);

function triggerCreateNewBlock(names: string[], options: OptionValues) { // TODO: Add template file creators to types files, add textures to item/terrain texture
  const lang: boolean = options.lang;
  const emissive: number|undefined = options.emissive;
  const table: boolean = options.table;
  const geo: boolean = options.geo;

  names.forEach((name) => {
    const nameData = new NameData(name);
    const files: File[] = [];

    const block = ServerBlock.createFromTemplate(nameData);
    block.setDisplayData(nameData);
    block.setFriction()

    if (emissive !== undefined) {
        block.setLightEmission(emissive);
    }

    if (table) {
        block.setLootTable(`loot_tables/blocks/${nameData.directory}${nameData.shortname}.json`);
        files.push(ServerLootTable.createFromTemplate(nameData).toFile());
    } else {
        block.setLootTable();
    }

    if (lang) {
        files.push(...LangFile.addToAllLangs('block names', `tile.${nameData.fullname}.name=${nameData.display}`).files);
    }

    if (geo) {
        copySourceFile('images/uv_texture.png', Directories.RESOURCE_PATH + 'textures/' + nameData.directory + 'blocks/' + nameData.shortname + '.png');
        files.push(ClientGeometry.createFromTemplate(nameData).toFile());
    } else {
        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + nameData.directory + 'blocks/' + nameData.shortname + '.png');
    }

    files.push(block.toFile());
    files.push(ClientBlocks.fileWithAddedBlock(nameData.fullname as Identifier, {sound: "stone", textures: nameData.shortname}));
    files.push(ClientTerrainTexture.fileWithAddedTexture(nameData.shortname, 'textures/' + nameData.directory + 'blocks/' + nameData.shortname));
    setFiles(files);
  });
}