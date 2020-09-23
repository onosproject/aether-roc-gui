/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubscriberListComponent} from './subscriber-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SubscriberListComponent', () => {
    let component: SubscriberListComponent;
    let fixture: ComponentFixture<SubscriberListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SubscriberListComponent],
            imports: [
                HttpClientTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriberListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
