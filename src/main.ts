import {enableProdMode} from '@angular/core'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import 'hammerjs'

import {RootModule} from './app/root.module'
import {environment} from './environments/environment'

if (environment.production) {
    enableProdMode()
}

setTimeout(() => {
    platformBrowserDynamic().bootstrapModule(RootModule).catch(console.error)
}, 0)
