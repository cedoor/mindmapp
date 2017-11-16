import {Component, OnInit} from "@angular/core";
import {DialogService} from "./services/dialog.service";
import {DragDropService} from "./services/dragdrop.service";
import {UtilsService} from "./services/utils.service";
import * as mmp from "mmp";
import {MenuService} from "./services/menu.service";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    values: any = {};

    constructor(public dialog: DialogService,
                public dragDrop: DragDropService,
                public menu: MenuService,
                public utils: UtilsService) {
    }

    ngOnInit() {
        this.setMmpEvents();
        this.menu.setMenu();
        this.dialog.setExitDialog();
        this.utils.setInitialMap();
        this.dragDrop.setDragAndDrop();
    }

    setMmpEvents() {
        mmp.on("nodeselect", (key, value) => {
            if (!value["branch-color"]) value["branch-color"] = "";
            Object.assign(this.values, value);
        });

        mmp.init("mmp", {
            "root-node": {
                "name": "Nodo radice",
                "font-size": 26
            },
            "node": {
                "name": "Nodo",
                "font-size": 22
            }
        });

        mmp.on("nodeupdate", (key, value) => {
            Object.assign(this.values, value);
            this.utils.checkSavedFile();
        });

        mmp.on("mmundo", () => {
            this.utils.checkSavedFile();
        });

        mmp.on("mmrepeat", () => {
            this.utils.checkSavedFile();
        });

        mmp.on("nodecreate", () => {
            this.utils.checkSavedFile();
        });

        mmp.on("noderemove", () => {
            this.utils.checkSavedFile();
        });
    }

}
