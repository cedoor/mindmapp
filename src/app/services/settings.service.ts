import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {StorageService} from "./storage.service";
import {UtilsService} from "./utils.service";
import {IPFSService} from "./ipfs.service";
import {Settings} from "../models/settings";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class SettingsService {

    private SETTINGS_KEY: string = "settings";

    private defaultSettings: Settings = {
        synchronization: {
            file: false
        },
        sharing: {
            ipfs: false
        },
        language: "en"
    } as Settings;
    private currentSettings: Settings = {} as Settings;

    private onActiveSource = new Subject<boolean>();
    onActive = this.onActiveSource.asObservable();

    private onInitSource = new Subject<Settings>();
    onInit = this.onInitSource.asObservable();

    private onUpdateSource = new Subject<Settings>();
    onUpdate = this.onUpdateSource.asObservable();

    constructor(private storage: StorageService,
                private translate: TranslateService,
                private ipfs: IPFSService,
                private utils: UtilsService) {
    }

    init(): Promise<Settings> {
        return this.storage.exist(this.SETTINGS_KEY).then(exist => {
            if (!exist) {
                return this.storage.set(this.SETTINGS_KEY, this.defaultSettings);
            } else {
                return this.storage.get(this.SETTINGS_KEY);
            }
        }).then((settings: Settings) => {
            // Object assignment to fix reference problem
            Object.assign(this.currentSettings, settings);

            this.onInitSource.next(settings);
            this.onInitSource.complete();
            return settings;
        });
    }

    open() {
        this.onActiveSource.next(true);
    }

    close() {
        this.onActiveSource.next(false);
    }

    setIpfs(flag: boolean) {
        this.currentSettings.sharing.ipfs = flag;

        this.update(this.currentSettings).then(() => {
            flag ? this.ipfs.start() : this.ipfs.stop();
        });
    }

    setFileSync(flag: boolean) {
        this.currentSettings.synchronization.file = flag;

        this.update(this.currentSettings).then(() => {
            this.utils.setFileSync(flag);
        });
    }

    setLanguage(lang: string) {
        this.currentSettings.language = lang;

        this.update(this.currentSettings).then(() => {
            this.translate.use(lang);
        });
    }

    private update(settings: Settings): Promise<Settings> {
        return this.storage.set(this.SETTINGS_KEY, settings).then((settings: Settings) => {
            this.onUpdateSource.next(settings);
            return settings;
        });
    }

}
