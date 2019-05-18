import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ApplicationComponent} from './modules/application/application.component'

const routes: Routes = [{
    path: 'app',
    component: ApplicationComponent
}, {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
}]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
