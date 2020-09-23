/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {TestBed} from '@angular/core/testing';

import {K8sClientService} from './k8sclient.service';
import {KUBERNETES_API_PROXY} from '../environments/environment';
import {Meta} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';

class MockMeta {
    getTag(attrSelector: string): HTMLMetaElement {
        return {
            content: 'test',
        } as HTMLMetaElement;
    }
}

describe('K8sClientService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            {provide: 'kubernetes_api_proxy', useValue: KUBERNETES_API_PROXY},
            {provide: Meta, useClass: MockMeta}
        ]
    }));

    it('should be created', () => {
        const service: K8sClientService = TestBed.inject(K8sClientService);
        expect(service).toBeTruthy();
    });
});
