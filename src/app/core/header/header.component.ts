import {Component, Input, OnInit} from '@angular/core'
import {MmpService} from '../services/mmp.service'
import {FileService} from '../services/file.service'
import {UtilsService} from '../services/utils.service'
import {MatSidenav} from '@angular/material/sidenav'
import {DialogService} from '../services/dialog.service'

@Component({
    selector: 'mindmapp-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input() public node: any
    @Input() public sidenav: MatSidenav

    public savingStatus: any

    constructor (public dialogService: DialogService,
                 public mmpService: MmpService,
                 public fileService: FileService) {
    }

    public ngOnInit () {
        this.fileService.watchSavingStatus().subscribe((savingStatus: any) => {
            this.savingStatus = savingStatus
        })
    }

    public toggleFullScreen () {
        UtilsService.toggleFullScreen()
    }

    public toogleNodeFontStyle () {
        const currentStyle = this.mmpService.selectNode().font.style

        if (currentStyle === 'italic') {
            this.mmpService.updateNode('fontStyle', 'normal')
        } else {
            this.mmpService.updateNode('fontStyle', 'italic')
        }
    }

    public toogleNodeFontWeight () {
        const currentWeight = this.mmpService.selectNode().font.weight

        if (currentWeight === 'bold') {
            this.mmpService.updateNode('fontWeight', 'normal')
        } else {
            this.mmpService.updateNode('fontWeight', 'bold')
        }
    }

}
