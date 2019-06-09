import {Injectable, NgZone} from '@angular/core'
import {MmpService} from './mmp.service'
import {MatDialog} from '@angular/material/dialog'
import {MatDialogRef} from '@angular/material/dialog/typings/dialog-ref'
import {LangChangeEvent, TranslateService} from '@ngx-translate/core'
import {environment} from '../../../environments/environment'
import {FileService} from './file.service'
import {remote} from 'electron'
import * as fs from 'fs'
import * as JsPDF from 'jspdf'
import {UtilsService} from './utils.service'

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    private remote: typeof remote
    private fs: typeof fs

    private matDialogRefs: Map<string, MatDialogRef<any>>

    private translations: any

    private forceQuit: boolean

    constructor (private ngZone: NgZone,
                 private translateService: TranslateService,
                 private matDialog: MatDialog,
                 private mmpService: MmpService,
                 private fileService: FileService) {
        if (window.require) {
            this.remote = window.require('electron').remote
            this.fs = window.require('fs')
        }

        this.matDialogRefs = new Map()

        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translations = event.translations
        })

        this.forceQuit = false
    }

    /**
     * Save the mind map in the file system.
     * @param {boolean} saveAs
     * @returns {Promise<any>}
     */
    public saveMap (saveAs: boolean = false): Promise<any> {
        return new Promise((resolve: Function) => {
            const data = JSON.stringify(this.mmpService.exportAsJSON())

            if (saveAs || !this.fileService.getFilePath()) {
                this.remote.dialog.showSaveDialog({
                    title: this.translations.SAVE,
                    filters: [{
                        name: this.translations.MINDMAPP_FILES + ` (*.${MmpService.MAP_FORMAT})`,
                        extensions: [MmpService.MAP_FORMAT]
                    }, {
                        name: this.translations.ALL_FILES,
                        extensions: ['*']
                    }],
                    defaultPath: this.mmpService.selectNode('map_1_node_0').name + `.${MmpService.MAP_FORMAT}`
                }, (path: string) => {
                    this.ngZone.run(() => {
                        if (typeof path === 'string') {
                            this.fs.writeFileSync(path, data)

                            this.fileService.setFilePath(path)
                            this.fileService.setSavingStatus(true)
                        }

                        resolve()
                    })
                })
            } else {
                this.fs.writeFileSync(this.fileService.getFilePath(), data)
                this.fileService.setSavingStatus(true)

                resolve()
            }
        })
    }

    /**
     * Export the current mind map with the format passed as parameter.
     */
    public async exportAs (format: 'png' | 'jpeg' | 'pdf' = 'png') {
        const name = this.mmpService.selectNode('map_1_node_0').name
        const extension = format === 'jpeg' ? 'jpg' : format

        if (format === 'pdf') {
            const imageUri = await this.mmpService.exportAsImage('jpeg')
            const htmlImageElement = await UtilsService.imageFromUri(imageUri)
            const pdf = new JsPDF({
                orientation: htmlImageElement.width > htmlImageElement.height ? 'l' : 'p',
                format: [htmlImageElement.width * 0.75, htmlImageElement.height * 0.75]
            })

            pdf.addImage(imageUri, 'JPEG', 0, 0)

            pdf.save(`${name}.${extension}`)
        } else {
            const image = await this.mmpService.exportAsImage(format)
            UtilsService.downloadFile(`${name}.${extension}`, image)
        }
    }

    /**
     * Open an existing map.
     */
    public openMap () {
        this.showMapPreSavingMessage().then(() => {
            this.remote.dialog.showOpenDialog({
                title: this.translations.OPEN,
                properties: ['openFile'],
                filters: [{
                    name: this.translations.MINDMAPP_FILES + ` (*.${MmpService.MAP_FORMAT})`,
                    extensions: [MmpService.MAP_FORMAT]
                }, {
                    name: this.translations.ALL_FILES,
                    extensions: ['*']
                }]
            }, (files: Array<string>) => {
                if (files) {
                    this.ngZone.run(() => {
                        const data = this.fs.readFileSync(files[0]).toString(),
                            path = files[0]

                        this.fileService.setFilePath(path)
                        this.fileService.setSavingStatus(true)

                        this.mmpService.new(JSON.parse(data))

                        // Overwrite the old data format (mmp 0.1.7) with the new
                        const newDataFormat = JSON.stringify(this.mmpService.exportAsJSON())
                        this.fs.writeFileSync(path, newDataFormat)
                    })
                }
            })
        })
    }

    /**
     * Create a new empty map.
     */
    public newMap (data?: any) {
        if (data) {
            data = JSON.parse(data)
        }

        this.showMapPreSavingMessage().then(() => {
            this.ngZone.run(() => {
                this.fileService.setFilePath('')
                this.fileService.setSavingStatus(true)

                this.mmpService.new(data)
            })
        })
    }

    /**
     * Insert an image in the current selected node.
     */
    public addNodeImage () {
        if (!this.mmpService.selectNode().image.src) {
            this.remote.dialog.showOpenDialog({
                title: this.translations.INSERT_NODE_IMAGE,
                properties: ['openFile'],
                filters: [{
                    name: this.translations.IMAGE,
                    extensions: ['png', 'gif', 'jpg', 'jpeg']
                }]
            }, (files: Array<string>) => {
                if (files) {
                    this.ngZone.run(() => {
                        const url = files[0],
                            extension = url.split('.').pop(),
                            buffer = new Buffer(this.fs.readFileSync(url)).toString('base64'),
                            base64 = 'data:image/' + extension + ';base64,' + buffer

                        this.mmpService.updateNode('imageSrc', base64)
                    })
                }
            })
        } else {
            this.mmpService.updateNode('imageSrc', '')
        }
    }

    /**
     * Show a message dialog.
     * @param {string} title
     * @param {string} message
     * @returns {Promise<number>}
     */
    public showMessage (title: string, message: string): Promise<number> {
        return new Promise((resolve: Function) => {
            this.remote.dialog.showMessageBox({
                type: 'question',
                title,
                message,
                buttons: [
                    this.translations.YES,
                    this.translations.NO,
                    this.translations.CANCEL
                ]
            }, index => {
                resolve(index)
            })
        })
    }

    /**
     * Show the pre-saving message and if the user agrees save the map.
     * @returns {Promise<any>}
     */
    public showMapPreSavingMessage (): Promise<any> {
        return new Promise((resolve: Function) => {
            if (!this.fileService.mapIsSaved() && !this.fileService.mapIsinitial()) {
                this.showMessage(this.translations.SAVE, this.translations.SAVE_MAP_MESSAGE)
                    .then((response: number) => {
                        if (response === 0) {
                            this.saveMap().then(() => {
                                resolve()
                            })
                        } else if (response === 1) {
                            resolve()
                        }
                    })
            } else {
                resolve()
            }
        })
    }

    /**
     * Manage the exit from the program.
     */
    public createQuitListener () {
        if (environment.production) {
            const currentWindow = this.remote.getCurrentWindow()

            window.onbeforeunload = (event: Event) => {
                if (!this.fileService.mapIsSaved() && !this.fileService.mapIsinitial() && !this.forceQuit) {

                    this.showMessage(this.translations.SAVE, this.translations.SAVE_MAP_MESSAGE)
                        .then((index: number) => {
                            if (index === 0) {
                                this.saveMap().then(() => {
                                    currentWindow.destroy()
                                })
                            } else if (index === 1) {
                                currentWindow.destroy()
                            }
                        })

                    event.returnValue = false
                }
            }
        }
    }

}
