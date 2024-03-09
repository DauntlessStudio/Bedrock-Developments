import { OptionValues } from "commander";
import { printVersion } from "../base";
import { program_new } from "./new";
import { Directories, File, copySourceFile, setFiles } from "../../new_file_manager";
import { NameData } from "../../utils";
import { ClientEntity, ClientGeometry, Identifier, ServerEntity } from "../../types";
import { LangFile } from "../../types/minecraft";

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
  const lang: boolean = options.lang;
  const geo: boolean = options.geo;
  const texture: boolean = options.texture;
  const client: boolean = options.client;

  names.forEach((name) => {
    const nameData = new NameData(name);
    const files: File[] = [];

    const serverEntity = new ServerEntity(ServerEntity.createFilePath(nameData), {
      format_version: "1.20.50",
      "minecraft:entity": {
        description: {
          identifier: nameData.fullname as Identifier,
          is_spawnable: false,
          is_summonable: true,
          is_experimental: false,
        },
        component_groups: {
          "instant_despawn": {
            "minecraft:instant_despawn": {}
          }
        },
        components: {
          "minecraft:type_family": {
            family: [
              nameData.namespace,
              nameData.shortname,
            ]
          },
          "minecraft:collision_box": {
            height: 0,
            width: 0,
          },
          "minecraft:physics": {
            has_collision: false,
            has_gravity: false,
          },
          "minecraft:damage_sensor": {
            triggers: [
              {
                on_damage: {
                  filters: {
                    test: "has_damage",
                    value: "void",
                  },
                  event: "despawn"
                }
              },
              {
                cause: "all",
                deals_damage: false,
              }
            ]
          }
        },
        events: {
          "despawn": {
            add: {
              component_groups: [
                "instant_despawn"
              ]
            }
          }
        }
      }
    });
    files.push(serverEntity.toFile());
    
    if (client) {
      const clientEntity = new ClientEntity(ClientEntity.createFilePath(nameData), {
        format_version: "1.20.50",
        "minecraft:client_entity": {
          description: {
            identifier: nameData.fullname as Identifier,
            materials: {
              default: "entity_alphatest",
            },
            geometry: {
              default: `geometry.${nameData.shortname}`,
            },
            textures: {
              default: `textures/entity/${nameData.shortname}/default`,
            },
            render_controllers: [
              "controller.render.default",
            ],
            spawn_egg: {}
          }
        }
      });

      files.push(clientEntity.toFile());
    }

    if (client && geo) {
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

      files.push(geo.toFile());
    }

    if (client && texture) {
      copySourceFile('images/uv_texture.png', Directories.RESOURCE_PATH + 'textures/' + nameData.directory + '/entity/' + nameData.shortname + '/default.png');
    }

    if (lang) {
      const lang = new LangFile('*.lang');
      lang.addToCategory('entity names', `entity.${nameData.fullname}.name=${nameData.display}`);
      files.push(...lang.files);
    }

    setFiles(files);
  })
}