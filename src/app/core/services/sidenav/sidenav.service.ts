import {Injectable} from '@angular/core'
import {MatSidenav} from '@angular/material'

@Injectable({
    providedIn: 'root'
})
export class SidenavService {

    private matSidenav: MatSidenav

    constructor () {
    }

    public init (matSidenav: MatSidenav) {
        this.matSidenav = matSidenav
    }

    public open () {
        return this.matSidenav.open()
    }

    public close () {
        return this.matSidenav.close()
    }
}
