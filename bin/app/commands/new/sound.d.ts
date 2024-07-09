import { ClientSoundCategory } from "../../types/index.js";
export interface NewSoundOptions {
    category: ClientSoundCategory;
    filepath: string;
    vanilla?: string;
}
