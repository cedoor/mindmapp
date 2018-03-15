import {Component, Input} from "@angular/core";
import {MmpService} from "../../services/mmp.service";

@Component({
    selector: "app-sliders-panel",
    templateUrl: "./sliders-panel.component.html",
    styleUrls: ["./sliders-panel.component.scss"]
})
export class SlidersPanelComponent {

    @Input() node: any;

    constructor(public mmp: MmpService) {
    }

    updateNodeFontSize(event: any, graphic?: boolean) {
        let value = parseInt(event.source.value);

        this.mmp.updateNode("fontSize", value, graphic);
    }

    updateNodeImageSize(event: any, graphic?: boolean) {
        let value = parseInt(event.srcElement.value);

        this.mmp.updateNode("imageSize", value, graphic);
    }

}
