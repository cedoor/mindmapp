import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {ApplicationCachedMapsComponent} from './application-cached-maps.component'

describe('ApplicationCachedMapsComponent', () => {
    let component: ApplicationCachedMapsComponent
    let fixture: ComponentFixture<ApplicationCachedMapsComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApplicationCachedMapsComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationCachedMapsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
