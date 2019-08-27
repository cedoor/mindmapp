import {Component, OnInit} from '@angular/core'
import {faBrain, faChartLine, faCheck, faCogs, faHeart, faRocket} from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'mindmapp-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    public faBrain = faBrain
    public faRocket = faRocket
    public faHeart = faHeart
    public faChartLine = faChartLine
    public faCogs = faCogs
    public faCheck = faCheck

    constructor () {
    }

    public ngOnInit () {
    }

}
