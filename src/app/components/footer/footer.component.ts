import {Component, OnInit} from "@angular/core";
import {NotificationsService} from "../../services/notifications.service";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {

    public info: string;

    constructor(public notificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.notificationsService.watchInfoStatus().subscribe((info: string) => {
            this.info = info;
        });
    }

}
