import {Component} from '@angular/core'
import {Settings} from '../../../../shared/models/settings.model'
import {SettingsService} from '../../../../core/services/settings/settings.service'
import {MmpService} from '../../../../core/services/mmp/mmp.service'
import {TranslateService} from '@ngx-translate/core'

@Component({
    selector: 'mindmapp-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

    public readonly languages: string[]
    public settings: Settings

    constructor (private settingsService: SettingsService,
                 private mmpService: MmpService,
                 private translateService: TranslateService) {
        this.languages = SettingsService.LANGUAGES
        this.settings = this.settingsService.getCachedSettings()
    }

    public async updateMapOptions () {
        await this.settingsService.updateCachedSettings(this.settings)

        this.mmpService.updateOptions('rootNode', this.settings.mapOptions.rootNode)
        this.mmpService.updateOptions('defaultNode', this.settings.mapOptions.defaultNode)
        this.mmpService.updateOptions('centerOnResize', this.settings.mapOptions.centerOnResize)

    }

    public async updateLanguage () {
        await this.settingsService.updateCachedSettings(this.settings)

        this.translateService.use(this.settings.general.language)
    }

}
