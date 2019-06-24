import {Component} from '@angular/core'
import {Settings} from '../../../../shared/models/settings.model'
import {SettingsService} from '../../../../core/services/settings/settings.service'
import {MmpService} from '../../../../core/services/mmp/mmp.service'
import {TranslateService} from '@ngx-translate/core'
import {SidenavService} from '../../../../core/services/sidenav/sidenav.service'

@Component({
    selector: 'mindmapp-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

    public readonly languages: Array<string>
    public settings: Settings

    constructor (private settingsService: SettingsService,
                 private mmpService: MmpService,
                 private sidenavService: SidenavService,
                 private translateService: TranslateService) {
        this.languages = ['en', 'fr', 'it', 'zh-tw', 'zh-cn', 'es', 'pt-br']
        this.settings = this.settingsService.getCachedSettings()
    }

    public openSidenav () {
        this.sidenavService.open()
    }

    public async updateMapOptions () {
        await this.settingsService.updateCachedSettings(this.settings)

        this.mmpService.updateOptions('rootNode', this.settings.mapOptions.rootNode)
        this.mmpService.updateOptions('defaultNode', this.settings.mapOptions.defaultNode)
        this.mmpService.updateOptions('centerOnResize', this.settings.mapOptions.centerOnResize)
        this.mmpService.updateOptions('drag', this.settings.mapOptions.drag)
        this.mmpService.updateOptions('zoom', this.settings.mapOptions.zoom)

    }

    public async updateLanguage () {
        await this.settingsService.updateCachedSettings(this.settings)

        this.translateService.use(this.settings.general.language)
    }

}
