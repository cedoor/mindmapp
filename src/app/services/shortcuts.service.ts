import {Injectable, NgZone} from "@angular/core";
import {DialogService} from "./dialog.service";
import {NotificationsService} from "./notifications.service";
import {StorageService} from "./storage.service";
import {TranslateService} from "@ngx-translate/core";
import {MmpService} from "./mmp.service";
import {environment} from "../../environments/environment";
import * as mousetrap from "mousetrap";

@Injectable()
export class ShortcutsService {

    constructor(private ngZone: NgZone,
                private storageService: StorageService,
                private mmpService: MmpService,
                private notificationsService: NotificationsService,
                private translateService: TranslateService,
                private dialogService: DialogService) {
    }

    /**
     * Set some global shortcuts.
     */
    public createShortcuts() {
        mousetrap.bind("esc", () => {
            if (this.dialogService.getMatDialogStatus("settings")) {
                this.dialogService.closeMatDialog("settings");
            }

            if (this.dialogService.getMatDialogStatus("about")) {
                this.dialogService.closeMatDialog("about");
            }
        });

        mousetrap.bind("ctrl+n", () => {
            this.dialogService.newMap();
        });

        mousetrap.bind("ctrl+o", () => {
            this.dialogService.openMap();
        });

        mousetrap.bind("ctrl+s", () => {
            this.dialogService.saveMap();
        });

        mousetrap.bind("ctrl+shift+s", () => {
            this.dialogService.saveMap(true);
        });

        mousetrap.bind("ctrl+z", () => {
            this.mmpService.undo();
        });

        mousetrap.bind("ctrl+shift+z", () => {
            this.mmpService.redo();
        });

        mousetrap.bind("alt+=", () => {
            this.mmpService.addNode();
        });

        mousetrap.bind("alt+-", () => {
            this.mmpService.removeNode();
        });

        mousetrap.bind("alt+shift+left", () => {
            this.mmpService.moveNodeTo("left");
        });

        mousetrap.bind("alt+shift+right", () => {
            this.mmpService.moveNodeTo("right");
        });

        mousetrap.bind("alt+shift+up", () => {
            this.mmpService.moveNodeTo("up");
        });

        mousetrap.bind("alt+shift+down", () => {
            this.mmpService.moveNodeTo("down");
        });

        mousetrap.bind("ctrl+alt+s", () => {
            this.ngZone.run(() => {
                if (this.dialogService.getMatDialogStatus("settings")) {
                    this.dialogService.closeMatDialog("settings");
                } else {
                    this.dialogService.openMatDialog("settings");
                }
            });
        });

        mousetrap.bind("alt+left", () => {
            this.mmpService.selectNode("left");
        });

        mousetrap.bind("alt+right", () => {
            this.mmpService.selectNode("right");
        });

        mousetrap.bind("alt+up", () => {
            this.mmpService.selectNode("up");
        });

        mousetrap.bind("alt+down", () => {
            this.mmpService.selectNode("down");
        });

        mousetrap.bind("alt+shift+down", () => {
            this.mmpService.moveNodeTo("down");
        });

        mousetrap.bind("alt+c", () => {
            this.mmpService.center();
        });

        mousetrap.bind("ctrl+=", () => {
            this.mmpService.zoomIn();
        });

        mousetrap.bind("ctrl+-", () => {
            this.mmpService.zoomOut();
        });
    }

    /**
     * Return an Electron template.
     * @param translations
     * @returns {Electron.MenuItemConstructorOptions[]}
     */
    private createTemplate(translations: any): any {
        let template: Electron.MenuItemConstructorOptions[] = [{
            label: translations["FILE"],
            submenu: [{
                label: translations["EXPORT_AS"],
                submenu: [{
                    label: translations["PNG"],
                    click: () => {

                        this.dialogService.exportImage();
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
            label: translations["VIEW"],
            submenu: [{
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
    }

}
