import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {MmpService} from "../../services/mmp.service";

@Component({
    selector: "app-colors-panel",
    templateUrl: "./colors-panel.component.html",
    styleUrls: ["./colors-panel.component.scss"]
})
export class ColorsPanelComponent implements OnInit {

    @Input() public node: any;

    @ViewChild("background") public background: ElementRef;

    tooltip: any;

    constructor(public mmpService: MmpService) {
    }

    ngOnInit() {
        this.tooltip = {
            delay: 1000
        };
    }

    public colorPickerChange(property, value) {
        this.mmpService.updateNode(property, value, true);
    }

    public colorPickerToggleChange(opening, property, value) {
        this.background.nativeElement.style.visibility = opening ? "visible" : "hidden";
        if (!opening) {
            this.mmpService.updateNode(property, value);
        }
    }

}
