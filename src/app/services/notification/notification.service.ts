import {Component} from "@angular/core";

@Component({
    selector: "app-notifications",
    templateUrl: "./notifications.component.html",
    styleUrls: ["./notifications.component.scss"]
})
export class NotificationService {

    constructor() {
    }

    send(message: string) {
        let notifications = window.document.getElementById("notifications");
        notifications.innerText = message;
        notifications.style.display = "block";

        setTimeout(() => {
            notifications.innerText = "";
            notifications.style.display = "none";
        }, 10000);
    }

}
