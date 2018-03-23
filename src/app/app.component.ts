import {Component, OnInit} from "@angular/core";
import {DialogService} from "./services/dialog.service";
import {DragDropService} from "./services/dragdrop.service";
import {MenuService} from "./services/menu.service";
import {TranslateService} from "@ngx-translate/core";
import {SettingsService} from "./services/settings.service";
import {Settings} from "./models/settings";
import {IPFSService} from "./services/ipfs.service";
import {MmpService} from "./services/mmp.service";
import {MapOptions} from "./models/mmp";
import {FileService} from "./services/file.service";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    public node: any;

    constructor(public dialogService: DialogService,
                public dragDropService: DragDropService,
                public translateService: TranslateService,
                public ipfsService: IPFSService,
                public mmpService: MmpService,
                public settingsService: SettingsService,
                public menuService: MenuService,
                public fileService: FileService) {
        this.node = {};
    }

    ngOnInit() {
        // Settings initialization
        this.settingsService.init().then((settings: Settings) => {
            // Set background services
            this.setBackgroundServices(settings);

            this.setTranslations(settings.general.language).then(() => {
                // Create the electron menu.
                this.menuService.createMenu();

                // Create the mind map.
                this.createMap(settings.mapOptions);

                // Initialize all listeners
                this.createMapListeners();
                this.dialogService.createQuitListener();
                this.dragDropService.createDragAndDropListener();
            });
        });
    }

    public createMap(options: MapOptions) {
        this.mmpService.create("map", options);

        this.node = this.mmpService.selectNode();
        this.fileService.checkMapFile();
    }

    public createMapListeners() {
        this.mmpService.on("nodeSelect").subscribe((node) => {
            Object.assign(this.node, node);
        });

        this.mmpService.on("nodeDeselect").subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode());
        });

        this.mmpService.on("nodeUpdate").subscribe((node) => {
            Object.assign(this.node, node);
            this.fileService.checkMapFile();
        });

        this.mmpService.on("undo").subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode());
            this.fileService.checkMapFile();
        });

        this.mmpService.on("redo").subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode());
            this.fileService.checkMapFile();
        });

        this.mmpService.on("create").subscribe(() => {
            Object.assign(this.node, this.mmpService.selectNode());
        });

        this.mmpService.on("nodeCreate").subscribe(() => {
            this.fileService.checkMapFile();
        });

        this.mmpService.on("nodeRemove").subscribe(() => {
            this.fileService.checkMapFile();
        });
    }

    public setTranslations(language: string): Promise<any> {
        this.translateService.setDefaultLang(language);
        return this.translateService.use(language).toPromise();
    }

    public setBackgroundServices(settings: Settings) {
        // IPFS for export/import maps
        if (settings.sharing.ipfs) {
            this.ipfsService.start();
        }
    }

}
