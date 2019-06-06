import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ApplicationComponent} from './pages/application/application.component'

const routes: Routes = [{
    path: '',
    component: ApplicationComponent
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
