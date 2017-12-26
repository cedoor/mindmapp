import {Injectable} from "@angular/core";

@Injectable()
export class StorageService {

    private storage;

    constructor() {
        this.storage = window.require("electron-json-storage");
    }

    getPath(): string {
        return this.storage.getDefaultDataPath();
    }

    get(keys: string | string[]): Promise<any | any[]> {
        return new Promise<any>((resolve, reject) => {
            if (typeof keys === "string") {
                this.storage.get(keys, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            } else {
                this.storage.getMany(keys, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            }
        });
    }

    getAll(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storage.getAll((error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    set(key: string, data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storage.set(key, data, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    remove(key: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storage.remove(key, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(key);
                }
            });
        });
    }

    exist(key: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storage.has(key, (error, exist) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(exist);
                }
            });
        });
    }

    clear(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storage.clear((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    empty(): Promise<any> {
        return this.getAll().then(data => {
            return Object.keys(data).length === 0;
        });
    }

}
