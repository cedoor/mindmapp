import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Notification} from "../models/notification";

@Injectable()
export class NotificationsService {

    private onSource = new Subject<Notification>();

    on = this.onSource.asObservable();

    send(message: string, duration: number = 8000) {
        this.onSource.next({
            message: message,
            duration: duration
        });
    }

}
