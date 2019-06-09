import {Component, OnInit} from '@angular/core'
import {ShortcutsService} from '../../../../core/services/shortcuts.service'
import {Hotkey} from 'angular2-hotkeys'

@Component({
    selector: 'mindmapp-shortcuts',
    templateUrl: './shortcuts.component.html',
    styleUrls: ['./shortcuts.component.scss']
})
export class ShortcutsComponent implements OnInit {

    public hotKeys: Hotkey[]

    constructor (private shortcutsService: ShortcutsService) {
    }

    ngOnInit () {
        this.hotKeys = this.shortcutsService.getHotKeys()
    }

}
