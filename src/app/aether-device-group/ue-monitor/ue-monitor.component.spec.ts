/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UeMonitorComponent} from './ue-monitor.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {OAuthLogger, OAuthService, UrlHelperService} from 'angular-oauth2-oidc';
import {GRAFANA_PROXY} from '../../../environments/environment';
import {UtilsModule} from '../../utils/utils.module';

describe('UeMonitorComponent', () => {
    let component: UeMonitorComponent;
    let fixture: ComponentFixture<UeMonitorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UeMonitorComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatToolbarModule,
                MatCardModule,
                UtilsModule
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
        fixture = TestBed.createComponent(UeMonitorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
