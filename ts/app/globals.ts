import * as glob from 'glob';
import * as path from 'path';
import * as Chalk from 'chalk';

export const chalk = new Chalk.Instance();

export var set_paths = false;
export var app_root = path.resolve(__dirname);
var project_root = './';
export var project_rp = '**/resource_packs/*rp/';
export var project_bp = '**/behavior_packs/*bp/';
export var indent = '\t';

function setRootPath() {
    if (path.resolve(process.cwd()).includes('world_template')) {
      project_root = path.resolve(process.cwd().split('world_template').shift() + '/world_template');
    }
}

export async function setResourcePath(rp:string|undefined) {
    setRootPath();

    project_rp = rp ? rp : `${project_root}${project_rp}`;
    project_rp = project_rp.replace(/\/|\\+/g, '/');

    let glob_files = new Promise<string[]>((resolve, reject) => {
        glob.glob(project_rp, function (error, glob_files) {
            if (error) {
                reject(error);
            }
            resolve(glob_files);
        });
    });
    const rp_path = await (await glob_files).shift();


    if (rp_path) {
        project_rp = rp_path;
    }else {
        project_rp = "./resource_packs/"
    }

    set_paths = true;
}
export async function setBehaviorPath(bp:string|undefined) {
    project_bp = bp ? bp : `${project_root}${project_bp}`;
    project_bp = project_bp.replace(/\/|\\+/g, '/');


    let glob_files = new Promise<string[]>((resolve, reject) => {
        glob.glob(project_bp, function (error, glob_files) {
            if (error) {
                reject(error);
            }
            resolve(glob_files);
        });
    });
    const bp_path = await (await glob_files).shift();

    if (bp_path) {
        project_bp = bp_path;
    }else {
        project_bp = "./behavior_packs/"
    }

    set_paths = true;
}
export function setIndentLevel(val:string) {
    if (Number(val)) {
        indent = '\t'.repeat(Number(val));
    }
}