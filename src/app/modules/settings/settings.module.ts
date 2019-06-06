import {NgModule} from '@angular/core'
import {SettingsRoutingModule} from './settings-routing.module'
import {SharedModule} from '../../shared/shared.module'
import {SettingsComponent} from './pages/settings/settings.component'

@NgModule({
    imports: [
        SharedModule,
        SettingsRoutingModule
    ],
    declarations: [
        SettingsComponent
    ]
})
export class SettingsModule {
}
