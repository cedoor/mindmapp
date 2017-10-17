import "zone.js/dist/zone-mix";
import "reflect-metadata";
import "polyfills";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {ElectronService} from "./services/electron.service";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {SlidersPanelComponent} from "./components/sliders-panel/sliders-panel.component";
import {ColorsPanelComponent} from "./components/colors-panel/colors-panel.component";
import {ColorPickerModule} from "ngx-color-picker";
import {FloatingButtonsComponent} from "./components/floating-buttons/floating-buttons.component";

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        SlidersPanelComponent,
        ColorsPanelComponent,
        FloatingButtonsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ColorPickerModule
    ],
    providers: [ElectronService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
