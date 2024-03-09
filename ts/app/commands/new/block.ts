import { OptionValues } from "commander";
import { printVersion } from "../base";
import { program_new } from "./new";
import { NameData } from "../../utils";
import { Directories, File, copySourceFile, setFiles } from "../../new_file_manager";
import { ClientGeometry, Identifier, ServerBlock, ServerLootTable } from "../../types";
import { LangFile } from "../../types/minecraft";

export const program_new_block = program_new.command('block')
  .description('creates new bedrock blocks')
  .argument('<names...>', 'block names as "namespace:block"')
  .option('--no-lang', 'do not add lang file')
  .option('-e, --emissive <emission>', 'block emmission level [1-15]')
  .option('-t, --table', 'create a loot table')
  .option('-g, --geo', 'create a custom geo')
  .action(triggerCreateNewBlock)
  .hook('postAction', printVersion);

function triggerCreateNewBlock(names: string[], options: OptionValues) {
  const lang: boolean = options.lang;
  const emissive: number|undefined = options.emissive;
  const table: boolean = options.table;
  const geo: boolean = options.geo;

  names.forEach((name) => {
    const nameData = new NameData(name);
    const files: File[] = [];

    const block = new ServerBlock(ServerBlock.createFilePath(nameData), {
        format_version: "1.20.50",
        "minecraft:block": {
            description: {
                identifier: nameData.fullname as Identifier,
            },
            components: {}
        }
    });

    block.setDisplayData(nameData);
    block.setFriction()

    if (emissive !== undefined) {
        block.setLightEmission(emissive);
    }

    if (table) {
        block.setLootTable(`loot_tables/blocks/${nameData.directory}${nameData.shortname}.json`);
        const table = new ServerLootTable(ServerLootTable.createFilePath(nameData), {
            pools: [
                {
                    rolls: 1,
                    entries: [
                        {
                            type: "item",
                            name: nameData.fullname as Identifier,
                            weight: 1,
                            functions: [
                                {
                                    function: "set_count",
                                    "count": {
                                        "min": 1,
                                        "max": 1,
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        files.push(table.toFile());
    } else {
        block.setLootTable();
    }

    if (lang) {
        const lang = new LangFile('*.lang');
        lang.addToCategory('block names', `tile.${nameData.fullname}.name=${nameData.display}`);
        files.push(...lang.files);
    }

    if (geo) {
        block["minecraft:block"].components["minecraft:geometry"] = {
            identifier: `geometry.${nameData.shortname}`
        };
        
        const geo = new ClientGeometry(ClientGeometry.createFilePath(nameData), {
          format_version: "1.20.50",
          "minecraft:geometry": [
            {
              description: {
                identifier: `geometry.${nameData.shortname}`,
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

        copySourceFile('images/uv_texture.png', Directories.RESOURCE_PATH + 'textures/' + nameData.directory + 'blocks/' + nameData.shortname + '.png');
        files.push(geo.toFile());
    } else {
        copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + nameData.directory + 'blocks/' + nameData.shortname + '.png');
    }

    files.push(block.toFile());

    setFiles(files);
  });
}