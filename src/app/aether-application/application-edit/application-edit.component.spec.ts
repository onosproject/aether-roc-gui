/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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

describe('ApplicationEditComponent', () => {
    let component: ApplicationEditComponent;
    let fixture: ComponentFixture<ApplicationEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApplicationEditComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
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
        fixture = TestBed.createComponent(ApplicationEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not validate if port-start is greater than port-end', () => {
        const endpointControlArray = component.appForm.get(
            'endpoint'
        ) as FormArray;
        component.appForm.get('application-id').setValue('testappform');
        component.appForm.get('address').setValue('testaddress');
        endpointControlArray.push(
            fb.group({
                'endpoint-id': fb.control('first'),
                'port-start': fb.control(20),
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
        expect(component.appForm.valid).toBeFalse();
    });

    it('should validate if port-start is not greater than port-end', () => {
        const endpointControlArray = component.appForm.get(
            'endpoint'
        ) as FormArray;
        component.appForm.get('application-id').setValue('testappform');
        component.appForm.get('address').setValue('testaddress');
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
