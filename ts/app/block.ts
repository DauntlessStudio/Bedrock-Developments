import * as Global from './globals';
import { copyFile, readJSONFromGlob, writeFileFromJSON, writeToLang } from './file_manager';
import { getNamesObjects } from './utils';

/**
 * @remarks creates a new block
 * @param names new block names
 * @param lang should the lang entry be added
 * @param emissive how emissive is the block
 * @param table should a loot table be created
 * @param geo should the block use custom geo
 */
export async function createNewBlock(names: string[], lang: boolean, emissive: number|undefined, table: boolean, geo: boolean) {
    let names_list = getNamesObjects(names);
    let json_block = await (await readJSONFromGlob(`${Global.app_root}/src/blocks/template.json`)).shift();
    let json_loot_table = await (await readJSONFromGlob(`${Global.app_root}/src/loot_tables/template.loot.json`)).shift();
    let json_block_texture = await (await readJSONFromGlob(`${Global.project_rp}textures/terrain_texture.json`, `${Global.app_root}/src/blocks/terrain_texture.json`)).shift();
    let json_blocks = await (await readJSONFromGlob(`${Global.project_rp}blocks.json`, `${Global.app_root}/src/blocks/blocks.json`)).shift();

    for (const name of names_list) {
        let block = json_block;
        block!.json['minecraft:block']['description']['identifier'] = name.fullname;

        if (emissive) {
            block!.json['minecraft:block']['components']['minecraft:block_light_emission'] = Number(emissive);
        }

        if (table) {
            block!.json['minecraft:block']['components']['minecraft:loot'] = `loot_tables/blocks/${name.pathname}${name.shortname}.json`;

            let loot_table = json_loot_table;
            loot_table!.json['pools'][0]['entries'][0]['name'] = name.fullname;
            writeFileFromJSON(`${Global.project_bp}loot_tables/blocks/${name.pathname}${name.shortname}.loot.json`, loot_table?.json);
        }

        if (geo) {
            block!.json['format_version'] = '1.19.51';
            block!.json['minecraft:block']['components']['minecraft:collision_box'] = {origin: [-8, 0, -8], size: [16.0, 16.0, 16.0]};
            block!.json['minecraft:block']['components']['minecraft:geometry'] = `geometry.${name.shortname}`;
            block!.json['minecraft:block']['components']['minecraft:material_instances'] = {};
            block!.json['minecraft:block']['components']['minecraft:material_instances']['*'] = {texture: name.shortname, render_method: 'alpha_test'};

            let json_geo = await (await readJSONFromGlob(`${Global.app_root}/src/geos/cube.geo.json`)).shift();
            json_geo!.json['minecraft:geometry'][0]['description']['identifier'] =`geometry.${name.shortname}`;
            writeFileFromJSON(`${Global.project_rp}models/blocks/${name.pathname}${name.shortname}.geo.json`, json_geo?.json);
        }

        writeFileFromJSON(`${Global.project_bp}blocks/${name.pathname}${name.shortname}.json`, block?.json);

        json_block_texture!.json['texture_data'][name.shortname!] = {};
        json_block_texture!.json['texture_data'][name.shortname!]['textures'] = `textures/blocks/${name.pathname}${name.shortname}`;

        json_blocks!.json[name.shortname!] = {};
        json_blocks!.json[name.shortname!]['sound'] = 'stone';
        json_blocks!.json[name.shortname!]['textures'] = name.shortname;

        copyFile(`${Global.app_root}/src/blocks/block.png`, `${Global.project_rp}textures/blocks/${name.pathname}${name.shortname}.png`);

        if (lang) {
            writeToLang(`tile.${name.fullname}.name=${name.displayname}`, 'block names');
        }
    }
    
    writeFileFromJSON(`${Global.project_rp}textures/terrain_texture.json`, json_block_texture?.json, true);
    writeFileFromJSON(`${Global.project_rp}blocks.json`, json_blocks?.json, true);
}