import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../services/settings.service";
import {Settings} from "../../models/settings";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {

    title: string = "Preferenze";

    values: Settings;

    actived: boolean = false;

    index: number = 0;
    options = ["Sincronizzazione", "Lingua"];

    constructor(public settings: SettingsService) {
    }

    ngOnInit() {
        this.settings.init().then(settings => {
            this.values = settings;
        });

        this.settings.active.subscribe((actived) => {
            this.actived = actived;
        });
    }

    selectOption(index: number) {
        this.index = index;
    }

}
