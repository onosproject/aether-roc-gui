/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AetherComponent} from './aether.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GRAFANA_PROXY, KUBERNETES_API_PROXY} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By, Meta} from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {OAuthLogger, OAuthService, UrlHelperService} from 'angular-oauth2-oidc';
import {IdTokClaims} from './idtoken';

class MockMeta {
    getTag(attrSelector: string): HTMLMetaElement {
        return {
            content: 'test',
        } as HTMLMetaElement;
    }
}

describe('AetherComponent', () => {
    let component: AetherComponent;
    let fixture: ComponentFixture<AetherComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                MatToolbarModule,
                MatIconModule,
                MatMenuModule,
                MatDividerModule,
                MatCardModule,
                MatListModule,
            ],
            declarations: [
                AetherComponent
            ],
            providers: [
                {provide: 'Window', useValue: window},
                {provide: 'kubernetes_api_proxy', useValue: KUBERNETES_API_PROXY},
                {provide: 'grafana_api_proxy', useValue: GRAFANA_PROXY},
                {provide: Meta, useClass: MockMeta},
                {provide: OAuthService},
                {provide: UrlHelperService},
                {provide: OAuthLogger}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        const testTokClObj = {
            name: 'Test User',
            email: 'test@opennetworking.org',
            groups: ['group1', 'group2'],
        } as IdTokClaims;
        localStorage.setItem('id_token_claims_obj', JSON.stringify(testTokClObj));
        fixture = TestBed.createComponent(AetherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should render title', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('div').textContent).toContain('person');
    });
});
