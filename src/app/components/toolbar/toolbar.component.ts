import {Component, Input, OnInit} from "@angular/core";
import {ElectronService} from "../../services/electron.service";
import * as mmp from "mmp";

@Component({
    selector: "app-toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent implements OnInit {

    @Input() values: any;

    mmp: any;

    constructor(public electron: ElectronService) {
        this.mmp = mmp;
    }

    ngOnInit() {
    }

}
