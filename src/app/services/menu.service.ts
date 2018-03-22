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

    remote: typeof remote;

    constructor(private ngZone: NgZone,
                private ipfsService: IPFSService,
                private storageService: StorageService,
                private mmpService: MmpService,
                private notificationsService: NotificationsService,
                private translateService: TranslateService,
                private dialogService: DialogService) {
        this.remote = window.require("electron").remote;
    }

    createMenu() {
        this.translateService.getTranslation(this.translateService.currentLang).subscribe(translations => {
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

    createTemplate(translations: string[]): Electron.MenuItemConstructorOptions[] {
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
                click: () => {
                    this.ngZone.run(() => {
                        this.dialogService.saveMap(true);
                    });
                }
            }, {
                label: translations["EXPORT_IMAGE"],
                accelerator: "Ctrl+e",
                click: () => {
                    this.ngZone.run(() => {
                        this.dialogService.exportImage();
                    });
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
                        if (this.dialogService.getSettingsStatus()) {
                            this.dialogService.closeSettings();
                        } else {
                            this.dialogService.openSettings();
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
            }, {
                type: "separator"
            }, {
                label: translations["DESELECT"],
                accelerator: "Esc",
                click: () => {
                    this.ngZone.run(() => {
                        if (this.dialogService.getSettingsStatus()) {
                            this.dialogService.closeSettings();
                        } else {
                            this.mmpService.deselectNode();
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
