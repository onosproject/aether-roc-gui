/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListComponent } from './transaction-list.component';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ApiModule } from '../../../openapi3/aether/2.0.0/api.module';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../../openapi3/top/level/models/transaction';

const testData: Transaction[] = [
    {
        id: 'test1',
        index: 1,
        meta: {},
        details: {
            change: [
                {
                    'target-name': 'target1',
                    'path-values': [
                        {
                            path: 'path1/1',
                            'path-value': {
                                deleted: false,
                                path: 'path1/1',
                                value: { value: 'value1.1' },
                            },
                        },
                        {
                            path: 'path1/2',
                            'path-value': {
                                deleted: false,
                                path: 'path1/2',
                                value: { value: 'value1.2' },
                            },
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'test2',
        index: 2,
        meta: {},
        details: {
            change: [
                {
                    'target-name': 'target2',
                    'path-values': [
                        {
                            path: 'path2',
                            'path-value': {
                                deleted: false,
                                path: 'path',
                                value: { value: 'value2' },
                            },
                        },
                    ],
                },
            ],
        },
    },
];

describe('TransactionListComponent', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let component: TransactionListComponent;
    let fixture: ComponentFixture<TransactionListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TransactionListComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatSortModule,
                MatTableModule,
                MatSnackBarModule,
                MatToolbarModule,
                MatIconModule,
                ApiModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        // Inject the http service and test controller for each test
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(TransactionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // assert that we're loading the data and return fake values
        const req = httpTestingController.expectOne('/transactions');

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(testData);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create MatTableData sources for all the changes', () => {
        expect(component.transactionListData.length).toEqual(2);

        const t1 = component.transactionListData[0];
        expect(t1.id).toEqual('test1');
        expect(t1.dataSource).not.toBeNull();
        expect(t1.dataSource.data.length).toEqual(2);
        expect(t1.dataSource.data[0].path).toEqual('path1/1');
        expect(t1.dataSource.data[1].path).toEqual('path1/2');

        const t2 = component.transactionListData[1];
        expect(t2.id).toEqual('test2');
        expect(t2.dataSource).not.toBeNull();
        expect(t2.dataSource.data.length).toEqual(1);
        expect(t2.dataSource.data[0].path).toEqual('path2');
        expect(t2.dataSource.data[0]['path-value'].value.value).toEqual(
            'value2'
        );
    });
});
