/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SwitchAttribute } from '../../../openapi3/sdn-fabric/0.1.0/models';

@Component({
    selector: 'aether-select-attribute',
    templateUrl: './select-attribute.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class SelectAttributeComponent {
    @Input() keysAlreadyUsed: string[] = [];
    @Output() closeEvent = new EventEmitter<SwitchAttribute>();

    attributeForm = this.fb.group({
        'attribute-key': [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(40),
                Validators.pattern(`[a-zA-Z_][a-zA-Z0-9\\-_.]*`),
            ]),
        ],
        'attribute-value': [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(200),
            ]),
        ],
    });

    constructor(protected fb: FormBuilder) {}

    closeCard(cancelled: boolean): void {
        if (cancelled) {
            this.closeEvent.emit();
        } else {
            this.closeEvent.emit({
                'attribute-key': this.attributeForm.get(['attribute-key'])
                    .value,
                value: this.attributeForm.get(['attribute-value']).value,
            } as SwitchAttribute);
        }
    }
}
