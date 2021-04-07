/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {TestBed} from '@angular/core/testing';
import {BasketService, IDATTRIBS, TYPE} from './basket.service';
import {FormBuilder} from '@angular/forms';
import arrayContaining = jasmine.arrayContaining;
import localizeExtractLoader from '@angular-devkit/build-angular/src/extract-i18n/ivy-extract-loader';
import {group} from '@angular/animations';

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
            key: [''],
            'security-profile': fb.array([
                fb.group({
                    id: ['ap1'],
                    'display-name': [''],
                    opc: fb.group({
                        array1: fb.array([
                            fb.group({id: [1], attr1: ['One']}), // List within a list
                            fb.group({id: [2], attr1: ['Two']})
                        ]),
                        array2: fb.array([
                            fb.group({name: ['n1'], attr1: ['N One']}),
                            fb.group({name: ['n2'], attr1: ['N Two']}),
                        ]),
                    }),
                    sqn: [''],
                    description: ['']
                })]
            )
        });

        const keyObject = testFormGroup.get(['key']);
        keyObject.markAsDirty();
        keyObject.markAsTouched();
        const spArray = testFormGroup.get(['security-profile']);
        spArray[IDATTRIBS] = ['id'];
        const opcObject1 = spArray.get([0, 'opc', 'array1']);
        opcObject1.get([0]).get(['attr1']).markAsTouched();
        opcObject1.get([0]).get(['attr1']).markAsDirty();
        opcObject1.get([0]).get(['id'])[TYPE] = 'number';
        opcObject1[IDATTRIBS] = ['id'];

        const opcObject2 = spArray.get([0, 'opc', 'array2']);
        opcObject2.get([1]).get(['attr1']).markAsTouched();
        opcObject2.get([1]).get(['attr1']).markAsDirty();
        opcObject2[IDATTRIBS] = ['name'];

        service.logKeyValuePairs(testFormGroup, 'security-profile-2.1.0');
        expect(service).toBeTruthy();

        expect(localStorage.getItem('/basket-delete/security-profile-2.1.0//key')).toBeNull();
        expect(localStorage.getItem('/basket-update/security-profile-2.1.0/security-profile[id=ap1]/opc/array1[id=1]/attr1')).toBe('One');
        expect(localStorage.getItem('/basket-update/security-profile-2.1.0/security-profile[id=ap1]/opc/array2[name=n2]/attr1')).toBe('N Two');
        localStorage.clear();
    });

    it('should produce a patchbody', () => {
        localStorage.clear();
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id1]/opc', 'opcValue1');
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id2]/opc', 'opcValue2');
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id2]/id', 'id2');
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id3]/key', 'keyValue2');
        localStorage.setItem('/basket-delete/security-profile-2.1.0/security-profile[id=id2]/desc', '');
        localStorage.setItem('/basket-delete/security-profile-2.1.0/security-profile[id=id2]/something', '');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=id1]/opc', 'opcValue3');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=id2]/soemthing', 'opcValue21');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=id3]/key', 'opcValusdaa2');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=ap0]/sqn', 'sqnValue1');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=ap0]/opc', 'opcValue1');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=ap1]/id', 'ap1');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=ap1]/sqn', 'sqnValue2');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=ap1]/opc', 'opcValue2');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=ap1]/id', 'id2');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=ap1]/New-Array[]/0/id', 'id200');
        // localStorage.setItem('/basket-update/access-profile-2.1.0/access-profile[id=ap1]/New-Array[]/0/desc', 'text');
        // localStorage.setItem('/basket-delete/access-profile-2.1.0/access-profile[id=ap1]/id', 'id4');
        // localStorage.setItem('/basket-delete/access-profile-2.1.0/access-profile[id=ap1]/desc', '');
        // localStorage.setItem('/basket-delete/access-profile-2.1.0/access-profile[id=ap5]/id', 'id5');
        // localStorage.setItem('/basket-delete/access-profile-2.1.0/access-profile[id=ap5]/desc', '');
        // localStorage.setItem
        // ('/basket-delete/enterprise-2.1.0/enterprise-profile[id=id3]/
        // connectivity-service[connectivity-service=sint]/connectivity-service', 'sint');

        const testPatchBody = service.buildPatchBody();
        console.log('Test patch body: \n' + JSON.stringify(testPatchBody));
        expect(testPatchBody).toBeTruthy();
    });
});
