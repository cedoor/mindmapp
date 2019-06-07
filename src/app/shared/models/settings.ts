import {MapOptions} from './mmp'

export interface Settings {
    general: General
    mapOptions: MapOptions
    sharing: Sharing
}

interface Sharing {
    ipfs: boolean
}

interface General {
    language: string
    firstTime: boolean
}
