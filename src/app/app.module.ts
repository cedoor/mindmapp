import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {SlidersPanelComponent} from "./components/sliders-panel/sliders-panel.component";
import {ColorsPanelComponent} from "./components/colors-panel/colors-panel.component";
import {ColorPickerModule} from "ngx-color-picker";
import {FloatingButtonsComponent} from "./components/floating-buttons/floating-buttons.component";
import {DragDropService} from "./services/dragdrop.service";
import {UtilsService} from "./services/utils.service";
import {MenuService} from "./services/menu.service";
import {DialogService} from "./services/dialog.service";

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
    providers: [
        DialogService,
        DragDropService,
        MenuService,
        UtilsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
