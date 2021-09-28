/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DeviceGroupDeviceGroupImsis} from '../../../openapi3/aether/3.0.0/models/device-group-device-group-imsis';
import {maxDeviceGroupRange} from "../../../environments/environment";

export interface ImsiParam {
    name: string;
    'imsi-range-from': number;
    'imsi-range-to': number;
}

const ValidateImsiRange: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const ImsiFromRange = control.get('imsi-range-from').value;
    const ImsiToRange = control.get('imsi-range-to').value;
    return ((ImsiFromRange <= ImsiToRange) &&
        (ImsiToRange <= (maxDeviceGroupRange + ImsiFromRange))) ? null : {isRangeNotValid: true};
};

@Component({
    selector: 'aether-imsis-select',
    templateUrl: './imsis-select.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class ImsisSelectComponent implements OnInit, OnChanges {

    @Output() closeEvent = new EventEmitter<ImsiParam>();
    @Input() ImisLengthLimits: number = 0;
    @Input() OtherImsi: Array<DeviceGroupDeviceGroupImsis> = [];
    ImsiRangeLimit: number = 0;

    imsiForm = this.fb.group({
        name: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'imsi-range-from': [undefined],
        'imsi-range-to': [undefined],
    }, {validator: ValidateImsiRange});
    maxDeviceGroupRange = maxDeviceGroupRange;

    constructor(
        protected fb: FormBuilder,
    ) {
    }

    closeCard(cancelled: boolean): void {
        if (cancelled === true) {
            this.closeEvent.emit();
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
        this.formControlValueChanged();
    }

    formControlValueChanged(): void {
        let isValid: boolean;
        if (this.OtherImsi.length !== 0) {
            this.imsiForm.valueChanges.subscribe((changedValue) => {
                const ImsiFromRange = changedValue['imsi-range-from'];
                const ImsiToRange = changedValue['imsi-range-to'];
                this.OtherImsi.every(eachImsi => {
                    isValid = ((ImsiToRange < eachImsi['imsi-range-from'] || ImsiFromRange > eachImsi['imsi-range-to'])
                        && (ImsiFromRange <= ImsiToRange &&
                            ImsiToRange <= (maxDeviceGroupRange + (ImsiFromRange)))) ? true : false;
                });
                if (!isValid) {
                    this.imsiForm.setErrors({isRangeNotValid: true});
                }
            });
        }
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
