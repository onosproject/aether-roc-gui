import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimCardComponent } from './sim-card.component';

describe('SimCardComponent', () => {
    let component: SimCardComponent;
    let fixture: ComponentFixture<SimCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SimCardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SimCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
