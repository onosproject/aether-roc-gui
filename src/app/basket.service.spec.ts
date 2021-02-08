/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {TestBed} from '@angular/core/testing';
import {BasketService} from './basket.service';
import {FormBuilder} from '@angular/forms';

describe('BasketService', () => {
    let service: BasketService;
    const fb: FormBuilder = new FormBuilder();

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BasketService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should iterate through form', () => {
        const testFormGroup2 = fb.group({
            'security-profile': fb.group({
                'security-profile': fb.group({
                    id: ['ap1'],
                    'display-name': [''],
                    key: [''],
                    opc: [''],
                    sqn: [''],
                    description: ['']
                })
            })
        });
        const keyObject = testFormGroup2.get('security-profile').get('security-profile').get('key');
        keyObject.markAsDirty();
        keyObject.markAsTouched();
        const sqnObject = testFormGroup2.get('security-profile').get('security-profile').get('sqn');
        sqnObject.markAsDirty();
        sqnObject.markAsTouched();
        sqnObject.setValue('123');
        service.logKeyValuePairs(testFormGroup2);
        expect(service).toBeTruthy();
        expect(localStorage.getItem('/basket-delete/security-profile/security-profile/key')).toBe('');
        expect(localStorage.getItem('/basket-update/security-profile/security-profile/sqn')).toBe('123');
    });
});
