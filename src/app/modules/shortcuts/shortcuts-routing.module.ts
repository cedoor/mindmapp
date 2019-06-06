import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ShortcutsComponent} from './pages/shortcuts/shortcuts.component'

const routes: Routes = [{
    path: '',
    component: ShortcutsComponent
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShortcutsRoutingModule {
}
