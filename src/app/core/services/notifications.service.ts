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
     */
    public async send (message: string, values?: any, duration: number = 5000) {
        const action = await this.translate('DISMISS')
        message = await this.translate(message, values)

        this.matSnackBar.open(message, action, {
            duration,
            panelClass: 'snackbar'
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

    /**
     * Return a translated string with given message and values.
     */
    private translate (message: string, values?: any): Promise<string> {
        return this.translateService.get(message, values).toPromise()
    }

}
