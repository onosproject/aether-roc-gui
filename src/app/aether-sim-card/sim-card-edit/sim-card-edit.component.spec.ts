/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimCardEditComponent } from './sim-card-edit.component';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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

describe('SimCardEditComponent', () => {
    let component: SimCardEditComponent;
    let fixture: ComponentFixture<SimCardEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SimCardEditComponent],
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
        fixture = TestBed.createComponent(SimCardEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disable the submit button unless site and enterprise id are set', () => {
        Object.defineProperty(component.simCardForm, 'valid', { value: true });
        Object.defineProperty(component.simCardForm, 'touched', {
            value: true,
        });
        spyOn(component.opaService, 'canWrite').and.returnValue(true);
        component.siteId = component.unknownSite;
        component.enterpriseId = component.unknownEnterprise;

        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('#submitButton');

        expect(button.disabled).toBeTruthy();
    });

    it('should enable the submit button if site and enterprise id are set', () => {
        Object.defineProperty(component.simCardForm, 'valid', { value: true });
        Object.defineProperty(component.simCardForm, 'touched', {
            value: true,
        });
        spyOn(component.opaService, 'canWrite').and.returnValue(true);
        component.siteId = 'site-id';
        component.enterpriseId = 'ent-id';

        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('#submitButton');

        expect(button.disabled).toBeFalsy();
    });

    describe('when creating or updating a SimCard object', () => {
        beforeEach(() => {
            component.simCardForm.get('sim-id').setValue('testSimId');
            component.simCardForm
                .get('display-name')
                .setValue('test-display-name');
            component.simCardForm
                .get('description')
                .setValue('test-description');
            component.simCardForm.get('iccid').setValue('890000000000000000F');
            component.simCardForm.get('imsi').setValue(1234011);
            fixture.detectChanges();
        });

        it('should add the object to the basket', () => {
            component.siteId = 'test-site';
            component.enterpriseId = 'test-enterprise';

            spyOn(component.bs, 'logKeyValuePairs');
            component.onSubmit();
            expect(component.bs.logKeyValuePairs).toHaveBeenCalled();
        });

        it('enterprise id should always be set', () => {
            spyOn(component.snackBar, 'open');
            component.onSubmit();
            expect(component.snackBar.open).toHaveBeenCalledOnceWith(
                'Enterprise must be set',
                undefined,
                { duration: 5000, politeness: 'assertive' }
            );
        });

        it('site id should always be set', () => {
            component.enterpriseId = 'test-enterprise';
            spyOn(component.snackBar, 'open');
            component.onSubmit();
            expect(component.snackBar.open).toHaveBeenCalledOnceWith(
                'Site must be set',
                undefined,
                { duration: 5000, politeness: 'assertive' }
            );
        });
    });
});
