import {Component, Input, OnInit} from "@angular/core";
import {MmpService} from "../../services/mmp.service";

@Component({
    selector: "app-sliders-panel",
    templateUrl: "./sliders-panel.component.html",
    styleUrls: ["./sliders-panel.component.scss"]
})
export class SlidersPanelComponent implements OnInit {

    @Input() node: any;

    tooltip: any;

    constructor(public mmp: MmpService) {
    }

    ngOnInit() {
        this.tooltip = {
            delay: 1000
        };
    }

    updateNodeFontSize(event: any, graphic?: boolean) {
        let value = parseInt(event.source.value);

        this.mmp.updateNode("fontSize", value, graphic);
    }

    updateNodeImageSize(event: any, graphic?: boolean) {
        let value = parseInt(event.source.value);

        this.mmp.updateNode("imageSize", value, graphic);
    }

}
