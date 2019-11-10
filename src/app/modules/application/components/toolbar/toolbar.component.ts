import {Component, Input} from '@angular/core'
import {MapCacheService} from '../../../../core/services/map-cache/map-cache.service'
import {MmpService} from '../../../../core/services/mmp/mmp.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'

@Component({
    selector: 'mindmapp-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    @Input() public node: any

    constructor (public mapCacheService: MapCacheService,
                 public mmpService: MmpService) {
    }

    public createNewMap () {
        this.mmpService.new()
        this.mapCacheService.attachNewMap()
    }

    public exportMap (format: string) {
        this.mmpService.exportMap(format)
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
