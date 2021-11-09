/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Injectable, Input} from '@angular/core'
import {AbstractControl, FormArray, FormGroup} from '@angular/forms'
import {AETHER_TARGETS} from '../environments/environment'
import {PatchBody} from '../openapi3/top/level/models'

export const TYPE = 'type'
export const HEX2NUM = 'hex2num'
export const IDATTRIBS = 'idAttribs'
export const REQDATTRIBS = 'reqdAttribs'
export const ADDITIONALPROPS = 'additionalProperties'
export const ORIGINAL = 'original'

enum ChangeResult {
    NONE = 0,
    UPDATED,
    DELETED,
}

export interface BasketValue {
    oldValue: any;
    newValue: any;
    type: string;
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

    deleteIndexedEntry(path: string, indexName: string, originalValue: string, unchanged?: Map<string, string>): void {
        // If this item was already added in this basket, then remove it
        Object.keys(localStorage)
            .filter(p => p.startsWith('/basket-update' + path))
            .forEach(p => {
                console.log('Removed from basket', p)
                localStorage.removeItem(p)
            })
        const value = {oldValue: originalValue, newValue: ''} as BasketValue
        localStorage.setItem('/basket-delete' + path + '/' + indexName, JSON.stringify(value))
        if (unchanged !== undefined) {
            unchanged.forEach((unchangedValue, unchangedPath) => {
                localStorage.setItem('/unchanged-delete' + unchangedPath, unchangedValue)
            })
        }
    }

    totalNumChanges(): number {
        return Object.keys(localStorage)
            .filter((key) =>
                key.startsWith('/basket')).length
    }

    containsDeleteEntry(path: string): boolean {
        return Object.keys(localStorage).includes('/basket-delete' + path)
    }

    containsUpdateEntry(path: string): boolean {
        return Object.keys(localStorage).includes('/basket-update' + path)
    }

    logKeyValuePairs(abstractControl: AbstractControl, parent?: string): ChangeResult {

        // Path is either '/' if undefined == true or '/' + parent if false
        const path = (parent === undefined) ? '/' : '/' + parent

        if (abstractControl instanceof FormGroup) {
            let unchangedUpdate: string[] = []
            let unchangedDelete: string[] = []
            if (abstractControl[REQDATTRIBS]) {
                unchangedUpdate.push(...abstractControl[REQDATTRIBS])
                unchangedDelete.push(...abstractControl[REQDATTRIBS])
                // console.log(parent, 'Required', unchangedUpdate, unchangedDelete);
            }
            Object.keys(abstractControl.controls).forEach((key: string) => {
                const changed = this.logKeyValuePairs(
                    abstractControl.controls[key], path === '/' ? key : parent + '/' + key)
                if (changed === ChangeResult.UPDATED) {
                    unchangedUpdate = unchangedUpdate.filter(val => val !== key)
                } else if (changed === ChangeResult.DELETED) {
                    unchangedDelete = unchangedDelete.filter(val => val !== key)
                }
            })
            if (unchangedUpdate.length > 0) {
                localStorage.setItem('/unchanged-update/' + parent, unchangedUpdate.join(','))
            } else {
                localStorage.removeItem('/unchanged-update/' + parent)
            }
            if (unchangedDelete.length > 0) {
                localStorage.setItem('/unchanged-delete/' + parent, unchangedDelete.join())
            } else {
                localStorage.removeItem('/unchanged-delete/' + parent)
            }
            // If the control is not a FormGroup then we know it's a FormControl
        } else if (abstractControl instanceof FormArray) {
            (abstractControl as FormArray).controls.forEach((item) => {
                // There should be an extra attribute 'idAttribs' set on the Form Array after creation defining what the keys IDs are
                // There might be more than one key for a list
                const pathIndices: string[] = []
                if (!abstractControl[IDATTRIBS]) {
                    console.error('Expected Array Control to have IDATTRIBS, not updating item in basket', item.value)
                    return
                }
                abstractControl[IDATTRIBS].forEach((ak: string) => {
                    pathIndices.push('[' + ak + '=' + item.value[ak] + ']')
                })
                this.logKeyValuePairs(item, parent + pathIndices.join())
            })
            return ChangeResult.NONE
        } else {
            console.log('leaf attribute', path, abstractControl.value)
            if (abstractControl.pristine === false && abstractControl.touched === true) {
                if (abstractControl.value === '') {

                    const fullPath = '/basket-delete' + path

                    const localStorageValue = {
                        newValue: 'null',
                        oldValue: abstractControl[ORIGINAL],
                        type: abstractControl[TYPE]
                    }

                    if (localStorageValue.newValue === localStorageValue.oldValue) {
                        localStorage.removeItem(fullPath)
                        return ChangeResult.NONE
                    } else {
                        localStorage.setItem(fullPath, JSON.stringify(localStorageValue).toString())
                        return ChangeResult.DELETED
                    }
                } else {
                    const fullPath = '/basket-update' + path

                    if (abstractControl.value === null) {
                        return ChangeResult.NONE
                    }
                    const localStorageValue = {
                        newValue: abstractControl.value,
                        oldValue: abstractControl[ORIGINAL],
                        type: abstractControl[TYPE]
                    }

                    if (abstractControl.value !== abstractControl[ORIGINAL]) {
                        localStorage.setItem(fullPath, JSON.stringify(localStorageValue).toString())
                        return ChangeResult.UPDATED
                    } else {
                        console.log('Dropped attribute', path, abstractControl.value)
                        localStorage.removeItem(fullPath)
                        return ChangeResult.NONE
                    }
                }
            } else {
                const fullPath = path
                console.log('Unchanged PATH: ', fullPath, 'Value', abstractControl.value,
                    'Original', abstractControl[ORIGINAL])
                return ChangeResult.NONE
            }
        }
    }

