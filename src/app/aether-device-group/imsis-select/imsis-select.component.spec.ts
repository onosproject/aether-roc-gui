/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsisSelectComponent } from './imsis-select.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

describe('ImsisSelectComponent', () => {
    let component: ImsisSelectComponent;
    let fixture: ComponentFixture<ImsisSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImsisSelectComponent],
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
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImsisSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate a single range in Imsiforms', () => {
        component.imsiForm.get('imsi-id').setValue('first'),
            component.imsiForm.get('imsi-range-from').setValue(10),
            component.imsiForm.get('imsi-range-to').setValue(19),
            expect(component.imsiForm.valid).toBeTruthy();
    });

    it('should validate an equal range in Imsiforms ', () => {
        component.imsiForm.get('imsi-id').setValue('first'),
            component.imsiForm.get('imsi-range-from').setValue(10),
            component.imsiForm.get('imsi-range-to').setValue(10),
            expect(component.imsiForm.valid).toBeTruthy();
    });

    it('should validate a max range in Imsiforms', () => {
        component.imsiForm.get('imsi-id').setValue('first'),
            component.imsiForm.get('imsi-range-from').setValue(10),
            component.imsiForm.get('imsi-range-to').setValue(5010),
            expect(component.imsiForm.valid).toBeTruthy();
    });

    it('should not validate an excessive imsi range in imsiforms', () => {
        component.imsiForm.get('imsi-id').setValue('first'),
            component.imsiForm.get('imsi-range-from').setValue(10),
            component.imsiForm.get('imsi-range-to').setValue(5011),
            expect(component.imsiForm.valid).toBeFalse();
    });

    it('should not validate reversed range in imsiforms', () => {
        component.imsiForm.get('imsi-id').setValue('first'),
            component.imsiForm.get('imsi-range-from').setValue(11),
            component.imsiForm.get('imsi-range-to').setValue(10),
            expect(component.imsiForm.valid).toBeFalse();
    });
});
