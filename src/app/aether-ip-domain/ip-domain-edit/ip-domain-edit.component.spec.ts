/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpDomainEditComponent } from './ip-domain-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

describe('IpDomainEditComponent', () => {
    let component: IpDomainEditComponent;
    let fixture: ComponentFixture<IpDomainEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IpDomainEditComponent],
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
                MatSelectModule,
                MatIconModule,
                MatToolbarModule,
                MatCardModule,
                MatButtonModule,
                MatSnackBarModule,
                MatSlideToggleModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IpDomainEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate subnet with port in 10-20 range', () => {
        const subnetControl = component.ipForm.get('subnet');
        subnetControl.setValue('10.11.12.13/16');
        expect(subnetControl.valid).toBeTruthy();
    });

    it('should not validate subnet with port over 32', () => {
        const subnetControl = component.ipForm.get('subnet');
        subnetControl.setValue('10.11.12.13/33');
        expect(subnetControl.valid).toBeFalse();
    });
});
