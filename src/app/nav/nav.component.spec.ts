/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Params} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';
import {By, Meta} from '@angular/platform-browser';
import {of, from, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {
    ConsoleLoggerService,
    FnService,
    IconComponent,
    IconService,
    LionService,
    LogService,
    NavService
} from 'gui2-fw-lib';
import {NavComponent} from './nav.component';
import {KUBERNETES_API_PROXY} from '../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';

class MockActivatedRoute extends ActivatedRoute {
    constructor(params: Params) {
        super();
        this.queryParams = of(params);
    }
}

class MockHttpClient {
    get(): Observable<any> {
        return from(['{"id":"app","icon":"nav_apps","cat":"PLATFORM","label":"Applications"},' +
        '{"id":"settings","icon":"nav_settings","cat":"PLATFORM","label":"Settings"}']);
    }

    subscribe(): void  {
    }
}

class MockNavService {
    uiPlatformViews = [];
    uiNetworkViews = [];
    uiOtherViews = [];
    uiHiddenViews = [];

    getUiViews(): void {
    }
}

class MockIconService {
    loadIconDef(): void {
    }
}

class MockMeta {
    getTag(attrSelector: string): HTMLMetaElement {
        return {
            content: 'test',
        } as HTMLMetaElement;
    }
}

/**
 * ONOS GUI -- Util -- Navigation Component - Unit Tests
 */
describe('NavComponent', () => {
    let log: LogService;
    let fs: FnService;
    let ar: MockActivatedRoute;
    let windowMock: Window;
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;
    const bundleObj = {
        'core.view.App': {
            test: 'test1'
        }
    };
    const mockLion = (key) => {
        return bundleObj[key] || '%' + key + '%';
    };

    beforeEach((() => {
        log = new ConsoleLoggerService();
        ar = new MockActivatedRoute({debug: 'txrx'});

        windowMock = {
            location: {
                hostname: 'foo',
                host: 'foo',
                port: '80',
                protocol: 'http',
                search: {debug: 'true'},
                href: 'ws://foo:123/onos/ui/websock/path',
                absUrl: 'ws://foo:123/onos/ui/websock/path'
            } as any
        } as any;
        fs = new FnService(ar, log, windowMock);

        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, RouterTestingModule],
            declarations: [NavComponent, IconComponent],
            providers: [
                {provide: FnService, useValue: fs},
                {provide: IconService, useClass: MockIconService},
                {provide: HttpClient, useClass: MockHttpClient},
                {provide: 'kubernetes_api_proxy', useValue: KUBERNETES_API_PROXY},
                {
                    provide: LionService, useFactory: (() => {
                        return {
                            bundle: ((bundleId) => mockLion),
                            ubercache: new Array(),
                            loadCbs: new Map<string, () => void>([])
                        };
                    })
                },
                {provide: LogService, useValue: log},
                {provide: NavService, useClass: MockNavService},
                {provide: 'Window', useValue: windowMock},
                {provide: Meta, useClass: MockMeta}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a nav#nav', () => {
        const appDe: DebugElement = fixture.debugElement;
        const divDe = appDe.query(By.css('nav#nav'));
        expect(divDe).toBeTruthy();
    });

    it('should have a network div.nav-hdr inside a nav#nav', () => {
        const appDe: DebugElement = fixture.debugElement;
        const divDe = appDe.query(By.css('nav#nav div div#header'));
        expect(divDe != null).toBeTruthy();
        const div: HTMLElement = divDe.nativeElement;
        expect(div.textContent).toEqual('No Services Detected');
    });

});
