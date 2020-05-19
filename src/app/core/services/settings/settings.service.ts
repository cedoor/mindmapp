import {Injectable} from '@angular/core'
import {STORAGE_KEYS, StorageService} from '../storage/storage.service'
import {Settings} from '../../../shared/models/settings.model'
import {UtilsService} from '../utils/utils.service'
import {API_URL, HttpService} from '../../http/http.service'
import {NotificationService} from '../notification/notification.service'
import {BehaviorSubject, Observable} from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    public static readonly LANGUAGES = ['en', 'fr', 'de', 'it', 'zh-tw', 'zh-cn', 'es', 'pt-br']

    public settings: Observable<Settings | null>
    private settingsSubject: BehaviorSubject<Settings | null>

    constructor (private storageService: StorageService,
                 private notificationService: NotificationService,
                 private httpService: HttpService) {
        // Initialization of the behavior subjects.
        this.settingsSubject = new BehaviorSubject(null)
        this.settings = this.settingsSubject.asObservable()
    }

    /**
     * Initialize settings with the default or cached values and return them.
     */
    public async init (): Promise<{ settings: Settings, isFirstTime: boolean }> {
        const defaultSettings: Settings = await this.getDefaultSettings()
        const settings: Settings = await this.storageService.get(STORAGE_KEYS.SETTINGS)

        // Check if there are settings in the storage and if these settings have an old structure.
        if (settings !== null && UtilsService.isSameJSONStructure(defaultSettings, settings)) {
            this.settingsSubject.next(settings)

            return {
                settings,
                isFirstTime: false
            }
        }

        // Save the default settings.
        await this.storageService.set(STORAGE_KEYS.SETTINGS, defaultSettings)
        this.settingsSubject.next(defaultSettings)

        return {
            settings: defaultSettings,
            isFirstTime: true
        }
    }

    /**
     * Update the settings in the storage.
     */
    public async updateCachedSettings (settings: Settings): Promise<void> {
        await this.storageService.set(STORAGE_KEYS.SETTINGS, settings)

        this.settingsSubject.next(settings)
    }

    /**
     * Return the current settings.
     */
    public getCachedSettings (): Settings | null {
        return this.settingsSubject.getValue()
    }

    /**
     * Return the default settings.
     */
    private getDefaultSettings (): Promise<Settings> {
        return this.httpService.get(API_URL.LOCAL_ASSETS, 'settings.json')
    }

}
