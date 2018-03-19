import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class NotificationsService {

    constructor(public matSnackBar: MatSnackBar,
                public translateService: TranslateService) {
    }

    send(message: string, duration: number = 8000) {
        this.translateService.get("DISMISS").toPromise().then((translation: string) => {
            this.matSnackBar.open(message, translation, {
                duration: duration,
            });
        });
    }

}
