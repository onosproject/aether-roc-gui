/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceComponent } from './device.component';

describe('DeviceComponent', () => {
    let component: DeviceComponent;
    let fixture: ComponentFixture<DeviceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeviceComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
