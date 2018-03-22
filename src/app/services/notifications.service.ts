import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class NotificationsService {

    constructor(public matSnackBar: MatSnackBar,
                public translateService: TranslateService) {
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

}
