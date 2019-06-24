import {NgModule} from '@angular/core'
import {ApplicationRoutingModule} from './application-routing.module'
import {SharedModule} from '../../shared/shared.module'
import {ApplicationColorPanelsComponent} from './components/application-color-panels/application-color-panels.component'
import {ApplicationSliderPanelsComponent} from './components/application-slider-panels/application-slider-panels.component'
import {ApplicationFloatingButtonsComponent} from './components/application-floating-buttons/application-floating-buttons.component'
import {ApplicationMapComponent} from './components/application-map/application-map.component'
import {ApplicationFooterComponent} from './components/application-footer/application-footer.component'
import {ApplicationComponent} from './pages/application/application.component'
import {SettingsComponent} from './pages/settings/settings.component'
import {ShortcutsComponent} from './pages/shortcuts/shortcuts.component'
import {ApplicationHeaderComponent} from './components/application-header/application-header.component'
import {ApplicationCachedMapsComponent} from './components/application-cached-maps/application-cached-maps.component'
import {
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTabsModule
} from '@angular/material'

@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTabsModule,
        ApplicationRoutingModule
    ],
    declarations: [
        ApplicationComponent,
        SettingsComponent,
        ShortcutsComponent,
        ApplicationColorPanelsComponent,
        ApplicationFloatingButtonsComponent,
        ApplicationFooterComponent,
        ApplicationMapComponent,
        ApplicationSliderPanelsComponent,
        ApplicationHeaderComponent,
        ApplicationCachedMapsComponent
    ],
    entryComponents: [
        ApplicationCachedMapsComponent
    ]
})
export class ApplicationModule {
}
