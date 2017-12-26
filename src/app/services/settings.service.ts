import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {StorageService} from "./storage.service";
import {UtilsService} from "./utils.service";
import {IPFSService} from "./ipfs.service";
import {Settings} from "../models/settings";

@Injectable()
export class SettingsService {

    private SETTINGS_KEY: string = "settings";
    private defaultSettings: Settings = {
        synchronization: {
            ipfs: false,
            file: false
        },
        language: {}
    } as Settings;

    private activeSource = new Subject<boolean>();
    active = this.activeSource.asObservable();

    constructor(private storage: StorageService,
                public ipfs: IPFSService,
                public utils: UtilsService) {
    }

    init(): Promise<Settings> {
        return this.storage.exist(this.SETTINGS_KEY).then(exist => {
            if (!exist) {
                return this.storage.set(this.SETTINGS_KEY, this.defaultSettings);
            } else {
                return this.storage.get(this.SETTINGS_KEY);
            }
        }).then((settings: Settings) => {
            if (settings.synchronization.ipfs) {
                this.setIpfs(true);
            }
            if (settings.synchronization.file) {
                this.setFileSync(true);
            }
            return settings;
        });
    }

    open() {
        this.activeSource.next(true);
    }

    close() {
        this.activeSource.next(false);
    }

    setIpfs(flag: boolean) {
        this.storage.get(this.SETTINGS_KEY).then((settings: Settings) => {
            settings.synchronization.ipfs = flag;

            this.storage.set(this.SETTINGS_KEY, settings).then(() => {
                flag ? this.ipfs.start() : this.ipfs.stop();
            });
        });
    }

    setFileSync(flag: boolean) {
        this.storage.get(this.SETTINGS_KEY).then((settings: Settings) => {
            settings.synchronization.file = flag;

            this.storage.set(this.SETTINGS_KEY, settings).then(() => {
                this.utils.setFileSync(flag);
            });
        });
    }

}
