import * as fs from 'fs';
import * as path from 'path';

export const app_path = path.resolve(__dirname);

export class Directories {
    private static input_behavior_path = './bedrock-samples/behavior_pack/';
    private static input_resource_path = './bedrock-samples/resource_pack/';
    private static output_behavior_path = './out/BP/';
    private static output_resource_path = './out/RP/';
    
    public static get INPUT_BEHAVIOR_PATH() : string {
        return this.input_behavior_path;
    }
    
    public static get INPUT_RESOURCE_PATH() : string {
        return this.input_resource_path;
    }
    
    public static get OUTPUT_BEHAVIOR_PATH() : string {
        return this.output_behavior_path;
    }
    
    public static get OUTPUT_RESOURCE_PATH() : string {
        return this.output_resource_path;
    }
    
    public static set INPUT_BEHAVIOR_PATH(v: string) {
        if (fs.existsSync(v)) {
            this.input_behavior_path = v;
        } else {
            console.error(`Cannot set input_behavior_path to a non-existant path`);
        }
    }
    
    public static set INPUT_RESOURCE_PATH(v: string) {
        if (fs.existsSync(v)) {
            this.input_resource_path = v;
        } else {
            console.error(`Cannot set input_resource_path to a non-existant path`);
        }
    }
    
    public static set OUTPUT_BEHAVIOR_PATH(v: string) {
        if (fs.existsSync(v)) {
            this.output_behavior_path = v;
        } else {
            console.error(`Cannot set output_behavior_path to a non-existant path`);
        }
    }
    
    public static set OUTPUT_RESOURCE_PATH(v: string) {
        if (fs.existsSync(v)) {
            this.output_resource_path = v;
        } else {
            console.error(`Cannot set output_resource_path to a non-existant path`);
        }
    }
}