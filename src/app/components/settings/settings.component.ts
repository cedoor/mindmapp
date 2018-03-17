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

    settings: Settings;

    titles: string[];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public settingsService: SettingsService) {
    }

    ngOnInit() {
        this.settings = this.settingsService.getSettings();

        this.titles = [];
        for (let title in this.settings) {
            this.titles.push(title.toUpperCase());
        }
    }

}
