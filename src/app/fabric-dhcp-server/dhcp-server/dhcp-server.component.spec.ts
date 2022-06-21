/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhcpServerComponent } from './dhcp-server.component';
import { TargetName, TargetsNames } from '../../../openapi3/top/level/models';
import { DhcpServerList } from '../../../openapi3/sdn-fabric/0.1.0/models';
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

const servers: DhcpServerList = [
    {
        'dhcp-id': 'dhcp-1',
        'display-name': 'DHCP 1',
        address: '10.1.2.3',
    },
    {
        'dhcp-id': 'dhcp-2',
        'display-name': 'DHCP 2',
        address: '10.2.2.3',
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

describe('DhcpServerComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: DhcpServerComponent;
    let fixture: ComponentFixture<DhcpServerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DhcpServerComponent],
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

        fixture = TestBed.createComponent(DhcpServerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // assert that we're loading the data and return fake values
        const reqDhcpServer = httpTestingController.expectOne(
            '/sdn-fabric/v0.1.x/test-fabric/dhcp-server'
        );

        // Assert that the request is a GET.
        expect(reqDhcpServer.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        reqDhcpServer.flush(servers);
    });

    afterEach(() => {
        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('should create', () => {
        httpTestingController.match('/sdn-fabric/v0.1.x/test-fabric/switch');
        expect(component).toBeTruthy();
    });

    it('should contain DHCP servers', () => {
        httpTestingController.match('/sdn-fabric/v0.1.x/test-fabric/switch');
        expect(component.dataSource.data.length).toEqual(2);
    });
});
