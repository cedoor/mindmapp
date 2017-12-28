import {Injectable, NgZone} from "@angular/core";
import {DialogService} from "./dialog.service";
import {IPFSService} from "./ipfs.service";
import {SettingsService} from "./settings.service";
import {NotificationsService} from "./notifications.service";
import {TranslateService} from "@ngx-translate/core";
import {remote} from "electron";
import * as mmp from "mmp";

@Injectable()
export class MenuService {

    remote: typeof remote;

    constructor(private _ngZone: NgZone,
                private ipfs: IPFSService,
                private settings: SettingsService,
                private notifications: NotificationsService,
                private translate: TranslateService,
                private dialog: DialogService) {
        this.remote = window.require("electron").remote;
    }

    createMenu() {
        this.translate.getTranslation(this.translate.currentLang).subscribe(translations => {
            let template = this.createTemplate(translations),
                menu = this.remote.Menu.buildFromTemplate(template);

            this.remote.Menu.setApplicationMenu(menu);
        });

        this.translate.onLangChange.subscribe(event => {
            let template = this.createTemplate(event.translations),
                menu = this.remote.Menu.buildFromTemplate(template);

            this.remote.Menu.setApplicationMenu(menu);
        });
    }

    createTemplate(translations: string[]): Electron.MenuItemConstructorOptions[] {
        return [{
            label: translations["FILE"],
            submenu: [{
                label: translations["NEW"],
                accelerator: "Ctrl+n",
                click: () => {
                    this.dialog.newMap();
                }
            }, {
                label: translations["OPEN"],
                accelerator: "Ctrl+o",
                click: () => {
                    this.dialog.openMap();
                }
            }, {
                type: "separator"
            }, {
                label: translations["SAVE"],
                accelerator: "Ctrl+s",
                click: () => {
                    this.dialog.saveMap();
                }
            }, {
                label: translations["SAVE_WITH_NAME"],
                click: () => {
                    this.dialog.saveMap(true);
                }
            }, {
                label: translations["EXPORT_IMAGE"],
                accelerator: "Ctrl+e",
                click: () => {
                    this.dialog.exportImage();
                }
            }, {
                type: "separator"
            }, {
                label: translations["QUIT"],
                role: "quit"
            }]
        }, {
            label: translations["EDIT"],
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
                label: translations["SETTINGS"],
                click: () => {
                    this._ngZone.run(() => {
                        this.settings.open();
                    });
                }
            }]
        }, {
            label: translations["SELECT"],
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
            label: translations["VIEW"],
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
            label: translations["HELP"],
            role: "help",
            submenu: [{
                label: "Informazioni",
                enabled: false
            }, {
                label: "Tutorial",
                enabled: false
            }]
        }, {
            label: translations["IPFS"],
            submenu: [{
                label: translations["IMPORT"],
                click: () => {
                    this.ipfs.download().then(data => {
                        if (data) {
                            this.dialog.importMap(data);
                        }
                    });
                }
            }, {
                label: translations["EXPORT"],
                click: () => {
                    this.ipfs.share().then(key => {
                        this._ngZone.run(() => {
                            this.notifications.send("La chiave della mappa esportata è: " + key);
                        });

                    });
                }
            }]
        }];
    }

}
