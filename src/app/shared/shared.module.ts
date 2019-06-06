import {TranslateModule} from '@ngx-translate/core'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material'
import {ColorPickerModule} from 'ngx-color-picker'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule,
        ColorPickerModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatToolbarModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule,
        ColorPickerModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatToolbarModule
    ]
})
export class SharedModule {
}
