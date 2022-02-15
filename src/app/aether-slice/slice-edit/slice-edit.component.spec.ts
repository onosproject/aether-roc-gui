/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
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
import { SliceEditComponent } from './slice-edit.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { EnterprisesEnterpriseSiteSlice } from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseTemplate } from '../../../openapi3/aether/2.0.0/models';

describe('SliceEditComponent', () => {
    let component: SliceEditComponent;
    let fixture: ComponentFixture<SliceEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SliceEditComponent],
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
                MatSlideToggleModule,
                MatAutocompleteModule,
                MatSelectModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SliceEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when loading data from the backend', () => {
        it('should populate all the fields', () => {
            const slice: EnterprisesEnterpriseSiteSlice = {
                'default-behavior': 'DENY-ALL',
                description: 'Chicago Robots',
                'device-group': [
                    {
                        'device-group': 'acme-chicago-robots',
                        enable: true,
                    },
                ],
                'display-name': 'Chicago Robots VCS',
                filter: [
                    {
                        allow: false,
                        application: 'acme-dataacquisition',
                    },
                ],
                'slice-id': 'acme-chicago-robots',
                sd: 2973238,
                mbr: {
                    downlink: 5000000,
                    'downlink-burst-size': 600000,
                    uplink: 12,
                    'uplink-burst-size': 13,
                },

                sst: 79,
                upf: 'acme-chicago-pool-entry1',
            };

            component.populateFormData(slice);

            expect(component.sliceForm.get('default-behavior').value).toEqual(
                slice['default-behavior']
            );
            expect(component.sliceForm.get('description').value).toEqual(
                slice['description']
            );
            expect(component.sliceForm.get('device-group').value).toEqual(
                slice['device-group']
            );
            expect(component.sliceForm.get('display-name').value).toEqual(
                slice['display-name']
            );
            expect(
                component.sliceForm.get(['filter', 0, 'allow']).value
            ).toEqual(slice['filter'][0].allow);
            expect(component.sliceForm.get('sd').value).toEqual(
                slice.sd.toString(16).toUpperCase()
            );
            expect(component.sliceForm.get(['mbr', 'uplink']).value).toEqual(
                slice.mbr.uplink
            );
            expect(component.sliceForm.get(['mbr', 'downlink']).value).toEqual(
                slice.mbr.downlink
            );
            expect(
                component.sliceForm.get(['mbr', 'uplink-burst-size']).value
            ).toEqual(slice.mbr['uplink-burst-size']);
            expect(
                component.sliceForm.get(['mbr', 'downlink-burst-size']).value
            ).toEqual(slice.mbr['downlink-burst-size']);
            expect(component.sliceForm.get('sst').value).toEqual(slice['sst']);
            expect(component.sliceForm.get('upf').value).toEqual(slice['upf']);
        });
    });

    describe('when selecting a template', () => {
        const template: EnterprisesEnterpriseTemplate = {
            ['template-id']: 'test-template',
            sd: 12, // FIXME the method fails if this value is not present
            mbr: {
                'uplink-burst-size': 10,
                'downlink-burst-size': 5,
            },
            'default-behavior': 'ACCEPT-ALL',
        };
        beforeEach(() => {
            // pretend is a new instance
            component.isNewInstance = true;

            // simulate a change in the dropdown
            component.templateSelected({ value: template });
        });
        it('should populate the burst value', () => {
            // make sure the for is updated
            const ulBs = component.sliceForm.get([
                'mbr',
                'uplink-burst-size',
            ]).value;
            const dlBs = component.sliceForm.get([
                'mbr',
                'downlink-burst-size',
            ]).value;
            const db = component.sliceForm.get(['default-behavior']).value;

            expect(ulBs).toEqual(template.mbr['uplink-burst-size']);
            expect(dlBs).toEqual(template.mbr['downlink-burst-size']);
            expect(db).toEqual(template['default-behavior']);
        });
    });
});
