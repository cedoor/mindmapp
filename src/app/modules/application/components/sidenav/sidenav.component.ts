import {Component, Input} from '@angular/core'
import {MatSidenav} from '@angular/material/sidenav'
import {DialogService} from '../../../../core/services/dialog.service'
import {UtilsService} from '../../../../core/services/utils.service'

@Component({
    selector: 'mindmapp-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

    @Input() public sidenav: MatSidenav

    constructor (public dialogService: DialogService,
                 public utilsService: UtilsService) {
    }

}
