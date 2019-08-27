import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RootComponent} from './root.component'
import {RootRoutingModule} from './root-routing.module'
import {TranslateLoader, TranslateModule} from '@ngx-translate/core'
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import {SharedModule} from './shared/shared.module'
import {HotkeyModule} from 'angular2-hotkeys'
import {ServiceWorkerModule} from '@angular/service-worker'
import {environment} from '../environments/environment'

export function createTranslateLoader (http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        BrowserAnimationsModule,
        RootRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        HotkeyModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
    ],
    declarations: [
        RootComponent
    ],
    bootstrap: [RootComponent]
})
export class RootModule {
}
