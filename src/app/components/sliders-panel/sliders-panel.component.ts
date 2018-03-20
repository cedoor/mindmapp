import {Component, Input, OnInit} from "@angular/core";
import {MmpService} from "../../services/mmp.service";

@Component({
    selector: "app-sliders-panel",
    templateUrl: "./sliders-panel.component.html",
    styleUrls: ["./sliders-panel.component.scss"]
})
export class SlidersPanelComponent implements OnInit {

    @Input() public node: any;

    public tooltip: any;

    constructor(public mmpService: MmpService) {
    }

    ngOnInit() {
        this.tooltip = {
            delay: 1000
        };
    }

    public updateNodeFontSize(event: any, graphic?: boolean) {
        let value = parseInt(event.source.value);

        this.mmpService.updateNode("fontSize", value, graphic);
    }

    public updateNodeImageSize(event: any, graphic?: boolean) {
        let value = parseInt(event.source.value);

        this.mmpService.updateNode("imageSize", value, graphic);
    }

}
