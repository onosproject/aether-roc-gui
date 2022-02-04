/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGroupEditComponent } from './device-group-edit.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
    FormArray,
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('DeviceGroupEditComponent', () => {
    let component: DeviceGroupEditComponent;
    let fixture: ComponentFixture<DeviceGroupEditComponent>;
    const fb = new FormBuilder();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeviceGroupEditComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
                },
                { provide: FormBuilder, useValue: fb },
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
        fixture = TestBed.createComponent(DeviceGroupEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.deviceGroupForm.get('id').setValue('testDg');
        component.deviceGroupForm.get('description').setValue('testDg');
        component.deviceGroupForm.get('display-name').setValue('testDg');
        component.deviceGroupForm.get('ip-domain').setValue('testDg');
        component.deviceGroupForm.get('site').setValue('testDg');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate a single range', () => {
        const imsisControlArray = component.deviceGroupForm.get(
            'imsis'
        ) as FormArray;
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('first'),
                'imsi-range-from': fb.control(10),
                'imsi-range-to': fb.control(19),
            })
        );
        expect(component.deviceGroupForm.valid).toBeTruthy();
    });

    it('should validate an equal range', () => {
        const imsisControlArray = component.deviceGroupForm.get(
            'imsis'
        ) as FormArray;
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('first'),
                'imsi-range-from': fb.control(10),
                'imsi-range-to': fb.control(10),
            })
        );
        expect(component.deviceGroupForm.valid).toBeTruthy();
    });

    it('should validate a max range', () => {
        const imsisControlArray = component.deviceGroupForm.get(
            'imsis'
        ) as FormArray;
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('first'),
                'imsi-range-from': fb.control(10),
                'imsi-range-to': fb.control(5010),
            })
        );
        expect(component.deviceGroupForm.valid).toBeTruthy();
    });

    it('should not validate an excessive range in a single', () => {
        const imsisControlArray = component.deviceGroupForm.get(
            'imsis'
        ) as FormArray;
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('first'),
                'imsi-range-from': fb.control(10),
                'imsi-range-to': fb.control(5011),
            })
        );
        expect(component.deviceGroupForm.valid).toBeFalse();
    });

    it('should not validate an excessive range in a double', () => {
        const imsisControlArray = component.deviceGroupForm.get(
            'imsis'
        ) as FormArray;
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('first'),
                'imsi-range-from': fb.control(10),
                'imsi-range-to': fb.control(15),
            })
        );
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('second'),
                'imsi-range-from': fb.control(20),
                'imsi-range-to': fb.control(5021),
            })
        );
        expect(component.deviceGroupForm.valid).toBeFalse();
    });

    it('should validate a double range', () => {
        const imsisControlArray = component.deviceGroupForm.get(
            'imsis'
        ) as FormArray;
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('first'),
                'imsi-range-from': fb.control(10),
                'imsi-range-to': fb.control(19),
            })
        );
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('second'),
                'imsi-range-from': fb.control(20),
                'imsi-range-to': fb.control(29),
            })
        );
        expect(component.deviceGroupForm.valid).toBeTruthy();
    });

    it('should validate a juxtaposed triple range', () => {
        const imsisControlArray = component.deviceGroupForm.get(
            'imsis'
        ) as FormArray;
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('first'),
                'imsi-range-from': fb.control(300),
                'imsi-range-to': fb.control(400),
            })
        );
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('second'),
                'imsi-range-from': fb.control(10),
                'imsi-range-to': fb.control(20),
            })
        );
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('second'),
                'imsi-range-from': fb.control(0),
                'imsi-range-to': fb.control(1),
            })
        );
        expect(component.deviceGroupForm.valid).toBeTruthy();
    });

    it('should not validate a single reversed range', () => {
        const imsisControlArray = component.deviceGroupForm.get(
            'imsis'
        ) as FormArray;
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('first'),
                'imsi-range-from': fb.control(11),
                'imsi-range-to': fb.control(10),
            })
        );
        expect(component.deviceGroupForm.valid).toBeFalse();
    });

    it('should not validate a reversed range in a double', () => {
        const imsisControlArray = component.deviceGroupForm.get(
            'imsis'
        ) as FormArray;
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('first'),
                'imsi-range-from': fb.control(11),
                'imsi-range-to': fb.control(10),
            })
        );
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('second'),
                'imsi-range-from': fb.control(20),
                'imsi-range-to': fb.control(29),
            })
        );
        expect(component.deviceGroupForm.valid).toBeFalse();
    });

    it('should not validate an overlapping range', () => {
        const imsisControlArray = component.deviceGroupForm.get(
            'imsis'
        ) as FormArray;
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('first'),
                'imsi-range-from': fb.control(10),
                'imsi-range-to': fb.control(19),
            })
        );
        imsisControlArray.push(
            fb.group({
                'imsi-id': fb.control('second'),
                'imsi-range-from': fb.control(15),
                'imsi-range-to': fb.control(25),
            })
        );
        expect(component.deviceGroupForm.valid).toBeFalse();
    });
});
