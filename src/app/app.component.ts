import {Component, OnInit} from "@angular/core";
import {ElectronService} from "./services/electron.service";
import * as mmp from "mmp";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    colors: any;
    sizes: any;

    constructor(public electronService: ElectronService) {
        if (electronService.isElectron()) {
            console.log("Mode electron");
            // Check if electron is correctly injected (see externals in webpack.config.js)
            console.log("c", electronService.ipcRenderer);
            // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
            console.log("c", electronService.childProcess);
        } else {
            console.log("Mode web");
        }
    }

    ngOnInit() {
        mmp.on("nodeselect", (key, value) => {
            this.colors = {
                "background-color": value["background-color"],
                "text-color": value["text-color"],
                "branch-color": value["branch-color"]
            };
            this.sizes = {
                "font-size": value["font-size"],
                "image-size": value["image-src"] ? value["image-size"] : 0
            };
            console.log(this.sizes)
        });
        mmp.init("mmp");

        mmp.node.add()
    }
}
