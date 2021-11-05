/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {FormBuilder} from '@angular/forms'
import {mergeMap, pluck} from 'rxjs/operators'
import {from, Observable} from 'rxjs'
import {EventEmitter} from '@angular/core'

const IDATTR = 'id'

export abstract class RocSelectBase<T, U> {
    abstract alreadySelected: string[] = [];
    abstract closeEvent = new EventEmitter<string>();
    displayList: T[] = [];

    selectForm = this.fb.group({
        'select-item': [''],
    });

    protected constructor(
        protected fb: FormBuilder,
    ) {
    }

    protected getData(obs: Observable<U>, pluckName: string): void {
        obs.pipe(
            pluck(pluckName),
            mergeMap((items: T[]) => from(items)),
        ).subscribe(
            value => {
                const exists = this.alreadySelected.indexOf(value[IDATTR])
                if (exists === -1) {
                    this.displayList.push(value)
                }
            }
        )
    }

    closeCard(selected: string): void {
        this.closeEvent.emit(selected)
    }
}
