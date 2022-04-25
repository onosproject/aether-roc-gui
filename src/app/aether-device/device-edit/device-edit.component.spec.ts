/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEditComponent } from './device-edit.component';
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
import { SiteDevice } from '../../../openapi3/aether/2.1.0/models';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as _ from 'lodash';
import { of } from 'rxjs';

const testData: SiteDevice = {
    'device-id': 'test-device-1',
};

describe('DeviceEditComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: DeviceEditComponent;
    let fixture: ComponentFixture<DeviceEditComponent>;

    const deviceMockParams = {
        'enterprise-id': 'test-ent',
        'site-id': 'test-site',
        id: `test-device-1`,
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
            declarations: [DeviceEditComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(mockParamsMap(deviceMockParams)),
                        snapshot: { params: deviceMockParams },
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
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(DeviceEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const req = httpTestingController.expectOne(
            '/aether/v2.1.x/test-ent/site/test-site/device/test-device-1'
        );

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(testData);

        httpTestingController.match('/aether/v2.1.x/test-ent/site/test-site');
    });

    afterEach(() => {
        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have id', () => {
        expect(component.deviceId).toEqual('test-device-1');
    });
});
