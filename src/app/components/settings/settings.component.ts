import {Component, OnInit} from "@angular/core";
import {Settings} from "../../models/settings";
import {SettingsService} from "../../services/settings.service";
import {DialogService} from "../../services/dialog.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {

    public settings: Settings;

    public titles: any;

    public languages: Array<string>;

    constructor(public settingsService: SettingsService) {
    }

    ngOnInit() {
        this.settings = this.settingsService.getSettings();

        this.titles = {};
        for (let title in this.settings) {
            this.titles[title] = "SETTINGS_LABELS." + title.split(/(?=[A-Z])/).join("_").toUpperCase();
        }

        this.languages = ["en", "it"];
    }

    public setMapOptions() {
        this.settingsService.setMapOptions(this.settings.mapOptions).then((settings: Settings) => {
            this.settings = settings;
        });
    }

    public setLanguage() {
        this.settingsService.setLanguage(this.settings.general.language).then((settings: Settings) => {
            this.settings = settings;
        });
    }

    public setIpfs(status: boolean) {
        this.settingsService.setIpfs(status).then((settings: Settings) => {
            this.settings = settings;
        });
    }

}
