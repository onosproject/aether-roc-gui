/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelVcsComponent} from './panel-vcs.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {ResizeService} from '../resize.service';
import {GRAFANA_PROXY} from '../../../environments/environment';
import {OAuthLogger, OAuthModule, OAuthService, UrlHelperService} from 'angular-oauth2-oidc';
import {UtilsModule} from '../../utils/utils.module';

describe('PanelVcsComponent', () => {
    let component: PanelVcsComponent;
    let fixture: ComponentFixture<PanelVcsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PanelVcsComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
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
        fixture = TestBed.createComponent(PanelVcsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
