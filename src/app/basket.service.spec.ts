/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {TestBed} from '@angular/core/testing';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from './basket.service';
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
        localStorage.clear();
        expect(service).toBeTruthy();
    });

    it('should iterate through form', () => {
        localStorage.clear();
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
        keyObject[ORIGINAL] = ['key'];
        keyObject.markAsDirty();
        keyObject.markAsTouched();
        const spArray = testFormGroup.get(['security-profile']);
        spArray[IDATTRIBS] = ['id'];
        const opcObject1 = spArray.get([0, 'opc', 'array1']);
        opcObject1.get([0]).get(['attr1']).markAsTouched();
        opcObject1.get([0]).get(['attr1']).markAsDirty();
        opcObject1[ORIGINAL] = spArray.get('attr1');
        opcObject1.get([0]).get(['id'])[TYPE] = 'number';
        opcObject1[IDATTRIBS] = ['id'];


        const opcObject2 = spArray.get([0, 'opc', 'array2']);
        opcObject2.get([1]).get(['attr1']).markAsTouched();
        opcObject2.get([1]).get(['attr1']).markAsDirty();
        opcObject2[ORIGINAL] = ['attr1'];
        opcObject2[IDATTRIBS] = ['name'];

        service.logKeyValuePairs(testFormGroup, 'security-profile-2.1.0');
        expect(service).toBeTruthy();

        expect(localStorage.getItem('/basket-delete/security-profile-2.1.0//key')).toBeNull();
        expect(localStorage.getItem('/basket-update/security-profile-2.1.0/security-profile' +
            '[id=ap1]/opc/array1[id=1]/attr1')).toBe('{"newValue":"One"}');
        expect(localStorage.getItem('/basket-update/security-profile-2.1.0/security-profile' +
            '[id=ap1]/opc/array2[name=n2]/attr1')).toBe('{"newValue":"N Two"}');
        localStorage.clear();
    });

    it('should produce a patchbody', () => {
        localStorage.clear();
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id1]/opc', '{"newValue":"opcNew1","oldValue":"opcOld1"}');
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id2]/opc', '{"newValue":"opcNew2","oldValue":"opcOld2"}');
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id2]/id', '{"newValue":"idNew2","oldValue":"idOld2"}');
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id3]/key', '{"newValue":"keyNew1","oldValue":"keyOld1"}');
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id3]/number',
            '{"newValue": 1234,"oldValue": 5678}');
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id3]/boolean', '{"newValue": true,"oldValue": false}');
        localStorage.setItem('/basket-delete/security-profile-2.1.0/security-profile[id=id2]/desc', '{"newValue":"null","oldValue":"descOld1"}');
        localStorage.setItem('/basket-delete/security-profile-2.1.0/security-profile[id=id2]/something', '{"newValue":"null","oldValue":"somethingOld1"}');
        localStorage.setItem
        ('/basket-delete/enterprise-2.1.0/enterprise-profile[id=id3]/' +
            'connectivity-service[connectivity-service=sint]/connectivity-service', '{"newValue":"sint","oldValue":"null"}');

        const testPatchBody = service.buildPatchBody();
        console.log('Test patch body: \n' + JSON.stringify(testPatchBody));
        expect(testPatchBody).toBeTruthy();
    });

    it('should add a delete entry', () => {
        localStorage.clear();
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id1]/opc', 'opcValue1');
        localStorage.setItem('/basket-update/security-profile-2.1.0/security-profile[id=id2]/opc', 'opcValue2');

        service.deleteIndexedEntry('/security-profile-2.1.0/security-profile[id=id1]', 'id');
        expect(Object.keys(localStorage).length).toEqual(2);
        expect(Object.keys(localStorage)).toContain('/basket-update/security-profile-2.1.0/security-profile[id=id2]/opc');
        expect(Object.keys(localStorage)).toContain('/basket-delete/security-profile-2.1.0/security-profile[id=id1]/id');

    });
});
