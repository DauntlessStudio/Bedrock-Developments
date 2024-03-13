import {Chalk} from 'chalk';
import * as path from 'path';

export const chalk = new Chalk();
export const currentFormatVersion = '1.20.50';

export class NameData {
    original: string;
    fullname: string;
    namespace: string;
    shortname: string;
    display: string;
    directory: string;

    constructor(name: string) {
        this.original = name;
        this.fullname = path.basename(name);
        this.namespace = this.fullname.split(/\.|:/).shift() ?? '';
        this.shortname = this.fullname.split(/\.|:/).pop() ?? '';
        
        this.directory = path.dirname(name) + '/';
        if (this.directory === './') {
            this.directory = '';
        }

        const words = this.splitWords(this.shortname);
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }

        this.display = words.join(' ');
    }

    splitWords(name: string): string[] {
        name = name.replace(/_/g, ' ');
        return name.split(' ');
    }
}

export function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export default function mergeDeep(target: any, source: any) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else if (Array.isArray(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else Object.assign(output, { [key]: target[key].concat(source[key]) });
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}