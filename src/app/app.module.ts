import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
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
import {ModalService} from "./services/modal/modal.service";
import {NotificationService} from "./services/notification/notification.service";

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        SlidersPanelComponent,
        ColorsPanelComponent,
        FloatingButtonsComponent,
        NotificationService,
        ModalService
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
        UtilsService,
        IPFSService,
        NotificationService,
        ModalService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
