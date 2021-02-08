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
        service.logKeyValuePairs(testFormGroup2);
        expect(service).toBeTruthy();
        // expect(localStorage.getItem('basket-type/security-profile/security-profile/id')).toBe('ap1');
        expect(localStorage.getItem)
    });
});
