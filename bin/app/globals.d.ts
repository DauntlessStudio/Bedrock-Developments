import * as Chalk from 'chalk';
export declare const chalk: Chalk.Chalk;
export declare var set_paths: boolean;
export declare var app_root: string;
export declare var project_rp: string;
export declare var project_bp: string;
export declare var indent: string;
export declare class integer {
    int: number;
    constructor(int: number);
}
export declare function setResourcePath(rp: string | undefined): Promise<void>;
export declare function setBehaviorPath(bp: string | undefined): Promise<void>;
export declare function setIndentLevel(val: string): void;
