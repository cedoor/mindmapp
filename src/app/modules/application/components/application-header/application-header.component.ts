import {Component, Input} from '@angular/core'
import {MatDialog, MatSidenav} from '@angular/material'
import {MapCacheService} from '../../../../core/services/map-cache/map-cache.service'
import {NotificationService} from '../../../../core/services/notification/notification.service'
import {Router} from '@angular/router'
import {MmpService} from '../../../../core/services/mmp/mmp.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {ApplicationCachedMapsComponent} from '../application-cached-maps/application-cached-maps.component'

@Component({
    selector: 'mindmapp-application-header',
    templateUrl: './application-header.component.html',
    styleUrls: ['./application-header.component.scss']
})
export class ApplicationHeaderComponent {

    @Input() public node: any
    @Input() public sidenav: MatSidenav

    constructor (public mapCacheService: MapCacheService,
                 private matDialog: MatDialog,
                 private notificationService: NotificationService,
                 private router: Router,
                 private mmpService: MmpService) {
    }

    public async openCachedMaps () {
        const cachedMapEntries = await this.mapCacheService.getCachedMapEntries()

        if (cachedMapEntries.length === 0) {
            this.notificationService.setMessage('NO_SAVED_MAPS')
            return
        }

        this.matDialog.open(ApplicationCachedMapsComponent, {
            data: cachedMapEntries
        })
    }

    public createNewMap () {
        this.mapCacheService.detachMap()
        this.mmpService.new()
    }

    public exportMap (format: string) {
        this.mmpService.exportMap(format)

        this.sidenav.close()
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
