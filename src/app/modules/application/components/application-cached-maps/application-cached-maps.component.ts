import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material'
import {CachedMapEntry} from '../../../../shared/models/cached-map.model'
import {MapCacheService} from '../../../../core/services/map-cache/map-cache.service'
import {MmpService} from '../../../../core/services/mmp/mmp.service'

@Component({
    selector: 'mindmapp-cached-maps',
    templateUrl: './application-cached-maps.component.html',
    styleUrls: ['./application-cached-maps.component.scss']
})
export class ApplicationCachedMapsComponent {

    constructor (private mapCacheService: MapCacheService,
                 private mmpService: MmpService,
                 private matDialogRef: MatDialogRef<ApplicationCachedMapsComponent>,
                 @Inject(MAT_DIALOG_DATA) public cachedMapEntries: CachedMapEntry[]) {
    }

    public closeDialog () {
        this.matDialogRef.close()
    }

    public openCachedMap (cachedMapEntry: CachedMapEntry) {
        this.mmpService.new(cachedMapEntry.cachedMap.data)
        this.mapCacheService.attachMap(cachedMapEntry.key)
        this.closeDialog()
    }

    public removeCachedMap (key: string, event: MouseEvent) {
        event.stopPropagation()

        this.mapCacheService.removeMap(key)

        if (this.cachedMapEntries.length === 1) {
            this.closeDialog()
        } else {
            // Remove the entry from the array.
            this.cachedMapEntries.splice(this.cachedMapEntries.findIndex((cachedMapEntry: CachedMapEntry) => {
                return cachedMapEntry.key === key
            }), 1)
        }
    }

}
