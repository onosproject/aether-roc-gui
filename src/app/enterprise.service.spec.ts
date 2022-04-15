/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';

import { EnterpriseService } from './enterprise.service';

describe('EnterpriseService', () => {
    let service: EnterpriseService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EnterpriseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
