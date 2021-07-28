/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
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
export class ImsisSelectComponent implements OnInit, OnChanges {

    @Output() closeEvent = new EventEmitter<ImsiParam>();
    @Input() ImisLengthLimits: number = 0;
    ImsiRangeLimit: number = 0;

    imsiForm = this.fb.group({
        name: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'imsi-range-from': [0],
        'imsi-range-to': [0],
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
        } else {
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
    ngOnChanges(): void {
        this.ImsiRangeLimit = Math.pow(10, this.ImisLengthLimits) - 1;
        this.imsiForm.get('imsi-range-from').clearValidators();
        this.imsiForm.get('imsi-range-from').setValidators([
            Validators.required,
            Validators.min(0),
            Validators.max(this.ImsiRangeLimit),
        ]);
        this.imsiForm.get('imsi-range-to').clearValidators();
        this.imsiForm.get('imsi-range-to').setValidators([
            Validators.required,
            Validators.min(0),
            Validators.max(this.ImsiRangeLimit),
        ]);
    }

}
