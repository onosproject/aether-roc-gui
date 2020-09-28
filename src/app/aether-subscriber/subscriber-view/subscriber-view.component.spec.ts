/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubscriberViewComponent} from './subscriber-view.component';
import {MatCardModule} from '@angular/material/card';

describe('SubscriberViewComponent', () => {
    let component: SubscriberViewComponent;
    let fixture: ComponentFixture<SubscriberViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatCardModule,
            ],
            declarations: [SubscriberViewComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriberViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
