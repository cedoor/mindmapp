import {Component, Input} from '@angular/core'
import {MatSidenav} from '@angular/material/sidenav'

@Component({
    selector: 'mindmapp-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

    @Input() public sidenav: MatSidenav

    constructor () {
    }

}
