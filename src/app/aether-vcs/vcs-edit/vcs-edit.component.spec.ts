/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {VcsEditComponent} from './vcs-edit.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {TemplateTemplate} from "../../../openapi3/aether/4.0.0/models/template-template";
import {By} from "@angular/platform-browser";

describe('VcsEditComponent', () => {
    let component: VcsEditComponent;
    let fixture: ComponentFixture<VcsEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VcsEditComponent],
            providers: [
                {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'standard'}}
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
                MatSelectModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VcsEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check Application Endpoint validation', () =>{
        component.application =[{
            "enterprise": "test enterprise 1",
            "endpoint": [
                {
                    "endpoint-id": "test-endpoint-id",
                    "port-start": 1,
                    "traffic-class":"test-traffic-2",
                }
            ],
            "id": "starbucks-nvr"
        }]
            component.setShowAddFilterButton()
        expect(component.showAddFilterButton).toBeTruthy()
    })

    it('check Application Endpoint validation if it is invalid' , () =>{
        component.EndpointLeft = 5;
        component.application =[{
            "enterprise": "test enterprise 2",
            "endpoint": [
                {
                    "endpoint-id": "test-endpoint-id-1",
                    "port-start": 1,
                    "traffic-class":"test-traffic-2",
                },
                {
                    "endpoint-id": "test-endpoint-id-2",
                    "port-start": 1,
                    "traffic-class":"test-traffic-2",
                },
                {
                    "endpoint-id": "test-endpoint-id-3",
                    "port-start": 1,
                    "traffic-class":"test-traffic-2",
                },
                {
                    "endpoint-id": "test-endpoint-id-4",
                    "port-start": 1,
                    "traffic-class":"test-traffic-2",
                },
                {
                    "endpoint-id": "test-endpoint-id-5",
                    "port-start": 1,
                    "traffic-class":"test-traffic-2",
                },
                {
                    "endpoint-id": "test-endpoint-id-6",
                    "port-start": 1,
                    "traffic-class":"test-traffic-2",
                }
            ],
            "id": "starbucks-nvr"
        }]
        component.setShowAddFilterButton()
        expect(component.showAddFilterButton).toBeTruthy()
    })

    describe('when selecting a template', () => {
        const template: TemplateTemplate = {
            id: 'test-template',
            sd: 12, // FIXME the method fails if this value is not present
            slice: {
                mbr: {
                    'uplink-burst-size': 10,
                    'downlink-burst-size': 5
                }
            }
        }
        beforeEach(() => {
            // pretend is a new instance
            component.isNewInstance = true

            // simulate a change in the dropdown
            component.templateSelected({value: template})
        })
        it('should populate the burst value', () => {
            // make sure the for is updated
            const ulBs = component.vcsForm.get(['slice', 'mbr', 'uplink-burst-size']).value
            const dlBs = component.vcsForm.get(['slice', 'mbr', 'downlink-burst-size']).value

            expect(ulBs).toEqual(template.slice.mbr['uplink-burst-size'])
            expect(dlBs).toEqual(template.slice.mbr['downlink-burst-size'])
        });
    });
});
