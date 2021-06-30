/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

export interface ImsiParam {
    name: string;
    'imsi-range-from': number;
    'imsi-range-to': number;
    cancelled: boolean;
}

@Component({
    selector: 'aether-imsis-select',
    templateUrl: './imsis-select.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class ImsisSelectComponent implements OnInit {

    @Output() closeEvent = new EventEmitter<ImsiParam>();

    imsiForm = this.fb.group({
        name: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'imsi-range-from': [''],
        'imsi-range-to': ['']
    });

    constructor(
        protected fb: FormBuilder,
    ) {
    }

    closeCard(cancelled: boolean): void {
        if (cancelled === true) {
            this.closeEvent.emit({
                cancelled: true
            } as ImsiParam);
            return;
        }
        else {
            this.closeEvent.emit({
                name: this.imsiForm.get('name').value,
                'imsi-range-from': this.imsiForm.get('imsi-range-from').value,
                'imsi-range-to': this.imsiForm.get('imsi-range-to').value,
                cancelled: false
            } as ImsiParam);
        }
    }

    ngOnInit(): void {
    }

}
