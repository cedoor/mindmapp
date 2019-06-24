import {Component, OnInit} from '@angular/core'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import * as packageJson from '../../../../../../package.json'

@Component({
    selector: 'mindmapp-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    public packageJson: any
    public currentYear: string

    constructor () {
        this.packageJson = packageJson
    }

    public ngOnInit () {
        this.currentYear = new Date().getFullYear().toString()
    }

    public openLink (event: any) {
        UtilsService.openExternalLink(event.target.innerHTML)
    }

}
