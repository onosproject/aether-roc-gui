/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchEditComponent } from './switch-edit.component';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Switch } from '../../../openapi3/sdn-fabric/0.1.0/models';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

const testData: Switch = {
    'switch-id': 'test-sw-1',
    role: 'leaf',
    management: {
        address: '10.20.30.1',
        'port-number': 8080,
    },
    'model-id': 'test-switch-model',
    vlan: [
        {
            'vlan-id': 10,
            'display-name': 'VLAN 10',
            subnet: ['192.168.70.0/24', '192.168.71.0/24'],
        },
    ],
};

describe('SwitchEditComponent', () => {
    let httpTestingController: HttpTestingController;
    let component: SwitchEditComponent;
    let fixture: ComponentFixture<SwitchEditComponent>;

    const scMockParams = {
        'fabric-id': 'test-fabric',
        id: `test-sw-1`,
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
            declarations: [SwitchEditComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(mockParamsMap(scMockParams)),
                        snapshot: { params: scMockParams },
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
                MatSlideToggleModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(SwitchEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const req = httpTestingController.expectOne(
            '/sdn-fabric/v0.1.x/test-fabric/switch/test-sw-1'
        );

        expect(req.request.method).toEqual('GET');

        req.flush(testData);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
