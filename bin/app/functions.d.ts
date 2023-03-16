interface functionOptions {
    description?: string;
    source?: string;
    origin?: string;
}
export declare function createNewFunction(names: string[], commands: string, number: number, options: functionOptions): Promise<void>;
export {};
