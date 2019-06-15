import {Component, Input} from '@angular/core'
import {MmpService} from '../services/mmp.service'
import {MapCacheService} from '../services/map-cache.service'
import {UtilsService} from '../services/utils.service'
import {MatSidenav} from '@angular/material/sidenav'
import {DialogService} from '../services/dialog.service'

@Component({
    selector: 'mindmapp-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Input() public node: any
    @Input() public sidenav: MatSidenav

    constructor (public mapCacheService: MapCacheService,
                 private dialogService: DialogService,
                 private mmpService: MmpService) {
    }

    public saveMap () {
        if (this.mapCacheService.getCachedStatus() === null) {
            this.mapCacheService.addMap()
        } else {
            this.mapCacheService.updateMap()
        }
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
