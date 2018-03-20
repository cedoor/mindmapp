import {Injectable} from "@angular/core";
import {MmpService} from "./mmp.service";
import {UtilsService} from "./utils.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {FSWatcher} from "fs";
import * as fs from "fs";

@Injectable()
export class FileService {

    private readonly WINDOW_TITLE: string = window.document.title;

    private fs: typeof fs;
    private filePath: string;

    private savingStatus: boolean;
    private savingStatusSource: BehaviorSubject<boolean>;

    private mapFileWatcher: FSWatcher;
    private externalFileSynchronization: boolean;

    constructor(private mmpService: MmpService) {
        this.fs = window.require("fs");
        this.savingStatus = false;

        this.savingStatusSource = new BehaviorSubject<boolean>(this.savingStatus);
        this.externalFileSynchronization = false;
    }

    /**
     * Set the external file synchronization status.
     * @param {boolean} value
     */
    public setExternalFileSynchronization(value: boolean) {
        this.externalFileSynchronization = value;
    }

    /**
     * Change the saving status. If there is an associated map file check
     * if the current map and the file data are the same.
     */
    public checkMapFile() {
        if (this.filePath) {
            let fileData = this.fs.readFileSync(this.filePath).toString(),
                mapData = JSON.stringify(this.mmpService.exportAsJSON());

            if (fileData !== mapData) {
                this.setSavingStatus(false);
            } else {
                this.setSavingStatus(true);
            }
        } else {
            this.setSavingStatus(false);
        }
    }

    /**
     * Set the status of the map saving.
     * @param {boolean} value
     */
    public setSavingStatus(value: boolean) {
        this.savingStatus = false;

        window.document.title = value === true
            ? this.WINDOW_TITLE
            : this.WINDOW_TITLE + "*";

        this.savingStatusSource.next(value);
    }

    /**
     * Return true if the map is saved.
     * @returns {boolean}
     */
    public mapIsSaved(): boolean {
        return this.savingStatus;
    }

    /**
     * Return an observable for mapSaved status.
     * @returns {Observable<boolean>}
     */
    public watchSavingStatus(): Observable<boolean> {
        return this.savingStatusSource.asObservable();
    }

    /**
     * Set the path of the file where the map is saved.
     * @param {string} filePath
     */
    public setFilePath(filePath: string) {
        this.filePath = filePath;

        this.stopMapFileWatching();

        if (this.filePath) {
            this.watchMapFile(this.filePath);
        }
    }

    /**
     * Return the path of the file where the map is saved.
     * @returns {string}
     */
    public getFilePath(): string {
        return this.filePath;
    }

    /**
     * Stop the map file watcher.
     */
    private stopMapFileWatching() {
        if (this.mapFileWatcher) {
            this.mapFileWatcher.close();
        }
    }

    /**
     * Watch the associated map file and handle some events.
     */
    private watchMapFile(mapPath: string) {
        this.mapFileWatcher = this.fs.watch(mapPath, (eventType: string) => {
            if (eventType === "change" && mapPath) {
                let fileData = this.fs.readFileSync(mapPath).toString(),
                    mapData = JSON.stringify(this.mmpService.exportAsJSON());

                if (UtilsService.isJSONString(fileData) && fileData !== mapData) {
                    // Update the current map with external changes
                    this.mmpService.new(JSON.parse(fileData));
                }
            } else if (eventType === "rename") {
                this.setFilePath("");
                this.setSavingStatus(false);
            }
        });
    }

}
