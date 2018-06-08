import {Component, Input, OnInit} from "@angular/core";
import {DialogService} from "../../services/dialog.service";
import {UtilsService} from "../../services/utils.service";

@Component({
    selector: "app-header-bar",
    templateUrl: "./header-bar.component.html",
    styleUrls: ["./header-bar.component.scss"]
})
export class HeaderBarComponent implements OnInit {

    window: typeof window;

    constructor(public dialogService: DialogService,
                public utilsService: UtilsService) {
    }

    ngOnInit() {
        this.window = window;
    }

}
