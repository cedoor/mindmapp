import {MapOptions} from "./mmp";

export interface Settings {
    language: string;
    mapOptions: MapOptions;
    sharing: Sharing;
}

interface Sharing {
    ipfs: boolean;
}
