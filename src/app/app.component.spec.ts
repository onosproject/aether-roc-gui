/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConsoleLoggerService, Gui2FwLibModule, LogService} from 'gui2-fw-lib';
import {KUBERNETES_API_PROXY} from '../environments/environment';
import {NavComponent} from './nav/nav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Meta} from '@angular/platform-browser';

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
                Gui2FwLibModule
            ],
            declarations: [
                AppComponent, NavComponent
            ],
            providers: [
                {provide: 'Window', useValue: window},
                {provide: 'kubernetes_api_proxy', useValue: KUBERNETES_API_PROXY},
                {provide: LogService, useClass: ConsoleLoggerService},
                {provide: Meta, useClass: MockMeta}
            ]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'aether-roc-gui'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('aether-roc-gui');
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('div').textContent).toContain('No Services Detected');
    });
});
