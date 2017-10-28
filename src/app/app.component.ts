import {Component, OnInit} from "@angular/core";
import {ElectronService} from "./services/electron.service";
import * as mmp from "mmp";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    values: any = {};

    constructor(public electron: ElectronService) {
    }

    ngOnInit() {
        mmp.on("nodeselect", (key, value) => {
            if (!value["branch-color"]) value["branch-color"] = "";
            Object.assign(this.values, value);
        });

        mmp.init("mmp");

        mmp.on("nodeupdate", (key, value) => {
            Object.assign(this.values, value);
            this.electron.checkSavedFile();
        });

        mmp.on("mmundo", () => {
            this.electron.checkSavedFile();
        });

        mmp.on("mmrepeat", () => {
            this.electron.checkSavedFile();
        });

        mmp.on("nodecreate", () => {
            this.electron.checkSavedFile();
        });

        mmp.on("noderemove", () => {
            this.electron.checkSavedFile();
        });

        this.electron.setInitialMap();
        this.electron.setMenu();
    }

}
