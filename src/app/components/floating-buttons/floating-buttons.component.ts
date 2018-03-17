import {Component, OnInit} from "@angular/core";
import {MmpService} from "../../services/mmp.service";

@Component({
    selector: "app-floating-buttons",
    templateUrl: "./floating-buttons.component.html",
    styleUrls: ["./floating-buttons.component.scss"]
})
export class FloatingButtonsComponent implements OnInit {

    tooltip: any;

    constructor(public mmp: MmpService) {
    }

    ngOnInit() {
        this.tooltip = {
            delay: 1000
        };
    }

}
