import {Injectable, NgZone} from "@angular/core";
import {remote} from "electron";
import * as fs from "fs";
import * as mmp from "mmp";
import {environment} from "../../environments/environment";

@Injectable()
export class ElectronService {

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
                this._ngZone.run(() => {
                    mmp.undo();
                });
            }
        }, {
            label: "Ripeti",
            accelerator: "Ctrl+Shift+z",
            click: () => {
                this._ngZone.run(() => {
                    mmp.repeat();
                });
            }
        }, {
            type: "separator"
        }, {
            label: "Aggiungi nodo",
            accelerator: "Alt+=",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.add();
                });
            }
        }, {
            label: "Rimuovi nodo",
            accelerator: "Alt+-",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.remove();
                });
            }
        }, {
            type: "separator"
        }, {
            label: "Muovi a sinistra",
            accelerator: "Alt+Shift+left",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.moveTo("left");
                });
            }
        }, {
            label: "Muovi a destra",
            accelerator: "Alt+Shift+right",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.moveTo("right");
                });
            }
        }, {
            label: "Muovi in alto",
            accelerator: "Alt+Shift+up",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.moveTo("up");
                });
            }
        }, {
            label: "Muovi in basso",
            accelerator: "Alt+Shift+down",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.moveTo("down");
                });
            }
        }, {
            type: "separator"
        }, {
            label: "Preferenze",
            click: () => {
                console.log("preferences");
            },
            enabled: false
        }]
    }, {
        label: "Seleziona",
        submenu: [{
            label: "Seleziona a sinistra",
            accelerator: "Alt+left",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.selectTo("left");
                });
            }
        }, {
            label: "Seleziona a destra",
            accelerator: "Alt+right",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.selectTo("right");
                });
            }
        }, {
            label: "Seleziona in alto",
            accelerator: "Alt+up",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.selectTo("up");
                });
            }
        }, {
            label: "Seleziona in basso",
            accelerator: "Alt+down",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.selectTo("down");
                });
            }
        }, {
            type: "separator"
        }, {
            label: "Seleziona radice",
            accelerator: "Alt+r",
            click: () => {
                this._ngZone.run(() => {
                    mmp.node.select("node0");
                });
            }
        }]
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
                this._ngZone.run(() => {
                    mmp.center();
                });
            }
        }, {
            label: "Zoom in",
            accelerator: "Ctrl+=",
            click: () => {
                this._ngZone.run(() => {
                    mmp.zoomIn();
                });
            }
        }, {
            label: "Zoom out",
            accelerator: "Ctrl+-",
            click: () => {
                this._ngZone.run(() => {
                    mmp.zoomOut();
                });
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
            label: "Informazioni",
            enabled: false
        }, {
            label: "Tutorial",
            enabled: false
        }]
    }];

    windowTitle: string = window.document.title;

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

    setExitEvent() {
        if (environment.production) {
            let win = this.remote.getCurrentWindow();

            window.onbeforeunload = e => {
                if (!this.isInitialMap() && !this.saved) {
                    this.remote.dialog.showMessageBox({
                        type: "question",
                        title: "Salva mappa",
                        message: "Vuoi salvare la mappa corrente prima di uscire?",
                        buttons: ["Si", "No", "Annulla"]
                    }, index => {
                        if (index === 0) this.saveDialog().then(() => win.destroy());
                        else if (index === 1) win.destroy();
                    });

                    e.returnValue = false;
                }
            };
        }
    }

    saveDialog(saveAs: boolean = false): Promise<any> {
        return new Promise(resolve => {
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
                    resolve();
                });
            } else {
                this.fs.writeFileSync(this.filePath, data);
                this.setSavedStatus();
                resolve();
            }
        });
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
                if (index === 0) this.saveDialog().then(() => openDialog());
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
                if (index === 0) this.saveDialog().then(() => newDialog());
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
        } else {
            mmp.node.update("image-src", "");
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

    setDragAndDrop() {
        window.document.ondragover = window.document.ondrop = ev => {
            ev.preventDefault();
        };

        window.document.body.ondrop = ev => {
            ev.preventDefault();

            let files = ev.dataTransfer.files;

            if (files.length > 0) {
                let url = files[0].path,
                    ext = url.split(".").pop();

                if (ext === "png" || ext === "jpeg" || ext === "jpg" || ext === "gif") {
                    let buffer = new Buffer(this.fs.readFileSync(url)).toString("base64"),
                        base64 = "data:image/" + ext + ";base64," + buffer;

                    this._ngZone.run(() => {
                        mmp.node.update("image-src", base64);
                    });
                }

                if (ext === "mmp") {
                    let openMap = () => {
                        const data = this.fs.readFileSync(url, "utf8");
                        this.filePath = url;
                        this.setSavedStatus();
                        this._ngZone.run(() => {
                            mmp.data(JSON.parse(data));
                        });
                    };

                    if (!this.isInitialMap() && !this.saved) {
                        this.remote.dialog.showMessageBox({
                            type: "question",
                            title: "Salva mappa",
                            message: "Vuoi salvare la mappa corrente prima di aprirne un'altra?",
                            buttons: ["Si", "No", "Annulla"]
                        }, index => {
                            if (index === 0) this.saveDialog().then(() => openMap());
                            else if (index === 1) openMap();
                        });
                    } else openMap();
                }
            }
        };
    }

}
