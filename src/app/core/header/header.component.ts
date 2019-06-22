import {Component, Input, OnInit} from '@angular/core'
import {MmpService} from '../services/mmp.service'
import {MapCacheService} from '../services/map-cache.service'
import {UtilsService} from '../services/utils.service'
import {MatSidenav} from '@angular/material/sidenav'
import {DialogService} from '../services/dialog.service'
import {ActivationEnd, Router, RouterEvent} from '@angular/router'
import * as packageJson from '../../../../package.json'

@Component({
    selector: 'mindmapp-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input() public node: any
    @Input() public sidenav: MatSidenav
    public currentPage: string
    public applicationName: string

    constructor (public mapCacheService: MapCacheService,
                 private dialogService: DialogService,
                 private router: Router,
                 private mmpService: MmpService) {
        this.applicationName = UtilsService.capitalizeWord(packageJson.name)
    }

    public ngOnInit (): void {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof ActivationEnd && event.snapshot.routeConfig.path) {
                this.currentPage = event.snapshot.routeConfig.path
            }
        })
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

    public saveMap () {
        this.mapCacheService.attachMap()
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
