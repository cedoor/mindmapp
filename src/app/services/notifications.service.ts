import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class NotificationsService {

    constructor(public snackBar: MatSnackBar,
                public translate: TranslateService) {
    }

    send(message: string, duration: number = 8000) {
        this.translate.get("DISMISS").toPromise().then((translation: string) => {
            this.snackBar.open(message, translation, {
                duration: duration,
            });
        });
    }

}
