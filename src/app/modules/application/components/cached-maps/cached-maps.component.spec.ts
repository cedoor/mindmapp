import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {CachedMapsComponent} from './cached-maps.component'

describe('ApplicationCachedMapsComponent', () => {
    let component: CachedMapsComponent
    let fixture: ComponentFixture<CachedMapsComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CachedMapsComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(CachedMapsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
