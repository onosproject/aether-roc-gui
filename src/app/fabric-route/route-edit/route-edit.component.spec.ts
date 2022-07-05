/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEditComponent } from './route-edit.component';
import { Route } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as _ from 'lodash';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { of } from 'rxjs';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient } from '@angular/common/http';

const testData: Route = {
    'route-id': 'test-rt-1',
    'display-name': 'Route 1',
    description: 'This is Route 1',
    prefix: '10.20.0.0/16',
    address: '192.168.91.92',
    metric: 10,
};

describe('RouteEditComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: RouteEditComponent;
    let fixture: ComponentFixture<RouteEditComponent>;

    const rtMockParams = {
        'fabric-id': 'test-fabric',
        id: `test-rt-1`,
    };

    const mockParamsMap = (params): ParamMap => {
        return {
            get: (id) => {
                return params[id];
            },
            has: (id) => {
                return !_.isNil(params[id]) ? true : false;
            },
            getAll: (name: string): string[] => {
                return [];
            },
            keys: [],
        } as ParamMap;
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RouteEditComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(mockParamsMap(rtMockParams)),
                        snapshot: { params: rtMockParams },
                    },
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
                MatSlideToggleModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(RouteEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const req = httpTestingController.expectOne(
            '/sdn-fabric/v0.1.x/test-fabric/route/test-rt-1'
        );

        expect(req.request.method).toEqual('GET');

        req.flush(testData);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
