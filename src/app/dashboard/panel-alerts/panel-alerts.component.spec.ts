/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelAlertsComponent} from './panel-alerts.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {UtilsModule} from '../../utils/utils.module';
import {ResizeService} from '../resize.service';
import {OAuthLogger, OAuthService, UrlHelperService} from 'angular-oauth2-oidc';
import {GRAFANA_PROXY} from '../../../environments/environment';

describe('PanelAlertsComponent', () => {
    let component: PanelAlertsComponent;
    let fixture: ComponentFixture<PanelAlertsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PanelAlertsComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                UtilsModule
            ],
            providers: [
                ResizeService,
                {provide: OAuthService},
                {provide: UrlHelperService},
                {provide: OAuthLogger},
                {provide: 'grafana_api_proxy', useValue: GRAFANA_PROXY},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelAlertsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
