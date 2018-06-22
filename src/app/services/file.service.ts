import {Injectable} from "@angular/core";
import {MmpService} from "./mmp.service";
import {BehaviorSubject, Observable} from "rxjs";
import * as fs from "fs";
import {FSWatcher} from "fs";

@Injectable()
export class FileService {

    private readonly WINDOW_TITLE: string = window.document.title;

    private fs: typeof fs;
    private filePath: string;

    private savingStatus: boolean;
    private savingStatusSource: BehaviorSubject<boolean>;

    private mapFileWatcher: FSWatcher;

    constructor(private mmpService: MmpService) {
        this.fs = window.require("fs");
        this.savingStatus = false;

        this.savingStatusSource = new BehaviorSubject<boolean>(this.savingStatus);
    }

    /**
     * Change the saving status. If there is an associated map file check
     * if the current map and the file data are the same.
     */
    public checkMapFile() {
        if (this.mmpService.history().index === 0) {
            this.setSavingStatus(true);
        } else {
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
    }

    /**
     * Set the status of the map saving.
     * @param {boolean} value
     */
    public setSavingStatus(value: boolean) {
        this.savingStatus = value;

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
            if (eventType === "rename") {
                this.setFilePath("");
                this.setSavingStatus(false);
            }
        });
    }

}
