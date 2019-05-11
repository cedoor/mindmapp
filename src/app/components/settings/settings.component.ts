import {Component, OnInit} from '@angular/core'
import {Settings} from '../../models/settings'
import {SettingsService} from '../../services/settings.service'
import {MmpService} from '../../services/mmp.service'
import {TranslateService} from '@ngx-translate/core'
import {IPFSService} from '../../services/ipfs.service'

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public settings: Settings

    public titles: any

    public languages: Array<string>

    constructor (public settingsService: SettingsService,
                 public mmpService: MmpService,
                 public translateService: TranslateService,
                 public ipfsService: IPFSService) {
    }

    ngOnInit () {
        this.settings = this.settingsService.getSettings()

        this.titles = {}
        for (let title in this.settings) {
            this.titles[title] = 'SETTINGS_LABELS.' + title.split(/(?=[A-Z])/).join('_').toUpperCase()
        }

        this.languages = ['en', 'fr', 'it', 'zh-tw', 'zh-cn', 'es', 'pt-br']
    }

    public setMapOptions () {
        this.settingsService.setMapOptions(this.settings.mapOptions).then((settings: Settings) => {
            this.mmpService.updateOptions('rootNode', settings.mapOptions.rootNode)
            this.mmpService.updateOptions('defaultNode', settings.mapOptions.defaultNode)
            this.mmpService.updateOptions('centerOnResize', settings.mapOptions.centerOnResize)
            this.mmpService.updateOptions('drag', settings.mapOptions.drag)
            this.mmpService.updateOptions('zoom', settings.mapOptions.zoom)

            this.settings = settings
        })
    }

    public setLanguage () {
        this.settingsService.setLanguage(this.settings.general.language).then((settings: Settings) => {
            this.translateService.use(settings.general.language)

            this.settings = settings
        })
    }

    public setIpfs (status: boolean) {
        this.settingsService.setIpfs(status).then((settings: Settings) => {
            settings.sharing.ipfs ? this.ipfsService.start() : this.ipfsService.stop()

            this.settings = settings
        })
    }

}
