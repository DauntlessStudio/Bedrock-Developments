import * as Global from './globals';
import { copyFile, modifyAndWriteFile, writeToLang } from './file_manager';
import { getNamesObjects, jsonJoin } from './utils';

interface blockOptions {
    emissive?: number,
    table?: boolean,
    geo?: boolean,
}

/**
 * @remarks creates a new block
 * @param names new block names
 * @param lang should the lang entry be added
 * @param emissive how emissive is the block
 * @param table should a loot table be created
 * @param geo should the block use custom geo
 */
export async function createNewBlock(names: string[], lang: boolean, options: blockOptions) {
    const names_list = getNamesObjects(names);
    const terrain_texture_source = `${Global.project_rp}textures/terrain_texture.json`;
    const terrain_texture_default = `${Global.app_root}/src/blocks/terrain_texture.json`;
    const blocks_source = `${Global.project_rp}blocks.json`;
    const blocks_default = `${Global.app_root}/src/blocks/blocks.json`;

    for (const name of names_list) {
        await modifyAndWriteFile({source_path: `${Global.app_root}/src/blocks/template.json`, target_path: `${Global.project_bp}blocks/${name.pathname}${name.shortname}.json`}, async (block: any) => {
            block['minecraft:block']['description']['identifier'] = name.fullname;

            if (options.emissive) {
                block['minecraft:block']['components']['minecraft:block_light_emission'] = Number(options.emissive);
            }

            if (options.geo) {
                block['format_version'] = '1.19.51';
                jsonJoin(block['minecraft:block']['components'], {
                    ['minecraft:collision_box']: {origin: [-8, 0, -8], size: [16.0, 16.0, 16.0]},
                    ['minecraft:geometry']: `geometry.${name.shortname}`,
                    ['minecraft:material_instances']: {['*']: {texture: name.shortname, render_method: 'alpha_test'}},
                });
                
                await modifyAndWriteFile({source_path: `${Global.app_root}/src/geos/cube.geo.json`, target_path: `${Global.project_rp}models/blocks/${name.pathname}${name.shortname}.geo.json`}, (json_geo: any) => {
                    json_geo['minecraft:geometry'][0]['description']['identifier'] =`geometry.${name.shortname}`;
                });
            }
    
            if (options.table) {
                block['minecraft:block']['components']['minecraft:loot'] = `loot_tables/blocks/${name.pathname}${name.shortname}.json`;

                await modifyAndWriteFile({source_path: `${Global.app_root}/src/loot_tables/template.loot.json`, target_path: `${Global.project_bp}loot_tables/blocks/${name.pathname}${name.shortname}.loot.json`}, (loot_table: any) => {
                    loot_table['pools'][0]['entries'][0]['name'] = name.fullname;
                });
            }
        });

        await modifyAndWriteFile({source_path: terrain_texture_source, default_path: terrain_texture_default, target_path: terrain_texture_source}, (terrain_texture: any) => {
            jsonJoin(terrain_texture['texture_data'], {[name.shortname]: {textures: `textures/blocks/${name.pathname}${name.shortname}`}});
        }, {overwrite: true});

        await modifyAndWriteFile({source_path: blocks_source, default_path: blocks_default, target_path: blocks_source}, (blocks: any) => {
            jsonJoin(blocks, {[name.shortname]: {sound: 'stone', textures: name.shortname}});
        }, {overwrite: true});

        copyFile(`${Global.app_root}/src/blocks/block.png`, `${Global.project_rp}textures/blocks/${name.pathname}${name.shortname}.png`);

        if (lang) {
            writeToLang(`tile.${name.fullname}.name=${name.displayname}`, 'block names');
        }
    }
}