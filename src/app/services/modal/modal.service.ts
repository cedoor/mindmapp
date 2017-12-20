import {Component} from "@angular/core";

@Component({
    selector: "app-modals",
    templateUrl: "./modals.component.html",
    styleUrls: ["./modals.component.scss"]
})
export class ModalService {

    constructor() {
    }

    public openInput(message: string, image: string = "key"): Promise<string> {
        return new Promise(resolve => {
            let input = window.document.getElementById("input");
            input.children[0]["placeholder"] = message;
            input.children[1]["src"] = `./assets/other/${image}.svg`;
            input.style.display = "block";

            input.children[1]["onclick"] = () => {
                resolve(input.children[0]["value"]);
                input.children[1]["src"] = `./assets/other/key.svg`;
                input.children[0]["value"] = "";
                input.style.display = "none";
                input.children[1]["onclick"] = null;
            }
        });
    }

}
