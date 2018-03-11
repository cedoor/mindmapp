import {Injectable, NgZone} from "@angular/core";
import {UtilsService} from "./utils.service";
import {IPFSService} from "./ipfs.service";
import {environment} from "../../environments/environment";
import {remote} from "electron";
import * as fs from "fs";
import {MmpService} from "./mmp.service";

@Injectable()
export class DialogService {

    remote: typeof remote;
    fs: typeof fs;

    constructor(private _ngZone: NgZone,
                private ipfs: IPFSService,
                private mmp: MmpService,
                private utils: UtilsService) {
        this.remote = window.require("electron").remote;
        this.fs = window.require("fs");
    }

    saveMap(saveAs: boolean = false): Promise<any> {
        return new Promise(resolve => {
            const data = JSON.stringify(this.mmp.exportAsJson());

            if (saveAs || !this.utils.getFilePath()) {
                this.remote.dialog.showSaveDialog({
                    title: "Salva mappa",
                    filters: [
                        {name: "Mind mmp", extensions: ["mmp"]}
                    ]
                }, path => {
                    if (typeof path === "string") {
                        this.fs.writeFileSync(path, data);
                        this.utils.setFilePath(path);
                        this.utils.setSavedStatus();
                    }
                    resolve();
                });
            } else {
                this.fs.writeFileSync(this.utils.getFilePath(), data);
                this.utils.setSavedStatus();
                resolve();
            }
        });
    }

    exportImage(ext: string = "png") {
        this.mmp.exportAsImage(ext).then(url => {
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
                    {name: "Mind mmp", extensions: ["mmp"]}
                ]
            }, files => {
                if (files) {
                    const data = this.fs.readFileSync(files[0]).toString();
                    this.utils.setFilePath(files[0]);
                    this.utils.setSavedStatus();
                    this._ngZone.run(() => {
                        this.mmp.new(JSON.parse(data));
                    });
                }
            });
        };

        if (!this.mmp.isInitialMap() && !this.utils.isSaved()) {
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
            this.utils.setFilePath("");
            this.utils.setSavedStatus();
            this._ngZone.run(() => {
                this.mmp.new();
            });
        };

        if (!this.mmp.isInitialMap() && !this.utils.isSaved()) {
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
        if (!this.mmp.selectNode().image.src) {
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
                        this.mmp.updateNode("imageSrc", base64);
                    });
                }
            });
        } else {
            this.mmp.updateNode("imageSrc", "");
        }
    }

    importMap(data: any) {
        let importMap = () => {
            this._ngZone.run(() => {
                this.mmp.new(JSON.parse(data));
            });
            this.utils.setFilePath("");
            this.utils.setSavedStatus(false);
        };

        if (!this.mmp.isInitialMap() && !this.utils.isSaved()) {
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
                if (!this.mmp.isInitialMap() && !this.utils.isSaved()) {
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

}
