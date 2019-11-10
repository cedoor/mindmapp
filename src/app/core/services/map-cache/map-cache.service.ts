import {Injectable} from '@angular/core'
import {MmpService} from '../mmp/mmp.service'
import {BehaviorSubject, Observable} from 'rxjs'
import {StorageService} from '../storage/storage.service'
import {CachedMap, CachedMapEntry} from '../../../shared/models/cached-map.model'

@Injectable({
    providedIn: 'root'
})
export class MapCacheService {

    // Observable of behavior subject with the attached map key.
    public attachedMap: Observable<CachedMapEntry | null>
    // The title of the browser window.
    private readonly windowTitle: string
    private readonly attachedMapSubject: BehaviorSubject<CachedMapEntry | null>

    constructor (private mmpService: MmpService,
                 private storageService: StorageService) {
        // Save the window title.
        this.windowTitle = window.document.title
        // Initialization of the behavior subjects.
        this.attachedMapSubject = new BehaviorSubject<CachedMapEntry | null>(null)
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

        for (const [key, value] of storageEntries) {
            if (key.includes('map-')) {
                if (!lastCachedMap || value.lastModified > lastCachedMap.lastModified) {
                    lastCachedMap = value
                    lastCachedKey = key
                }
            }
        }

        // If there is not cached maps attach the new current map.
        if (!lastCachedMap) {
            this.attachNewMap()
            return
        }

        // Attach the last cached map.
        this.attachMap({
            key: lastCachedKey,
            cachedMap: lastCachedMap
        })

        // Create a new map in the application with the last cached map data.
        this.mmpService.new(lastCachedMap.data)
    }

    /**
     * Add current new application map to cache and attach it.
     */
    public async attachNewMap (): Promise<void> {
        const key = this.createKey()

        const cachedMap: CachedMap = {
            data: this.mmpService.exportAsJSON(),
            lastModified: Date.now()
        }

        await this.storageService.set(key, cachedMap)
        this.attachMap({key, cachedMap})
    }

    /**
     * Attach a map.
     */
    public attachMap (cachedMapEntry: CachedMapEntry): void {
        this.attachedMapSubject.next(cachedMapEntry)
    }

    /**
     * Update the attached map.
     */
    public async updateAttachedMap (): Promise<void> {
        const cachedMapEntry: CachedMapEntry = this.getAttachedMap()

        const cachedMap: CachedMap = {
            data: this.mmpService.exportAsJSON(),
            lastModified: Date.now()
        }

        await this.storageService.set(cachedMapEntry.key, cachedMap)
        this.attachMap({key: cachedMapEntry.key, cachedMap})
    }

    /**
     * Remove a cached map from the storage.
     */
    public async removeCachedMap (key: string): Promise<void> {
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
     * Return the attached cached map key, otherwise if there is no attached maps return `null`.
     */
    public getAttachedMap (): CachedMapEntry {
        return this.attachedMapSubject.getValue()
    }

    /**
     * Return the key of the map in the storage: `map-` + current timestamp.
     */
    private createKey (): string {
        return `map-${Date.now().toString()}`
    }

}
