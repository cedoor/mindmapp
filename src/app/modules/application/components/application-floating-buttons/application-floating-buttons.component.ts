import {Component, OnInit} from '@angular/core'
import {MmpService} from '../../../../core/services/mmp/mmp.service'

@Component({
    selector: 'mindmapp-floating-buttons',
    templateUrl: './application-floating-buttons.component.html',
    styleUrls: ['./application-floating-buttons.component.scss']
})
export class ApplicationFloatingButtonsComponent implements OnInit {

    constructor (public mmpService: MmpService) {
    }

    ngOnInit () {
    }

}
