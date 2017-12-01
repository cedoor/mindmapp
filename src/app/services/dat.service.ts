import {Injectable} from "@angular/core";
// import * as mmp from "mmp";
import * as Dat from "dat-node";
import * as mirror from "mirror-folder";
import * as ram from "random-access-memory";

@Injectable()
export class DatService {

    Dat: typeof Dat;
    mirror: typeof mirror;
    ram: typeof ram;

    constructor() {
        this.Dat = window.require("dat-node");
        this.mirror = window.require("mirror-folder");
        this.ram = window.require("random-access-memory");
    }

    share(src: string = "/home/cedoor/Desktop/challenges") {
        this.Dat(src, {temp: true}, (err, dat) => {
            if (err) throw err;

            let network = dat.joinNetwork();
            network.once("connection", () => {
                console.log("Connected");
            });

            let progress = dat.importFiles(src, {
                // ignore: ['**/dat-node/node_modules/**']
            }, err => {
                if (err) throw err;
                console.log("Done importing");
                console.log("Archive size:", dat.archive.content.byteLength);
            });
            progress.on("put", (src, dest) => {
                console.log("Added", dest.name);
            });

            console.log(`Sharing: ${dat.key.toString("hex")}\n`);
        });
    }

    download(dest: string, key: string) {
        this.Dat(this.ram, {key: key}, (err, dat) => {
            if (err) throw err;

            let network = dat.joinNetwork();
            network.once("connection", () => {
                console.log("Connected");
            });

            let download = () => {
                let progress = this.mirror({fs: dat.archive, name: "/"}, dest, err => {
                    if (err) throw err;
                    console.log("Done");
                });
                progress.on("put", src => {
                    console.log("Downloading", src.name);
                });
            };

            dat.archive.metadata.update(download);

            console.log(`Downloading: ${dat.key.toString("hex")}\n`);
        });
    }

}
