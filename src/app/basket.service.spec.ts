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
        const testFormGroup = fb.group({
            attr1: [''],
            attr2: [''],
            'sub-group1': fb.group({
                subAttr1A: [''],
                'sub-group11': fb.group({
                    'sub-attr-11A': ['']
                })
            }),
            'sub-group2': fb.group({
                subAttr2A: ['']
            })
        });
        testFormGroup.get('attr1');
        service.logKeyValuePairs(testFormGroup);
        expect(service).toBeTruthy();
        expect(localStorage.getItem('basketupdates/attr1')).toBe('testme');
        expect(localStorage.getItem('/attr2')).toBe('10');
        expect(localStorage.getItem('/sub-group1/subAttr1A')).toBe('');
        expect(localStorage.getItem('/sub-group1/sub-group11/subAttr11A')).toBe('');
        expect(localStorage.getItem('/sub-group2/subAttr2A')).toBe('');
    });

    it('should switch cases and switch REST types', () => {

    });
});
