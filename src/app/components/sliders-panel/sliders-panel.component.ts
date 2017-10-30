import {Component, Input} from "@angular/core";
import * as mmp from "mmp";

@Component({
    selector: "app-sliders-panel",
    templateUrl: "./sliders-panel.component.html",
    styleUrls: ["./sliders-panel.component.scss"]
})
export class SlidersPanelComponent {

    @Input() values: any;

    mmp: any;

    constructor() {
        this.mmp = mmp;
    }

}
