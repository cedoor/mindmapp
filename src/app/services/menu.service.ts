import {Injectable, NgZone} from "@angular/core";
import {DialogService} from "./dialog.service";
import {remote} from "electron";
import * as mmp from "mmp";
import {IPFSService} from "./ipfs.service";
import {NotificationService} from "./notification/notification.service";

@Injectable()
export class MenuService {

    menu: any[] = [{
        label: "File",
        submenu: [{
            label: "Nuovo",
            accelerator: "Ctrl+n",
            click: () => {
                this.dialog.newMap();
            }
        }, {
            label: "Apri",
            accelerator: "Ctrl+o",
            click: () => {
                this.dialog.openMap();
            }
        }, {
            type: "separator"
        }, {
            label: "Salva",
            accelerator: "Ctrl+s",
            click: () => {
                this.dialog.saveMap();
            }
        }, {
            label: "Salva con nome",
            click: () => {
                this.dialog.saveMap(true);
            }
        }, {
            label: "Esporta immagine",
            accelerator: "Ctrl+e",
            click: () => {
                this.dialog.exportImage();
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
    }, {
        label: "IPFS",
        submenu: [{
            label: "Importa",
            click: () => {
                this.ipfs.download().then(data => {
                    if (data) {
                        this.dialog.importMap(data);
                    }
                });
            }
        }, {
            label: "Esporta",
            click: () => {
                this.ipfs.share().then(key => {
                    this._ngZone.run(() => {
                        this.notifications.send("La chiave della mappa esportata è: " + key);
                    });

                });
            }
        }]
    }];

    remote: typeof remote;

    constructor(private _ngZone: NgZone,
                private ipfs: IPFSService,
                private notifications: NotificationService,
                private dialog: DialogService) {
        this.remote = window.require("electron").remote;
    }

    setMenu() {
        this.remote.Menu.setApplicationMenu(this.remote.Menu.buildFromTemplate(this.menu));
    }

}
