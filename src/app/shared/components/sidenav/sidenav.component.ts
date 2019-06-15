import {Component, Input} from '@angular/core'
import {MatSidenav} from '@angular/material/sidenav'
import {DialogService} from '../../../core/services/dialog.service'

@Component({
    selector: 'mindmapp-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

    @Input() public sidenav: MatSidenav

    constructor (public dialogService: DialogService) {
    }

    public exportMap (extension: string) {
        switch (extension) {
            case 'png':
                this.dialogService.exportMap('png')
                break
            case 'jpeg':
                this.dialogService.exportMap('jpeg')
                break
            case 'pdf':
                this.dialogService.exportMap('pdf')
                break
            case 'json':
                this.dialogService.exportMap('json')
                break
        }

        this.sidenav.close()
    }

}
