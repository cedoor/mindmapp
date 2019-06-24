import {Injectable} from '@angular/core'
import {UtilsService} from '../utils/utils.service'

/**
 * Enumerative of the possible keys present in the storage
 */
export enum STORAGE_KEYS {
    SETTINGS = 'settings'
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    // The storage used in the service.
    private readonly storage: Storage

    /**
     * Initialize the storage service setting the default storage.
     */
    constructor () {
        // Use the window local storage.
        this.storage = window.localStorage
    }

    /**
     * Return the value or the values based on the keys passed as parameters.
     */
    public async get (keys: string | string[]): Promise<any | any[] | null> {
        if (typeof keys === 'string') {
            return this.parseItem(this.storage.getItem(keys))
        }

        const items: any[] = []

        for (const key of Object.keys(this.storage)) {
            if (keys.includes(key)) {
                items.push(await this.get(key))
            }
        }

        return items && items.length > 0 ? items : null
    }

    /**
     * Return all the saved values in the storage.
     */
    public async getAll (): Promise<any[] | null> {
        return Object.values(this.storage).map((item: string) => {
            return this.parseItem(item)
        }) || null
    }

    /**
     * Return all the saved keys in the storage.
     */
    public async getAllEntries (): Promise<any[] | null> {
        return Object.entries(this.storage).map((entry) => {
            entry[1] = this.parseItem(entry[1])

            return entry
        }) || null
    }

    /**
     * Save an item in the storage.
     */
    public async set (key: string, item: any): Promise<void> {
        this.storage.setItem(key, JSON.stringify(item))
    }

    /**
     * Remove an item from the storage.
     */
    public async remove (key: string): Promise<void> {
        this.storage.removeItem(key)
    }

    /**
     * Check if an item exist in the storage. Return true if it exist, false otherwise.
     */
    public async exist (key: string): Promise<boolean> {
        return !!this.storage.getItem(key)
    }


    /**
     * Remove all the items from the storage.
     */
    public async clear (): Promise<void> {
        this.storage.clear()
    }

    /**
     * Check if there are items in the storage. Return true if there are items, false otherwise.
     */
    public async isEmpty (): Promise<boolean> {
        const items: any[] = await this.getAll()

        return items && items.length > 0
    }

    /**
     * Parse the storage item and return the correct type.
     */
    private parseItem (item: string): any {
        if (UtilsService.isJSONString(item)) {
            return JSON.parse(item)
        } else if (!Number.isNaN(+item)) {
            return +item
        } else if (item === 'true' || item === 'false') {
            return item === 'true'
        } else {
            return item
        }
    }

}
