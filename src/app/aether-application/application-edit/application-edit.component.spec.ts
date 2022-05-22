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
import {
    FormArray,
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ApplicationEditComponent } from './application-edit.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Application } from '../../../openapi3/aether/2.1.0/models';

const testData: Application = {
    'application-id': 'test-app-1',
    address: '10.20.30.40/32',
    'display-name': 'Test App 1',
    endpoint: [
        {
            'endpoint-id': 'test-ep-1',
            'port-start': 123,
            'port-end': 124,
            'traffic-class': 'class-1',
            'display-name': 'Endpoint 1',
        },
        {
            'endpoint-id': 'test-ep-2',
            'port-start': 223,
            'port-end': 224,
        },
    ],
};

describe('ApplicationEditComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: ApplicationEditComponent;
    let fixture: ComponentFixture<ApplicationEditComponent>;

    const applMockParams = {
        'enterprise-id': 'test-ent',
        id: `test-app-1`,
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
            declarations: [ApplicationEditComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(mockParamsMap(applMockParams)),
                        snapshot: { params: applMockParams },
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
                MatAutocompleteModule,
            ],
        }).compileComponents();
    });
    const fb = new FormBuilder();

    beforeEach(() => {
        TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(ApplicationEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const req = httpTestingController.expectOne(
            '/aether/v2.1.x/test-ent/application/test-app-1'
        );
        httpTestingController.match('/aether/v2.1.x/test-ent/site/test-site');
        httpTestingController.match('/aether/v2.1.x/test-ent/traffic-class');

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

    it('should not validate if port-start is greater than port-end', () => {
        const endpointControlArray = component.appForm.get(
            'endpoint'
        ) as FormArray;
        const ep1Ps = endpointControlArray.controls[0].get('port-start');
        ep1Ps.setValue(1000);
        ep1Ps.markAsDirty();
        fixture.detectChanges();
        expect(component.appForm.valid).toBeFalse();
    });

    it('should validate if port-start is not greater than port-end', () => {
        const endpointControlArray = component.appForm.get(
            'endpoint'
        ) as FormArray;
        component.appForm.get('application-id').setValue('testappform');
        component.appForm.get('address').setValue('10.20.30.41/32');
        endpointControlArray.push(
            fb.group({
                'endpoint-id': fb.control('first'),
                'port-start': fb.control(10),
                'port-end': fb.control(19),
            })
        );
        endpointControlArray.push(
            fb.group({
                'endpoint-id': fb.control('second'),
                'port-start': fb.control(15),
                'port-end': fb.control(25),
            })
        );
        expect(component.appForm.valid).toBeTruthy();
    });
});
