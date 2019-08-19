import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [{
    path: '',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
}, {
    path: 'app',
    loadChildren: () => import('./modules/application/application.module').then(m => m.ApplicationModule)
}, {
    path: '**',
    redirectTo: ''
}]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RootRoutingModule {
}
