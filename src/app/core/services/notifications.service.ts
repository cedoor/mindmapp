import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {TranslateService} from '@ngx-translate/core'
import {BehaviorSubject, Observable} from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    private informationsSource: BehaviorSubject<string>

    constructor (private matSnackBar: MatSnackBar,
                 private translateService: TranslateService) {
        this.informationsSource = new BehaviorSubject<string>('')
    }

    /**
     * Show a notification with the message.
     * @param {string} message
     * @param {number} duration
     */
    public send (message: string, duration: number = 8000) {
        this.translateService.get('DISMISS').toPromise().then((translation: string) => {
            this.matSnackBar.open(message, translation, {
                duration,
                panelClass: 'snackbar'
            })
        })
    }

    /**
     * Return an observable for info status.
     * @returns {Observable<string>}
     */
    public watchInfoStatus (): Observable<string> {
        return this.informationsSource.asObservable()
    }

    /**
     * Set an information.
     * @param {string} info
     * @param {number} duration
     */
    public setInformations (info: string, duration?: number) {
        this.informationsSource.next(info)

        if (duration) {
            setTimeout(() => {
                this.informationsSource.next('')
            }, duration)
        }
    }

}
