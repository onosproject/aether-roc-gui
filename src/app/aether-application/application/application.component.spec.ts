/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationComponent } from './application.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiModule } from '../../../openapi3/aether/2.1.0/api.module';
import { EnterpriseService } from '../../enterprise.service';
import { TargetsNames } from '../../../openapi3/top/level/models/targets-names';
import { TargetName } from '../../../openapi3/top/level/models';
import { HttpClient } from '@angular/common/http';
import {
    ApplicationList,
    SiteList,
} from '../../../openapi3/aether/2.1.0/models';
import { MatChipsModule } from '@angular/material/chips';

const applications: ApplicationList = [
    {
        'application-id': 'test-app-1',
        address: 'test.addr.1',
    },
    {
        'application-id': 'test-app-2',
        address: 'test.addr.2',
    },
];

const sites: SiteList = [
    {
        'site-id': 'test-site-1',
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

describe('ApplicationComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: ApplicationComponent;
    let fixture: ComponentFixture<ApplicationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApplicationComponent],
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
                ApiModule,
                MatChipsModule,
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

        fixture = TestBed.createComponent(ApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // assert that we're loading the data and return fake values
        const reqAppl = httpTestingController.expectOne(
            '/aether/v2.1.x/test-ent/application'
        );

        // Assert that the request is a GET.
        expect(reqAppl.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        reqAppl.flush(applications);
    });

    afterEach(() => {
        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('should create', () => {
        httpTestingController.match('/aether/v2.1.x/test-ent/site');
        expect(component).toBeTruthy();
    });

    it('should contain applications', () => {
        httpTestingController.match('/aether/v2.1.x/test-ent/site');
        expect(component.dataSource.data.length).toEqual(2);
    });
});
