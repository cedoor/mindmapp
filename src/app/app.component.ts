import {Component, OnInit} from "@angular/core";
import {DialogService} from "./services/dialog.service";
import {DragDropService} from "./services/dragdrop.service";
import {UtilsService} from "./services/utils.service";
import {MenuService} from "./services/menu.service";
import {TranslateService} from "@ngx-translate/core";
import {SettingsService} from "./services/settings.service";
import {Settings} from "./models/settings";
import {IPFSService} from "./services/ipfs.service";
import {MmpService} from "./services/mmp.service";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    node: any;

    constructor(public dialog: DialogService,
                public dragDrop: DragDropService,
                public translate: TranslateService,
                public ipfs: IPFSService,
                public mmp: MmpService,
                public settings: SettingsService,
                public menu: MenuService,
                public utils: UtilsService) {
        this.node = {};
    }

    ngOnInit() {
        // Settings initialization
        this.settings.onInit.subscribe((settings: Settings) => {
            // Set background services
            this.setBackgroundServices(settings);
            // Set translations
            this.setTranslations(settings.language).then(() => {
                this.createMap();
                this.setMapListeners();

                this.menu.createMenu();
                this.dialog.setExitDialog();
                this.dragDrop.setDragAndDrop();
            });
        });
    }

    createMap() {
        this.mmp.create("map", {
            defaultNode: {
                name: "Nodo",
                font: {
                    size: 22
                }
            },
            rootNode: {
                name: "Nodo radice",
                font: {
                    size: 26
                }
            }
        });

        this.node = this.mmp.selectNode();
    }

    setMapListeners() {
        this.mmp.on("nodeSelect").subscribe((node) => {
            Object.assign(this.node, node);
        });

        this.mmp.on("nodeUpdate").subscribe((node) => {
            Object.assign(this.node, node);
            this.utils.checkSavedFile();
        });

        this.mmp.on("undo").subscribe(() => {
            this.utils.checkSavedFile();
        });

        this.mmp.on("redo").subscribe(() => {
            this.utils.checkSavedFile();
        });

        this.mmp.on("nodeCreate").subscribe(() => {
            this.utils.checkSavedFile();
        });

        this.mmp.on("nodeRemove").subscribe(() => {
            this.utils.checkSavedFile();
        });
    }

    setTranslations(language: string): Promise<any> {
        this.translate.setDefaultLang(language);
        return this.translate.use(language).toPromise();
    }

    setBackgroundServices(settings: Settings) {
        // IPFS for export/import maps
        if (settings.sharing.ipfs) {
            this.ipfs.start();
        }
        // Node fs file synchronization
        if (settings.synchronization.file) {
            this.utils.setFileSync(true);
        }
    }

}
