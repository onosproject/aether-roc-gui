/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, Input } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
} from '@angular/forms';
import { AETHER_TARGET } from '../environments/environment';
import { PatchBody } from '../openapi3/top/level/models';

export const TYPE = 'type';
export const HEX2NUM = 'hex2num';
export const IDATTRIBS = 'idAttribs';
export const REQDATTRIBS = 'reqdAttribs';
export const GRANDPARENT_REQDATTRIBS = 'grandparentReqdAttribs';
export const FORDELETE = 'for-delete-style';
export const STRIKETHROUGH = 'text-decoration: line-through';
export const ISINUSE = 'is-in-use';
export const ADDITIONALPROPS = 'additionalProperties';
export const ORIGINAL = 'original';

enum ChangeResult {
    NONE = 0,
    UPDATED,
    DELETED,
}

export interface BasketValue {
    oldValue: string;
    newValue: string;
    type: string;
}

export interface TargetNameAndType {
    name: string;
    type: string;
}

@Injectable({
    providedIn: 'root',
})
export class BasketService {
    idMap = new Map();
    pathMap = new Map();
    arrayCounter: number;
    pathCounter: number;
    profileIdPathCounter: number;

    deleteIndexedEntry(
        path: string,
        indexName: string,
        originalValue: string,
        unchanged?: Map<string, string>,
        originalType = 'string',
        unchangedParent?: Map<string, string>
    ): void {
        // If this item was already added in this basket, then remove it
        Object.keys(localStorage)
            .filter((p) => p.startsWith('/basket-update' + path))
            .forEach((p) => {
                console.log('Removed from basket', p);
                localStorage.removeItem(p);
            });
        const value = {
            oldValue: originalValue,
            newValue: '',
            type: originalType,
        } as BasketValue;
        localStorage.setItem(
            '/basket-delete' + path + '/' + indexName,
            JSON.stringify(value)
        );
        if (unchanged !== undefined) {
            unchanged.forEach((unchangedValue, unchangedPath) => {
                localStorage.setItem(
                    '/unchanged-delete' + unchangedPath,
                    unchangedValue
                );
            });
        }
        if (unchangedParent !== undefined) {
            unchangedParent.forEach((unchangedValue, unchangedPath) => {
                localStorage.setItem(
                    '/unchanged-delete' + unchangedPath,
                    unchangedValue
                );
            });
        }
    }

    totalNumChanges(): number {
        return Object.keys(localStorage).filter((key) =>
            key.startsWith('/basket')
        ).length;
    }

    containsDeleteEntry(path: string): boolean {
        return Object.keys(localStorage).includes('/basket-delete' + path);
    }

    containsUpdateEntry(path: string): boolean {
        return Object.keys(localStorage).includes('/basket-update' + path);
    }

