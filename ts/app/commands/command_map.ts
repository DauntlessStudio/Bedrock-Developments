import { Command, OptionValues } from 'commander';
import { printVersion } from './version.js';

export interface CommandMapEntry<Args, Options> {
    parent?: Command;
    command?: Command;
    commandOptions: (command: Command) => void;
    commandAction?: (args: Args, options: Options) => void;
}

/**
 * @remarks A static class used to store information about commands, allowing for easy command copying.
 */
export class CommandMap {
    private static readonly entries: Record<string, CommandMapEntry<any, any>> = {};

    /**
     * @remarks Adds a command to the registry.
     * @param name The name of the new command to add, note this is the internal registry name, not the display name.
     * @param commandEntry The command data.
     */
    public static addCommand<Args = any, Options = OptionValues>(name: string, commandEntry: CommandMapEntry<Args, Options>): void {
        commandEntry.command = commandEntry.command ?? new Command();
        commandEntry.commandOptions(commandEntry.command);
        if (commandEntry.commandAction) {
            commandEntry.command.action(commandEntry.commandAction);
            commandEntry.command.hook('postAction', printVersion);
        };

        if (commandEntry.parent) {
            commandEntry.parent.addCommand(commandEntry.command);
        }

        this.entries[name] = commandEntry;
    }

    /**
     * @remarks Gets command data.
     * @param name The name of the command to return.
     * @returns The data associated with the command or undefined if no command with that name exists.
     */
    public static getCommandEntry(name: string): CommandMapEntry<any, OptionValues>|undefined {
        return this.entries[name];
    }

    /**
     * @remarks Copies a command in the registery, allows for cross-subcommand aliases.
     * @param name The internal name of the new command.
     * @param source The internal name of the command to copy.
     * @param commandName The display name of the new command.
     * @param parent The parent the new command should be anchored to.
     */
    public static async copyCommand(name: string, source: string, commandName: string, parent?: Command): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1)); // Wait to perform copy until all the base commands were added

        const sourceEntry = this.getCommandEntry(source);
        if (sourceEntry) {
            const entry: CommandMapEntry<any, any> = {
                command: new Command(),
                parent: parent,
                commandOptions: sourceEntry.commandOptions,
                commandAction: sourceEntry.commandAction,
            };

            entry.commandOptions(entry.command!);
            entry.command!.name(commandName);
            if (entry.commandAction) {
                entry.command!.action(entry.commandAction);
                entry.command!.hook('postAction', printVersion);
            };

            if (parent) {
                entry.parent = parent;
                parent.addCommand(entry.command!);
            }

            this.entries[name] = entry;
        }
    }
}