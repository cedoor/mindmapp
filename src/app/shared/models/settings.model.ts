import {MapOptions} from './mmp.model'

export interface Settings {
    general: General
    mapOptions: MapOptions
}

interface General {
    language: string
}
