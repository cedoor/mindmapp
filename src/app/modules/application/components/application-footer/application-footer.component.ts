import {Component} from '@angular/core'
import {NotificationService} from '../../../../core/services/notification/notification.service'
import {MapCacheService} from '../../../../core/services/map-cache/map-cache.service'

@Component({
    selector: 'mindmapp-footer',
    templateUrl: './application-footer.component.html',
    styleUrls: ['./application-footer.component.scss']
})
export class ApplicationFooterComponent {

    constructor (public mapCacheService: MapCacheService,
                 public notificationsService: NotificationService) {
    }

}
