/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {TestBed} from '@angular/core/testing'
import {BasketService, IDATTRIBS, ORIGINAL, REQDATTRIBS, TYPE} from './basket.service'
import {FormBuilder} from '@angular/forms'

describe('BasketService', () => {
    let service: BasketService
    const fb: FormBuilder = new FormBuilder()

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(BasketService)
    })

    it('should be created', () => {
        localStorage.clear()
        expect(service).toBeTruthy()
    })

    it('should iterate through form', () => {
        localStorage.clear()
        localStorage.clear()
        const testFormGroup = fb.group({
            key: [''],
            'security-profile': fb.array([
                fb.group({
                    id: ['ap1'],
                    'display-name': [''],
                    opc: fb.group({
                        array1: fb.array([
                            fb.group({id: [1], attr1: ['One'], mand1: [10], mand2: [11]}), // List within a list
                            fb.group({id: [2], attr1: ['Two'], mand1: [20]}),
                            fb.group({id: [3], mand2: [30]})
                        ]),
                        array2: fb.array([
                            fb.group({name: ['n1'], attr2: ['N One']}),
                            fb.group({name: ['n2'], attr2: ['N Two']}),
                        ]),
                    }),
                    sqn: [''],
                    description: ['']
                })]
            )
        })

        const keyObject = testFormGroup.get(['key'])
        keyObject[ORIGINAL] = ['key-orig']
        keyObject.markAsDirty()
        keyObject.markAsTouched()
        const spArray = testFormGroup.get(['security-profile'])
        spArray[IDATTRIBS] = ['id']
        const opcArray1 = spArray.get([0, 'opc', 'array1'])
        opcArray1.get([0, 'attr1']).markAsTouched()
        opcArray1.get([0, 'attr1']).markAsDirty()
        opcArray1.get([0, 'attr1'])[ORIGINAL] = 'attr1-old'
        opcArray1.get([0, 'mand1']).markAsTouched()
        opcArray1.get([0, 'mand1']).markAsDirty()
        opcArray1.get([0, 'mand1'])[ORIGINAL] = 0
        opcArray1.get([0, 'mand2']).markAsTouched()
        opcArray1.get([0, 'mand2']).markAsDirty()
        opcArray1.get([0, 'mand2'])[ORIGINAL] = 1
        opcArray1.get([0, 'id'])[TYPE] = 'number'
        opcArray1.get([0])[REQDATTRIBS] = ['mand1', 'mand2']
        opcArray1.get([1, 'attr1']).markAsTouched()
        opcArray1.get([1, 'attr1']).markAsDirty()
        opcArray1.get([1, 'attr1'])[ORIGINAL] = 'attr1-old'
        opcArray1.get([1, 'mand1']).markAsTouched()
        opcArray1.get([1, 'mand1']).markAsDirty()
        opcArray1.get([1, 'mand1'])[ORIGINAL] = 10
        opcArray1.get([1, 'id'])[TYPE] = 'number'
        opcArray1.get([1])[REQDATTRIBS] = ['mand1', 'mand2']
        opcArray1.get([2, 'mand2']).markAsTouched()
        opcArray1.get([2, 'mand2']).markAsDirty()
        opcArray1.get([2, 'mand2'])[ORIGINAL] = 10
        opcArray1.get([2, 'id'])[TYPE] = 'number'
        opcArray1.get([2])[REQDATTRIBS] = ['mand1', 'mand2']
        opcArray1[IDATTRIBS] = ['id']

        const opcArray2 = spArray.get([0, 'opc', 'array2'])
        opcArray2.get([1, 'attr2']).markAsTouched()
        opcArray2.get([1, 'attr2']).markAsDirty()
        opcArray2.get([1, 'attr2'])[ORIGINAL] = 'attr2-orig'
        opcArray2[IDATTRIBS] = ['name']

        service.logKeyValuePairs(testFormGroup, 'security-profile-4.0.0')
        expect(service).toBeTruthy()

        expect(localStorage.getItem('/basket-delete/security-profile-4.0.0//key')).toBeNull()
        expect(localStorage.getItem('/basket-update/security-profile-4.0.0/security-profile' +
            '[id=ap1]/opc/array1[id=1]/attr1')).toBe('{"newValue":"One","oldValue":"attr1-old"}')
        expect(localStorage.getItem('/basket-update/security-profile-4.0.0/security-profile' +
            '[id=ap1]/opc/array1[id=1]/mand1')).toBe('{"newValue":10,"oldValue":0}')
        expect(localStorage.getItem('/basket-update/security-profile-4.0.0/security-profile' +
            '[id=ap1]/opc/array1[id=1]/mand2')).toBe('{"newValue":11,"oldValue":1}')
        expect(localStorage.getItem('/unchanged-update/security-profile-4.0.0/security-profile' +
            '[id=ap1]/opc/array1[id=2]')).toBe('mand2')
        expect(localStorage.getItem('/unchanged-update/security-profile-4.0.0/security-profile' +
            '[id=ap1]/opc/array1[id=3]')).toBe('mand1')
        expect(localStorage.getItem('/basket-update/security-profile-4.0.0/security-profile' +
            '[id=ap1]/opc/array2[name=n2]/attr2')).toBe('{"newValue":"N Two","oldValue":"attr2-orig"}')
        localStorage.clear()
    })

    it('should produce a patchbody', () => {
        localStorage.clear()
        localStorage.setItem('/basket-update/security-profile-4.0.0/security-profile[id=id1]/opc/array1[id=1]/attr1',
            '{"newValue":"attr1-updated","oldValue":"attr1-old"}')
        localStorage.setItem('/unchanged-update/security-profile-4.0.0/security-profile[id=id1]/opc/array1[id=1]',
            'mand1,mand2')
        localStorage.setItem('/basket-update/security-profile-4.0.0/security-profile[id=id1]/opc/array1[id=2]/mand1',
            '{"newValue":"mand1-updated","oldValue":"mand1-old"}')
        localStorage.setItem('/unchanged-update/security-profile-4.0.0/security-profile[id=id1]/opc/array1[id=2]',
            'mand2')
        localStorage.setItem('/basket-update/security-profile-4.0.0/security-profile[id=id2]/opc', '{"newValue":"opcNew2","oldValue":"opcOld2"}')
        localStorage.setItem('/basket-update/security-profile-4.0.0/security-profile[id=id2]/id', '{"newValue":"idNew2","oldValue":"idOld2"}')
        localStorage.setItem('/basket-update/security-profile-4.0.0/security-profile[id=id3]/key', '{"newValue":"keyNew1","oldValue":"keyOld1"}')
        localStorage.setItem('/basket-update/security-profile-4.0.0/security-profile[id=id3]/number',
            '{"newValue": 1234,"oldValue": 5678}')
        localStorage.setItem('/basket-update/security-profile-4.0.0/security-profile[id=id3]/boolean', '{"newValue": true,"oldValue": false}')
        localStorage.setItem('/basket-delete/security-profile-4.0.0/security-profile[id=id2]/desc', '{"newValue":"null","oldValue":"descOld1"}')
        localStorage.setItem('/basket-delete/security-profile-4.0.0/security-profile[id=id2]/something', '{"newValue":"null","oldValue":"somethingOld1"}')
        localStorage.setItem
        ('/basket-delete/enterprise-4.0.0/enterprise-profile[id=id3]/' +
            'connectivity-service[connectivity-service=sint]/connectivity-service', '{"newValue":"","oldValue":"sint"}')

        const testPatchBody = service.buildPatchBody()
        console.log('Test patch body: \n' + JSON.stringify(testPatchBody))
        expect(JSON.stringify(testPatchBody, null, 2)).toEqual(expectedPatchBody)
    })

    it('should add a delete entry', () => {
        localStorage.clear()
        localStorage.clear()
        localStorage.setItem('/basket-update/security-profile-4.0.0/security-profile[id=id1]/opc', 'opcValue1')
        localStorage.setItem('/basket-update/security-profile-4.0.0/security-profile[id=id2]/opc', 'opcValue2')

        const ucMap = new Map<string, string>()
        service.deleteIndexedEntry('/security-profile-4.0.0/security-profile[id=id1]', 'id', '', ucMap)
        expect(Object.keys(localStorage).length).toEqual(2)
        expect(Object.keys(localStorage)).toContain('/basket-update/security-profile-4.0.0/security-profile[id=id2]/opc')
        expect(Object.keys(localStorage)).toContain('/basket-delete/security-profile-4.0.0/security-profile[id=id1]/id')

    })
})

