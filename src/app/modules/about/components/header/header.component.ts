import {Component, OnInit} from '@angular/core'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import * as packageJson from '../../../../../../package.json'
import {faGithub, faGitter} from '@fortawesome/free-brands-svg-icons'

@Component({
    selector: 'mindmapp-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public projectName: string

    public faGithub = faGithub
    public faGitter = faGitter

    constructor () {
    }

    public ngOnInit () {
        this.projectName = UtilsService.capitalizeWord(packageJson.name)
    }

    public slide (selector: string, event: Event) {
        if (selector) {
            event.preventDefault()
            const element = document.querySelector(selector)

            window.scrollTo({
                behavior: 'smooth',
                top: element.getBoundingClientRect().top + window.scrollY - 70
            })
        }
    }

}
