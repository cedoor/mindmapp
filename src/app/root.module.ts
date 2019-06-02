import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RootComponent} from './root.component'
import {AppRoutingModule} from './app-routing.module'
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material'
import {TranslateLoader, TranslateModule} from '@ngx-translate/core'
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import {CommonModule} from '@angular/common'
import {ColorPickerModule} from 'ngx-color-picker'
import {SettingsComponent} from './shared/components/settings/settings.component'
import {ShortcutsComponent} from './shared/components/shortcuts/shortcuts.component'
import {AboutComponent} from './shared/components/about/about.component'
import {FormsModule} from '@angular/forms'
import {ApplicationComponent} from './modules/application/application.component'
import {ToolbarComponent} from './modules/application/components/toolbar/toolbar.component'
import {SlidersPanelComponent} from './modules/application/components/sliders-panel/sliders-panel.component'
import {ColorsPanelComponent} from './modules/application/components/colors-panel/colors-panel.component'
import {FloatingButtonsComponent} from './modules/application/components/floating-buttons/floating-buttons.component'
import {MapComponent} from './modules/application/components/map/map.component'
import {SidenavComponent} from './modules/application/components/sidenav/sidenav.component'
import {FooterComponent} from './modules/application/components/footer/footer.component'

export function createTranslateLoader (http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatDialogModule,
        MatSnackBarModule,
        CommonModule,
        ColorPickerModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatToolbarModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],
    declarations: [
        RootComponent,
        ApplicationComponent,
        ToolbarComponent,
        SlidersPanelComponent,
        ColorsPanelComponent,
        FloatingButtonsComponent,
        MapComponent,
        SidenavComponent,
        FooterComponent,
        SettingsComponent,
        ShortcutsComponent,
        AboutComponent
    ],
    entryComponents: [
        SettingsComponent,
        ShortcutsComponent,
        AboutComponent
    ],
    bootstrap: [RootComponent]
})
export class RootModule {
}
