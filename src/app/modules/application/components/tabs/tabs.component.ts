import {Component, OnInit} from '@angular/core'
import {MapCacheService} from '../../../../core/services/map-cache/map-cache.service'
import {MmpService} from '../../../../core/services/mmp/mmp.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {CachedMapEntry} from '../../../../shared/models/cached-map.model'

@Component({
    selector: 'mindmapp-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

    public cachedMapEntries: CachedMapEntry[]
    public attachedMap: CachedMapEntry

    constructor (private mapCacheService: MapCacheService,
                 private mmpService: MmpService,
                 private utilsService: UtilsService) {
    }

    public async ngOnInit () {
        this.cachedMapEntries = (await this.mapCacheService.getCachedMapEntries())
            .sort(function (a: CachedMapEntry, b: CachedMapEntry) {
                return b.cachedMap.lastModified - a.cachedMap.lastModified
            })

        this.mapCacheService.attachedMap.subscribe((attachedMap: CachedMapEntry) => {
            this.attachedMap = attachedMap

            for (const cachedMapEntry of this.cachedMapEntries) {
                if (cachedMapEntry.key === attachedMap.key) {
                    cachedMapEntry.cachedMap = attachedMap.cachedMap
                    return
                }
            }

            this.cachedMapEntries.unshift(attachedMap)
        })
    }

    public openCachedMap (cachedMapEntry: CachedMapEntry) {
        this.mmpService.new(cachedMapEntry.cachedMap.data)
        this.mapCacheService.attachMap(cachedMapEntry)
    }

    public async removeCachedMap (key: string, event: MouseEvent) {
        event.stopPropagation()

        const confirmed = await this.utilsService.confirmDialog('MESSAGES.MAP_DELETION_CONFIRM')

        if (!confirmed) {
            return
        }

        await this.mapCacheService.removeCachedMap(key)

        // Remove the entry from the array.
        this.cachedMapEntries.splice(this.cachedMapEntries.findIndex((cachedMapEntry: CachedMapEntry) => {
            return cachedMapEntry.key === key
        }), 1)

        if (this.attachedMap.key === key) {
            // Select the last cached map.
            this.mmpService.new(this.cachedMapEntries[0].cachedMap.data)
            this.mapCacheService.attachMap(this.cachedMapEntries[0])
        }
    }

}