    logKeyValuePairs(
        abstractControl: AbstractControl,
        parent?: string
    ): ChangeResult {
        // Path is either '/' if undefined == true or '/' + parent if false
        const path = parent === undefined ? '/' : '/' + parent;
        if (abstractControl instanceof FormGroup) {
            let unchangedUpdate: string[] = [];
            let unchangedDelete: string[] = [];
            if (abstractControl[REQDATTRIBS]) {
                unchangedUpdate.push(...abstractControl[REQDATTRIBS]);
                unchangedDelete.push(...abstractControl[REQDATTRIBS]);
            }
            const unchangedGpUpdate: string[] = [];
            const unchangedGpDelete: string[] = [];
            if (abstractControl[GRANDPARENT_REQDATTRIBS]) {
                unchangedGpUpdate.push(
                    ...abstractControl[GRANDPARENT_REQDATTRIBS]
                );
                unchangedGpDelete.push(
                    ...abstractControl[GRANDPARENT_REQDATTRIBS]
                );
            }

            Object.keys(abstractControl.controls).forEach((key: string) => {
                const changed = this.logKeyValuePairs(
                    abstractControl.controls[key],
                    path === '/' ? key : parent + '/' + key
                );
                if (changed === ChangeResult.UPDATED) {
                    unchangedUpdate = unchangedUpdate.filter(
                        (val) => val !== key
                    );
                } else if (changed === ChangeResult.DELETED) {
                    unchangedDelete = unchangedDelete.filter(
                        (val) => val !== key
                    );
                }
            });
            if (unchangedUpdate.length > 0) {
                localStorage.setItem(
                    '/unchanged-update/' + parent,
                    unchangedUpdate.join(',')
                );
            } else {
                localStorage.removeItem('/unchanged-update/' + parent);
            }
            if (unchangedDelete.length > 0) {
                localStorage.setItem(
                    '/unchanged-delete/' + parent,
                    unchangedDelete.join(',')
                );
            } else {
                localStorage.removeItem('/unchanged-delete/' + parent);
            }
            if (unchangedGpUpdate.length > 0) {
                const grandParent = parent.slice(0, parent.lastIndexOf('/'));
                const ls = localStorage.getItem(
                    `/unchanged-update/${grandParent}`
                );
                if (ls == null) {
                    localStorage.setItem(
                        `/unchanged-update/${grandParent}`,
                        unchangedGpUpdate.join(',')
                    );
                } // else there may be other changes in the basket
            }
            if (unchangedGpDelete.length > 0) {
                const grandParent = parent.slice(0, parent.lastIndexOf('/'));
                const ls = localStorage.getItem(
                    `/unchanged-delete/${grandParent}`
                );
                if (ls == null) {
                    localStorage.setItem(
                        `/unchanged-delete/${grandParent}`,
                        unchangedGpUpdate.join(',')
                    );
                } // else there may be other changes in the basket
            }

            // If the control is not a FormGroup then we know it's a FormControl
        } else if (abstractControl instanceof FormArray) {
            if (
                abstractControl[IDATTRIBS] &&
                abstractControl[IDATTRIBS].length === 0
            ) {
                // implies a leaf list - gather elements together and form item as array
                const leafListValue: string[] = [];
                (abstractControl as FormArray).controls.forEach((item) => {
                    leafListValue.push(item.value);
                });
                const item = new FormControl();
                item.setValue(leafListValue);
                if (abstractControl.dirty) {
                    item.markAsDirty();
                }
                if (abstractControl.touched) {
                    item.markAsTouched();
                }
                this.logKeyValuePairs(item, parent);
                return;
            }
            (abstractControl as FormArray).controls.forEach((item) => {
                // There should be an extra attribute 'idAttribs' set on the Form Array after creation defining what the keys IDs are
                // There might be more than one key for a list
                const pathIndices: string[] = [];
                if (!abstractControl[IDATTRIBS]) {
                    console.warn(
                        'Expected Array Control to have IDATTRIBS',
                        abstractControl
                    );
                    return;
                }
                abstractControl[IDATTRIBS].forEach((ak) => {
                    pathIndices.push('[' + ak + '=' + item.value[ak] + ']');
                });
                this.logKeyValuePairs(item, parent + pathIndices.join());
            });
            return ChangeResult.NONE;
        } else {
            // console.log('leaf attribute', path, abstractControl.value);
            if (
                abstractControl.pristine === false &&
                abstractControl.touched === true
            ) {
                if (abstractControl.value === '') {
                    const fullPath = '/basket-delete' + path;

                    const localStorageValue = {
                        newValue: 'null',
                        oldValue: abstractControl[ORIGINAL],
                        type: abstractControl[TYPE],
                    };

                    if (
                        localStorageValue.newValue ===
                        localStorageValue.oldValue
                    ) {
                        localStorage.removeItem(fullPath);
                        return ChangeResult.NONE;
                    } else {
                        localStorage.setItem(
                            fullPath,
                            JSON.stringify(localStorageValue).toString()
                        );
                        return ChangeResult.DELETED;
                    }
                } else {
                    const fullPath = '/basket-update' + path;

                    if (abstractControl.value === null) {
                        return ChangeResult.NONE;
                    }
                    const localStorageValue = {
                        newValue: abstractControl.value,
                        oldValue: abstractControl[ORIGINAL],
                        type: abstractControl[TYPE],
                    };

                    if (abstractControl.value !== abstractControl[ORIGINAL]) {
                        localStorage.setItem(
                            fullPath,
                            JSON.stringify(localStorageValue).toString()
                        );
                        return ChangeResult.UPDATED;
                    } else {
                        console.log(
                            'Dropped attribute',
                            path,
                            abstractControl.value
                        );
                        localStorage.removeItem(fullPath);
                        return ChangeResult.NONE;
                    }
                }
            } else {
                // console.log(
                //     'Unchanged PATH: ',
                //     fullPath,
                //     'Value',
                //     abstractControl.value,
                //     'Original',
                //     abstractControl[ORIGINAL]
                // );
                return ChangeResult.NONE;
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
            'default-target': 'default-ent',
            Updates: {},
            Deletes: {},
        };

        Object.keys(localStorage)
            .filter((updateKey) => updateKey.startsWith('/basket-update'))
            .forEach((updateKey) => {
                const updatePathParts: string[] = updateKey.split('/');
                const updateValue: BasketValue = JSON.parse(
                    localStorage.getItem(updateKey)
                );
                this.recursePath(
                    updatePathParts.slice(4),
                    patchBody.Updates,
                    updateValue,
                    [
                        '/unchanged-update',
                        updatePathParts[2],
                        updatePathParts[3],
                    ],
                    {
                        name: updatePathParts[3],
                        type: updatePathParts[2],
                    } as TargetNameAndType
                );
            });

        Object.keys(localStorage)
            .filter((deleteKey) => deleteKey.startsWith('/basket-delete'))
            .forEach((deleteKey) => {
                const deletePathParts: string[] = deleteKey.split('/');
                const deleteValue: BasketValue = JSON.parse(
                    localStorage.getItem(deleteKey)
                );
                this.recursePath(
                    deletePathParts.slice(4),
                    patchBody.Deletes,
                    deleteValue,
                    [
                        '/unchanged-delete',
                        deletePathParts[2],
                        deletePathParts[3],
                    ],
                    {
                        name: deletePathParts[3],
                        type: deletePathParts[2],
                    } as TargetNameAndType
                );
            });

        return patchBody as PatchBody;
    }

    recursePath(
        path: string[],
        object: unknown, // FIXME what type should object be?
        value: BasketValue,
        unchangedPath?: string[],
        target?: TargetNameAndType
    ): void {
        const unchList = localStorage.getItem(unchangedPath.join('/'));
        console.log(
            path,
            'Search storage for',
            unchangedPath.join('/'),
            unchList
        );
        if (unchList !== null) {
            if (object[ADDITIONALPROPS]) {
                object[ADDITIONALPROPS]['unchanged'] = unchList;
            } else {
                object[ADDITIONALPROPS] = {
                    unchanged: unchList,
                };
            }
        }

        if (path.length === 1) {
            if (value.newValue === '') {
                object[path[0]] = value.oldValue;
                if (value.type === HEX2NUM) {
                    object[path[0]] = parseInt(value.oldValue, 16);
                } else if (value.type === 'number') {
                    object[path[0]] = parseInt(value.oldValue, 10);
                }
            } else {
                object[path[0]] = value.newValue;
                if (value.type === HEX2NUM) {
                    object[path[0]] = parseInt(value.newValue, 16);
                } else if (value.type === 'number') {
                    object[path[0]] = parseInt(value.newValue, 10);
                }
            }
        } else if (path[0].includes('[')) {
            if (path.length < 2) {
                console.warn('path too short');
                return;
            }
            unchangedPath.push(path[0]);
            // a path might contain more than one key and will be in the form [key1=value1][key2=value2]
            const thisLevelPath: string = path[0];
            const container: string = thisLevelPath.slice(
                0,
                thisLevelPath.indexOf('[')
            );
            if (object[container] === undefined) {
                object[container] = [];
            }
            const keyNames = new Map();
            let childObj = {};

            if (target) {
                childObj[ADDITIONALPROPS] = {};
                childObj[ADDITIONALPROPS][target.type] = target.name;
            }
            thisLevelPath
                .split('[')
                .filter((part) => part.endsWith(']'))
                .forEach((part) => {
                    const keyName = part.slice(0, part.indexOf('='));
                    const keyValue = part.slice(
                        part.indexOf('=') + 1,
                        part.lastIndexOf(']')
                    );
                    // TODO - taking a chance here - if key is numeric, then use it as a number rather than a string
                    const isnum = /^\d+$/.test(keyValue); // true if chars are only digits
                    const valAsNum = parseInt(keyValue); // will succeed on a string starting with a number
                    if (!isnum || isNaN(valAsNum)) {
                        keyNames.set(keyName, keyValue);
                        childObj[keyName] = keyValue;
                    } else {
                        keyNames.set(keyName, valAsNum);
                        childObj[keyName] = valAsNum;
                    }
                });
            let alreadyExists = false;
            object[container].forEach((child) => {
                let matchedCount = 0;
                keyNames.forEach((v, k) => {
                    if (String(child[k]) === String(v)) {
                        matchedCount++;
                    }
                });
                if (matchedCount === keyNames.size) {
                    childObj = child;
                    alreadyExists = true;
                    console.log('Found existing child', childObj);
                }
            });
            if (!alreadyExists) {
                object[container].push(childObj);
            }

            this.recursePath(path.slice(1), childObj, value, unchangedPath);
        } else {
            if (object[path[0]] === undefined) {
                object[path[0]] = {};
            }
            unchangedPath.push(path[0]);
            this.recursePath(
                path.slice(1),
                object[path[0]],
                value,
                unchangedPath
            );
        }
    }
}
