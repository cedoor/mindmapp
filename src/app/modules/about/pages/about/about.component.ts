import {Component, OnInit} from '@angular/core'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import * as packageJson from '../../../../../../package.json'

@Component({
    selector: 'mindmapp-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    public currentYear: string
    public projectName: string
    public projectAuthor: string
    public projectRepositoryUrl: string

    constructor () {
        this.projectName = UtilsService.capitalizeWord(packageJson.name)
        this.projectRepositoryUrl = packageJson.repository.url
        this.projectAuthor = packageJson.author.name
    }

    public ngOnInit () {
        this.currentYear = new Date().getFullYear().toString()
    }

    public slide (selector: string, event: Event) {
        if (selector) {
            event.preventDefault()

            window.document.querySelector(selector).scrollIntoView({
                behavior: 'smooth'
            })
        }
    }

}
