/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {AETHER_TARGETS} from '../environments/environment';
import {ArrayType} from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class BasketService {

    constructor() {
    }

    logKeyValuePairs(abstractControl: AbstractControl, parent?: string): void {

        // Path is either '/' if undefined == true or '/' + parent if false
        const path = (parent === undefined) ? '/' : '/' + parent;

        if (abstractControl instanceof FormGroup) {
            Object.keys(abstractControl.controls).forEach((key: string) => {
                this.logKeyValuePairs(abstractControl.controls[key], path === '/' ? key : parent + '/' + key);
            });
            // If the control is not a FormGroup then we know it's a FormControl
        } else if (abstractControl instanceof FormArray) {
            (abstractControl as FormArray).controls.forEach((item, idx) => {
                this.logKeyValuePairs(item, path === '/' ? 'i' + idx : parent + '/' + String(idx));
            });
        } else {
            if (abstractControl.pristine === false && abstractControl.touched === true) {
                if (abstractControl.value === '') {
                    const fullPath = '/basket-delete' + path;
                    localStorage.setItem(fullPath, abstractControl.value);
                    console.log('Changed PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
                } else {
                    const fullPath = '/basket-update' + path;
                    localStorage.setItem(fullPath, abstractControl.value);
                    console.log('Changed PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
                }
            } else {
                const fullPath = path;
                console.log('Unchanged PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
            }
        }
    }
}
