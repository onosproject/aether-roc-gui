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
import {OAuthLogger, OAuthModule, OAuthService, UrlHelperService} from 'angular-oauth2-oidc';
import {GRAFANA_PROXY} from '../../../environments/environment';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';

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
                MatToolbarModule,
                UtilsModule,
                OAuthModule.forRoot(),
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

    it('should replace', () => {
        const replaced = PanelAlertsComponent.relativePromLink(
            'http://aether-roc-umbrella-prometheus-server-59c974f84-dk4x8:9090/graph');
        expect(replaced).toEqual('http://localhost:9090/graph');
    });
});
