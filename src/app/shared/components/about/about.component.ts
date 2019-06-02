import {Component, OnInit} from '@angular/core'
import {UtilsService} from '../../../core/services/utils.service'
import * as packageInformations from '../../../../../package.json'

@Component({
    selector: 'mindmapp-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    public packageInformations: any
    public currentYear: string

    constructor (public utilsService: UtilsService) {
        this.packageInformations = packageInformations
    }

    ngOnInit () {
        this.currentYear = new Date().getFullYear().toString()
    }

    openLink (event: any) {
        event.preventDefault()

        this.utilsService.openExternalLink(event.target.innerHTML)
    }

}
