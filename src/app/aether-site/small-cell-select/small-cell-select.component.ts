/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Service } from '../../../openapi3/aether/2.0.0/services/service';

export interface SmallCellParam {
    'small-cell-id': string;
    'display-name': string;
    address: string;
    tac: string;
}

@Component({
    selector: 'aether-small-cell-select',
    templateUrl: './small-cell-select.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class SmallCellSelectComponent {
    @Output() closeEvent = new EventEmitter<SmallCellParam>();

    smallCellForm = this.fb.group({
        'small-cell-id': [undefined, Validators.compose([Validators.required])],
        'display-name': [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
        address: [undefined],
        tac: [
            undefined,
            Validators.compose([
                Validators.minLength(4),
                Validators.maxLength(8),
            ]),
        ],
    });

    constructor(protected service: Service, protected fb: FormBuilder) {}

    closeCard(cancelled: boolean): void {
        if (cancelled) {
            this.closeEvent.emit();
        } else {
            this.closeEvent.emit({
                'small-cell-id': this.smallCellForm.get('small-cell-id').value,
                'display-name': this.smallCellForm.get('display-name').value,
                address: this.smallCellForm.get('address').value,
                tac: this.smallCellForm.get('tac').value,
            } as SmallCellParam);
        }
    }
}
