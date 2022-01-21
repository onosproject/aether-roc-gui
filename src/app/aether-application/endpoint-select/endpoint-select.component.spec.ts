/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EndpointSelectComponent } from './endpoint-select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('EndpointSelectComponent', () => {
    let component: EndpointSelectComponent;
    let fixture: ComponentFixture<EndpointSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EndpointSelectComponent],
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

    beforeEach(() => {
        fixture = TestBed.createComponent(EndpointSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should validate if Port-start less than Port-end ', () => {
        const endpointID = component.endpointForm.get('endpoint-id');
        const portStart = component.endpointForm.get('port-start');
        const portEnd = component.endpointForm.get('port-end');
        endpointID.setValue('testendpointid');
        portStart.setValue(645);
        portEnd.setValue(2345);
        expect(component.endpointForm.valid).toBeTruthy();
    });

    it('should not validate if Port-start greater than Port-end ', () => {
        const endpointID = component.endpointForm.get('endpoint-id');
        const portStart = component.endpointForm.get('port-start');
        const portEnd = component.endpointForm.get('port-end');
        endpointID.setValue('testendpointid');
        portStart.setValue(2345);
        portEnd.setValue(645);
        expect(component.endpointForm.valid).toBeFalse();
    });

    it('should not validate an excessive port-end endpoint range ', () => {
        component.endpointForm.get('endpoint-id').setValue('first');
        component.endpointForm.get('port-start').setValue(10);
        component.endpointForm.get('port-end').setValue(65536);
        expect(component.endpointForm.valid).toBeFalse();
    });

    it('should not validate an excessive port-start endpoint range ', () => {
        component.endpointForm.get('endpoint-id').setValue('first');
        component.endpointForm.get('port-start').setValue(65536);
        component.endpointForm.get('port-end').setValue(65536);
        expect(component.endpointForm.valid).toBeFalse();
    });

    it('should not validate an excessive mbr uplink and downlink range ', () => {
        component.endpointForm.get('endpoint-id').setValue('first');
        component.endpointForm.get(['mbr', 'uplink']).setValue(4294967296);
        component.endpointForm.get(['mbr', 'downlink']).setValue(4294967296);
        expect(component.endpointForm.valid).toBeFalse();
    });

    it('should validate an excessive mbr uplink and downlink range ', () => {
        component.endpointForm.get('endpoint-id').setValue('first');
        component.endpointForm.get(['mbr', 'uplink']).setValue(4294967293);
        component.endpointForm.get(['mbr', 'downlink']).setValue(429496729);
        expect(component.endpointForm.valid).toBeTruthy();
    });
});
