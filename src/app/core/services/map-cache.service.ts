import {Injectable} from '@angular/core'
import {MmpService} from './mmp.service'
import {BehaviorSubject, Observable} from 'rxjs'
import {StorageService} from './storage.service'
import {CachedMap} from '../../shared/models/cached-map.model'

@Injectable({
    providedIn: 'root'
})
export class MapCacheService {

    private readonly windowTitle: string

    public cached: Observable<boolean | null>
    private readonly cachedSubject: BehaviorSubject<boolean | null>

    private cachedMapKey: string

    constructor (private mmpService: MmpService,
                 private storageService: StorageService) {
        // Save the window title.
        this.windowTitle = window.document.title
        // Initialization of the behavior subjects.
        this.cachedSubject = new BehaviorSubject<boolean>(null)
        this.cached = this.cachedSubject.asObservable()
        this.setCachedStatus(null)
    }

    public async removeMap (key: string) {
        if (this.cachedMapKey === key) {
            this.setCachedStatus(null)

            this.cachedMapKey = ''
        }

        await this.storageService.remove(key)
    }

    public async addMap (): Promise<void> {
        if (this.cachedSubject.getValue() === null) {
            const cachedMap: CachedMap = {
                data: this.mmpService.exportAsJSON(),
                lastModified: Date.now()
            }
            this.cachedMapKey = this.createKey()

            await this.storageService.set(this.cachedMapKey, cachedMap)

            this.setCachedStatus(true)
        }
    }

    public async updateMap (): Promise<void> {
        if (this.cachedSubject.getValue() !== null) {
            const cachedMap: CachedMap = {
                data: this.mmpService.exportAsJSON(),
                lastModified: Date.now()
            }

            await this.storageService.set(this.cachedMapKey, cachedMap)

            this.setCachedStatus(true)
        }
    }

    public async getMap (key: string = this.cachedMapKey): Promise<CachedMap | null> {
        if (!key) {
            return null
        }

        const cachedMap: CachedMap = await this.storageService.get(key)

        if (!cachedMap || !cachedMap.data) {
            return
        }

        return cachedMap
    }

    public async setLastMap (): Promise<CachedMap | null> {
        const storageEntries: any[] = await this.storageService.getAllEntries()
        let lastCachedMap: CachedMap
        let lastCachedKey: string

        for (const entry of storageEntries) {
            if (entry[0].includes('map-')) {
                if (!lastCachedMap || entry[1].lastModified > lastCachedMap.lastModified) {
                    lastCachedMap = entry[1]
                    lastCachedKey = entry[0]
                }
            }
        }

        if (!lastCachedMap) {
            return null
        }

        this.cachedMapKey = lastCachedKey

        this.setCachedStatus(true)

        return lastCachedMap
    }

    /**
     * Update the map cached status. If there is a cached map check
     * if the current map and the cached map are the same.
     */
    public async updateCachedStatus () {
        if (this.cachedSubject.getValue() !== null) {
            const cachedMap: CachedMap = await this.storageService.get(this.cachedMapKey)
            const currentMapData = this.mmpService.exportAsJSON()

            if (JSON.stringify(currentMapData) !== JSON.stringify(cachedMap.data)) {
                this.setCachedStatus(false)
            } else {
                this.setCachedStatus(true)
            }
        }
    }

    /**
     * Return the status of the cached map, or return null if there is no cached map.
     */
    public getCachedStatus (): boolean | null {
        return this.cachedSubject.getValue()
    }

    /**
     * Set the status of the cached map, if there is one.
     */
    private setCachedStatus (cached: boolean | null) {
        window.document.title = cached ? this.windowTitle : this.windowTitle + '*'

        this.cachedSubject.next(cached)
    }

    /**
     * Return the key of the map in the storage: `map-` + current timestamp.
     */
    private createKey (): string {
        return `map-${Date.now().toString()}`
    }

}
