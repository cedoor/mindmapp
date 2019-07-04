import {TranslateModule} from '@ngx-translate/core'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSnackBarModule, MatToolbarModule} from '@angular/material'
import {ColorPickerModule} from 'ngx-color-picker'
import {SidenavComponent} from './components/sidenav/sidenav.component'
import {RouterModule} from '@angular/router'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faGithub, faSlack} from '@fortawesome/free-brands-svg-icons'
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons'

@NgModule({
    declarations: [
        SidenavComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule,
        TranslateModule,
        MatIconModule,
        MatSnackBarModule,
        ColorPickerModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatToolbarModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        TranslateModule,
        MatIconModule,
        MatSnackBarModule,
        ColorPickerModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatToolbarModule,
        SidenavComponent
    ]
})
export class SharedModule {
    constructor () {
        library.add(faGithub, faSlack, faCheckCircle)
    }
}
