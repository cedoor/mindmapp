import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import * as mmp from "mmp";

@Component({
    selector: "app-colors-panel",
    templateUrl: "./colors-panel.component.html",
    styleUrls: ["./colors-panel.component.scss"]
})
export class ColorsPanelComponent {

    @Input() values: any;

    @ViewChild("background") background: ElementRef;

    constructor() {
        this.fixColorPickerFlicker();
    }

    colorPickerChange(property, value) {
        mmp.node.update(property, value, true);
    }

    colorPickerToggleChange(opening, property, value) {
        this.background.nativeElement.style.visibility = opening ? "visible" : "hidden";
        if (!opening) {
            mmp.node.update(property, value);
        }
    }

    fixColorPickerFlicker() {
        window.onload = () => {
            let colors: any = window.document.getElementById("panel").children;
            for (let color of colors) {
                color.onmousedown = (e) => {
                    e.preventDefault()
                }
            }
        };
    }

}
