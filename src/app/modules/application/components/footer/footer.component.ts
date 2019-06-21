import {Component} from '@angular/core'
import {NotificationService} from '../../../../core/services/notification.service'
import {MapCacheService} from '../../../../core/services/map-cache.service'

@Component({
    selector: 'mindmapp-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    constructor (public mapCacheService: MapCacheService,
                 public notificationsService: NotificationService) {
    }

}
