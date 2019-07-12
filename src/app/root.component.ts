import {Component, OnInit} from '@angular/core'
import {ShortcutsService} from './core/services/shortcuts/shortcuts.service'
import {TranslateService} from '@ngx-translate/core'
import {SettingsService} from './core/services/settings/settings.service'
import {NotificationService} from './core/services/notification/notification.service'
import {routeAnimation} from './shared/animations/route.animation'

@Component({
    selector: 'mindmapp-root',
    templateUrl: 'root.component.html',
    styleUrls: ['./root.component.scss'],
    animations: [routeAnimation]
})
export class RootComponent implements OnInit {

    constructor (private notificationService: NotificationService,
                 private translateService: TranslateService,
                 private settingsService: SettingsService,
                 private shortcutsService: ShortcutsService) {
    }

    public async ngOnInit () {
        const {settings, isFirstTime} = await this.settingsService.init()

        if (isFirstTime) {
            settings.general.language = this.translateService.getBrowserLang()
            await this.settingsService.updateCachedSettings(settings)
        }

        await this.initTranslations(settings.general.language)

        this.shortcutsService.init()
        this.notificationService.setMessage('INITIAL_INFORMATION')

        if (isFirstTime) {
            this.notificationService.showSnackBarMessage('WELCOME_MESSAGE')
        }
    }

    private async initTranslations (language: string): Promise<void> {
        this.translateService.setDefaultLang(language)
        await this.translateService.use(language).toPromise()
    }

}
