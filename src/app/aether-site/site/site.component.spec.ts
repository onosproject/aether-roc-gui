/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ApiModule } from '../../../openapi3/aether/2.1.0/api.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SiteComponent } from './site.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
import { SiteList } from '../../../openapi3/aether/2.1.0/models';
import { TargetName, TargetsNames } from '../../../openapi3/top/level/models';
import { EnterpriseService } from '../../enterprise.service';

const testData: SiteList = [
    {
        'site-id': 'site-1',
        'display-name': 'Site 1',
        description: 'The first site',
        'connectivity-service': {
            'core-5g': {
                endpoint: 'http://test.addr',
                'acc-prometheus-url': 'http://test.prom.aether',
            },
        },
    },
    {
        'site-id': 'site-2',
        'display-name': 'Site 2',
        description: 'The second site',
    },
];

class mockEnterpriseService {
    get enterprises(): TargetsNames {
        return [
            {
                name: 'test-ent',
            },
        ] as TargetName[];
    }
}

describe('SiteComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: SiteComponent;
    let fixture: ComponentFixture<SiteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SiteComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                MatSnackBarModule,
                MatToolbarModule,
                MatIconModule,
                MatExpansionModule,
                ApiModule,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { paramMap: of({ get: () => 'value' }) },
                },
                {
                    provide: EnterpriseService,
                    useClass: mockEnterpriseService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        // Inject the http service and test controller for each test
        TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(SiteComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        // The following `expectOne()` will match the request's URL.
        // If no requests or multiple requests matched that URL
        // `expectOne()` would throw.
        const req = httpTestingController.expectOne(
            '/aether/v2.1.x/test-ent/site'
        );

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(testData);
    });

    afterEach(() => {
        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should find one site', () => {
        expect(component.dataSource.data.length).toEqual(2);
    });

    it('should find site site-1', () => {
        expect(component.dataSource.data[0]['site-id']).toEqual('site-1');
        expect(component.dataSource.data[0]['display-name']).toEqual('Site 1');
        expect(component.dataSource.data[0]['description']).toEqual(
            'The first site'
        );
        expect(component.dataSource.data[0]['enterprise-id']).toEqual(
            'test-ent'
        );
        expect(
            component.dataSource.data[0]['connectivity-service']
        ).not.toBeNull();
        expect(
            component.dataSource.data[0]['connectivity-service']['core-5g']
        ).not.toBeNull();
        expect(
            component.dataSource.data[0]['connectivity-service']['core-5g']
                .endpoint
        ).toEqual('http://test.addr');
    });
});
