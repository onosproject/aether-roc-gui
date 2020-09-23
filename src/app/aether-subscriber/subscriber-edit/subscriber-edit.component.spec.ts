/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubscriberEditComponent} from './subscriber-edit.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SubscriberEditComponent', () => {
    let component: SubscriberEditComponent;
    let fixture: ComponentFixture<SubscriberEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SubscriberEditComponent],
            imports: [
                HttpClientTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriberEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
