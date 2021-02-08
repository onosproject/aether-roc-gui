/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AETHER_TARGETS} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

    constructor() { }

    logKeyValuePairs(group: FormGroup, parent?: string): void {

        // Path is either '/' if undefined == true or '/' + parent if false
        const path = (parent === undefined) ? '/' : '/' + parent;
        Object.keys(group.controls).forEach((key: string) => {

            // Get a reference to the control using the FormGroup.get() method
            const abstractControl = group.get(key);

            // If the control is an instance of FormGroup i.e a nested FormGroup
            // then recursively call this same method (logKeyValuePairs) passing it
            // the FormGroup so we can get to the form controls in it

            if (abstractControl instanceof FormGroup) {
                this.logKeyValuePairs(abstractControl, path === '/' ? key : parent + '/' + key);
                // If the control is not a FormGroup then we know it's a FormControl
            } else {
                if (abstractControl.pristine === false && abstractControl.touched === true) {
                    if (abstractControl.value === '') {
                        const fullPath = '/basket-delete' + path + '/' + key;
                        localStorage.setItem(fullPath, abstractControl.value);
                        console.log('Changed PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
                    } else {
                        const fullPath = '/basket-update' + path + '/' + key;
                        localStorage.setItem(fullPath, abstractControl.value);
                        console.log('Changed PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
                    }
                } else {
                    const fullPath = path + '/' + key;
                    console.log('Unchanged PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
                }
            }
        });
    }
}
