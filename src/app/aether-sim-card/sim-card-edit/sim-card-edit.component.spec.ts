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
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
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
import { TargetName } from '../../../openapi3/top/level/models';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { SiteSimCard } from '../../../openapi3/aether/2.1.0/models';

const testData: SiteSimCard = {
    'sim-id': 'test-sim-1',
    'display-name': 'Test Sim 1',
    imsi: 123456,
};
describe('SimCardEditComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: SimCardEditComponent;
    let fixture: ComponentFixture<SimCardEditComponent>;

    const simMockParams = {
        'enterprise-id': 'test-ent',
        'site-id': 'test-site',
        id: `test-sim-1`,
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
            declarations: [SimCardEditComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(mockParamsMap(simMockParams)),
                        snapshot: { params: simMockParams },
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
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(SimCardEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const req = httpTestingController.expectOne(
            '/aether/v2.1.x/test-ent/site/test-site/sim-card/test-sim-1'
        );

        expect(req.request.method).toEqual('GET');

        req.flush(testData);
    });

    afterEach(() => {
        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
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
        component.targetId = {
            name: component.unknownTarget,
        } as TargetName;

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
        component.targetId = {
            name: 'ent-id',
        } as TargetName;

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
            component.targetId = {
                name: 'test-enterprise',
            } as TargetName;
            spyOn(component.bs, 'logKeyValuePairs');
            component.onSubmit();
            expect(component.bs.logKeyValuePairs).toHaveBeenCalled();
        });
    });
});
