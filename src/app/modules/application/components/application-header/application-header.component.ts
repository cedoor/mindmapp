import {Component, Input} from '@angular/core'
import {MatDialog, MatSidenav} from '@angular/material'
import {MapCacheService} from '../../../../core/services/map-cache/map-cache.service'
import {NotificationService} from '../../../../core/services/notification/notification.service'
import {DialogService} from '../../../../core/services/dialog/dialog.service'
import {Router} from '@angular/router'
import {MmpService} from '../../../../core/services/mmp/mmp.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {ApplicationCachedMapsComponent} from '../application-cached-maps/application-cached-maps.component'
import {SidenavService} from '../../../../core/services/sidenav/sidenav.service'

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
                 private dialogService: DialogService,
                 private router: Router,
                 private sidenavService: SidenavService,
                 private mmpService: MmpService) {
    }

    public openSidenav () {
        this.sidenavService.open()
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

    public exportMap (extension: string) {
        switch (extension) {
            case 'png':
                this.dialogService.exportMap('png')
                break
            case 'jpeg':
                this.dialogService.exportMap('jpeg')
                break
            case 'pdf':
                this.dialogService.exportMap('pdf')
                break
            case 'json':
                this.dialogService.exportMap('json')
                break
        }

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
