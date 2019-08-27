import {TranslateModule} from '@ngx-translate/core'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSelectModule, MatSliderModule,
    MatSnackBarModule,
    MatToolbarModule
} from '@angular/material'
import {ColorPickerModule} from 'ngx-color-picker'
import {RouterModule} from '@angular/router'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        MatSliderModule,
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
        MatSliderModule,
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
}
