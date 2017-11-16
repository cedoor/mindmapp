import {Component, Input} from "@angular/core";
import {DialogService} from "../../services/dialog.service";
import * as mmp from "mmp";

@Component({
    selector: "app-toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent {

    @Input() values: any;

    mmp: any;

    constructor(public dialog: DialogService) {
        this.mmp = mmp;
    }

}
