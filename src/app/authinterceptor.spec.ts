/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {TestBed} from '@angular/core/testing'

import {AuthInterceptor} from './auth-interceptor'
import {HttpClientTestingModule} from '@angular/common/http/testing'

describe('AuthInterceptor', () => {
    let service: AuthInterceptor

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                {provide: AuthInterceptor, useClass: AuthInterceptor}
            ]
        })
        service = TestBed.inject(AuthInterceptor)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
