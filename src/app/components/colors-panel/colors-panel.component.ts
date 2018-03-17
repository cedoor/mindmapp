import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {MmpService} from "../../services/mmp.service";

@Component({
    selector: "app-colors-panel",
    templateUrl: "./colors-panel.component.html",
    styleUrls: ["./colors-panel.component.scss"]
})
export class ColorsPanelComponent implements OnInit {

    @Input() node: any;

    @ViewChild("background") background: ElementRef;

    tooltip: any;

    constructor(public mmp: MmpService) {
        this.fixColorPickerFlicker();
    }

    ngOnInit() {
        this.tooltip = {
            delay: 1000
        };
    }

    colorPickerChange(property, value) {
        this.mmp.updateNode(property, value, true);
    }

    colorPickerToggleChange(opening, property, value) {
        this.background.nativeElement.style.visibility = opening ? "visible" : "hidden";
        if (!opening) {
            this.mmp.updateNode(property, value);
        }
    }

    fixColorPickerFlicker() {
        window.onload = () => {
            let colors: any = window.document.getElementById("panel").children;
            for (let color of colors) {
                color.onmousedown = (e) => {
                    e.preventDefault();
                };
            }
        };
    }

}
