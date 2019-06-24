import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ApplicationComponent} from './pages/application/application.component'
import {SettingsComponent} from './pages/settings/settings.component'
import {ShortcutsComponent} from './pages/shortcuts/shortcuts.component'

const routes: Routes = [{
    path: '',
    component: ApplicationComponent
}, {
    path: 'settings',
    component: SettingsComponent
}, {
    path: 'shortcuts',
    component: ShortcutsComponent
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
