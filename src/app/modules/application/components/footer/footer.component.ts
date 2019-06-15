import {Component, OnInit} from '@angular/core'
import {NotificationsService} from '../../../../core/services/notifications.service'
import {MapCacheService} from '../../../../core/services/map-cache.service'

@Component({
    selector: 'mindmapp-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public message: string

    constructor (public mapCacheService: MapCacheService,
                 private notificationsService: NotificationsService) {
    }

    ngOnInit () {
        this.notificationsService.watchInfoStatus().subscribe((message: string) => {
            this.message = message
        })
    }

}
