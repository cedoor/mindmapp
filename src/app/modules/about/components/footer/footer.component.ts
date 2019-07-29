import {Component, OnInit} from '@angular/core'
import * as packageJson from '../../../../../../package.json'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {SettingsService} from '../../../../core/services/settings/settings.service'
import {TranslateService} from '@ngx-translate/core'
import {Settings} from '../../../../shared/models/settings.model'

@Component({
    selector: 'mindmapp-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public settings: Settings
    public languages: string[]

    public projectName: string
    public currentYear: string
    public projectAuthor: any

    constructor (private settingsService: SettingsService,
                 private translateService: TranslateService) {
    }

    public ngOnInit () {
        this.settings = this.settingsService.getCachedSettings()
        this.languages = SettingsService.LANGUAGES

        this.projectName = UtilsService.capitalizeWord(packageJson.name)
        this.currentYear = new Date().getFullYear().toString()
        this.projectAuthor = packageJson.author
    }

    public async updateLanguage () {
        await this.settingsService.updateCachedSettings(this.settings)

        this.translateService.use(this.settings.general.language)
    }

}
