import {Component, OnInit} from '@angular/core'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import * as packageJson from '../../../../../../package.json'

@Component({
    selector: 'mindmapp-jumbotron',
    templateUrl: './jumbotron.component.html',
    styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {

    public projectName: string

    constructor () {
    }

    public ngOnInit () {
        this.projectName = UtilsService.capitalizeWord(packageJson.name)
    }

}
