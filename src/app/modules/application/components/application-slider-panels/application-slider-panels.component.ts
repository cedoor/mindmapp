import {Component, Input} from '@angular/core'
import {MmpService} from '../../../../core/services/mmp/mmp.service'

@Component({
    selector: 'mindmapp-sliders-panel',
    templateUrl: './application-slider-panels.component.html',
    styleUrls: ['./application-slider-panels.component.scss']
})
export class ApplicationSliderPanelsComponent {

    @Input() public node: any

    constructor (public mmpService: MmpService) {
    }

    public updateNodeFontSize (event: any, graphic?: boolean) {
        const value = parseInt(event.source.value)

        this.mmpService.updateNode('fontSize', value, graphic)
    }

    public updateNodeImageSize (event: any, graphic?: boolean) {
        const value = parseInt(event.source.value)

        this.mmpService.updateNode('imageSize', value, graphic)
    }

}
