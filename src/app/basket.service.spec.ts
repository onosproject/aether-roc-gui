/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {TestBed} from '@angular/core/testing';
import {BasketService} from './basket.service';
import {FormBuilder} from '@angular/forms';
import arrayContaining = jasmine.arrayContaining;
import localizeExtractLoader from '@angular-devkit/build-angular/src/extract-i18n/ivy-extract-loader';

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
        // expect(localStorage.getItem('/basket-delete/security-profile/security-profile/key')).toBe('');
        // expect(localStorage.getItem('/basket-update/security-profile/security-profile/opc/array1/0')).toBe('Test1');
        // expect(localStorage.getItem('/basket-update/security-profile/security-profile/opc/array2/0')).toBe('Test3');
        // // expect(localStorage.getItem('/security-profile/security-profile/opc/array2/1')).toBe('Test4');
        // expect(localStorage.getItem('/basket-delete/security-profile/security-profile/opc/array3')).toBe(null);
        // expect(localStorage.getItem('/basket-update/security-profile/security-profile/opc/array2/1')).toBe('Replaced Value');
    });

    it('should produce a patchbody', () => {
        localStorage.clear();
        localStorage.setItem('/basket-update/Security-profile-2.0.0/Security-profile[]/0/key', 'keyValue1');
        localStorage.setItem('/basket-update/Security-profile-2.0.0/Security-profile[]/0/opc', 'opcValue1');
        localStorage.setItem('/basket-update/Security-profile-2.0.0/Security-profile[]/0/id', 'ap1');
        localStorage.setItem('/basket-update/Security-profile-2.0.0/Security-profile[]/1/key', 'keyValue2');
        localStorage.setItem('/basket-update/Security-profile-2.0.0/Security-profile[]/1/opc', 'opcValue2');
        localStorage.setItem('/basket-update/Security-profile-2.0.0/Security-profile[]/1/id', 'ap2');
        localStorage.setItem('/basket-update/Access-profile-2.0.0/Access-profile[]/0/sqn', 'sqnValue1');
        localStorage.setItem('/basket-update/Access-profile-2.0.0/Access-profile[]/0/opc', 'opcValue1');
        localStorage.setItem('/basket-update/Access-profile-2.0.0/Access-profile[]/0/id', 'id1');
        localStorage.setItem('/basket-update/Access-profile-2.0.0/Access-profile[]/1/sqn', 'sqnValue2');
        localStorage.setItem('/basket-update/Access-profile-2.0.0/Access-profile[]/1/opc', 'opcValue2');
        localStorage.setItem('/basket-update/Access-profile-2.0.0/Access-profile[]/1/id', 'id2');
        localStorage.setItem('/basket-update/Access-profile-2.0.0/Access-profile[]/1/New-Array[]/0/id', 'id200');
        localStorage.setItem('/basket-update/Access-profile-2.0.0/Access-profile[]/1/New-Array[]/0/desc', 'text');
        localStorage.setItem('/basket-delete/Security-profile-2.0.0/Security-profile[]/0/desc', '');
        localStorage.setItem('/basket-delete/Security-profile-2.0.0/Security-profile[]/0/something', '');
        localStorage.setItem('/basket-delete/Security-profile-2.0.0/Security-profile[]/1/desc', '');
        localStorage.setItem('/basket-delete/Security-profile-2.0.0/Security-profile[]/1/something', '');
        localStorage.setItem('/basket-delete/Access-profile-2.0.0/Access-profile[]/0/id', 'id4');
        localStorage.setItem('/basket-delete/Access-profile-2.0.0/Access-profile[]/0/desc', '');
        localStorage.setItem('/basket-delete/Access-profile-2.0.0/Access-profile[]/1/id', 'id5');
        localStorage.setItem('/basket-delete/Access-profile-2.0.0/Access-profile[]/1/desc', '');


        const testPatchBody = service.buildPatchBody();
        console.log('Test patch body: \n' + JSON.stringify(testPatchBody));
        expect(testPatchBody).toBeTruthy();
    });

    it('Should get the parent path', () => {

    });
});
