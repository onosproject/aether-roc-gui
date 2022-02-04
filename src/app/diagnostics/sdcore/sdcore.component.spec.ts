/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdcoreComponent } from './sdcore.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ApiModule } from '../../../openapi3/top/level/api.module';
import { MatCardModule } from '@angular/material/card';
import { SDCORE_ADAPTER } from '../../../environments/environment';

describe('SdcoreComponent', () => {
    let component: SdcoreComponent;
    let fixture: ComponentFixture<SdcoreComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SdcoreComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatSnackBarModule,
                MatToolbarModule,
                MatIconModule,
                MatCardModule,
                ApiModule,
            ],
            providers: [
                { provide: 'sdcore-adapter-service', useValue: SDCORE_ADAPTER },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SdcoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
