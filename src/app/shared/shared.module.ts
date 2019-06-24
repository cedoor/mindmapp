import {TranslateModule} from '@ngx-translate/core'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSnackBarModule, MatToolbarModule} from '@angular/material'
import {ColorPickerModule} from 'ngx-color-picker'
import {SidenavComponent} from './components/sidenav/sidenav.component'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [
        SidenavComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
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
}
