/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';

import { EnterpriseService } from './enterprise.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TargetsNames } from '../openapi3/top/level/models/targets-names';

const singleEnterprise: TargetsNames = [
    {
        name: 'ent-1',
    },
];

const multipleEnterprises: TargetsNames = [
    {
        name: 'ent-2',
    },
    {
        name: 'ent-3',
    },
];

describe('EnterpriseService', () => {
    let httpTestingController: HttpTestingController;
    let service: EnterpriseService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        // Inject the http service and test controller for each test
        TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        // TestBed.configureTestingModule({});
        service = TestBed.inject(EnterpriseService);
        service.loadTargets();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('single target', () => {
        beforeEach(() => {
            // assert that we're loading the data and return fake values
            const req = httpTestingController.expectOne('/targets');

            // Assert that the request is a GET.
            expect(req.request.method).toEqual('GET');

            // Respond with mock data, causing Observable to resolve.
            // Subscribe callback asserts that correct data was returned.
            req.flush(singleEnterprise);
        });

        afterEach(() => {
            // Finally, assert that there are no outstanding requests.
            httpTestingController.verify();
        });

        it('should list enterprises', () => {
            expect(service.isSingleton).toEqual(true);
            expect(service.enterprises.length).toEqual(1);
            expect(service.enterprises[0].name).toEqual('ent-1');
        });
    });

    describe('multiple targets', () => {
        beforeEach(() => {
            // assert that we're loading the data and return fake values
            const req = httpTestingController.expectOne('/targets');

            // Assert that the request is a GET.
            expect(req.request.method).toEqual('GET');

            // Respond with mock data, causing Observable to resolve.
            // Subscribe callback asserts that correct data was returned.
            req.flush(multipleEnterprises);
        });

        afterEach(() => {
            // Finally, assert that there are no outstanding requests.
            httpTestingController.verify();
        });

        it('should list enterprises', () => {
            expect(service.isSingleton).toEqual(false);
            expect(service.enterprises.length).toEqual(2);
            expect(service.enterprises[0].name).toEqual('ent-2');
        });
    });
});
