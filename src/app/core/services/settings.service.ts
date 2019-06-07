import {Injectable} from '@angular/core'
import {StorageService} from './storage.service'
import {Settings} from '../../shared/models/settings'
import {HttpClient} from '@angular/common/http'
import {MapOptions} from '../../shared/models/mmp'
import {UtilsService} from './utils.service'

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private readonly SETTINGS_KEY: string = 'settings'
    private readonly DEFAULT_SETTINGS_URL: string = './assets/data/defaultSettings.json'

    private settings: Settings

    constructor (private storageService: StorageService,
                 private http: HttpClient,
                 private utilsService: UtilsService) {
    }

    /**
     * Initialize the settingsService with default or saved values and return them.
     */
    public init (): Promise<Settings> {
        return this.storageService.exist(this.SETTINGS_KEY).then((exist: any) => {
            if (!exist) {
                return this.getDefaultSettings().then((defaultSettings: Settings) => {
                    this.storageService.set(this.SETTINGS_KEY, defaultSettings)

                    return defaultSettings
                })
            } else {
                return this.storageService.get(this.SETTINGS_KEY)
            }
        }).then((settings: Settings) => {
            return this.getDefaultSettings().then((defaultSettings: Settings) => {
                if (!this.utilsService.haveSameStructure(defaultSettings, settings)) {
                    this.settings = defaultSettings

                    return this.update()
                } else {
                    this.settings = settings

                    return settings
                }
            })
        })
    }

    /**
     * Set the first time (of the app start) to false.
     */
    public setFirstTime (): Promise<Settings> {
        this.settings.general.firstTime = false

        return this.update()
    }

    /**
     * Update the settingsService with the new map options.
     */
    public setMapOptions (mapOptions: MapOptions): Promise<Settings> {
        this.settings.mapOptions = mapOptions

        return this.update()
    }

    /**
     * Set the new language and update the settingsService.
     */
    public setLanguage (language: string): Promise<Settings> {
        this.settings.general.language = language

        return this.update()
    }

    /**
     * Active or disable ipfs service and update the settingsService.
     */
    public setIpfs (status: boolean): Promise<Settings> {
        this.settings.sharing.ipfs = status

        return this.update()
    }

    /**
     * Return a copy of the current settingsService.
     */
    public getSettings (): Settings {
        return JSON.parse(JSON.stringify(this.settings))
    }

    /**
     * Return the default settingsService.
     */
    private getDefaultSettings (): Promise<Settings> {
        return this.http.get(this.DEFAULT_SETTINGS_URL).toPromise().then((settings: Settings) => {
            return settings
        })
    }

    /**
     * Overwrite the settings in the storage.
     */
    private async update (): Promise<Settings> {
        await this.storageService.set(this.SETTINGS_KEY, this.settings)

        return this.settings
    }

}
