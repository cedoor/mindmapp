import {Component, OnInit} from '@angular/core'
import {environment} from '../../../../../environments/environment'
import {DialogService} from '../../../../core/services/dialog.service'
import {DragDropService} from '../../../../core/services/dragdrop.service'
import {MapOptions} from '../../../../shared/models/mmp'
import {FileService} from '../../../../core/services/file.service'
import {MmpService} from '../../../../core/services/mmp.service'
import {SettingsService} from '../../../../core/services/settings.service'
import * as fs from 'fs'

@Component({
    selector: 'mindmapp-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

    public fs: typeof fs
    public arguments: string[]
    public node: any

    constructor (private dialogService: DialogService,
                 private dragDropService: DragDropService,
                 private mmpService: MmpService,
                 private settingsService: SettingsService,
                 private fileService: FileService) {
        if (window.require) {
            this.arguments = window.require('electron').remote.getGlobal('arguments')
            this.fs = window.require('fs')
        }

        this.node = {}
    }

    public async ngOnInit () {
        const settings = this.settingsService.getSettings()

        // Create the mind map.
        this.createMap(settings.mapOptions)

        // Initialize all listeners
        this.createMapListeners()
        this.dialogService.createQuitListener()
        this.dragDropService.createDragAndDropListener()

        // If there are arguments with the path of a mind map load it.
        if (this.arguments && this.arguments[1] && environment.production) {
            const path = this.arguments[1]
            const data = this.fs.readFileSync(path).toString()

            this.fileService.setFilePath(path)
            this.fileService.setSavingStatus(true)

            this.mmpService.new(JSON.parse(data))

            // Overwrite the old data format (mmp 0.1.7) with the new.
            const newDataFormat = JSON.stringify(this.mmpService.exportAsJSON())
            this.fs.writeFileSync(path, newDataFormat)
        }
    }

    public createMap (options: MapOptions) {
        this.mmpService.create('map_1', options)

        this.node = this.mmpService.selectNode()

        this.mmpService.addNodesOnRightClick()
        this.fileService.checkMapFile()
    }

    public createMapListeners () {
        this.mmpService.on('nodeSelect').subscribe((node) => {
            Object.assign(this.node, node)
        })

        this.mmpService.on('nodeDeselect').subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode())
        })

        this.mmpService.on('nodeUpdate').subscribe((node) => {
            Object.assign(this.node, node)
            this.fileService.checkMapFile()
        })

        this.mmpService.on('undo').subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode())
            this.fileService.checkMapFile()
        })

        this.mmpService.on('redo').subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode())
            this.fileService.checkMapFile()
        })

        this.mmpService.on('create').subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode())
            this.fileService.checkMapFile()
        })

        this.mmpService.on('nodeCreate').subscribe(() => {
            this.fileService.checkMapFile()
        })

        this.mmpService.on('nodeRemove').subscribe(() => {
            this.fileService.checkMapFile()
        })
    }

}
