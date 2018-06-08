import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {SlidersPanelComponent} from "./components/sliders-panel/sliders-panel.component";
import {ColorsPanelComponent} from "./components/colors-panel/colors-panel.component";
import {FloatingButtonsComponent} from "./components/floating-buttons/floating-buttons.component";
import {ColorPickerModule} from "ngx-color-picker";
import {DragDropService} from "./services/dragdrop.service";
import {UtilsService} from "./services/utils.service";
import {ShortcutsService} from "./services/shortcuts.service";
import {DialogService} from "./services/dialog.service";
import {IPFSService} from "./services/ipfs.service";
import {SettingsComponent} from "./components/settings/settings.component";
import {SettingsService} from "./services/settings.service";
import {NotificationsService} from "./services/notifications.service";
import {StorageService} from "./services/storage.service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MmpService} from "./services/mmp.service";
import {MapComponent} from "./components/map/map.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FileService} from "./services/file.service";
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule, MatListModule, MatMenuModule, MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
} from "@angular/material";
import {AboutComponent} from "./components/about/about.component";
import {HeaderBarComponent} from "./components/header-bar/header-bar.component";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/");
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderBarComponent,
        ToolbarComponent,
        SlidersPanelComponent,
        ColorsPanelComponent,
        FloatingButtonsComponent,
        SettingsComponent,
        AboutComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatMenuModule,
        MatToolbarModule,
        MatInputModule,
        MatDialogModule,
        MatListModule,
        MatTabsModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSliderModule,
        ColorPickerModule
    ],
    providers: [
        DialogService,
        DragDropService,
        ShortcutsService,
        UtilsService,
        FileService,
        MmpService,
        IPFSService,
        SettingsService,
        StorageService,
        NotificationsService
    ],
    entryComponents: [
        SettingsComponent,
        AboutComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
