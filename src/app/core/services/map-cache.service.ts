import {Injectable} from '@angular/core'
import {MmpService} from './mmp.service'
import {BehaviorSubject, Observable} from 'rxjs'
import {StorageService} from './storage.service'
import {CachedMap, CachedMapEntry} from '../../shared/models/cached-map.model'
import {AttachedMap} from '../../shared/models/attached-map.model'

@Injectable({
    providedIn: 'root'
})
export class MapCacheService {

    // The title of the browser window.
    private readonly windowTitle: string

    // Behavior subject with the attached map key.
    public attachedMap: Observable<AttachedMap | null>
    private readonly attachedMapSubject: BehaviorSubject<AttachedMap | null>

    constructor (private mmpService: MmpService,
                 private storageService: StorageService) {
        // Save the window title.
        this.windowTitle = window.document.title
        // Initialization of the behavior subjects.
        this.attachedMapSubject = new BehaviorSubject<AttachedMap | null>(null)
        this.attachedMap = this.attachedMapSubject.asObservable()
    }

    /**
     * If there are cached maps, then attach the last cached map.
     * Otherwise set the attached map status to `null`.
     */
    public async init (): Promise<void> {
        // Get all the storage entries.
        const storageEntries: any[] = await this.storageService.getAllEntries()
        // Set the eventual last cached map variables.
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

        // If there is not cached maps set attached map status to `null`.
        if (!lastCachedMap) {
            this.setAttachedMap(null)
            return
        }

        this.setAttachedMap({
            key: lastCachedKey,
            updated: true
        })

        // Create a new map in the application with the last cached map data.
        this.mmpService.new(lastCachedMap.data)

        // Update the cached map for possible updated coordinates in the
        // mmp loading process (ex. map centralization).
        const cachedMap: CachedMap = {
            data: this.mmpService.exportAsJSON(),
            lastModified: Date.now()
        }

        await this.storageService.set(lastCachedKey, cachedMap)
    }

    /**
     * If there's not attached maps, add the current application map to cache and attach it.
     * Otherwise update the attached map with the current application map.
     */
    public async attachMap (key?: string): Promise<void> {
        if (!key) {
            const attachedMap: AttachedMap = this.getAttachedMap()
            key = attachedMap ? attachedMap.key : this.createKey()
        }

        const cachedMap: CachedMap = {
            data: this.mmpService.exportAsJSON(),
            lastModified: Date.now()
        }

        await this.storageService.set(key, cachedMap)
        this.setAttachedMap({
            key,
            updated: true
        })
    }

    /**
     * If there is an attached map, detach it.
     */
    public detachMap (): void {
        const attachedMap: AttachedMap = this.getAttachedMap()

        if (!attachedMap) {
            return
        }

        this.setAttachedMap(null)
    }

    /**
     * Remove a cached map from the storage.
     */
    public async removeMap (key: string): Promise<void> {
        const attachedMap: AttachedMap = this.getAttachedMap()
        // If the map to remove is the attached map, then detach it.
        if (attachedMap && attachedMap.key === key) {
            this.detachMap()
        }
        // Remove the map from the storage, if it exists.
        await this.storageService.remove(key)
    }

    /**
     * Return all the cached map entries (cachedMap + key) of the storage.
     */
    public async getCachedMapEntries (): Promise<CachedMapEntry[]> {
        // Get all the storage entries.
        const storageEntries: any[] = await this.storageService.getAllEntries() || []

        return storageEntries.filter((entry: any[]) => {
            return entry[0].includes('map-')
        }).map((entry: any[]) => {
            return {
                key: entry[0],
                cachedMap: entry[1]
            }
        })
    }

    /**
     * Update the attached map update status. If there is an attached map check
     * if the current application map and the corresponding cached map are the same.
     */
    public async updateAttachedMap () {
        const attachedMap: AttachedMap = this.getAttachedMap()

        if (attachedMap) {
            const cachedMap: CachedMap = await this.storageService.get(attachedMap.key)
            const currentMapData = this.mmpService.exportAsJSON()

            this.setAttachedMap({
                key: attachedMap.key,
                updated: JSON.stringify(currentMapData) === JSON.stringify(cachedMap.data)
            })
        }
    }

    /**
     * Return the attached cached map key, otherwise if there is no attached maps return `null`.
     */
    public getAttachedMap (): AttachedMap | null {
        return this.attachedMapSubject.getValue()
    }

    /**
     * Update the behavior subject with `null` or with the attached map data.
     */
    private setAttachedMap (attachedMap: AttachedMap | null) {
        window.document.title = attachedMap && attachedMap.updated ? this.windowTitle : this.windowTitle + '*'

        this.attachedMapSubject.next(attachedMap)
    }

    /**
     * Return the key of the map in the storage: `map-` + current timestamp.
     */
    private createKey (): string {
        return `map-${Date.now().toString()}`
    }

}
