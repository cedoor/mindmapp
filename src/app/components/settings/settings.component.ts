import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../services/settings.service";
import {Settings} from "../../models/settings";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {

    values: Settings;

    actived: boolean = false;

    index: number = 0;
    menuLabels: string[] = [];

    constructor(public settings: SettingsService) {
    }

    ngOnInit() {
        this.settings.init().then((settings: Settings) => {
            this.values = settings;
            for (let menuLabel in settings) {
                this.menuLabels.push(menuLabel.toUpperCase());
            }
        });

        this.settings.onUpdate.subscribe((settings: Settings) => {
            this.values = settings;
        });

        this.settings.onActive.subscribe((actived) => {
            this.actived = actived;
        });
    }

    selectOption(index: number) {
        this.index = index;
    }

}
