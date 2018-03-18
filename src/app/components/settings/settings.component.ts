import {Component, Inject, OnInit} from "@angular/core";
import {Settings} from "../../models/settings";
import {MAT_DIALOG_DATA} from "@angular/material";
import {SettingsService} from "../../services/settings.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {

    public settings: Settings;

    public titles: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public settingsService: SettingsService) {
    }

    ngOnInit() {
        this.settings = this.settingsService.getSettings();

        this.titles = {};
        for (let title in this.settings) {
            this.titles[title] = "SETTINGS_LABELS." + title.split(/(?=[A-Z])/).join("_").toUpperCase();
        }
    }

    public setMapOptions() {
        this.settingsService.setMapOptions(this.settings.mapOptions).then((settings: Settings) => {
            this.settings = settings;
        });
    }

    public setLanguage(language: string) {
        this.settingsService.setLanguage(language).then((settings: Settings) => {
            this.settings = settings;
        });
    }

    public setFileSynchronization(status: boolean) {
        this.settingsService.setFileSynchronization(status).then((settings: Settings) => {
            this.settings = settings;
        });
    }

    public setIpfs(status: boolean) {
        this.settingsService.setIpfs(status).then((settings: Settings) => {
            this.settings = settings;
        });
    }

}
