import {Injectable} from "@angular/core";
import {MmpService} from "./mmp.service";

@Injectable()
export class UtilsService {

    fs;

    fileWatcher: any;
    fileSync: boolean = false;

    windowTitle: string = window.document.title;
    filePath: string = "";
    mapSaved: boolean = false;

    constructor(private mmp: MmpService) {
        this.fs = window.require("fs");
    }

    watchFile() {
        this.fileWatcher = this.fs.watch(this.filePath, eventType => {
            if (eventType === "change" && this.fileSync) {
                let fileData = this.fs.readFileSync(this.filePath, "utf8"),
                    mapData = JSON.stringify(this.mmp.exportAsJSON());

                if (this.isJsonString(fileData) && fileData !== mapData) {
                    this.mmp.new(JSON.parse(fileData));
                }
            } else if (eventType === "rename") {
                this.setFilePath("");
                this.setSavedStatus(false);
            }
        });
    }

    setFileSync(flag: boolean) {
        this.fileSync = flag;
    }

    stopFileWatching() {
        if (this.fileWatcher) {
            this.fileWatcher.close();
        }
    }

    checkSavedFile() {
        if (this.filePath) {
            let fileData = this.fs.readFileSync(this.filePath),
                mapData = JSON.stringify(this.mmp.exportAsJSON());

            if (fileData !== mapData) this.setSavedStatus(false);
            else this.setSavedStatus();
        } else if (!this.mmp.isInitialMap()) {
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
        this.stopFileWatching();
        if (this.filePath) {
            this.watchFile();
        }
    }

    getFilePath(): string {
        return this.filePath;
    }

    isSaved(): boolean {
        return this.mapSaved;
    }

    isJsonString(string: string) {
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    }

}
