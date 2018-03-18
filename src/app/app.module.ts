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
import {MenuService} from "./services/menu.service";
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
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule, MatInputModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from "@angular/material";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/");
}

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        SlidersPanelComponent,
        ColorsPanelComponent,
        FloatingButtonsComponent,
        SettingsComponent,
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
        MatToolbarModule,
        MatTooltipModule,
        MatInputModule,
        MatDialogModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatSliderModule,
        ColorPickerModule
    ],
    providers: [
        DialogService,
        DragDropService,
        MenuService,
        UtilsService,
        MmpService,
        IPFSService,
        SettingsService,
        StorageService,
        NotificationsService
    ],
    entryComponents: [SettingsComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
