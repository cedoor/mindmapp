import {Component, OnInit} from "@angular/core";
import * as mmp from "mmp";
import {ElectronService} from "./services/electron.service";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    values: any = {};

    constructor(public electron: ElectronService) {
        this.electron.setMenu();
    }

    ngOnInit() {
        mmp.on("nodeselect", (key, value) => {
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
    }

}
