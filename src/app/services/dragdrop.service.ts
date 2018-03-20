import {Injectable, NgZone} from "@angular/core";
import {DialogService} from "./dialog.service";
import {MmpService} from "./mmp.service";
import * as fs from "fs";
import {FileService} from "./file.service";

@Injectable()
export class DragDropService {

    fs: typeof fs;

    constructor(private _ngZone: NgZone,
                private mmpService: MmpService,
                private fileService: FileService,
                private dialogService: DialogService) {
        this.fs = window.require("fs");
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
                        this.mmpService.updateNode("imageSrc", base64);
                    });
                }

                if (ext === "mmp") {
                    let openMap = () => {
                        const data = this.fs.readFileSync(url).toString();
                        this.fileService.setFilePath(url);
                        this.fileService.setSavingStatus(true);
                        this._ngZone.run(() => {
                            this.mmpService.new(JSON.parse(data));
                        });
                    };

                    if (!this.fileService.mapIsSaved()) {
                        this.dialogService.showMessage(
                            "Salva mappa",
                            "Vuoi salvare la mappa corrente prima di aprirne un'altra?")
                            .then(response => {
                                if (response === 0) this.dialogService.saveMap().then(() => openMap());
                                else if (response === 1) openMap();
                            });
                    } else openMap();
                }
            }
        };
    }

}
