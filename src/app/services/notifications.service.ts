import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject, Observable} from "rxjs/index";

@Injectable()
export class NotificationsService {

    private infoSource: BehaviorSubject<string>;

    constructor(public matSnackBar: MatSnackBar,
                public translateService: TranslateService) {
        this.infoSource = new BehaviorSubject<string>("");
    }

    /**
     * Show a notification with the message.
     * @param {string} message
     * @param {number} duration
     */
    public send(message: string, duration: number = 8000) {
        this.translateService.get("DISMISS").toPromise().then((translation: string) => {
            this.matSnackBar.open(message, translation, {
                duration: duration,
            });
        });
    }

    /**
     * Return an observable for info status.
     * @returns {Observable<string>}
     */
    public watchInfoStatus(): Observable<string> {
        return this.infoSource.asObservable();
    }

    /**
     * Set an information.
     * @param {string} info
     */
    public setInfo(info: string) {
        this.infoSource.next(info);
    }

}
