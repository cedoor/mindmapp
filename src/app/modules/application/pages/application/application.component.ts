import {Component, OnInit} from '@angular/core'
import {DialogService} from '../../../../core/services/dialog.service'
import {DragDropService} from '../../../../core/services/dragdrop.service'
import {MapOptions} from '../../../../shared/models/mmp.model'
import {FileService} from '../../../../core/services/file.service'
import {MmpService} from '../../../../core/services/mmp.service'
import {SettingsService} from '../../../../core/services/settings.service'

@Component({
    selector: 'mindmapp-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

    public node: any

    constructor (private dialogService: DialogService,
                 private dragDropService: DragDropService,
                 private mmpService: MmpService,
                 private settingsService: SettingsService,
                 private fileService: FileService) {
        this.node = {}
    }

    public async ngOnInit () {
        const settings = this.settingsService.getCachedSettings()

        // Create the mind map.
        this.createMap(settings.mapOptions)

        // Initialize all listeners
        this.createMapListeners()
        this.dragDropService.createDragAndDropListener()
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
