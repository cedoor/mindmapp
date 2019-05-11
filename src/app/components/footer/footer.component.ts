import {Component, OnInit} from '@angular/core'
import {NotificationsService} from '../../services/notifications.service'
import {FileService} from '../../services/file.service'

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public informations: string

    public mapSaved: boolean
    public filePath: string

    constructor (public notificationsService: NotificationsService,
                 public fileService: FileService) {
    }

    ngOnInit () {
        this.notificationsService.watchInfoStatus().subscribe((informations: string) => {
            this.informations = informations
        })

        this.fileService.watchSavingStatus().subscribe((savingStatus: any) => {
            this.mapSaved = savingStatus.saved
            this.filePath = savingStatus.filePath
        })
    }

}
