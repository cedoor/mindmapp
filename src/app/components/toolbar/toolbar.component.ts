import {Component, Input, OnInit} from "@angular/core";
import {DialogService} from "../../services/dialog.service";
import {MmpService} from "../../services/mmp.service";

@Component({
    selector: "app-toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {

    @Input() node: any;

    tooltip: any;

    constructor(public dialogService: DialogService,
                public mmpService: MmpService) {
    }

    ngOnInit() {
        this.tooltip = {
            delay: 1000
        };
    }

    toogleNodeFontStyle() {
        let currentStyle = this.mmpService.selectNode().font.style;

        if (currentStyle === "italic") {
            this.mmpService.updateNode("fontStyle", "normal");
        } else {
            this.mmpService.updateNode("fontStyle", "italic");
        }
    }

    toogleNodeFontWeight() {
        let currentWeight = this.mmpService.selectNode().font.weight;

        if (currentWeight === "bold") {
            this.mmpService.updateNode("fontWeight", "normal");
        } else {
            this.mmpService.updateNode("fontWeight", "bold");
        }
    }

}
