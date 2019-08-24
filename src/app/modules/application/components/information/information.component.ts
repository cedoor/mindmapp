import {Component} from '@angular/core'
import {NotificationService} from '../../../../core/services/notification/notification.service'
import {MapCacheService} from '../../../../core/services/map-cache/map-cache.service'

@Component({
    selector: 'mindmapp-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss']
})
export class InformationComponent {

    constructor (public mapCacheService: MapCacheService,
                 public notificationsService: NotificationService) {
    }

}
