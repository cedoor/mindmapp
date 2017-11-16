import {Injectable} from "@angular/core";
import * as mmp from "mmp";
import * as fs from "fs";

@Injectable()
export class UtilsService {

    fs: typeof fs;

    initialMap: string;

    windowTitle: string = window.document.title;
    filePath: string = "";
    mapSaved: boolean = false;

    constructor() {
        this.fs = window.require("fs");
    }

    setInitialMap() {
        let data = this.getFilteredMapData();
        this.initialMap = JSON.stringify(data);
    }

    isInitialMap(): boolean {
        let data = this.getFilteredMapData();
        return this.initialMap === JSON.stringify(data);
    }

    checkSavedFile() {
        if (this.filePath) {
            let fileData = this.fs.readFileSync(this.filePath, "utf8"),
                mapData = JSON.stringify(mmp.data());

            if (fileData !== mapData) this.setSavedStatus(false);
            else this.setSavedStatus();
        } else if (!this.isInitialMap()) {
            this.setSavedStatus(false);
        } else {
            this.setSavedStatus();
        }

    }

    setSavedStatus(saved: boolean = true) {
        if (saved) {
            window.document.title = this.windowTitle;
            this.mapSaved = true;
            window.document.getElementById("save-map").classList.add("disable");
        } else {
            window.document.title = this.windowTitle + "*";
            this.mapSaved = false;
            window.document.getElementById("save-map").classList.remove("disable");
        }
    }

    setFilePath(filePath: string) {
        this.filePath = filePath;
    }

    getFilePath(): string {
        return this.filePath;
    }

    isSaved(): boolean {
        return this.mapSaved;
    }

    // To get mmp snapshot without coordinates and k constant
    private getFilteredMapData() {
        let data = mmp.data();
        delete data[0].value.x;
        delete data[0].value.y;
        delete data[0].value.k;
        return data;
    }

}
