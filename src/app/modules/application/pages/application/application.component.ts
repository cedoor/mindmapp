import {Component, OnInit} from '@angular/core'
import {MapOptions} from '../../../../shared/models/mmp.model'
import {MapCacheService} from '../../../../core/services/map-cache/map-cache.service'
import {MmpService} from '../../../../core/services/mmp/mmp.service'
import {SettingsService} from '../../../../core/services/settings/settings.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {NotificationService} from '../../../../core/services/notification/notification.service'

@Component({
    selector: 'mindmapp-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

    public node: any

    constructor (private mmpService: MmpService,
                 private settingsService: SettingsService,
                 private notificationService: NotificationService,
                 private mapCacheService: MapCacheService) {
        this.node = {}
    }

    public async ngOnInit () {
        const settings = this.settingsService.getCachedSettings()

        // Create the mind map.
        this.initMap(settings.mapOptions)

        this.notificationService.setMessage('MESSAGES.INITIAL_INFORMATION')

        this.handleImageDropObservable()
    }

    public handleImageDropObservable () {
        UtilsService.observableDroppedImages().subscribe((image: string) => {
            this.mmpService.updateNode('imageSrc', image)
        })
    }

    public async initMap (options: MapOptions) {
        this.mmpService.create('map_1', options)

        await this.mapCacheService.init()

        this.node = this.mmpService.selectNode()

        // Initialize all listeners
        this.createMapListeners()
    }

    public createMapListeners () {
        this.mmpService.on('create').subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode())
        })

        this.mmpService.on('nodeSelect').subscribe((node) => {
            Object.assign(this.node, node)
        })

        this.mmpService.on('nodeDeselect').subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode())
        })

        this.mmpService.on('nodeUpdate').subscribe((node) => {
            Object.assign(this.node, node)
            this.mapCacheService.updateAttachedMap()
        })

        this.mmpService.on('undo').subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode())
            this.mapCacheService.updateAttachedMap()
        })

        this.mmpService.on('redo').subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode())
            this.mapCacheService.updateAttachedMap()
        })

        this.mmpService.on('nodeCreate').subscribe(() => {
            this.mapCacheService.updateAttachedMap()
        })

        this.mmpService.on('nodeRemove').subscribe(() => {
            this.mapCacheService.updateAttachedMap()
        })
    }

}