const expectedPatchBody = `{
  "default-target": "connectivity-service-v4",
  "Updates": {
    "security-profile-4.0.0": {
      "security-profile": [
        {
          "id": "idNew2"
        },
        {
          "id": "id1",
          "opc": {
            "array1": [
              {
                "id": "2",
                "additionalProperties": {
                  "unchanged": "mand2"
                },
                "mand1": "mand1-updated"
              },
              {
                "id": "1",
                "additionalProperties": {
                  "unchanged": "mand1,mand2"
                },
                "attr1": "attr1-updated"
              }
            ]
          }
        },
        {
          "id": "id3",
          "boolean": true,
          "key": "keyNew1",
          "number": 1234
        },
        {
          "id": "id2",
          "opc": "opcNew2"
        }
      ]
    }
  },
  "Deletes": {
    "security-profile-4.0.0": {
      "security-profile": [
        {
          "id": "id2",
          "desc": "null",
          "something": "null"
        }
      ]
    },
    "enterprise-4.0.0": {
      "enterprise-profile": [
        {
          "id": "id3",
          "connectivity-service": [
            {
              "connectivity-service": "sint"
            }
          ]
        }
      ]
    }
  },
  "Extensions": {
    "model-version-101": "4.0.0",
    "model-type-102": "Aether"
  }
}`
