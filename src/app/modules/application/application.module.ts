import {NgModule} from '@angular/core'
import {ApplicationRoutingModule} from './application-routing.module'
import {SharedModule} from '../../shared/shared.module'
import {ColorsPanelComponent} from './components/colors-panel/colors-panel.component'
import {SlidersPanelComponent} from './components/sliders-panel/sliders-panel.component'
import {FloatingButtonsComponent} from './components/floating-buttons/floating-buttons.component'
import {MapComponent} from './components/map/map.component'
import {FooterComponent} from './components/footer/footer.component'
import {ApplicationComponent} from './pages/application/application.component'
import {SettingsComponent} from './pages/settings/settings.component'
import {ShortcutsComponent} from './pages/shortcuts/shortcuts.component'

@NgModule({
    imports: [
        SharedModule,
        ApplicationRoutingModule
    ],
    declarations: [
        ApplicationComponent,
        SettingsComponent,
        ShortcutsComponent,
        ColorsPanelComponent,
        FloatingButtonsComponent,
        FooterComponent,
        MapComponent,
        SlidersPanelComponent
    ]
})
export class ApplicationModule {
}
