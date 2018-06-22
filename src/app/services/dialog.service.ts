import {Injectable, NgZone} from "@angular/core";
import {IPFSService} from "./ipfs.service";
import {MmpService} from "./mmp.service";
import {SettingsComponent} from "../components/settings/settings.component";
import {MatDialog} from "@angular/material";
import {MatDialogRef} from "@angular/material/dialog/typings/dialog-ref";
import {LangChangeEvent} from "@ngx-translate/core/src/translate.service";
import {TranslateService} from "@ngx-translate/core";
import {FileService} from "./file.service";
import {remote} from "electron";
import * as fs from "fs";
import {AboutComponent} from "../components/about/about.component";

@Injectable()
export class DialogService {

    private remote: typeof remote;
    private fs: typeof fs;

    private matDialogRefs: Map<string, MatDialogRef<any>>;

    private translations: any;

    constructor(private ngZone: NgZone,
                private ipfsService: IPFSService,
                private translateService: TranslateService,
                private matDialog: MatDialog,
                private mmpService: MmpService,
                private fileService: FileService) {
        this.remote = window.require("electron").remote;
        this.fs = window.require("fs");

        this.matDialogRefs = new Map();

        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translations = event.translations;
        });
    }

    /**
     * Save the mind map in the file system.
     * @param {boolean} saveAs
     * @returns {Promise<any>}
     */
    public saveMap(saveAs: boolean = false): Promise<any> {
        return new Promise((resolve: Function) => {
            let data = JSON.stringify(this.mmpService.exportAsJSON());

            if (saveAs || !this.fileService.getFilePath()) {
                this.remote.dialog.showSaveDialog({
                    title: this.translations["SAVE"],
                    filters: [{
                        name: this.translations["MINDMAPP_FILES"] + ` (*.${MmpService.MAP_FORMAT})`,
                        extensions: [MmpService.MAP_FORMAT]
                    }, {
                        name: this.translations["ALL_FILES"],
                        extensions: ["*"]
                    }],
                    defaultPath: this.mmpService.selectNode("map_1_node_0").name + `.${MmpService.MAP_FORMAT}`
                }, (path: string) => {
                    this.ngZone.run(() => {
                        if (typeof path === "string") {
                            this.fs.writeFileSync(path, data);

                            this.fileService.setFilePath(path);
                            this.fileService.setSavingStatus(true);
                        }

                        resolve();
                    });
                });
            } else {
                this.fs.writeFileSync(this.fileService.getFilePath(), data);
                this.fileService.setSavingStatus(true);

                resolve();
            }
        });
    }

    /**
     * Export the current mmp image.
     * @param {string} extension
     */
    exportImage(extension: string = "png") {
        this.mmpService.exportAsImage(extension).then((url: string) => {
            let data = url.replace(/^data:image\/\w+;base64,/, ""),
                buffer = new Buffer(data, "base64");

            this.remote.dialog.showSaveDialog({
                title: this.translations["EXPORT_IMAGE"],
                defaultPath: this.mmpService.selectNode("map_1_node_0").name
            }, (path: string) => {
                this.ngZone.run(() => {
                    if (typeof path === "string") {
                        if (extension === "jpeg") {
                            extension = "jpg";
                        }

                        path = path + "." + extension;

                        if (typeof path === "string") {
                            this.fs.writeFileSync(path, buffer);
                        }
                    }
                });
            });
        });
    }

    /**
     * Open an existing map.
     */
    openMap() {
        this.showMapPreSavingMessage().then(() => {
            this.remote.dialog.showOpenDialog({
                title: this.translations["OPEN"],
                properties: ["openFile"],
                filters: [{
                    name: this.translations["MINDMAPP_FILES"] + ` (*.${MmpService.MAP_FORMAT})`,
                    extensions: [MmpService.MAP_FORMAT]
                }, {
                    name: this.translations["ALL_FILES"],
                    extensions: ["*"]
                }]
            }, (files: Array<string>) => {
                if (files) {
                    this.ngZone.run(() => {
                        let data = this.fs.readFileSync(files[0]).toString(),
                            path = files[0];

                        this.fileService.setFilePath(path);
                        this.fileService.setSavingStatus(true);

                        this.mmpService.new(JSON.parse(data));

                        // Overwrite the old data format (mmp 0.1.7) with the new
                        let newDataFormat = JSON.stringify(this.mmpService.exportAsJSON());
                        this.fs.writeFileSync(path, newDataFormat);
                    });
                }
            });
        });
    }

    /**
     * Create a new empty map.
     */
    newMap(data?: any) {
        if (data) {
            data = JSON.parse(data);
        }

        this.showMapPreSavingMessage().then(() => {
            this.ngZone.run(() => {
                this.fileService.setFilePath("");
                this.fileService.setSavingStatus(true);

                this.mmpService.new(data);
            });
        });
    }

    /**
     * Insert an image in the current selected node.
     */
    addNodeImage() {
        if (!this.mmpService.selectNode().image.src) {
            this.remote.dialog.showOpenDialog({
                title: this.translations["INSERT_NODE_IMAGE"],
                properties: ["openFile"],
                filters: [{
                    name: this.translations["IMAGE"],
                    extensions: ["png", "gif", "jpg", "jpeg"]
                }]
            }, (files: Array<string>) => {
                if (files) {
                    this.ngZone.run(() => {
                        let url = files[0],
                            extension = url.split(".").pop(),
                            buffer = new Buffer(this.fs.readFileSync(url)).toString("base64"),
                            base64 = "data:image/" + extension + ";base64," + buffer;

                        this.mmpService.updateNode("imageSrc", base64);
                    });
                }
            });
        } else {
            this.mmpService.updateNode("imageSrc", "");
        }
    }

    /**
     * Show a message dialog.
     * @param {string} title
     * @param {string} message
     * @returns {Promise<number>}
     */
    public showMessage(title: string, message: string): Promise<number> {
        return new Promise((resolve: Function) => {
            this.remote.dialog.showMessageBox({
                type: "question",
                title: title,
                message: message,
                buttons: [
                    this.translations["YES"],
                    this.translations["NO"],
                    this.translations["CANCEL"]
                ]
            }, index => {
                resolve(index);
            });
        });
    }

    /**
     * Show the pre-saving message and if the user agrees save the map.
     * @returns {Promise<any>}
     */
    public showMapPreSavingMessage(): Promise<any> {
        return new Promise((resolve: Function) => {
            if (!this.fileService.mapIsSaved()) {
                this.showMessage(this.translations["SAVE"], this.translations["SAVE_MAP_MESSAGE"])
                    .then((response: number) => {
                        if (response === 0) {
                            this.saveMap().then(() => {
                                resolve();
                            });
                        } else if (response === 1) {
                            resolve();
                        }
                    });
            } else {
                resolve();
            }
        });
    }

    /**
     * Manage the exit from the program.
     */
    public createQuitListener() {
        let currentWindow = this.remote.getCurrentWindow();

        window.onbeforeunload = (event: Event) => {
            if (!this.fileService.mapIsSaved()) {

                this.showMessage(this.translations["SAVE"], this.translations["SAVE_MAP_MESSAGE"])
                    .then((index: number) => {
                        if (index === 0) {
                            this.saveMap().then(() => {
                                currentWindow.destroy();
                            });
                        } else if (index === 1) {
                            currentWindow.destroy();
                        }
                    });

                event.returnValue = false;
            }
        };
    }

    /**
     * Open a dialog of Mindmapp.
     */
    public openMatDialog(name: "settings" | "about") {
        switch (name) {
            case "settings":
                this.matDialogRefs.set("settings", this.matDialog.open(SettingsComponent));
                break;
            case "about":
                this.matDialogRefs.set("about", this.matDialog.open(AboutComponent));
        }
    }

    /**
     * Close a dialog of Mindmapp.
     */
    public closeMatDialog(name: "settings" | "about") {
        switch (name) {
            case "settings":
                this.matDialogRefs.get("settings").close();
                break;
            case "about":
                this.matDialogRefs.get("about").close();
        }
    }

    /**
     * Return true if the corresponding dialog is open.
     * @returns {boolean}
     */
    public getMatDialogStatus(name: "settings" | "about"): boolean {
        let ref: MatDialogRef<any>;

        switch (name) {
            case "settings":
                ref = this.matDialogRefs.get("settings");
                return ref && !!ref.componentInstance;
            case "about":
                ref = this.matDialogRefs.get("about");
                return ref && !!ref.componentInstance;
        }
    }

}
