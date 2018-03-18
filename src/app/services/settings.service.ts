import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";
import {UtilsService} from "./utils.service";
import {IPFSService} from "./ipfs.service";
import {Settings} from "../models/settings";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {MapOptions} from "../models/mmp";
import {MmpService} from "./mmp.service";

@Injectable()
export class SettingsService {

    private readonly SETTINGS_KEY: string = "settings";
    private readonly DEFAULT_SETTINGS_URL: string = "./assets/data/defaultSettings.json";

    private settings: Settings;

    constructor(private storage: StorageService,
                private http: HttpClient,
                private mmp: MmpService,
                private translate: TranslateService,
                private ipfs: IPFSService,
                private utils: UtilsService) {
    }

    /**
     * Initialize the settings with default or saved values and return them.
     * @returns {Promise<Settings>}
     */
    public init(): Promise<Settings> {
        return this.storage.exist(this.SETTINGS_KEY).then((exist: any) => {
            if (!exist) {
                return this.getDefaultSettings().then((defaultSettings: Settings) => {
                    return this.storage.set(this.SETTINGS_KEY, defaultSettings);
                });
            } else {
                return this.storage.get(this.SETTINGS_KEY);
            }
        }).then((settings: Settings) => {
            this.settings = settings;

            return settings;
        });
    }

    /**
     * Active or disable ipfs service and update the settings.
     * @param {boolean} status
     * @returns {Promise<Settings>}
     */
    public setIpfs(status: boolean): Promise<Settings> {
        this.settings.sharing.ipfs = status;

        return this.update(this.settings).then((settings: Settings) => {
            status ? this.ipfs.start() : this.ipfs.stop();
            return settings;
        });
    }

    /**
     * Active or disable file synchronization and update the settings.
     * @param {boolean} status
     * @returns {Promise<Settings>}
     */
    public setFileSynchronization(status: boolean): Promise<Settings> {
        this.settings.synchronization.file = status;

        return this.update(this.settings).then((settings: Settings) => {
            this.utils.setFileSync(status);
            return settings;
        });
    }

    /**
     * Set the new language and update the settings.
     * @param {string} language
     * @returns {Promise<Settings>}
     */
    public setLanguage(language: string): Promise<Settings> {
        this.settings.language = language;

        return this.update(this.settings).then((settings: Settings) => {
            this.translate.use(language);
            return settings;
        });
    }

    /**
     * Update the settings with the new map options.
     * @param {MapOptions} mapOptions
     * @returns {Promise<Settings>}
     */
    public setMapOptions(mapOptions: MapOptions): Promise<Settings> {
        this.settings.mapOptions = mapOptions;

        return this.update(this.settings).then((settings: Settings) => {
            this.mmp.updateOptions("rootNode", settings.mapOptions.rootNode);
            this.mmp.updateOptions("defaultNode", settings.mapOptions.defaultNode);
            return settings;
        });
    }

    /**
     * Return a copy of the current settings.
     * @returns {Settings}
     */
    public getSettings(): Settings {
        return JSON.parse(JSON.stringify(this.settings));
    }

    /**
     * Return the default settings.
     * @returns {Promise<Settings>}
     */
    private getDefaultSettings(): Promise<Settings> {
        return this.http.get(this.DEFAULT_SETTINGS_URL).toPromise().then((settings: Settings) => {
            return settings;
        });
    }

    /**
     * Overwrite the settings in the storage.
     * @param {Settings} settings
     * @returns {Promise<Settings>}
     */
    private update(settings: Settings): Promise<Settings> {
        return this.storage.set(this.SETTINGS_KEY, settings).then((settings: Settings) => {
            return settings;
        });
    }

}
