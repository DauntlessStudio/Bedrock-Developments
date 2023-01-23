import * as Global from './globals';
import { copyFile, readJSONFromFile, writeFileFromJSON, writeToLang } from './file_manager';
import { getNamesObjects } from './utils';

export async function createNewBlock(names: string[], lang: boolean, emissive: number|undefined, table: boolean) {
    let names_list = getNamesObjects(names);
    let json_block = await (await readJSONFromFile(`${Global.app_root}/src/blocks/template.json`)).shift();
    let json_loot_table = await (await readJSONFromFile(`${Global.app_root}/src/loot_tables/template.loot.json`)).shift();
    let json_block_texture = await (await readJSONFromFile(`${Global.project_rp}textures/terrain_texture.json`, `${Global.app_root}/src/blocks/terrain_texture.json`)).shift();
    let json_blocks = await (await readJSONFromFile(`${Global.project_rp}blocks.json`, `${Global.app_root}/src/blocks/blocks.json`)).shift();

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

        writeFileFromJSON(`${Global.project_bp}blocks/${name.pathname}${name.shortname}.json`, block?.json);

        json_block_texture!.json['texture_data'][name.shortname!] = {};
        json_block_texture!.json['texture_data'][name.shortname!]['textures'] = `textures/blocks/${name.pathname}${name.shortname}`;

        json_blocks!.json[name.shortname!] = {};
        json_blocks!.json[name.shortname!]['sound'] = 'stone';
        json_blocks!.json[name.shortname!]['textures'] = name.shortname;

        copyFile(`${Global.app_root}/src/blocks/block.png`, `${Global.project_rp}textures/blocks/${name.pathname}${name.shortname}.png`);

        if (lang) {
            writeToLang(`block.${name.fullname}.name=${name.displayname}`, 'block names');
        }
    }
    
    writeFileFromJSON(`${Global.project_rp}textures/terrain_texture.json`, json_block_texture?.json, true);
    writeFileFromJSON(`${Global.project_rp}blocks.json`, json_blocks?.json, true);
}