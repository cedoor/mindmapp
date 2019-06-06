import {NgModule} from '@angular/core'
import {ShortcutsRoutingModule} from './shortcuts-routing.module'
import {SharedModule} from '../../shared/shared.module'
import {ShortcutsComponent} from './pages/shortcuts/shortcuts.component'

@NgModule({
    imports: [
        SharedModule,
        ShortcutsRoutingModule
    ],
    declarations: [
        ShortcutsComponent
    ]
})
export class ShortcutsModule {
}
