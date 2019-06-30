import {Component, OnInit} from '@angular/core'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import * as packageJson from '../../../../../../package.json'
import {SidenavService} from '../../../../core/services/sidenav/sidenav.service'

@Component({
    selector: 'mindmapp-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    public currentYear: string
    public projectName: string
    public projectRepositoryUrl: string

    constructor (private sidenavService: SidenavService) {
        this.projectName = UtilsService.capitalizeWord(packageJson.name)
        this.projectRepositoryUrl = packageJson.repository.url
    }

    public openSidenav () {
        this.sidenavService.open()
    }

    public ngOnInit () {
        this.currentYear = new Date().getFullYear().toString()
    }

}
