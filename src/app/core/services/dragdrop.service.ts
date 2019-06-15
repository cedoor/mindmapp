import {Injectable, NgZone} from '@angular/core'
import {MmpService} from './mmp.service'
import {FileService} from './file.service'
import {environment} from '../../../environments/environment'
// @ts-ignore
import * as fs from 'fs'

@Injectable({
    providedIn: 'root'
})
export class DragDropService {

    private readonly IMAGE_EXTENSIONS: Array<string> = ['png', 'jpeg', 'jpg', 'bmp', 'gif', 'svg']

    private fs: typeof fs

    constructor (private ngZone: NgZone,
                 private mmpService: MmpService,
                 private fileService: FileService) {
        if (environment.electron) {
            this.fs = window.require('fs')
        }
    }

    /**
     * Manage all the drag & drop events.
     */
    public createDragAndDropListener () {
        window.document.ondragover = window.document.ondrop = (event: DragEvent) => {
            event.preventDefault()
        }

        window.document.body.ondrop = (event: DragEvent) => {
            event.preventDefault()

            const files = event.dataTransfer.files

            if (files.length > 0) {
                const url = files[0].name
                let extension = url.split('.').pop()

                // Insert the image in the selected node
                if (this.IMAGE_EXTENSIONS.indexOf(extension) !== -1) {
                    if (extension === 'svg') {
                        extension += '+xml'
                    }

                    // @ts-ignore
                    const buffer = new Buffer(this.fs.readFileSync(url)).toString('base64')
                    const base64 = 'data:image/' + extension + ';base64,' + buffer

                    this.mmpService.updateNode('imageSrc', base64)
                }

                // Load the map
                if (extension === 'json') {
                    this.ngZone.run(() => {
                        const data = this.fs.readFileSync(url).toString()

                        this.fileService.setFilePath(url)
                        this.fileService.setSavingStatus(true)

                        this.mmpService.new(JSON.parse(data))
                    })
                }
            }
        }
    }

}
