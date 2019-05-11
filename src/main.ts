import {enableProdMode} from '@angular/core'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import 'hammerjs'

import {AppModule} from './app/app.module'
import {environment} from './environments/environment'

if (environment.production) {
    enableProdMode()
}

setTimeout(() => {
    platformBrowserDynamic().bootstrapModule(AppModule).catch(console.error)
}, 1500)
