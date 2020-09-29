/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AetherComponent} from './aether.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {KUBERNETES_API_PROXY} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Meta} from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

class MockMeta {
    getTag(attrSelector: string): HTMLMetaElement {
        return {
            content: 'test',
        } as HTMLMetaElement;
    }
}

describe('AppComponent', () => {
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
                {provide: Meta, useClass: MockMeta}
            ]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AetherComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AetherComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('div').textContent).toContain('person');
    });
});
