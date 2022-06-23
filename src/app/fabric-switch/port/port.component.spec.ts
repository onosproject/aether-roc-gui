/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortComponent } from './port.component';
import { SwitchPortList } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { TargetName, TargetsNames } from '../../../openapi3/top/level/models';
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

const ports: SwitchPortList = [
    {
        'cage-number': 1,
        'channel-number': 0,
        speed: 'speed-1g',
    },
    {
        'cage-number': 1,
        'channel-number': 0,
        'display-name': 'Port 1/0',
        speed: 'speed-1g',
        'dhcp-connect-point': ['dhcp-1', 'dhcp-2'],
        vlans: {
            untagged: 100,
            tagged: [101],
        },
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

describe('PortComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: PortComponent;
    let fixture: ComponentFixture<PortComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PortComponent],
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

        fixture = TestBed.createComponent(PortComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // assert that we're loading the data and return fake values
        const reqSwitch = httpTestingController.expectOne(
            '/sdn-fabric/v0.1.x/value/switch/value/port'
        );

        // Assert that the request is a GET.
        expect(reqSwitch.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        reqSwitch.flush(ports);
    });

    afterEach(() => {
        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain ports', () => {
        expect(component.dataSource.data.length).toEqual(2);
    });
});
