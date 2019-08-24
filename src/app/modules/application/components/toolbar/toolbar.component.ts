import {Component, Input} from '@angular/core'
import {MatDialog} from '@angular/material'
import {MapCacheService} from '../../../../core/services/map-cache/map-cache.service'
import {NotificationService} from '../../../../core/services/notification/notification.service'
import {Router} from '@angular/router'
import {MmpService} from '../../../../core/services/mmp/mmp.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {CachedMapsComponent} from '../cached-maps/cached-maps.component'

@Component({
    selector: 'mindmapp-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    @Input() public node: any

    constructor (public mapCacheService: MapCacheService,
                 private matDialog: MatDialog,
                 private notificationService: NotificationService,
                 private router: Router,
                 private mmpService: MmpService) {
    }

    public async openCachedMaps () {
        const cachedMapEntries = await this.mapCacheService.getCachedMapEntries()

        if (cachedMapEntries.length === 0) {
            this.notificationService.showSnackBarMessage('MESSAGES.NO_SAVED_MAPS')
            return
        }

        this.matDialog.open(CachedMapsComponent, {
            data: cachedMapEntries
        })
    }

    public createNewMap () {
        this.mapCacheService.detachMap()
        this.mmpService.new()
    }

    public exportMap (format: string) {
        this.mmpService.exportMap(format)
    }

    public saveMap () {
        this.mapCacheService.attachMap()
    }

    public toggleFullScreen () {
        UtilsService.toggleFullScreen()
    }

    public toogleNodeFontStyle () {
        const currentStyle = this.mmpService.selectNode().font.style

        if (currentStyle === 'italic') {
            this.mmpService.updateNode('fontStyle', 'normal')
        } else {
            this.mmpService.updateNode('fontStyle', 'italic')
        }
    }

    public toogleNodeFontWeight () {
        const currentWeight = this.mmpService.selectNode().font.weight

        if (currentWeight === 'bold') {
            this.mmpService.updateNode('fontWeight', 'normal')
        } else {
            this.mmpService.updateNode('fontWeight', 'bold')
        }
    }

}
