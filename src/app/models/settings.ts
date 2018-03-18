import {MapOptions} from "./mmp";

export interface Settings {
    language: string;
    synchronization: Synchronization;
    mapOptions: MapOptions;
    sharing: Sharing;
}

interface Synchronization {
    file: boolean;
}

interface Sharing {
    ipfs: boolean;
}
