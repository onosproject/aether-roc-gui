/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEditComponent } from './device-edit.component';

describe('DeviceEditComponent', () => {
    let component: DeviceEditComponent;
    let fixture: ComponentFixture<DeviceEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeviceEditComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviceEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
