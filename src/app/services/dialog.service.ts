import {Injectable, NgZone} from "@angular/core";
import {IPFSService} from "./ipfs.service";
import {environment} from "../../environments/environment";
import {MmpService} from "./mmp.service";
import {SettingsComponent} from "../components/settings/settings.component";
import {MatDialog} from "@angular/material";
import {MatDialogRef} from "@angular/material/dialog/typings/dialog-ref";
import {remote} from "electron";
import * as fs from "fs";
import {FileService} from "./file.service";

@Injectable()
export class DialogService {

    remote: typeof remote;
    fs: typeof fs;

    private matDialogRef: MatDialogRef<any>;

    constructor(private _ngZone: NgZone,
                private ipfsService: IPFSService,
                private matDialog: MatDialog,
                private mmpService: MmpService,
                private fileService: FileService) {
        this.remote = window.require("electron").remote;
        this.fs = window.require("fs");
    }

    saveMap(saveAs: boolean = false): Promise<any> {
        return new Promise(resolve => {
            const data = JSON.stringify(this.mmpService.exportAsJSON());

            if (saveAs || !this.fileService.getFilePath()) {
                this.remote.dialog.showSaveDialog({
                    title: "Salva mappa",
                    filters: [
                        {name: "Mind map", extensions: ["mmp"]}
                    ]
                }, path => {
                    if (typeof path === "string") {
                        this.fs.writeFileSync(path, data);
                        this.fileService.setFilePath(path);
                        this.fileService.setSavingStatus(true);
                    }
                    resolve();
                });
            } else {
                this.fs.writeFileSync(this.fileService.getFilePath(), data);
                this.fileService.setSavingStatus(true);
                resolve();
            }
        });
    }

    exportImage(ext: string = "png") {
        this.mmpService.exportAsImage(ext).then(url => {
            const data = url.replace(/^data:image\/\w+;base64,/, ""),
                buf = new Buffer(data, "base64");
            this.remote.dialog.showSaveDialog({
                title: "Esporta immagine"
            }, path => {
                path = path + "." + ext;
                if (typeof path === "string") this.fs.writeFileSync(path, buf);
            });
        });
    }

    openMap() {
        let openMap = () => {
            this.remote.dialog.showOpenDialog({
                title: "Apri mappa",
                properties: ["openFile"],
                filters: [
                    {name: "Mind map", extensions: ["mmp"]}
                ]
            }, files => {
                if (files) {
                    let data = this.fs.readFileSync(files[0]).toString(),
                        path = files[0];

                    this.fileService.setFilePath(path);
                    this.fileService.setSavingStatus(true);
                    this._ngZone.run(() => {
                        this.mmpService.new(JSON.parse(data));

                        // Overwrite the old data format (mmp 0.1.7) with the new
                        let newDataFormat = JSON.stringify(this.mmpService.exportAsJSON());
                        this.fs.writeFileSync(path, newDataFormat);
                    });
                }
            });
        };

        if (!this.fileService.mapIsSaved()) {
            this.showMessage(
                "Salva mappa",
                "Vuoi salvare la mappa corrente prima di aprirne un'altra?")
                .then(response => {
                    if (response === 0) this.saveMap().then(() => openMap());
                    else if (response === 1) openMap();
                });
        } else openMap();
    }

    newMap() {
        let newMap = () => {
            this.fileService.setFilePath("");
            this.fileService.setSavingStatus(true);
            this._ngZone.run(() => {
                this.mmpService.new();
            });
        };

        if (!this.fileService.mapIsSaved()) {
            this.showMessage(
                "Salva mappa",
                "Vuoi salvare la mappa corrente prima di crearne un'altra?")
                .then(response => {
                    if (response === 0) this.saveMap().then(() => newMap());
                    else if (response === 1) newMap();
                });
        } else newMap();
    }

    addNodeImage() {
        if (!this.mmpService.selectNode().image.src) {
            this.remote.dialog.showOpenDialog({
                title: "Inserisci un'immagine",
                properties: ["openFile"],
                filters: [
                    {name: "Image", extensions: ["png", "gif", "jpg", "jpeg"]}
                ]
            }, files => {
                if (files) {
                    let url = files[0],
                        ext = url.split(".").pop(),
                        buffer = new Buffer(this.fs.readFileSync(url)).toString("base64"),
                        base64 = "data:image/" + ext + ";base64," + buffer;

                    this._ngZone.run(() => {
                        this.mmpService.updateNode("imageSrc", base64);
                    });
                }
            });
        } else {
            this.mmpService.updateNode("imageSrc", "");
        }
    }

    importMap(data: any) {
        let importMap = () => {
            this._ngZone.run(() => {
                this.mmpService.new(JSON.parse(data));
            });
            this.fileService.setFilePath("");
            this.fileService.setSavingStatus(false);
        };

        if (!this.fileService.mapIsSaved()) {
            this.showMessage(
                "Salva mappa",
                "Vuoi salvare la mappa corrente prima di importarne un'altra?")
                .then(response => {
                    if (response === 0) this.saveMap().then(() => importMap());
                    else if (response === 1) importMap();
                });
        } else importMap();
    }

    showMessage(title: string, message: string): Promise<number> {
        return new Promise(resolve => {
            this.remote.dialog.showMessageBox({
                type: "question",
                title: title,
                message: message,
                buttons: ["Si", "No", "Annulla"]
            }, index => resolve(index));
        });
    }

    setExitDialog() {
        if (environment.production) {
            let win = this.remote.getCurrentWindow();

            window.onbeforeunload = e => {
                if (!this.fileService.mapIsSaved()) {
                    this.remote.dialog.showMessageBox({
                        type: "question",
                        title: "Salva mappa",
                        message: "Vuoi salvare la mappa corrente prima di uscire?",
                        buttons: ["Si", "No", "Annulla"]
                    }, index => {
                        if (index === 0) this.saveMap().then(() => win.destroy());
                        else if (index === 1) win.destroy();
                    });

                    e.returnValue = false;
                }
            };
        }
    }

    /**
     * Open the dialog of Mindmapp settingsService.
     */
    public openSettings() {
        this.matDialogRef = this.matDialog.open(SettingsComponent);
    }

    /**
     * Close the dialog of Mindmapp settingsService.
     */
    public closeSettings() {
        this.matDialogRef.close();
    }

    /**
     * Return true if the dialog of the settingsService is open.
     * @returns {boolean}
     */
    public getSettingsStatus(): boolean {
        return this.matDialogRef && !!this.matDialogRef.componentInstance;
    }

}
