import {Component} from '@angular/core'
import {NotificationService} from '../../../../core/services/notification/notification.service'

@Component({
    selector: 'mindmapp-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss']
})
export class InformationComponent {

    constructor (public notificationsService: NotificationService) {
    }

}
