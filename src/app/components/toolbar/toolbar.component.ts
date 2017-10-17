import {Component, Input, OnInit} from "@angular/core";
import * as mmp from "mmp";

@Component({
    selector: "app-toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {

    mmp: any;

    constructor() {
        this.mmp = mmp;
    }

    ngOnInit() {
    }

}
