import { Command, OptionValues } from 'commander';
export interface CommandMapEntry<Args, Options> {
    parent?: Command;
    command?: Command;
    commandOptions: (command: Command) => void;
    commandAction?: (args: Args, options: Options) => void;
}
export declare class CommandMap {
    private static readonly entries;
    static addCommand<Args = any, Options = OptionValues>(name: string, commandEntry: CommandMapEntry<Args, Options>): void;
    static getCommandEntry(name: string): CommandMapEntry<any, OptionValues> | undefined;
}
