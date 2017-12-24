import {Component} from "@angular/core";
import {IPFSService} from "../ipfs.service";
import {UtilsService} from "../utils.service";

@Component({
    selector: "app-preferences",
    templateUrl: "./preferences.component.html",
    styleUrls: ["./preferences.component.scss"]
})
export class PreferencesService {

    title: string = "Preferenze";

    index: number = 0;
    options = ["Sincronizzazione", "Lingua"];

    constructor(private ipfs: IPFSService,
                private utils: UtilsService) {
    }

    open() {
        let preferences = window.document.getElementById("preferences");
        preferences.style.display = "block";
    }

    close() {
        let preferences = window.document.getElementById("preferences");
        preferences.style.display = "none";
    }

    selectOption(index: number) {
        this.index = index;
    }

    setIpfs(flag: boolean) {
        flag ? this.ipfs.start() : this.ipfs.stop();
    }

    setFileSync(flag: boolean) {
        this.utils.setFileSync(flag);
    }

}
