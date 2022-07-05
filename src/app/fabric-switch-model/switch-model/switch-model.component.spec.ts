/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchModelComponent } from './switch-model.component';
import { TargetName, TargetsNames } from '../../../openapi3/top/level/models';
import { SwitchModelList } from '../../../openapi3/sdn-fabric/0.1.0/models';
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
import { HttpClient } from '@angular/common/http';

const switchModels: SwitchModelList = [
    {
        'switch-model-id': 'test.switch.model.1',
        'display-name': 'Test Model 1',
        pipeline: 'dual',
        attribute: [
            {
                'attribute-key': 'vendor',
                value: 'test-vendor',
            },
        ],
        port: [
            {
                'cage-number': 1,
                'max-channel': 0,
                speeds: ['speed-1g', 'speed-10g'],
            },
            {
                'cage-number': 2,
                'max-channel': 0,
                speeds: ['speed-1g', 'speed-10g'],
            },
        ],
    },
    {
        'switch-model-id': 'test.switch.model.2',
        'display-name': 'Test Model 2',
        pipeline: 'quad',
        port: [
            {
                'cage-number': 2,
                'max-channel': 4,
                speeds: ['speed-1g', 'speed-10g', 'speed-100g'],
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

describe('SwitchModelComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: SwitchModelComponent;
    let fixture: ComponentFixture<SwitchModelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SwitchModelComponent],
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

        fixture = TestBed.createComponent(SwitchModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // assert that we're loading the data and return fake values
        const reqSwitch = httpTestingController.expectOne(
            '/sdn-fabric/v0.1.x/test-fabric/switch-model'
        );

        // Assert that the request is a GET.
        expect(reqSwitch.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        reqSwitch.flush(switchModels);
    });

    afterEach(() => {
        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('should create', () => {
        httpTestingController.match('/sdn-fabric/v0.1.x/test-fabric/switch');
        expect(component).toBeTruthy();
    });

    it('should contain switch models', () => {
        httpTestingController.match('/sdn-fabric/v0.1.x/test-fabric/switch');
        expect(component.dataSource.data.length).toEqual(2);
    });
});
