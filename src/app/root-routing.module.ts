import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [{
    path: '',
    redirectTo: 'application',
    pathMatch: 'full'
}, {
    path: 'application',
    loadChildren: () => import('./modules/application/application.module').then(m => m.ApplicationModule)
}, {
    path: 'shortcuts',
    loadChildren: () => import('./modules/shortcuts/shortcuts.module').then(m => m.ShortcutsModule)
}, {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
}, {
    path: 'about',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
}, {
    path: '**',
    redirectTo: 'application'
}]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RootRoutingModule {
}
