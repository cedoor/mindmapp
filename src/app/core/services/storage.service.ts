import {Injectable} from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private storage: Storage

    constructor () {
        this.storage = localStorage
    }

    get (keys: string | string[]): Promise<any | any[]> {
        return new Promise<any>((resolve) => {
            if (typeof keys === 'string') {
                resolve(JSON.parse(this.storage.getItem(keys)))
            } else {
                let items = []
                for (let i = 0, len = this.storage.length; i < len; ++i) {
                    let key = this.storage.key(i)
                    if (keys.indexOf(key) !== -1) {
                        items.push(JSON.parse(this.storage.getItem(this.storage.getItem(key))))
                    }
                }
                resolve(items)
            }
        })
    }

    getAll (): Promise<any> {
        return new Promise<any>((resolve) => {
            let items = []
            for (let i = 0, len = this.storage.length; i < len; ++i) {
                let key = this.storage.key(i)
                items.push(JSON.parse(this.storage.getItem(this.storage.getItem(key))))
            }
            resolve(items)
        })
    }

    set (key: string, data: any): Promise<any> {
        return new Promise<any>((resolve) => {
            this.storage.setItem(key, JSON.stringify(data))
            resolve(data)
        })
    }

    remove (key: string): Promise<any> {
        return new Promise<any>((resolve) => {
            resolve(this.storage.removeItem(key))
        })
    }

    exist (key: string): Promise<any> {
        return new Promise<any>((resolve) => {
            resolve(!!this.storage.getItem(key))
        })
    }

    clear (): Promise<any> {
        return new Promise<any>((resolve) => {
            resolve(this.storage.clear())
        })
    }

    empty (): Promise<any> {
        return this.getAll().then(data => {
            return data.length !== 0
        })
    }

}
