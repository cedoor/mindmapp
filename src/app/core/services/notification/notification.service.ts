import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {TranslateService} from '@ngx-translate/core'
import {BehaviorSubject, Observable} from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public message: Observable<string>
    private readonly messageSubject: BehaviorSubject<string>
    private messageTimeoutId: number | null

    constructor (private matSnackBar: MatSnackBar,
                 private translateService: TranslateService) {
        // Initialization of the behavior subjects.
        this.messageSubject = new BehaviorSubject<string>('')
        this.message = this.messageSubject.asObservable()
    }

    /**
     * Show a message with a material snack bar.
     */
    public async showSnackBarMessage (message: string, values?: any, duration: number = 5000) {
        const action = await this.translate('DISMISS')
        message = await this.translate(message, values)

        this.matSnackBar.open(message, action, {
            duration,
            panelClass: 'snackbar'
        })
    }

    /**
     * Set a message.
     */
    public async setMessage (message: string, duration: number = 4000) {
        message = await this.translate(message)
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

    /**
     * Return a translated string with given message and values.
     */
    private translate (message: string, values?: any): Promise<string> {
        return this.translateService.get(message, values).toPromise()
    }

}
