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
    idMap = new Map();
    profileIdPaths = new Map();
    pathMap = new Map();
    arrayCounter: number;
    pathCounter: number;
    profileIdPathCounter: number;


    constructor() {

    }

    logKeyValuePairs(abstractControl: AbstractControl, parent?: string): void {
        // Path is either '/' if undefined == true or '/' + parent if false
        console.log('PARENT: ', parent);
        console.log('ABSTRACT VALUE: ', abstractControl.value);

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
                    const slicedPathID = path.slice(path.indexOf('[') + 1, path.indexOf(']'));
                    const slicedPath = path.slice(0, path.indexOf(']') + 1);
                    const idPath = '/profile-ids' + slicedPath + '/' + 'id';
                    localStorage.setItem(idPath, slicedPathID);
                    const fullPath = '/basket-delete' + path;
                    localStorage.setItem(fullPath, abstractControl.value);
                    console.log('Changed PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
                } else {
                    const slicedPathID = path.slice(path.indexOf('[') + 1, path.indexOf(']'));
                    const slicedPath = path.slice(0, path.indexOf(']') + 1);
                    const idPath = '/profile-ids' + slicedPath + '/' + 'id';
                    localStorage.setItem(idPath, slicedPathID);
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

    populateIdMap(): void {
        Object.keys(localStorage)
            .filter(key => key.startsWith('/profile-ids'))
            .forEach((key) => {
                const value = localStorage.getItem(key);
                console.log('KEY: ', key);
                console.log('VALUE', value);
                this.profileIdPaths.set(key, value);
            });
    }


    buildPatchBody(): PatchBody {

        this.idMap.clear();
        this.pathMap.clear();
        this.profileIdPaths.clear();
        this.profileIdPathCounter = 0;
        this.pathCounter = 0;
        this.arrayCounter = 0;

        const patchBody = {
            Updates: {},
            Deletes: {}
        };

        this.populateIdMap();

        Object.keys(localStorage)
            .filter(updateKey => updateKey.startsWith('/basket-update'))
            .forEach((updateKey) => {
                Object.keys(localStorage)
                    .filter(profIDKey => profIDKey.startsWith('/profile-ids'))
                    .forEach((profIDKey) => {
                        const idPathParts = profIDKey.split('/');
                        const profIDValue = localStorage.getItem(profIDKey);
                        this.recursePath(idPathParts.slice(2), patchBody.Updates, profIDValue);
                    });
                const updatePathParts = updateKey.split('/');
                const updateValue = localStorage.getItem(updateKey);
                this.recursePath(updatePathParts.slice(2), patchBody.Updates, updateValue);
            });

        this.profileIdPaths.forEach((value, key) => {
            localStorage.setItem(key, value);
        });

        Object.keys(localStorage)
            .filter(deleteKey => deleteKey.startsWith('/basket-delete'))
            .forEach((deleteKey) => {
                Object.keys(localStorage)
                    .filter(profIDKey => profIDKey.startsWith('/profile-ids'))
                    .forEach((profIDKey) => {
                        const idPathParts = profIDKey.split('/');
                        const profIDValue = localStorage.getItem(profIDKey);
                        this.recursePath(idPathParts.slice(2), patchBody.Deletes, profIDValue);
                    });
                const deletePathParts = deleteKey.split('/');
                const deleteValue = localStorage.getItem(deleteKey);
                this.recursePath(deletePathParts.slice(2), patchBody.Deletes, deleteValue);
            });

        return patchBody as PatchBody;
    }

    recursePath(path: string[], object: object, value: string): void {
        console.log('PATH: ', path);
        const slicedPath = path[0].slice(0, path[0].indexOf('['));
        const slicedPathID = path[0].slice(path[0].indexOf('[') + 1, path[0].length - 1);

        if (path.length === 1) {
            object[path[0]] = value;
        } else if (path[0].includes('[')) {

            if (path.length < 2) {
                console.warn('path too short');
                return;
            }

            if (this.pathMap.has(slicedPath) === false) {
                this.pathMap.set(slicedPath, this.pathCounter);
                this.arrayCounter = 0;
                this.pathCounter++;
            }

            // console.log(slicedPath);
            // console.log(slicedPathID);

            if (this.idMap.has(slicedPathID) === false) {
                this.idMap.set(slicedPathID, this.arrayCounter);
                this.arrayCounter++;
            }

            if (object[slicedPath] === undefined) {
                object[slicedPath] = [];
            }
            if (object[slicedPath][this.idMap.get(slicedPathID)] === undefined) {
                object[slicedPath][this.idMap.get(slicedPathID)] = {};
            }
            this.recursePath(path.slice(1), object[slicedPath][this.idMap.get(slicedPathID)], value);
        } else {


            if (object[path[0]] === undefined) {
                object[path[0]] = {};
            }
            this.recursePath(path.slice(1), object[path[0]], value);
        }
    }
}
