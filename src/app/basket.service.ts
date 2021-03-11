/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Injectable, Input} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {AETHER_TARGETS} from '../environments/environment';
import {ArrayType, ElementSchemaRegistry} from '@angular/compiler';
import {PatchBody, Elements} from '../openapi3/top/level/models';
import {SecurityProfile} from '../openapi3/aether/2.0.0/models/security-profile';
import {AccessProfile} from '../openapi3/aether/2.0.0/models/access-profile';
import {SecurityProfileSecurityProfile} from '../openapi3/aether/2.0.0/models/security-profile-security-profile';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';
import {getPropertyValueFromSymbol} from '@angular/compiler-cli/ngcc/src/host/esm2015_host';
import {isPackageNameSafeForAnalytics} from '@angular/cli/models/analytics';
import localizeExtractLoader from '@angular-devkit/build-angular/src/extract-i18n/ivy-extract-loader';
import {type} from 'os';
import {mainDiagnosticsForTest} from '@angular/compiler-cli/src/main';

@Injectable({
    providedIn: 'root'
})
export class BasketService {
    @Input() target: string = AETHER_TARGETS[0];
    apiKeyDisplay: boolean = false;

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
                this.logKeyValuePairs(item, path === '[]/' ? 'i' + idx : parent + '[]/' + String(idx));
            });
        } else {

            if (abstractControl.pristine === false && abstractControl.touched === true) {
                if (abstractControl.value === '') {
                    const fullPath = '/basket-delete' + path + '/';
                    localStorage.setItem(fullPath, abstractControl.value);
                    console.log('Changed PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
                } else {
                    const fullPath = '/basket-update' + path + '/' + localStorage.getItem('profileID');
                    localStorage.setItem(fullPath, abstractControl.value);
                    console.log('Changed PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
                }
            } else {
                const fullPath = path;
                console.log('Unchanged PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
            }
        }
    }

    buildPatchBody(): PatchBody {

        const patchBody = {
            Updates: {},
            Deletes: {}
        };

        Object.keys(localStorage)
            .filter(key => key.startsWith('/basket-update'))
            .forEach((key) => {
                const pathParts = key.split('/');
                const value = localStorage.getItem(key);
                this.recursePath(pathParts.slice(2), patchBody.Updates, value);
            });


        Object.keys(localStorage)
            .filter(key => key.startsWith('/basket-delete'))
            .forEach((key) => {
                const pathPaths = key.split('/');
                const value = localStorage.getItem(key);
                this.recursePath(pathPaths.slice(2), patchBody.Deletes, value);
            });

        return patchBody as PatchBody;
    }

    recursePath(path: string[], object: object, value: string): void {
        if (path.length === 1) {
            object[path[0]] = value;
        } else if (path[0].endsWith('[]')) {
            if (path.length < 3) {
                console.warn('path too short');
                return;
            }
            let arrayName = path[0];
            const index = path[1];
            arrayName = arrayName.substring(0, arrayName.length - 2);
            if (object[arrayName] === undefined) {
                object[arrayName] = [];
            }
            if (object[arrayName][index] === undefined) {
                object[arrayName][index] = {};
            }
            this.recursePath(path.slice(2), object[arrayName][index], value);
        } else {
            if (object[path[0]] === undefined) {
                object[path[0]] = {};
            }
            this.recursePath(path.slice(1), object[path[0]], value);
        }
    }
}
