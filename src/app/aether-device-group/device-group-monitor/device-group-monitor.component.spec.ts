/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeviceGroupMonitorComponent} from './device-group-monitor.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OAuthLogger, OAuthService, UrlHelperService} from 'angular-oauth2-oidc';
import {GRAFANA_PROXY} from '../../../environments/environment';

describe('DeviceGroupMonitorComponent', () => {
    let component: DeviceGroupMonitorComponent;
    let fixture: ComponentFixture<DeviceGroupMonitorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeviceGroupMonitorComponent],
            imports: [
                MatExpansionModule,
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
            ],
            providers: [
                {provide: OAuthService},
                {provide: UrlHelperService},
                {provide: OAuthLogger},
                {provide: 'grafana_api_proxy', useValue: GRAFANA_PROXY},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviceGroupMonitorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
