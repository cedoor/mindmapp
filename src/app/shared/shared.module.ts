import {TranslateModule} from '@ngx-translate/core'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule
} from '@angular/material'
import {ColorPickerModule} from 'ngx-color-picker'
import {RouterModule} from '@angular/router'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faGithub, faGitter} from '@fortawesome/free-brands-svg-icons'
import {faBrain, faChartLine, faCheck, faCogs, faHeart, faRocket} from '@fortawesome/free-solid-svg-icons'

@NgModule({
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
        MatSelectModule,
        MatSnackBarModule,
        ColorPickerModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatToolbarModule
    ]
})
export class SharedModule {
    constructor () {
        library.add(faGithub, faGitter, faBrain, faRocket, faHeart, faChartLine, faCogs, faCheck)
    }
}
