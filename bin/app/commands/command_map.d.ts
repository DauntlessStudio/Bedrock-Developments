import { Command, OptionValues } from 'commander';
export interface CommandMapEntry<Args, Options> {
    parent?: Command;
    command?: Command;
    commandOptions: (command: Command) => void;
    commandAction?: (args: Args, options: Options) => void;
}
/**
 * @remarks A static class used to store information about commands, allowing for easy command copying.
 */
export declare class CommandMap {
    private static readonly entries;
    /**
     * @remarks Adds a command to the registry.
     * @param name The name of the new command to add, note this is the internal registry name, not the display name.
     * @param commandEntry The command data.
     */
    static addCommand<Args = any, Options = OptionValues>(name: string, commandEntry: CommandMapEntry<Args, Options>): void;
    /**
     * @remarks Gets command data.
     * @param name The name of the command to return.
     * @returns The data associated with the command or undefined if no command with that name exists.
     */
    static getCommandEntry(name: string): CommandMapEntry<any, OptionValues> | undefined;
    /**
     * @remarks Copies a command in the registery, allows for cross-subcommand aliases.
     * @param name The internal name of the new command.
     * @param source The internal name of the command to copy.
     * @param commandName The display name of the new command.
     * @param parent The parent the new command should be anchored to.
     */
    static copyCommand(name: string, source: string, commandName: string, parent?: Command): Promise<void>;
}
