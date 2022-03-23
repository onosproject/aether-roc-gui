/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Service as AetherService } from '../openapi3/aether/2.0.0/services';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    GenericRocDataSource,
    RocGenericContainerType,
    RocGenericModelType,
} from './roc-data-source';
import { RocEditBase } from './roc-edit-base';
import { deviceModelPath, enterpriseModelPath } from './models-info';
import * as _ from 'lodash';

// we cannot test an Abstract class directly,
// so create a class that extends it

const TestDataSource = jasmine.createSpyObj('TestDataSource', {
    fullPath: jasmine.createSpy('fullPath').and.returnValue('full-path')(),
});
TestDataSource.pathRoot = 'Enterprises-2.0.0';
TestDataSource.pathListAttr = 'enterprise';
TestDataSource.indexAttr = 'enterprise-id';

const snackBar = jasmine.createSpyObj('snackBar', {
    _overlay: jasmine.createSpy(),
});
const bs = jasmine.createSpyObj('bs', {
    deleteIndexedEntry: jasmine.createSpy(),
});
const route = jasmine.createSpyObj('route', {
    snapshot: {
        params: {},
    },
});

@Component({
    selector: 'aether-edit-base-spec',
    template: '<div></div>',
})
class RocEditBaseSpecComponent extends RocEditBase<
    GenericRocDataSource<RocGenericModelType, RocGenericContainerType>
> {
    constructor(public aetherService: AetherService) {
        super(
            snackBar,
            bs,
            route,
            TestDataSource,
            enterpriseModelPath,
            aetherService
        );
    }
}

describe('The Roc List Base class', () => {
    let component: RocEditBaseSpecComponent;
    let fixture: ComponentFixture<RocEditBaseSpecComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RocEditBaseSpecComponent],
            imports: [HttpClientTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RocEditBaseSpecComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('the calcFullPath method', () => {
        const deviceMockParams = {
            'enterprise-id': 'test-enterprise-1',
            'site-id': `test-site-1`,
            id: `device-id-1`,
        };

        const enterpriseMockParams = {
            id: 'enterprise-1',
        };

        const mockParamsMap = (params) => {
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
            };
        };

        it('should return the full path', () => {
            component.modelPath = enterpriseModelPath;
            const enterprisePath = component.calcFullPath(
                mockParamsMap(enterpriseMockParams)
            );
            expect(enterprisePath).toEqual(
                'Enterprises-2.0.0/enterprise[enterprise-id=enterprise-1]'
            );

            component.modelPath = deviceModelPath;
            const devicePath = component.calcFullPath(
                mockParamsMap(deviceMockParams)
            );
            expect(devicePath).toEqual(
                'Enterprises-2.0.0/enterprise[enterprise-id=test-enterprise-1]/site[site-id=test-site-1]/device[device-id=device-id-1]'
            );
        });
    });
});
