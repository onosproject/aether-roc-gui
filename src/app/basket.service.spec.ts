/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {TestBed} from '@angular/core/testing';
import {BasketService} from './basket.service';
import {FormBuilder} from '@angular/forms';
import arrayContaining = jasmine.arrayContaining;

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
        const testFormGroup = fb.group({
            'security-profile': fb.group({
                'security-profile': fb.group({
                    id: ['ap1'],
                    'display-name': [''],
                    key: [''],
                    opc: fb.group({
                        array1: fb.array(['Test1', 'Test2']),
                        array2: fb.array(['Test3', 'Test4']),
                        array3: fb.array([''])
                    }),
                    sqn: [''],
                    description: ['']
                })
            })
        });
        const keyObject = testFormGroup.get('security-profile').get('security-profile').get('key');
        keyObject.markAsDirty();
        keyObject.markAsTouched();
        const opcObject1 = testFormGroup.get('security-profile').get('security-profile').get('opc').get('array1').get([0]);
        const opcObject2 = testFormGroup.get('security-profile').get('security-profile').get('opc').get('array2').get([0]);
        const opcObject3 = testFormGroup.get('security-profile').get('security-profile').get('opc').get('array3').get([0]);
        const opcObject4 = testFormGroup.get('security-profile').get('security-profile').get('opc').get('array2').get([1]);
        opcObject1.markAsTouched();
        opcObject1.markAsDirty();
        opcObject2.markAsTouched();
        opcObject2.markAsDirty();
        opcObject3.markAsTouched();
        opcObject3.markAsDirty();
        opcObject4.setValue('Replaced Value');
        opcObject4.markAsTouched();
        opcObject4.markAsDirty();
        service.logKeyValuePairs(testFormGroup);
        expect(service).toBeTruthy();
        expect(localStorage.getItem('/basket-delete/security-profile/security-profile/key')).toBe('');
        expect(localStorage.getItem('/basket-update/security-profile/security-profile/opc/array1/0')).toBe('Test1');
        expect(localStorage.getItem('/basket-update/security-profile/security-profile/opc/array2/0')).toBe('Test3');
        // expect(localStorage.getItem('/security-profile/security-profile/opc/array2/1')).toBe('Test4');
        expect(localStorage.getItem('/basket-delete/security-profile/security-profile/opc/array3')).toBe(null);
        expect(localStorage.getItem('/basket-update/security-profile/security-profile/opc/array2/1')).toBe('Replaced Value');
    });
});
