import {Component, OnInit} from '@angular/core'
import {MmpService} from '../../../../core/services/mmp/mmp.service'

@Component({
    selector: 'mindmapp-floating-buttons',
    templateUrl: './floating-buttons.component.html',
    styleUrls: ['./floating-buttons.component.scss']
})
export class FloatingButtonsComponent implements OnInit {

    constructor (public mmpService: MmpService) {
    }

    ngOnInit () {
    }

}
