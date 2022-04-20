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
import { from } from 'rxjs';
import {
    Site,
    SiteSlice,
    Template,
} from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models/target-name';

const site: Site = {
    'site-id': 'acme-chicago',
    slice: [
        {
            'default-behavior': 'DENY-ALL',
            sd: 2973238,
            'slice-id': 'acme-chicago-robots',
            sst: 79,
            upf: 'acme-chicago-pool-entry1',
        },
    ],
    upf: [
        {
            address: 'entry1.upfpool.chicago.acme.com',
            description: 'Chicago UPF Pool - Entry 1',
            'display-name': 'Chicago Pool 1',
            port: 6161,
            'upf-id': 'acme-chicago-pool-entry1',
        },
        {
            address: 'entry2.upfpool.chicago.acme.com',
            description: 'Chicago UPF Pool - Entry 2',
            'display-name': 'Chicago Pool 2',
            port: 6161,
            'upf-id': 'acme-chicago-pool-entry2',
        },
    ],
};

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

    it('should filter UPFs to return only the unused ones', () => {
        const res = component.filterUpf(site);
        expect(res.length).toBe(1);
    });

    it('should set a default value for default-behavior', () => {
        const control = component.sliceForm.get('default-behavior');
        expect(control.value).toEqual(component.defaultBehaviorOptions[0]);
        // we need to artificially set these attributes or the basket won't read the default values
        expect(control.touched).toBeTruthy();
        expect(control.pristine).toBeFalsy();
    });

    describe('when creating a Slice', () => {
        beforeEach(() => {
            component.isNewInstance = true;
            component.enterpriseId = {
                name: component.unknownEnterprise,
            } as TargetName;
            component.siteId = component.unknownSite;
            fixture.detectChanges();
        });

        it('should load the templates once the enterprise is selected', () => {
            // on page load the select is disabled
            let templateField =
                fixture.nativeElement.querySelector('#selectTemplate');
            expect(templateField.getAttribute('aria-disabled')).toEqual('true');

            // simulate the enterprise selection
            component.enterpriseId = {
                name: 'test-enterprise',
            } as TargetName;
            component.templates = [
                {
                    'template-id': 'template 1',
                    'default-behavior': 'foo',
                },
            ];
            fixture.detectChanges();

            // check that is now visible
            templateField =
                fixture.nativeElement.querySelector('#selectTemplate');
            expect(templateField.getAttribute('aria-disabled')).toEqual(
                'false'
            );
        });

        it('should load the UPF once the site is selected', (done) => {
            component.enterpriseId = {
                name: 'test-enterprise',
            } as TargetName;

            // on page load the select is disabled
            let upfField = fixture.nativeElement.querySelector('#selectUpf');
            expect(upfField.getAttribute('aria-disabled')).toEqual('true');

            // simulate the enterprise site selection
            component.siteId = 'test-site';
            const siteResponse = from([site]);
            spyOn(component.siteService, 'getSite').and.returnValue(
                siteResponse
            );
            component.loadUpf();
            fixture.detectChanges();

            setTimeout(() => {
                // check that is now visible
                upfField = fixture.nativeElement.querySelector('#selectUpf');
                expect(upfField.getAttribute('aria-disabled')).toEqual('false');
                done();
            }, 100);
        });
    });

    describe('when loading data from the backend', () => {
        it('should populate all the fields', () => {
            const slice: SiteSlice = {
                'default-behavior': 'DENY-ALL',
                description: 'Chicago Robots',
                'device-group': [
                    {
                        'device-group': 'acme-chicago-robots',
                        enable: true,
                    },
                ],
                'display-name': 'Chicago Robots Slice',
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
        const template: Template = {
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
