import {Component, Input, OnInit} from "@angular/core";
import {DialogService} from "../../services/dialog.service";
import {MmpService} from "../../services/mmp.service";
import {FileService} from "../../services/file.service";

@Component({
    selector: "app-toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {

    @Input() public node: any;

    public mapSaved: boolean;

    constructor(public dialogService: DialogService,
                public mmpService: MmpService,
                public fileService: FileService) {
    }

    ngOnInit() {
        this.fileService.watchSavingStatus().subscribe((mapSaved: boolean) => {
            this.mapSaved = mapSaved;
        })
    }

    public toogleNodeFontStyle() {
        let currentStyle = this.mmpService.selectNode().font.style;

        if (currentStyle === "italic") {
            this.mmpService.updateNode("fontStyle", "normal");
        } else {
            this.mmpService.updateNode("fontStyle", "italic");
        }
    }

    public toogleNodeFontWeight() {
        let currentWeight = this.mmpService.selectNode().font.weight;

        if (currentWeight === "bold") {
            this.mmpService.updateNode("fontWeight", "normal");
        } else {
            this.mmpService.updateNode("fontWeight", "bold");
        }
    }

}
