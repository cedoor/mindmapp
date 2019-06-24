import {Component} from '@angular/core'
import {SidenavService} from '../../../core/services/sidenav/sidenav.service'

@Component({
    selector: 'mindmapp-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

    constructor (private sidenavService: SidenavService) {
    }

    public closeSidenav () {
        this.sidenavService.close()
    }

}
