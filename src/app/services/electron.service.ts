import {Injectable, NgZone} from "@angular/core";
import {remote} from "electron";
import * as fs from "fs";
import * as mmp from "mmp";

@Injectable()
export class ElectronService {

    windowTitle: string = window.document.title;

    menu: any[] = [{
        label: "File",
        submenu: [{
            label: "Nuovo",
            accelerator: "Ctrl+n",
            click: () => {
                this.newDialog();
            }
        }, {
            label: "Apri",
            accelerator: "Ctrl+o",
            click: () => {
                this.openDialog();
            }
        }, {
            type: "separator"
        }, {
            label: "Salva",
            accelerator: "Ctrl+s",
            click: () => {
                this.saveDialog();
            }
        }, {
            label: "Salva con nome",
            click: () => {
                this.saveDialog(true);
            }
        }, {
            label: "Esporta immagine",
            accelerator: "Ctrl+e",
            click: () => {
                this.exportDialog();
            }
        }, {
            type: "separator"
        }, {
            label: "Esci",
            role: "quit"
        }]
    }, {
        label: "Modifica",
        submenu: [{
            label: "Annulla",
            accelerator: "Ctrl+z",
            click: () => {
                mmp.undo();
            }
        }, {
            label: "Ripeti",
            accelerator: "Ctrl+Shift+z",
            click: () => {
                mmp.repeat();
            }
        }, {
            type: "separator"
        }, {
            label: "Aggiungi nodo",
            accelerator: "Alt+=",
            click: () => {
                mmp.node.add();
            }
        }, {
            label: "Rimuovi nodo",
            accelerator: "Alt+-",
            click: () => {
                mmp.node.remove();
            }
        }, {
            type: "separator"
        }, {
            label: "Preferenze",
            click: () => {
                console.log("preferences");
            }
        }
        ]
    }, {
        label: "Visualizza",
        submenu: [{
            role: "reload"
        }, {
            type: "separator"
        }, {
            label: "Reset zoom",
            accelerator: "Alt+c",
            click: () => {
                mmp.center();
            }
        }, {
            label: "Zoom in",
            accelerator: "Ctrl+=",
            click: () => {
                mmp.zoomIn();
            }
        }, {
            label: "Zoom out",
            accelerator: "Ctrl+-",
            click: () => {
                mmp.zoomOut();
            }
        }, {
            type: "separator"
        }, {
            label: "Schermo intero",
            role: "togglefullscreen"
        }]
    }, {
        label: "Aiuto",
        role: "help",
        submenu: [{
            label: "Informazioni"
        }, {
            label: "Tutorial"
        }]
    }];

    remote: typeof remote;
    fs: typeof fs;

    filePath: string = "";
    saved: boolean = false;

    initialMap: string;

    constructor(private _ngZone: NgZone) {
        if (this.isElectron()) {
            this.remote = window.require("electron").remote;
            this.fs = window.require("fs");
        }
    }

    isElectron = () => {
        return window && window.process && window.process.type;
    };

    setInitialMap() {
        let data = mmp.data();
        delete data[0].value.x;
        delete data[0].value.y;
        delete data[0].value.k;

        this.initialMap = JSON.stringify(data);
    }

    setMenu() {
        this.remote.Menu.setApplicationMenu(this.remote.Menu.buildFromTemplate(this.menu));
    }

    saveDialog(saveAs: boolean = false) {
        const data = JSON.stringify(mmp.data());

        if (saveAs || !this.filePath) {
            this.remote.dialog.showSaveDialog({
                title: "Salva mappa",
                filters: [
                    {name: "Mind map", extensions: ["mmp"]}
                ]
            }, path => {
                if (typeof path === "string") {
                    this.fs.writeFileSync(path, data);
                    this.filePath = path;
                    this.setSavedStatus();
                }
            });
        } else {
            this.fs.writeFileSync(this.filePath, data);
            this.setSavedStatus();
        }
    }

    exportDialog(ext: string = "png") {
        mmp.image(url => {
            const data = url.replace(/^data:image\/\w+;base64,/, ""),
                buf = new Buffer(data, "base64");
            this.remote.dialog.showSaveDialog({
                title: "Esporta immagine"
            }, path => {
                path = path + "." + ext;
                if (typeof path === "string") this.fs.writeFileSync(path, buf);
            });
        }, ext);
    }

    openDialog() {
        let openDialog = () => {
            this.remote.dialog.showOpenDialog({
                title: "Apri mappa",
                properties: ["openFile"],
                filters: [
                    {name: "Mind map", extensions: ["mmp"]}
                ]
            }, files => {
                if (files) {
                    const data = this.fs.readFileSync(files[0], "utf8");
                    this.filePath = files[0];
                    this.setSavedStatus();
                    this._ngZone.run(() => {
                        mmp.data(JSON.parse(data));
                    });
                }
            });
        };

        if (!this.isInitialMap() && !this.saved) {
            this.remote.dialog.showMessageBox({
                type: "question",
                title: "Salva mappa",
                message: "Vuoi salvare la mappa corrente prima di aprirne un'altra?",
                buttons: ["Si", "No", "Annulla"]
            }, index => {
                if (index === 0) this.saveDialog();
                else if (index === 1) openDialog();
            });
        } else openDialog();
    }

    newDialog() {
        let newDialog = () => {
            this.filePath = "";
            this.setSavedStatus();
            this._ngZone.run(() => {
                mmp.new();
            });
        };

        if (!this.isInitialMap() && !this.saved) {
            this.remote.dialog.showMessageBox({
                type: "question",
                title: "Salva mappa",
                message: "Vuoi salvare la mappa corrente prima di crearne un'altra?",
                buttons: ["Si", "No", "Annulla"]
            }, index => {
                if (index === 0) this.saveDialog();
                else if (index === 1) newDialog();
            });
        } else newDialog();
    }

    addImageDialog() {
        if (!mmp.node.select().value["image-src"]) {
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
                        mmp.node.update("image-src", base64);
                    });
                }
            });
        }
    }

    checkSavedFile() {
        if (this.filePath) {
            let fileData = this.fs.readFileSync(this.filePath, "utf8"),
                mapData = JSON.stringify(mmp.data());

            if (fileData !== mapData) this.setSavedStatus(false);
            else this.setSavedStatus();
        } else if (!this.isInitialMap()) {
            this.setSavedStatus(false);
        } else {
            this.setSavedStatus();
        }

    }

    isInitialMap(): boolean {
        let data = mmp.data();
        delete data[0].value.x;
        delete data[0].value.y;
        delete data[0].value.k;

        return this.initialMap === JSON.stringify(data);
    }

    setSavedStatus(saved: boolean = true) {
        if (saved) {
            window.document.title = this.windowTitle;
            this.saved = true;
            window.document.getElementById("save-map").classList.add("disable");
        } else {
            window.document.title = this.windowTitle + "*";
            this.saved = false;
            window.document.getElementById("save-map").classList.remove("disable");
        }
    }
}
