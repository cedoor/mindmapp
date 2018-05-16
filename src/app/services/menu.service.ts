import {Injectable, NgZone} from "@angular/core";
import {DialogService} from "./dialog.service";
import {IPFSService} from "./ipfs.service";
import {NotificationsService} from "./notifications.service";
import {StorageService} from "./storage.service";
import {TranslateService} from "@ngx-translate/core";
import {MmpService} from "./mmp.service";
import {environment} from "../../environments/environment";
import {remote} from "electron";

@Injectable()
export class MenuService {

    private remote: typeof remote;

    constructor(private ngZone: NgZone,
                private ipfsService: IPFSService,
                private storageService: StorageService,
                private mmpService: MmpService,
                private notificationsService: NotificationsService,
                private translateService: TranslateService,
                private dialogService: DialogService) {
        this.remote = window.require("electron").remote;
    }

    /**
     * Create the Electron menu with a preset template.
     */
    public createMenu() {
        this.translateService.getTranslation(this.translateService.currentLang).subscribe((translations: any) => {
            let template = this.createTemplate(translations),
                menu = this.remote.Menu.buildFromTemplate(template);

            this.remote.Menu.setApplicationMenu(menu);
        });

        this.translateService.onLangChange.subscribe(event => {
            let template = this.createTemplate(event.translations),
                menu = this.remote.Menu.buildFromTemplate(template);

            this.remote.Menu.setApplicationMenu(menu);
        });
    }

    /**
     * Set some global shortcuts.
     */
    public createShortcuts() {
        this.remote.app.on("ready", () => {
            this.remote.globalShortcut.register("Esc", () => {
                this.ngZone.run(() => {
                    if (this.dialogService.getMatDialogStatus("settings")) {
                        this.dialogService.closeMatDialog("settings");
                    }

                    if (this.dialogService.getMatDialogStatus("about")) {
                        this.dialogService.closeMatDialog("about");
                    }
                });
            });
        });
    }

    /**
     * Return an Electron template.
     * @param translations
     * @returns {Electron.MenuItemConstructorOptions[]}
     */
    private createTemplate(translations: any): Electron.MenuItemConstructorOptions[] {
        let template: Electron.MenuItemConstructorOptions[] = [{
            label: translations["FILE"],
            submenu: [{
                label: translations["NEW"],
                accelerator: "Ctrl+n",
                click: () => {
                    this.ngZone.run(() => {
                        this.dialogService.newMap();
                    });
                }
            }, {
                label: translations["OPEN"],
                accelerator: "Ctrl+o",
                click: () => {
                    this.ngZone.run(() => {
                        this.dialogService.openMap();
                    });
                }
            }, {
                type: "separator"
            }, {
                label: translations["SAVE"],
                accelerator: "Ctrl+s",
                click: () => {
                    this.ngZone.run(() => {
                        this.dialogService.saveMap();
                    });
                }
            }, {
                label: translations["SAVE_WITH_NAME"],
                accelerator: "Ctrl+Shift+S",
                click: () => {
                    this.ngZone.run(() => {
                        this.dialogService.saveMap(true);
                    });
                }
            }, {
                label: translations["EXPORT_AS"],
                submenu: [{
                    label: translations["PNG"],
                    click: () => {
                        this.ngZone.run(() => {
                            this.dialogService.exportImage();
                        });
                    }
                }, {
                    label: translations["JPG"],
                    click: () => {
                        this.ngZone.run(() => {
                            this.dialogService.exportImage("jpeg");
                        });
                    }
                }]
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
                    this.ngZone.run(() => {
                        this.mmpService.undo();
                    });
                }
            }, {
                label: translations["REPEAT"],
                accelerator: "Ctrl+Shift+z",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.redo();
                    });
                }
            }, {
                type: "separator"
            }, {
                label: translations["ADD_NODE"],
                accelerator: "Alt+=",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.addNode();
                    });
                }
            }, {
                label: translations["REMOVE_NODE"],
                accelerator: "Alt+-",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.removeNode();
                    });
                }
            }, {
                type: "separator"
            }, {
                label: translations["MOVE_ON_THE_LEFT"],
                accelerator: "Alt+Shift+left",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.moveNodeTo("left");
                    });
                }
            }, {
                label: translations["MOVE_ON_THE_RIGHT"],
                accelerator: "Alt+Shift+right",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.moveNodeTo("right");
                    });
                }
            }, {
                label: translations["MOVE_ABOVE"],
                accelerator: "Alt+Shift+up",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.moveNodeTo("up");
                    });
                }
            }, {
                label: translations["MOVE_BELOW"],
                accelerator: "Alt+Shift+down",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.moveNodeTo("down");
                    });
                }
            }, {
                type: "separator"
            }, {
                label: translations["SETTINGS_TITLE"],
                accelerator: "Ctrl+Alt+S",
                click: () => {
                    this.ngZone.run(() => {
                        if (this.dialogService.getMatDialogStatus("settings")) {
                            this.dialogService.closeMatDialog("settings");
                        } else {
                            this.dialogService.openMatDialog("settings");
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
                    this.ngZone.run(() => {
                        this.mmpService.selectNode("left");
                    });
                }
            }, {
                label: translations["SELECT_ON_THE_RIGHT"],
                accelerator: "Alt+right",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.selectNode("right");
                    });
                }
            }, {
                label: translations["SELECT_ABOVE"],
                accelerator: "Alt+up",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.selectNode("up");
                    });
                }
            }, {
                label: translations["SELECT_BELOW"],
                accelerator: "Alt+down",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.selectNode("down");
                    });
                }
            }]
        }, {
            label: translations["VIEW"],
            submenu: [{
                label: translations["RESET_ZOOM"],
                accelerator: "Alt+c",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.center();
                    });
                }
            }, {
                label: translations["ZOOM_OUT"],
                accelerator: "Ctrl+=",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.zoomIn();
                    });
                }
            }, {
                label: translations["ZOOM_IN"],
                accelerator: "Ctrl+-",
                click: () => {
                    this.ngZone.run(() => {
                        this.mmpService.zoomOut();
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
                label: translations["ABOUT_TITLE"],
                click: () => {
                    this.ngZone.run(() => {
                        if (this.dialogService.getMatDialogStatus("about")) {
                            this.dialogService.closeMatDialog("about");
                        } else {
                            this.dialogService.openMatDialog("about");
                        }
                    });
                }
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
                        this.ngZone.run(() => {
                            this.storageService.clear();
                        });
                    }
                }]
            });
        }

        return template;
    }

}
