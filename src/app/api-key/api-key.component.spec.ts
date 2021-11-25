/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyComponent } from './api-key.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ClipboardModule } from '@angular/cdk/clipboard';

describe('ApiKeyComponent', () => {
    let component: ApiKeyComponent;
    let fixture: ComponentFixture<ApiKeyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApiKeyComponent],
            imports: [MatCardModule, MatListModule, ClipboardModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApiKeyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
