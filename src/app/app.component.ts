import {Component, OnInit} from "@angular/core";
import {DialogService} from "./services/dialog.service";
import {DragDropService} from "./services/dragdrop.service";
import {UtilsService} from "./services/utils.service";
import {MenuService} from "./services/menu.service";
import {TranslateService} from "@ngx-translate/core";
import {SettingsService} from "./services/settings.service";
import {Settings} from "./models/settings";
import {IPFSService} from "./services/ipfs.service";
import * as mmp from "mmp";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    values: any = {};

    constructor(public dialog: DialogService,
                public dragDrop: DragDropService,
                public translate: TranslateService,
                public ipfs: IPFSService,
                public settings: SettingsService,
                public menu: MenuService,
                public utils: UtilsService) {
    }

    ngOnInit() {
        // Settings initialization
        this.settings.onInit.subscribe((settings: Settings) => {
            // Set background services
            this.setBackgroundServices(settings);
            // Set translations
            this.setTranslations(settings.language).then(() => {
                this.createMindMap();
                this.menu.createMenu();
                this.dialog.setExitDialog();
                this.utils.setInitialMap();
                this.dragDrop.setDragAndDrop();
            });
        });
    }

    createMindMap() {
        mmp.on("nodeselect", (key, value) => {
            if (!value["branch-color"]) value["branch-color"] = "";
            Object.assign(this.values, value);
        });

        mmp.init("mmp", {
            "root-node": {
                "name": "Nodo radice",
                "font-size": 26
            },
            "node": {
                "name": "Nodo",
                "font-size": 22
            }
        });

        mmp.on("nodeupdate", (key, value) => {
            Object.assign(this.values, value);
            this.utils.checkSavedFile();
        });

        mmp.on("mmundo", () => {
            this.utils.checkSavedFile();
        });

        mmp.on("mmrepeat", () => {
            this.utils.checkSavedFile();
        });

        mmp.on("nodecreate", () => {
            this.utils.checkSavedFile();
        });

        mmp.on("noderemove", () => {
            this.utils.checkSavedFile();
        });
    }

    setTranslations(language: string): Promise<any> {
        this.translate.setDefaultLang(language);
        return this.translate.use(language).toPromise();
    }

    setBackgroundServices(settings: Settings) {
        // IPFS for export/import maps
        if (settings.synchronization.ipfs) {
            this.ipfs.start();
        }
        // Node fs file synchronization
        if (settings.synchronization.file) {
            this.utils.setFileSync(true);
        }
    }

}
