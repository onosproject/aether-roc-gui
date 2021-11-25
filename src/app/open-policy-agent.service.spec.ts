/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { TestBed } from '@angular/core/testing';

import { OpenPolicyAgentService } from './open-policy-agent.service';

describe('OpenPolicyAgentService', () => {
    let service: OpenPolicyAgentService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OpenPolicyAgentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
