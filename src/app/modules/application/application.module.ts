import {NgModule} from '@angular/core'
import {ApplicationRoutingModule} from './application-routing.module'
import {SharedModule} from '../../shared/shared.module'
import {ColorPanelsComponent} from './components/color-panels/color-panels.component'
import {SliderPanelsComponent} from './components/slider-panels/slider-panels.component'
import {FloatingButtonsComponent} from './components/floating-buttons/floating-buttons.component'
import {MapComponent} from './components/map/map.component'
import {InformationComponent} from './components/information/information.component'
import {ApplicationComponent} from './pages/application/application.component'
import {SettingsComponent} from './pages/settings/settings.component'
import {ShortcutsComponent} from './pages/shortcuts/shortcuts.component'
import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {MatDialogModule, MatInputModule, MatMenuModule, MatSlideToggleModule, MatTabsModule} from '@angular/material'
import {TabsComponent} from './components/tabs/tabs.component'

@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        MatInputModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatTabsModule,
        ApplicationRoutingModule
    ],
    declarations: [
        ApplicationComponent,
        SettingsComponent,
        ShortcutsComponent,
        ColorPanelsComponent,
        FloatingButtonsComponent,
        InformationComponent,
        MapComponent,
        SliderPanelsComponent,
        ToolbarComponent,
        TabsComponent
    ]
})
export class ApplicationModule {
}
