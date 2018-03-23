import {MapOptions} from "./mmp";

export interface Settings {
    general: General;
    language: string;
    mapOptions: MapOptions;
    sharing: Sharing;
}

interface Sharing {
    ipfs: boolean;
}

interface General {
    language: string;
}