    buildPatchBody(): PatchBody {

        this.idMap.clear()
        this.pathMap.clear()
        this.profileIdPathCounter = 0
        this.pathCounter = 0
        this.arrayCounter = 0

        // TODO - Add change-name-100 back

        const patchBody = {
            'default-target': 'connectivity-service-v4',
            Updates: {},
            Deletes: {},
            Extensions: {
                'model-version-101': '4.0.0',
                'model-type-102': 'Aether'
            }
        }

        Object.keys(localStorage)
            .filter(updateKey => updateKey.startsWith('/basket-update'))
            .forEach((updateKey) => {
                const updatePathParts: string[] = updateKey.split('/')
                const updateValue: BasketValue = JSON.parse(localStorage.getItem(updateKey))
                this.recursePath(updatePathParts.slice(2), patchBody.Updates, updateValue, ['/unchanged-update'])
            })

        Object.keys(localStorage)
            .filter(deleteKey => deleteKey.startsWith('/basket-delete'))
            .forEach((deleteKey) => {
                const deletePathParts: string[] = deleteKey.split('/')
                const deleteValue: BasketValue = JSON.parse(localStorage.getItem(deleteKey))
                this.recursePath(deletePathParts.slice(2), patchBody.Deletes, deleteValue, ['/unchanged-delete'])
            })

        return patchBody as PatchBody
    }

    // FIXME what type should object be?
    recursePath(path: string[], object: unknown, value: BasketValue, unchangedPath?: string[]): void {
        const unchList = localStorage.getItem(unchangedPath.join('/'))
        // console.log(path, 'Search storage for', unchangedPath.join('/'), unchList);
        if (unchList !== null) {
            object[ADDITIONALPROPS] = {
                unchanged: unchList
            }
        }

        if (path.length === 1) {
            if (value.newValue === '') {
                object[path[0]] = value.oldValue
                if (value.type === HEX2NUM) {
                    object[path[0]] = parseInt(value.oldValue, 16)
                }
            } else {
                object[path[0]] = value.newValue
                if (value.type === HEX2NUM) {
                    object[path[0]] = parseInt(value.newValue, 16)
                }
            }

        } else if (path[0].includes('[')) {

            if (path.length < 2) {
                console.warn('path too short')
                return
            }
            unchangedPath.push(path[0])
            // a path might contain more than one key and will be in the form [key1=value1][key2=value2]
            const thisLevelPath: string = path[0]
            const container: string = thisLevelPath.slice(0, thisLevelPath.indexOf('['))
            if (object[container] === undefined) {
                object[container] = []
            }
            thisLevelPath.split('[').filter(part => part.endsWith(']')).forEach(part => {
                const keyName = part.slice(0, part.indexOf('='))
                const keyValue = part.slice(part.indexOf('=') + 1, part.lastIndexOf(']'))
                let childObj = {}

                object[container].forEach(child => {
                    if (child[keyName] === keyValue) {
                        console.log('Found existing child', keyName, '=', keyValue)
                        childObj = child
                    }
                })
                if (!childObj[keyName]) {
                    childObj[keyName] = keyValue
                    object[container].push(childObj)
                }

                this.recursePath(path.slice(1), childObj, value, unchangedPath)
            })

        } else {
            if (object[path[0]] === undefined) {
                object[path[0]] = {}
            }
            unchangedPath.push(path[0])
            this.recursePath(path.slice(1), object[path[0]], value, unchangedPath)
        }
    }
}
