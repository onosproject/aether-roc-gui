/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Service as AetherService } from '../openapi3/aether/2.0.0/services';
import { RocListBase } from './roc-list-base';
import { BasketService } from './basket.service';
import { OpenPolicyAgentService } from './open-policy-agent.service';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    GenericRocDataSource,
    RocGenericContainerType,
    RocGenericModelType,
} from './roc-data-source';

// we cannot test an Abstract class directly,
// so create a class that extends it

interface TestData {
    'test-data-id': string;
    description?: string;
    'enterprise-id': string;
    field: string;
}

const TestDataSource = jasmine.createSpyObj('TestDataSource', {
    fullPath: jasmine.createSpy('fullPath').and.returnValue('full-path')(),
});
TestDataSource.pathRoot = 'enterprises-2.0.0';
TestDataSource.pathListAttr = ['enterprise', 'test-data'];
TestDataSource.indexAttr = ['enterprise-id', 'test-data-id'];

@Component({
    selector: 'aether-list-base-spec',
    template: '<div></div>',
})
class RocListBaseSpecComponent extends RocListBase<
    GenericRocDataSource<RocGenericModelType, RocGenericContainerType>,
    TestData
> {
    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService
    ) {
        super(basketService, TestDataSource);
    }
}

describe('The Roc List Base class', () => {
    let component: RocListBaseSpecComponent;
    let fixture: ComponentFixture<RocListBaseSpecComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RocListBaseSpecComponent],
            imports: [HttpClientTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RocListBaseSpecComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('the delete method', () => {
        it('should call the basket service', () => {
            spyOn(component.bs, 'deleteIndexedEntry');
            const m: TestData = {
                'test-data-id': 'test-1',
                description: 'foo',
                field: 'bar',
                'enterprise-id': 'test-enterprise',
            };
            component.delete(m);
            expect(component.bs.deleteIndexedEntry).toHaveBeenCalledOnceWith(
                '/full-path',
                'test-data-id',
                'test-1',
                new Map()
            );
        });
    });
});
