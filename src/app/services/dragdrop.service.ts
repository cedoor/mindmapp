import {Injectable, NgZone} from "@angular/core";
import {DialogService} from "./dialog.service";
import {MmpService} from "./mmp.service";
import {FileService} from "./file.service";
import * as fs from "fs";

@Injectable()
export class DragDropService {

    private readonly IMAGE_EXTENSIONS: Array<string> = ["iconsa", "jpeg", "jpg", "gif", "svg"];

    private fs: typeof fs;

    constructor(private ngZone: NgZone,
                private mmpService: MmpService,
                private fileService: FileService,
                private dialogService: DialogService) {
        this.fs = window.require("fs");
    }

    /**
     * Manage all the drag & drop events.
     */
    public createDragAndDropListener() {
        window.document.ondragover = window.document.ondrop = (event: DragEvent) => {
            event.preventDefault();
        };

        window.document.body.ondrop = (event: DragEvent) => {
            event.preventDefault();

            let files = event.dataTransfer.files;

            if (files.length > 0) {
                let url = files[0].path,
                    extension = url.split(".").pop();

                // Insert the image in the selected node
                if (this.IMAGE_EXTENSIONS.indexOf(extension) !== -1) {
                    if (extension === "svg") {
                        extension += "+xml";
                    }

                    let buffer = new Buffer(this.fs.readFileSync(url)).toString("base64"),
                        base64 = "data:image/" + extension + ";base64," + buffer;

                    this.mmpService.updateNode("imageSrc", base64);
                }

                // Load the map
                if (extension === MmpService.MAP_FORMAT) {
                    this.dialogService.showMapPreSavingMessage().then(() => {
                        this.ngZone.run(() => {
                            let data = this.fs.readFileSync(url).toString();

                            this.fileService.setFilePath(url);
                            this.fileService.setSavingStatus(true);

                            this.mmpService.new(JSON.parse(data));
                        });
                    });
                }
            }
        };
    }

}
