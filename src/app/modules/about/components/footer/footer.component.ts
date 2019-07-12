import {Component, OnInit} from '@angular/core'
import * as packageJson from '../../../../../../package.json'

@Component({
    selector: 'mindmapp-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public currentYear: string
    public projectAuthor: string

    constructor () {
    }

    ngOnInit () {
        this.projectAuthor = packageJson.author.name
        this.currentYear = new Date().getFullYear().toString()
    }

}
