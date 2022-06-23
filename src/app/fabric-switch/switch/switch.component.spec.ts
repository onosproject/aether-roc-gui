/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchComponent } from './switch.component';
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
import { ApiModule } from '../../../openapi3/sdn-fabric/0.1.0/api.module';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { TargetName, TargetsNames } from '../../../openapi3/top/level/models';
import { HttpClient } from '@angular/common/http';
import { SwitchList } from '../../../openapi3/sdn-fabric/0.1.0/models';

const switches: SwitchList = [
    {
        'switch-id': 'test-sw-1',
        'model-id': 'model-1',
        role: 'leaf',
    },
    {
        'switch-id': 'test-sw-2',
        'model-id': 'model-2',
        role: 'leaf',
        vlan: [
            {
                'vlan-id': 100,
                'display-name': 'VLAN 100',
                subnet: ['10.1.2.0/24', '10.1.3.0/24'],
            },
        ],
    },
];

class mockFabricService {
    get enterprises(): TargetsNames {
        return [
            {
                name: 'test-fabric',
            },
        ] as TargetName[];
    }
}

describe('SwitchComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: SwitchComponent;
    let fixture: ComponentFixture<SwitchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SwitchComponent],
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
                    provide: FabricService,
                    useClass: mockFabricService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        // Inject the http service and test controller for each test
        TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(SwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // assert that we're loading the data and return fake values
        const reqSwitch = httpTestingController.expectOne(
            '/sdn-fabric/v0.1.x/test-fabric/switch'
        );

        // Assert that the request is a GET.
        expect(reqSwitch.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        reqSwitch.flush(switches);
    });

    afterEach(() => {
        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain switches', () => {
        expect(component.dataSource.data.length).toEqual(2);
    });
});
