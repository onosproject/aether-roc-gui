/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGroupEditComponent } from './device-group-edit.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SiteDeviceGroup } from '../../../openapi3/aether/2.1.0/models';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as _ from 'lodash';
import { of } from 'rxjs';

const testData: SiteDeviceGroup = {
    'device-group-id': 'test-dg-1',
    'display-name': 'Test DG 1',
    device: [
        {
            'device-id': 'test-dev-1',
            enable: true,
        },
        {
            'device-id': 'test-dev-2',
            enable: true,
        },
    ],
    'traffic-class': 'class-1',
    'ip-domain': 'test-ipd-1',
};

describe('DeviceGroupEditComponent', () => {
    let httpTestingController: HttpTestingController;

    let component: DeviceGroupEditComponent;
    let fixture: ComponentFixture<DeviceGroupEditComponent>;
    const fb = new FormBuilder();

    const dgdMockParams = {
        'enterprise-id': 'test-ent',
        'site-id': 'test-site',
        id: `test-dg-1`,
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
            declarations: [DeviceGroupEditComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
                },
                { provide: FormBuilder, useValue: fb },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(mockParamsMap(dgdMockParams)),
                        snapshot: { params: dgdMockParams },
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
                MatTooltipModule,
                MatAutocompleteModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(DeviceGroupEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // The following `expectOne()` will match the request's URL.
        // If no requests or multiple requests matched that URL
        // `expectOne()` would throw.
        const req = httpTestingController.expectOne(
            '/aether/v2.1.x/test-ent/site/test-site/device-group/test-dg-1'
        );

        httpTestingController.match('/aether/v2.1.x/test-ent/site/test-site');
        httpTestingController.match(
            '/aether/v2.1.x/test-ent/site/traffic-class'
        );
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

    // it('should validate a single range', () => {
    //     const imsisControlArray = component.deviceGroupForm.get(
    //         'imsis'
    //     ) as FormArray;
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('first'),
    //             'imsi-range-from': fb.control(10),
    //             'imsi-range-to': fb.control(19),
    //         })
    //     );
    //     expect(component.deviceGroupForm.valid).toBeTruthy();
    // });

    // it('should validate an equal range', () => {
    //     const imsisControlArray = component.deviceGroupForm.get(
    //         'imsis'
    //     ) as FormArray;
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('first'),
    //             'imsi-range-from': fb.control(10),
    //             'imsi-range-to': fb.control(10),
    //         })
    //     );
    //     expect(component.deviceGroupForm.valid).toBeTruthy();
    // });

    // it('should validate a max range', () => {
    //     const imsisControlArray = component.deviceGroupForm.get(
    //         'imsis'
    //     ) as FormArray;
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('first'),
    //             'imsi-range-from': fb.control(10),
    //             'imsi-range-to': fb.control(5010),
    //         })
    //     );
    //     expect(component.deviceGroupForm.valid).toBeTruthy();
    // });

    // it('should not validate an excessive range in a single', () => {
    //     const imsisControlArray = component.deviceGroupForm.get(
    //         'imsis'
    //     ) as FormArray;
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('first'),
    //             'imsi-range-from': fb.control(10),
    //             'imsi-range-to': fb.control(5011),
    //         })
    //     );
    //     expect(component.deviceGroupForm.valid).toBeFalse();
    // });

    // it('should not validate an excessive range in a double', () => {
    //     const imsisControlArray = component.deviceGroupForm.get(
    //         'imsis'
    //     ) as FormArray;
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('first'),
    //             'imsi-range-from': fb.control(10),
    //             'imsi-range-to': fb.control(15),
    //         })
    //     );
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('second'),
    //             'imsi-range-from': fb.control(20),
    //             'imsi-range-to': fb.control(5021),
    //         })
    //     );
    //     expect(component.deviceGroupForm.valid).toBeFalse();
    // });

    // it('should validate a double range', () => {
    //     const imsisControlArray = component.deviceGroupForm.get(
    //         'imsis'
    //     ) as FormArray;
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('first'),
    //             'imsi-range-from': fb.control(10),
    //             'imsi-range-to': fb.control(19),
    //         })
    //     );
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('second'),
    //             'imsi-range-from': fb.control(20),
    //             'imsi-range-to': fb.control(29),
    //         })
    //     );
    //     expect(component.deviceGroupForm.valid).toBeTruthy();
    // });

    // it('should validate a juxtaposed triple range', () => {
    //     const imsisControlArray = component.deviceGroupForm.get(
    //         'imsis'
    //     ) as FormArray;
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('first'),
    //             'imsi-range-from': fb.control(300),
    //             'imsi-range-to': fb.control(400),
    //         })
    //     );
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('second'),
    //             'imsi-range-from': fb.control(10),
    //             'imsi-range-to': fb.control(20),
    //         })
    //     );
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('second'),
    //             'imsi-range-from': fb.control(0),
    //             'imsi-range-to': fb.control(1),
    //         })
    //     );
    //     expect(component.deviceGroupForm.valid).toBeTruthy();
    // });

    // it('should not validate a single reversed range', () => {
    //     const imsisControlArray = component.deviceGroupForm.get(
    //         'imsis'
    //     ) as FormArray;
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('first'),
    //             'imsi-range-from': fb.control(11),
    //             'imsi-range-to': fb.control(10),
    //         })
    //     );
    //     expect(component.deviceGroupForm.valid).toBeFalse();
    // });

    // it('should not validate a reversed range in a double', () => {
    //     const imsisControlArray = component.deviceGroupForm.get(
    //         'imsis'
    //     ) as FormArray;
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('first'),
    //             'imsi-range-from': fb.control(11),
    //             'imsi-range-to': fb.control(10),
    //         })
    //     );
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('second'),
    //             'imsi-range-from': fb.control(20),
    //             'imsi-range-to': fb.control(29),
    //         })
    //     );
    //     expect(component.deviceGroupForm.valid).toBeFalse();
    // });

    // it('should not validate an overlapping range', () => {
    //     const imsisControlArray = component.deviceGroupForm.get(
    //         'imsis'
    //     ) as FormArray;
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('first'),
    //             'imsi-range-from': fb.control(10),
    //             'imsi-range-to': fb.control(19),
    //         })
    //     );
    //     imsisControlArray.push(
    //         fb.group({
    //             'imsi-id': fb.control('second'),
    //             'imsi-range-from': fb.control(15),
    //             'imsi-range-to': fb.control(25),
    //         })
    //     );
    //     expect(component.deviceGroupForm.valid).toBeFalse();
    // });
});
