import {Component} from "@angular/core";
import * as mmp from "mmp";

@Component({
    selector: "app-floating-buttons",
    templateUrl: "./floating-buttons.component.html",
    styleUrls: ["./floating-buttons.component.css"]
})
export class FloatingButtonsComponent {

    mmp: any;

    constructor() {
        this.mmp = mmp;
    }

}
