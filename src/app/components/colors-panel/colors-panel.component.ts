import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import * as mmp from "mmp";

@Component({
    selector: "app-colors-panel",
    templateUrl: "./colors-panel.component.html",
    styleUrls: ["./colors-panel.component.scss"]
})
export class ColorsPanelComponent {

    @Input() colors: any;

    @ViewChild("obscure") obscure: ElementRef;

    constructor() {
    }

    colorPickerChange(property, value) {
        mmp.node.update(property, value, true);
    }

    colorPickerToggleChange(opening, property, value) {
        this.obscure.nativeElement.style.visibility = opening ? "visible" : "hidden";

        if (!opening) mmp.node.update(property, value);
    }

}
