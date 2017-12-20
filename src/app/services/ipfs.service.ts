import {Injectable} from "@angular/core";
import {ModalService} from "./modal/modal.service";
import * as mmp from "mmp";

@Injectable()
export class IPFSService {

    private ipfs: any;
    private ipfsApi: any;
    private online: boolean;

    constructor(private modal: ModalService) {
        this.ipfs = new window["Ipfs"]();
        this.ipfsApi = window["IpfsApi"];

        this.ipfs.on("ready", () => {
            this.online = true;
        });
    }

    share(): Promise<any> {
        return new Promise(resolve => {
            const data = JSON.stringify(mmp.data());
            this.ipfs.files.add(this.ipfsApi().Buffer.from(data), (err, files) => {
                if (err) {
                    throw err;
                }

                resolve(files[0].path);
            });
        });
    }

    download(): Promise<any> {
        return this.modal.openInput("Copia qui la chiave...", "key")
            .then(key => {
                if (key.length === 46) {
                    return new Promise(resolve => {
                        this.ipfs.files.cat(key, (err, file) => {
                            if (err) {
                                throw err;
                            }

                            resolve(file.toString("utf8"));
                        });
                    });
                }
            });
    }

    stop(): Promise<any> {
        return new Promise(resolve => {
            this.ipfs.stop(() => {
                resolve();
            });
        });
    }

}
