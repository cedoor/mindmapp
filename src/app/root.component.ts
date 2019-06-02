import {Component, ElementRef} from '@angular/core'
import {ShortcutsService} from './core/services/shortcuts.service'
import {TranslateService} from '@ngx-translate/core'
import {SettingsService} from './core/services/settings.service'
import {NotificationsService} from './core/services/notifications.service'

@Component({
    selector: 'mindmapp-root',
    template: '<router-outlet *ngIf="initialized"></router-outlet>'
})
export class RootComponent {

    public initialized: boolean

    constructor (private myElement: ElementRef,
                 private notificationService: NotificationsService,
                 private translateService: TranslateService,
                 private settingsService: SettingsService,
                 private shortcutsService: ShortcutsService) {
        this.init()
    }

    private async init () {
        const settings = await this.settingsService.init()
        const translations = await this.initTranslations(settings.general.language)

        // Create the electron menu.
        this.shortcutsService.createShortcuts()

        this.notificationService.setInformations(translations.INITIAL_INFORMATION, 4000)

        if (settings.general.firstTime === true) {
            this.settingsService.setFirstTime()
            this.notificationService.send(translations.WELCOME_MESSAGE)
        }

        this.initialized = true
    }

    private initTranslations (language: string): Promise<any> {
        this.translateService.setDefaultLang(language)
        return this.translateService.use(language).toPromise()
    }

}
