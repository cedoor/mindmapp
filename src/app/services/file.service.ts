import {Injectable} from '@angular/core'
import {MmpService} from './mmp.service'
import {BehaviorSubject, Observable} from 'rxjs'
import * as fs from 'fs'
import {FSWatcher} from 'fs'

@Injectable()
export class FileService {

    private readonly WINDOW_TITLE: string = window.document.title

    private fs: typeof fs
    private filePath: string

    private savingStatus: any
    private savingStatusSource: BehaviorSubject<any>

    private mapFileWatcher: FSWatcher

    constructor (private mmpService: MmpService) {
        this.fs = window.require('fs')
        this.savingStatus = {
            saved: false,
            initial: true,
            filePath: ''
        }

        this.savingStatusSource = new BehaviorSubject<any>(this.savingStatus)
    }

    /**
     * Change the saving status. If there is an associated map file check
     * if the current map and the file data are the same.
     */
    public checkMapFile () {
        if (this.mmpService.history().index === 0) {
            this.setSavingStatus(false, true)
        } else {
            if (this.filePath) {
                let fileData = this.fs.readFileSync(this.filePath).toString(),
                    mapData = JSON.stringify(this.mmpService.exportAsJSON())

                if (fileData !== mapData) {
                    this.setSavingStatus(false)
                } else {
                    this.setSavingStatus(true)
                }
            } else {
                this.setSavingStatus(false)
            }
        }
    }

    /**
     * Set the status of the map saving.
     * @param {boolean} saved
     * @param {boolean} initial
     */
    public setSavingStatus (saved: boolean, initial: boolean = false) {
        this.savingStatus = {
            saved, initial,
            filePath: this.filePath
        }

        window.document.title = saved === true || initial === true
            ? this.WINDOW_TITLE
            : this.WINDOW_TITLE + '*'

        this.savingStatusSource.next(this.savingStatus)
    }

    /**
     * Return true if the map is saved.
     * @returns {boolean}
     */
    public mapIsSaved (): boolean {
        return this.savingStatus.saved
    }

    /**
     * Return true if the map is the the initial map.
     * @returns {boolean}
     */
    public mapIsinitial (): boolean {
        return this.savingStatus.initial
    }

    /**
     * Return an observable for mapSaved status.
     * @returns {Observable<boolean>}
     */
    public watchSavingStatus (): Observable<any> {
        return this.savingStatusSource.asObservable()
    }

    /**
     * Set the path of the file where the map is saved.
     * @param {string} filePath
     */
    public setFilePath (filePath: string) {
        this.filePath = filePath

        this.stopMapFileWatching()

        if (this.filePath) {
            this.watchMapFile(this.filePath)
        }
    }

    /**
     * Return the path of the file where the map is saved.
     * @returns {string}
     */
    public getFilePath (): string {
        return this.filePath
    }

    /**
     * Stop the map file watcher.
     */
    private stopMapFileWatching () {
        if (this.mapFileWatcher) {
            this.mapFileWatcher.close()
        }
    }

    /**
     * Watch the associated map file and handle some events.
     */
    private watchMapFile (mapPath: string) {
        this.mapFileWatcher = this.fs.watch(mapPath, (eventType: string) => {
            if (eventType === 'rename') {
                this.setFilePath('')
                this.setSavingStatus(false)
            }
        })
    }

}
