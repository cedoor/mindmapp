import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA} from '@angular/material'
import {DialogData} from '../../models/dialog-data.model'

@Component({
    selector: 'mindmapp-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    constructor (@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

}
