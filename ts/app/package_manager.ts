import * as Global from './globals';
import { Octokit } from 'octokit';
import { readJSONFromFile, writeBufferFileFromString, writeFileFromJSON, writeFileFromString, writeToLang } from './file_manager';
import { requestGet, requestURL, requestVanilla } from './github';
import * as JSONC from 'comment-json';

export async function packageList() {
    try {
        let response = await requestGet('/contents');
        response.data = response.data.filter((item: { name: string | string[]; }) => !item.name.includes('README'));
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function packageImport(names: string[]) {
    try {
        var response = await packageList();

        for (const name of names) {
            let package_url = '';
            if (/^-?\d+$/.test(name)) {
                package_url = response[Object.keys(response)[Number(name)]].url;
            }else {
                package_url = response[name].url;
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

        // Handle lang Files
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
                writeToLang(contents.data, 'misc');
            }
            continue;
        }

        // Other files
        writeBufferFileFromString(path, contents.data);
    }
}