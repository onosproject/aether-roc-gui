/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsageComponent } from './show-usage.component';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { SiteList } from '../../../openapi3/aether/2.1.0/models';
import { ApplicationList } from '../../../openapi3/aether/2.1.0/models';

const testSites: SiteList = [
    {
        'site-id': 'test-site-1',
        'device-group': [
            {
                'device-group-id': 'dg-1',
                'traffic-class': 'test-tc-1',
            },
            {
                'device-group-id': 'dg-2',
                'traffic-class': 'different-tc',
            },
        ],
        slice: [
            {
                'slice-id': 'slice-1',
                sd: 123,
                sst: 456,
                'default-behavior': 'ALLOW',
                'priority-traffic-rule': [
                    {
                        'priority-traffic-rule-id': 'ptr-1',
                        'traffic-class': 'test-tc-1',
                        device: 'device-1',
                        application: 'app-1',
                        endpoint: 'ep-1',
                    },
                ],
            },
        ],
    },
];

const testApplications: ApplicationList = [
    {
        'application-id': 'app-1',
        address: 'test.addr.1',
        endpoint: [
            {
                'endpoint-id': 'ep-1',
                'port-start': 100,
                'traffic-class': 'test-tc-1',
            },
        ],
    },
];

describe('ShowUsageComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: ShowUsageComponent;
    let fixture: ComponentFixture<ShowUsageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShowUsageComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
                },
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatIconModule,
                MatToolbarModule,
                MatCardModule,
                MatButtonModule,
                MatDividerModule,
                MatSnackBarModule,
                MatSelectModule,
                MatTableModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(ShowUsageComponent);
        component = fixture.componentInstance;

        component.trafficClassID = 'test-tc-1';
        component.enterpriseID = { name: 'test-ent' };
        component.ngOnChanges();
        fixture.detectChanges();

        const reqSites = httpTestingController.expectOne(
            '/aether/v2.1.x/test-ent/site'
        );

        // Assert that the request is a GET.
        expect(reqSites.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        reqSites.flush(testSites);

        const reqApplications = httpTestingController.expectOne(
            '/aether/v2.1.x/test-ent/application'
        );
        reqApplications.flush(testApplications);
    });

    afterEach(() => {
        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have usages', () => {
        expect(component.arrayLen).toBe(3);
    });
});
