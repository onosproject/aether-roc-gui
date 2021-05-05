/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Injectable, Input} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {AETHER_TARGETS} from '../environments/environment';
import {PatchBody} from '../openapi3/top/level/models';

export const TYPE = 'type';
export const IDATTRIBS = 'idAttribs';
export const ORIGINAL = 'original';

export interface BasketValue {
    oldValue: any;
    newValue: any;
}

@Injectable({
    providedIn: 'root'
})
export class BasketService {
    @Input() target: string = AETHER_TARGETS[0];
    apiKeyDisplay: boolean = false;
    totalChanges = this.totalNumChanges();
    idMap = new Map();
    pathMap = new Map();
    arrayCounter: number;
    pathCounter: number;
    profileIdPathCounter: number;

    constructor() {

    }

    deleteIndexedEntry(path: string, indexName: string): void {
        // If this item was already added in this basket, then remove it
        Object.keys(localStorage)
            .filter(p => p.startsWith('/basket-update' + path))
            .forEach(p => {
                console.log('Removed from basket', p);
                localStorage.removeItem(p);
            });
        localStorage.setItem('/basket-delete' + path + '/' + indexName, '');
    }

    totalNumChanges(): number {
        return Object.keys(localStorage)
            .filter((key) =>
                key.startsWith('/basket')).length;
    }

    containsDeleteEntry(path: string): boolean {
        return Object.keys(localStorage).includes('/basket-delete' + path);
    }

    containsUpdateEntry(path: string): boolean {
        return Object.keys(localStorage).includes('/basket-update' + path);
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
                // There should be an extra attribute 'idAttribs' set on the Form Array after creation defining what the keys IDs are
                // There might be more than one key for a list
                const pathIndices: string[] = [];
                if (!abstractControl[IDATTRIBS]) {
                    console.warn('Expected Array Control to have IDATTRIBS');
                    return;
                }
                abstractControl[IDATTRIBS].forEach(ak => {
                    pathIndices.push('[' + ak + '=' + item.value[ak] + ']');
                });
                this.logKeyValuePairs(item, parent + pathIndices.join());
            });
        } else {

            if (abstractControl.pristine === false && abstractControl.touched === true) {
                if (abstractControl.value === '') {

                    const fullPath = '/basket-delete' + path;
                    // localStorage.setItem(fullPath, abstractControl.value);

                    const localStorageValue = {
                        newValue: 'null',
                        oldValue: abstractControl[ORIGINAL]
                    };

                    console.log('This is original value', abstractControl[ORIGINAL]);
                    if (localStorageValue.newValue === localStorageValue.oldValue) {
                        localStorage.removeItem(fullPath);
                    } else {
                        localStorage.setItem(fullPath, JSON.stringify(localStorageValue).toString());
                    }
                    console.log('Deleted PATH: ' + fullPath + ' && Value = ' + abstractControl.value);

                } else {
                    const fullPath = '/basket-update' + path;

                    const localStorageValue = {
                        newValue: abstractControl.value,
                        oldValue: abstractControl[ORIGINAL]
                    };

                    console.log('This is original value', abstractControl[ORIGINAL]);
                    if (abstractControl.value !== abstractControl[ORIGINAL]) {
                        localStorage.setItem(fullPath, JSON.stringify(localStorageValue).toString());
                    } else {
                        localStorage.removeItem(fullPath);
                    }

                    // if (abstractControl[TYPE] === 'boolean') {
                    //     localStorage.setItem(fullPath, 'boolean (' + abstractControl.value + ')');
                    // } else if (abstractControl[TYPE] === 'number') {
                    //     localStorage.setItem(fullPath, 'number (' + abstractControl.value + ')');
                    // } else if (abstractControl[TYPE] === 'formArray') {
                    //     localStorage.setItem(fullPath, 'formArray (' + abstractControl.value + ')');
                    // } else {
                    //     localStorage.setItem(fullPath, abstractControl.value);
                    // }
                    // console.log('updated PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
                }

            } else {
                const fullPath = path;
                console.log('This is original value', abstractControl[ORIGINAL]);
                console.log('Unchanged PATH: ' + fullPath + ' && Value = ' + abstractControl.value);
            }
        }
    }

    buildPatchBody(): PatchBody {

        this.idMap.clear();
        this.pathMap.clear();
        this.profileIdPathCounter = 0;
        this.pathCounter = 0;
        this.arrayCounter = 0;

        // TODO - Add change-name-100 back

        const patchBody = {
            'default-target': 'connectivity-service-v2',
            Updates: {},
            Deletes: {},
            Extensions: {
                'model-version-101': '2.1.0',
                'model-type-102': 'Aether'
            }
        };

        Object.keys(localStorage)
            .filter(updateKey => updateKey.startsWith('/basket-update'))
            .forEach((updateKey) => {
                const updatePathParts: string[] = updateKey.split('/');
                const updateValue: BasketValue = JSON.parse(localStorage.getItem(updateKey));
                this.recursePath(updatePathParts.slice(2), patchBody.Updates, updateValue);
            });

        Object.keys(localStorage)
            .filter(deleteKey => deleteKey.startsWith('/basket-delete'))
            .forEach((deleteKey) => {
                const deletePathParts: string[] = deleteKey.split('/');
                const deleteValue: BasketValue = JSON.parse(localStorage.getItem(deleteKey));
                this.recursePath(deletePathParts.slice(2), patchBody.Deletes, deleteValue);
            });

        return patchBody as PatchBody;
    }

    recursePath(path: string[], object: object, value: BasketValue): void {
        if (path.length === 1) {
            if (value.newValue === 'null') {
                object[path[0]] = '';
            } else {
                object[path[0]] = value.newValue;
            }

        } else if (path[0].includes('[')) {

            if (path.length < 2) {
                console.warn('path too short');
                return;
            }
            console.log('Handling', path);
            // a path might contain more than one key and will be in the form [key1=value1][key2=value2]
            const thisLevelPath: string = path[0];
            const container: string = thisLevelPath.slice(0, thisLevelPath.indexOf('['));
            if (object[container] === undefined) {
                object[container] = [];
            }
            thisLevelPath.split('[').filter(part => part.endsWith(']')).forEach(part => {
                const keyName = part.slice(0, part.indexOf('='));
                const keyValue = part.slice(part.indexOf('=') + 1, part.lastIndexOf(']'));
                let childObj = {};

                object[container].forEach(child => {
                    if (child[keyName] === keyValue) {
                        console.log('Found existing child', keyName, '=', keyValue);
                        childObj = child;
                    }
                });
                if (!childObj[keyName]) {
                    childObj[keyName] = keyValue;
                    object[container].push(childObj);
                }

                this.recursePath(path.slice(1), childObj, value);
            });

        } else {
            if (object[path[0]] === undefined) {
                object[path[0]] = {};
            }
            this.recursePath(path.slice(1), object[path[0]], value);
        }
    }
}
