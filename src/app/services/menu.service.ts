import {Injectable, NgZone} from "@angular/core";
import {DialogService} from "./dialog.service";
import {IPFSService} from "./ipfs.service";
import {SettingsService} from "./settings.service";
import {NotificationsService} from "./notifications.service";
import {TranslateService} from "@ngx-translate/core";
import {StorageService} from "./storage.service";
import {MmpService} from "./mmp.service";
import {environment} from "../../environments/environment";
import {remote} from "electron";

@Injectable()
export class MenuService {

    remote: typeof remote;

    constructor(private _ngZone: NgZone,
                private ipfs: IPFSService,
                private settings: SettingsService,
                private storage: StorageService,
                private mmp: MmpService,
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
        let template: Electron.MenuItemConstructorOptions[] = [{
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
                label: translations["UNDO"],
                accelerator: "Ctrl+z",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.undo();
                    });
                }
            }, {
                label: translations["REPEAT"],
                accelerator: "Ctrl+Shift+z",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.redo();
                    });
                }
            }, {
                type: "separator"
            }, {
                label: translations["ADD_NODE"],
                accelerator: "Alt+=",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.addNode();
                    });
                }
            }, {
                label: translations["REMOVE_NODE"],
                accelerator: "Alt+-",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.removeNode();
                    });
                }
            }, {
                type: "separator"
            }, {
                label: translations["MOVE_ON_THE_LEFT"],
                accelerator: "Alt+Shift+left",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.moveNodeTo("left");
                    });
                }
            }, {
                label: translations["MOVE_ON_THE_RIGHT"],
                accelerator: "Alt+Shift+right",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.moveNodeTo("right");
                    });
                }
            }, {
                label: translations["MOVE_ABOVE"],
                accelerator: "Alt+Shift+up",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.moveNodeTo("up");
                    });
                }
            }, {
                label: translations["MOVE_BELOW"],
                accelerator: "Alt+Shift+down",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.moveNodeTo("down");
                    });
                }
            }, {
                type: "separator"
            }, {
                label: translations["SETTINGS"],
                accelerator: "Ctrl+Alt+S",
                click: () => {
                    this._ngZone.run(() => {
                        if (this.settings.getStatus()) {
                            this.settings.close();
                        } else {
                            this.settings.open();
                        }
                    });
                }
            }]
        }, {
            label: translations["SELECT"],
            submenu: [{
                label: translations["SELECT_ON_THE_LEFT"],
                accelerator: "Alt+left",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.selectNode("left");
                    });
                }
            }, {
                label: translations["SELECT_ON_THE_RIGHT"],
                accelerator: "Alt+right",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.selectNode("right");
                    });
                }
            }, {
                label: translations["SELECT_ABOVE"],
                accelerator: "Alt+up",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.selectNode("up");
                    });
                }
            }, {
                label: translations["SELECT_BELOW"],
                accelerator: "Alt+down",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.selectNode("down");
                    });
                }
            }, {
                type: "separator"
            }, {
                label: translations["DESELECT"],
                accelerator: "Esc",
                click: () => {
                    this._ngZone.run(() => {
                        if (this.settings.getStatus()) {
                            this.settings.close();
                        } else {
                            this.mmp.deselectNode();
                        }
                    });
                }
            }]
        }, {
            label: translations["VIEW"],
            submenu: [{
                label: translations["RESET_ZOOM"],
                accelerator: "Alt+c",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.center();
                    });
                }
            }, {
                label: translations["ZOOM_OUT"],
                accelerator: "Ctrl+=",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.zoomIn();
                    });
                }
            }, {
                label: translations["ZOOM_IN"],
                accelerator: "Ctrl+-",
                click: () => {
                    this._ngZone.run(() => {
                        this.mmp.zoomOut();
                    });
                }
            }, {
                type: "separator"
            }, {
                label: translations["FULL_SCREEN"],
                role: "togglefullscreen"
            }]
        }, {
            label: translations["HELP"],
            role: "help",
            submenu: [{
                label: translations["INFORMATIONS"],
                enabled: false
            }, {
                label: translations["TUTORIAL"],
                enabled: false
            }]
        }];

        if (!environment.production) {
            template.push({
                label: "Dev",
                submenu: [{
                    label: translations["RELOAD"],
                    role: "reload"
                }, {
                    label: translations["CLEAN_CACHE"],
                    click: () => {
                        this.storage.clear();
                    }
                }, {
                    type: "separator"
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
                }]
            });
        }

        return template;
    }

}
