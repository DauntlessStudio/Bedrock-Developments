import { File } from "../file_manager.js";
import { NameData } from "../utils.js";
export declare function non_serializable(target: any, key: string | symbol): void;
/**
 * @remarks The parent class for all Minecraft data types, i.e. MinecraftServerClient.
 */
export declare class MinecraftDataType {
    filePath: string;
    /**
     * @remarks The directory where this type of file is kept.
     */
    static get DirectoryPath(): string;
    /**
     * @remarks Creates a new MinecraftDataType from a file path and object.
     * @param filePath The filepath to where this object should be written to.
     * @param template The object it should be created from.
     */
    constructor(filePath: string, template: any);
    /**
     * @remarks Creates a filepath for this object type from a {@link NameData}.
     * @param nameData The namedata to use when creating the filepath.
     * @returns The filepath as a string.
     */
    static createFilePath(nameData: NameData): string;
    /**
     * @remarks Creates a new instance of the data type using reasonable defaults from a {@link NameData}.
     * @param nameData The namedata to use for identifiers and the filepath.
     * @returns An instance of this data type.
     */
    static createFromTemplate(nameData: NameData): MinecraftDataType;
    /**
     * @remarks Serializes this object to a string.
     * @returns A string representation of this object.
     */
    serialize(): string;
    protected replacer(key: string, value: any): any;
    /**
     * @remarks Creates an instace of a MinecraftDataType child from a source string, used in {@link fromFile}.
     * @param create The child of MinecraftDataType to create.
     * @param filepath The filepath the MinecraftDataType can be written to with {@link toFile}.
     * @param json The source string this should be deserialized from.
     * @returns An instance of the MinecraftDataType child provided.
     */
    static deserialize<T>(create: new (filePath: string, template: any) => T, filepath: string, json: string): T;
    /**
     * @remarks Creates a {@link File} object from this MinecraftDataType.
     * @param handleExisting How to handle existing files. Undefined will not overwrite, 'overwite' replaces the file with this object,
     * 'overwrite_silent' does the same with no terminal log.
     * @returns A {@link File} object with this MinecraftDataType's filepath, and this object serialized as the file contents.
     */
    toFile(handleExisting?: 'overwrite' | 'overwrite_silent'): File;
    /**
     * @remarks Crates an instance of a MinecraftDataTypeChild from a {@link File}.
     * @param create The child of MinecraftDataType to create.
     * @param file The {@link File} object used to deserialize into this object.
     * @returns An instance of the MinecraftDataType child provided.
     */
    static fromFile<T>(create: new (filePath: string, template: any) => T, file: File): T;
    /**
     * @remarks Creates a MinecraftDataType object from a filepath, or a template if that filepath doesn't exist.
     * @param create The child of MinecraftDataType to create.
     * @param path The filepath to create the object from.
     * @returns The deserialized file as a child of MinecraftDataType, or this object's {@link createFromTemplate} default if the file doesn't exist.
     */
    static fromPathOrTemplate<T>(create: new (filePath: string, template: any) => T, path: string): T;
}
/**
 * @remarks A class for working with lang files.
 */
export declare class LangFile {
    /**
     * @remarks The lang files handled by this class instance, as an array of {@link File}s.
     */
    files: File[];
    /**
     * @remarks Gets a list of files from a glob pattern. Note that any valid pattern will work and the file will be treated as a lang file, even without the .lang extension.
     * @param filepattern The glob pattern to find lang files with. If no files match the pattern, a default `en_US.lang` file will be created automatically.
     */
    constructor(filepattern: string);
    /**
     * @remarks Adds a lang file entry to every `.lang` file in `RP/texts`.
     * @param categoryName The category to add an entry to, i.e. `Item Names`.
     * @param entries Entries to add to that category, i.e. `item.minecraft:test.name=Test`.
     * @returns A new LangFile object with every `.lang` file in the `RP/texts` directory, having added the entries.
     */
    static addToAllLangs(categoryName: string, ...entries: string[]): LangFile;
    /**
     * @remarks Adds an entry to all the `.lang` file in this object's {@link files} list.
     * @param categoryName The category to add an entry to, i.e. `Item Names`.
     * @param entries Entries to add to that category, i.e. `item.minecraft:test.name=Test`.
     */
    addToCategory(categoryName: string, ...entries: string[]): void;
}
/**
 * @remarks A class for working with `.mcfunction` files.
 */
export declare class MCFunction {
    /**
     * @remarks The mcfunction files handled by this class instance, as an array of {@link File}s.
     */
    files: File[];
    /**
     * @remarks Creates a list of files from the filepattern. Note that if no files match the filepattern, a new file will be created in `BP/functions` using the filepattern as a path.
     * @param filepattern The filepattern used to find or create mcfunction files.
     */
    constructor(filepattern: string);
    /**
     * @remarks Adds commands and optional comments.
     * @param commands A list of commands to add to the files.
     * @param options The mcfunction's comments at the top of the file, note these are only added if the file is empty.
     */
    addCommand(commands: string[], options?: {
        description: string;
        source?: string;
        selector?: string;
    }): void;
}
