import {NgModule} from '@angular/core'
import {AboutRoutingModule} from './about-routing.module'
import {SharedModule} from '../../shared/shared.module'
import {AboutComponent} from './pages/about/about.component'
import {JumbotronComponent} from './components/jumbotron/jumbotron.component'

@NgModule({
    imports: [
        SharedModule,
        AboutRoutingModule
    ],
    declarations: [
        AboutComponent,
        JumbotronComponent
    ]
})
export class AboutModule {
}
