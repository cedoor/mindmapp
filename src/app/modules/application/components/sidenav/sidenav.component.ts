import {Component, Input, OnInit} from '@angular/core'
import {MatSidenav} from '@angular/material'
import {DialogService} from '../../../../core/services/dialog.service'
import {UtilsService} from '../../../../core/services/utils.service'

@Component({
    selector: 'mindmapp-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    @Input() public sidenav: MatSidenav

    public platform: string

    constructor (public dialogService: DialogService,
                 public utilsService: UtilsService) {
        this.platform = window.process.platform
    }

    ngOnInit () {
    }

}
