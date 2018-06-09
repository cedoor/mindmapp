import {Injectable, NgZone} from "@angular/core";
import {DialogService} from "./dialog.service";
import {MmpService} from "./mmp.service";
import * as mousetrap from "mousetrap";

@Injectable()
export class ShortcutsService {

    constructor(private ngZone: NgZone,
                private mmpService: MmpService,
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
            this.ngZone.run(() => {
                this.dialogService.newMap();
            });
        });

        mousetrap.bind("ctrl+o", () => {
            this.ngZone.run(() => {
                this.dialogService.openMap();
            });
        });

        mousetrap.bind("ctrl+s", () => {
            this.ngZone.run(() => {
                this.dialogService.saveMap();
            });
        });

        mousetrap.bind("ctrl+shift+s", () => {
            this.ngZone.run(() => {
                this.dialogService.saveMap(true);
            });
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

}
