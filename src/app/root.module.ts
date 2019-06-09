import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RootComponent} from './root.component'
import {RootRoutingModule} from './root-routing.module'
import {TranslateLoader, TranslateModule} from '@ngx-translate/core'
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import {SharedModule} from './shared/shared.module'
import {HeaderComponent} from './core/header/header.component'
import {HotkeyModule} from 'angular2-hotkeys'

export function createTranslateLoader (http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RootRoutingModule,
        HttpClientModule,
        SharedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        HotkeyModule.forRoot()
    ],
    declarations: [
        HeaderComponent,
        RootComponent
    ],
    bootstrap: [RootComponent]
})
export class RootModule {
}
