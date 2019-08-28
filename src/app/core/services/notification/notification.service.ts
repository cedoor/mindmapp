import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {BehaviorSubject, Observable} from 'rxjs'
import {UtilsService} from '../utils/utils.service'

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public message: Observable<string>
    private readonly messageSubject: BehaviorSubject<string>
    private messageTimeoutId: number | null

    constructor (private matSnackBar: MatSnackBar,
                 private utilsService: UtilsService) {
        // Initialization of the behavior subjects.
        this.messageSubject = new BehaviorSubject<string>('')
        this.message = this.messageSubject.asObservable()
    }

    /**
     * Show a message with a material snack bar.
     */
    public async showSnackBarMessage (message: string, values?: any, duration: number = 5000) {
        const action = await this.utilsService.translate('GENERAL.DISMISS')
        message = await this.utilsService.translate(message, values)

        this.matSnackBar.open(message, action, {
            duration,
            panelClass: 'snackbar'
        })
    }

    /**
     * Set a message.
     */
    public async setMessage (message: string, duration: number = 4000) {
        message = await this.utilsService.translate(message)
        this.messageSubject.next(message)

        if (duration) {
            if (this.messageTimeoutId !== null) {
                clearTimeout(this.messageTimeoutId)
            }

            this.messageTimeoutId = setTimeout(() => {
                this.messageSubject.next('')
                this.messageTimeoutId = null
            }, duration)
        }
    }

}
