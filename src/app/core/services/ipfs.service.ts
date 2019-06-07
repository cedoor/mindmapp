import {Injectable} from '@angular/core'
import {MmpService} from './mmp.service'

@Injectable({
    providedIn: 'root'
})
export class IPFSService {

    private ipfs: any
    private online: boolean

    constructor (private mmpService: MmpService) {
    }

    start () {
        const Ipfs = window.Ipfs

        if (Ipfs) {
            this.ipfs = new Ipfs({
                repo: 'ipfs-' + Math.random(),
                config: {
                    Addresses: {
                        Swarm: [
                            '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
                        ]
                    }
                }
            })

            this.ipfs.on('ready', () => {
                this.online = this.ipfs.isOnline()
            })
        }
    }

    // share(): Promise<any> {
    //     if (this.online) {
    //         return new Promise(resolve => {
    //             const data = JSON.stringify(this.mmp.exportAsJSON());
    //             this.ipfs.files.add(new this.ipfs.types.Buffer(data), (err, files) => {
    //                 if (err) {
    //                     throw err;
    //                 }
    //
    //                 resolve(files[0].hash);
    //             });
    //         });
    //     } else {
    //         return Promise.reject("Offline");
    //     }
    // }
    //
    // download(): Promise<any> {
    //     if (this.online) {
    //         return this.modal.openInput("Copia qui la chiave...", "key")
    //             .then(key => {
    //                 if (key.length === 46) {
    //                     return new Promise(resolve => {
    //                         this.ipfs.files.cat(key, (err, file) => {
    //                             if (err) {
    //                                 throw err;
    //                             }
    //
    //                             resolve(file.toString("utf8"));
    //                         });
    //                     });
    //                 }
    //             });
    //     } else {
    //         return Promise.reject("Offline");
    //     }
    // }

    stop (): Promise<any> {
        return new Promise(resolve => {
            if (this.online) {
                this.ipfs.stop(() => {
                    this.online = false
                    resolve()
                })
            } else {
                resolve()
            }
        })
    }

}
