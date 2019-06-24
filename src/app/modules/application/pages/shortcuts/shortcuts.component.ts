import {Component, OnInit} from '@angular/core'
import {ShortcutsService} from '../../../../core/services/shortcuts/shortcuts.service'
import {Hotkey} from 'angular2-hotkeys'
import {SidenavService} from '../../../../core/services/sidenav/sidenav.service'

@Component({
    selector: 'mindmapp-shortcuts',
    templateUrl: './shortcuts.component.html',
    styleUrls: ['./shortcuts.component.scss']
})
export class ShortcutsComponent implements OnInit {

    public hotKeys: Hotkey[]

    constructor (private sidenavService: SidenavService,
                 private shortcutsService: ShortcutsService) {
    }

    ngOnInit () {
        this.hotKeys = this.shortcutsService.getHotKeys()
    }

    public openSidenav () {
        this.sidenavService.open()
    }

}
