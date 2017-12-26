import {Component, OnInit} from "@angular/core";
import {NotificationsService} from "../../services/notifications.service";
import {Notification} from "../../models/notification";

@Component({
    selector: "app-notifications",
    templateUrl: "./notifications.component.html",
    styleUrls: ["./notifications.component.scss"]
})
export class NotificationsComponent implements OnInit {

    message: string;

    constructor(public notifications: NotificationsService) {
    }

    ngOnInit() {
        this.notifications.on.subscribe((notification: Notification) => {
            this.message = notification.message;

            setTimeout(() => {
                this.message = "";
            }, notification.duration);
        });
    }

}
