import {Component, OnInit, ViewChild} from '@angular/core'
import {ShortcutsService} from './core/services/shortcuts/shortcuts.service'
import {TranslateService} from '@ngx-translate/core'
import {SettingsService} from './core/services/settings/settings.service'
import {NotificationService} from './core/services/notification/notification.service'
import {RouterOutlet} from '@angular/router'
import {routeAnimation} from './shared/animations/route.animation'
import {MatSidenav} from '@angular/material'
import {SidenavService} from './core/services/sidenav/sidenav.service'

@Component({
    selector: 'mindmapp-root',
    templateUrl: 'root.component.html',
    styleUrls: ['./root.component.scss'],
    animations: [routeAnimation]
})
export class RootComponent implements OnInit {

    @ViewChild('outlet', {static: false}) public outlet: RouterOutlet
    @ViewChild('sidenav', {static: false}) public sidenav: MatSidenav
    public initialized: boolean

    constructor (private notificationService: NotificationService,
                 private translateService: TranslateService,
                 private sidenavService: SidenavService,
                 private settingsService: SettingsService,
                 private shortcutsService: ShortcutsService) {
    }

    public async ngOnInit () {
        const {settings, isFirstTime} = await this.settingsService.init()
        await this.initTranslations(settings.general.language)

        this.shortcutsService.init()
        this.sidenavService.init(this.sidenav)
        this.notificationService.setMessage('INITIAL_INFORMATION')

        if (isFirstTime) {
            this.notificationService.showSnackBarMessage('WELCOME_MESSAGE')
        }

        this.initialized = true
    }

    private async initTranslations (language: string): Promise<void> {
        this.translateService.setDefaultLang(language)
        await this.translateService.use(language).toPromise()
    }

}
