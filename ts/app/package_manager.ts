import * as Global from './globals';
import { deleteFile, readJSONFromGlob, writeBufferFileFromString, writeFileFromJSON, writeFileFromString, writeToLang } from './file_manager';
import { requestGet, requestURL } from './github';
import * as Chalk from 'chalk';
import * as JSONC from 'comment-json';

const chalk = new Chalk.Instance();

export async function packageList(filter: string) {
    try {
        let response = await requestGet('/contents/packages.json');
        let content:any = JSONC.parse(Buffer.from(response.data.content, 'base64').toString('ascii'));

        if (filter) {
            content = content.filter((item: { display_name: string; categories: [string]}) => item.display_name.toLowerCase().includes(filter.toLowerCase()) || item.categories.includes(filter.toLowerCase()));
        }

        return content;
    } catch (error) {
        console.log(error);
    }
}

export async function packageImport(names: string[]) {
    try {
        var response = await packageList('');

        for (const name of names) {
            let package_url = '';
            for (const pkg of response) {
                if (pkg.index === Number(name) || pkg.display_name.toLowerCase() === name.toLowerCase()) {
                    package_url = pkg.repository.url;
                }
            }

            recursiveDownload(package_url);
        }
    } catch (error) {
        throw(error);
    }
}

async function recursiveDownload(url: string) {
    let response = await requestURL(url);
    for (const item of response.data) {
        if (item.type === 'dir') {
            recursiveDownload(item.url);
            continue;
        }
        let path = item.path.replace(/.+BP\//, Global.project_bp).replace(/.+RP\//, Global.project_rp);
        let contents = await(requestURL(item.download_url));

        //TODO item_texture, and terrain_texture
        if (/hud_screen.json$/.test(path)) {
            try {
                let hud_screen = await readJSONFromGlob(`${Global.project_rp}ui/hud_screen.json`);
                if (hud_screen.length) {
                    let import_hud: any = JSONC.parse(contents.data);
                    let new_hud = {...import_hud, ...hud_screen[0].json};
                    new_hud['root_panel']['modifications'] = [...import_hud['root_panel']['modifications'], ...hud_screen[0].json['root_panel']['modifications']]
                    writeFileFromJSON(path, new_hud, true);
                    continue;
                }
            } catch (error) {
            }
        }

        if (/_ui_defs.json$/.test(path)) {
            try {
                let _ui_defs = await readJSONFromGlob(`${Global.project_rp}ui/_ui_defs.json`);
                if (_ui_defs.length) {
                    let import_defs: any = JSONC.parse(contents.data);
                    let new_defs = {ui_defs: [...import_defs['ui_defs'], ..._ui_defs[0].json['ui_defs']]};
                    writeFileFromJSON(path, new_defs, true);
                    continue;
                }
            } catch (error) {
            }
        }

        // Handle json Files
        if (/.json$/.test(path)) {
            writeFileFromJSON(path, JSONC.parse(contents.data));
            continue;
        }

        // Handle lang Files
        if (/.lang$/.test(path)) {
            // If lang file uses categories
            if (/## [A-Za-z ]+ =*/.test(contents.data)) {
                let matches = String(contents.data).matchAll(/## (?<category>[A-Za-z ]+) =*\n(?<entry>[^#]+)/g);
                for (const match of matches) {
                    writeToLang(match.groups?.entry!, match.groups?.category!);
                }
            }else {
                writeToLang(contents.data, 'misc', path);
            }
            continue;
        }

        // Handle import script File
        if (/.bat$/.test(path)) {
            let path = Global.project_bp + 'import.bat';
            writeBufferFileFromString(path, contents.data);
            const { exec } = require('node:child_process');
            exec(`"${path}"`, (err:string, stdout:string, stderr:string) => {
                if (err) {
                    console.log(`${chalk.red(`${err}`)}`);
                  return;
                }
                console.log(`${chalk.green(`${stdout}`)}`);
                deleteFile(path);
            });
            continue;
        }

        // Handle README
        if (/.md/.test(path)) {
            console.log(`${chalk.green(`View README at: ${item.html_url}`)}`);
            continue;
        }

        // Other files
        writeBufferFileFromString(path, contents.data);
    }
}