import {Component, OnInit} from '@angular/core'
import {ShortcutsService} from '../../../../core/services/shortcuts/shortcuts.service'
import {Hotkey} from 'angular2-hotkeys'

@Component({
    selector: 'mindmapp-shortcuts',
    templateUrl: './shortcuts.component.html',
    styleUrls: ['./shortcuts.component.scss']
})
export class ShortcutsComponent implements OnInit {

    public shortcuts: any[]

    constructor (private shortcutsService: ShortcutsService) {
    }

    public ngOnInit () {
        const hotKeys: Hotkey[] = this.shortcutsService.getHotKeys()
        this.shortcuts = hotKeys.map((hotKey: Hotkey) => {
            const keys = hotKey.combo[0]

            return {
                keys: keys === '+' ? [keys] : keys.split('+'),
                description: hotKey.description
            }
        })
    }

}
