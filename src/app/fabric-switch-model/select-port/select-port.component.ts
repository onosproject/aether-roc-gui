/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwitchModelPort } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'aether-select-port',
    templateUrl: './select-port.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class SelectPortComponent {
    @Input() portsAlreadyUsed: number[] = [];
    @Output() closeEvent = new EventEmitter<SwitchModelPort>();

    portForm = this.fb.group({
        'cage-number': [undefined, Validators.compose([Validators.required])],
        'max-channel': [undefined, Validators.max(16)],
        'display-name': [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
        description: [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(1024),
            ]),
        ],
        speeds: this.fb.array([]),
    });

    constructor(protected fb: FormBuilder) {}

    closeCard(cancelled: boolean): void {
        if (cancelled) {
            this.closeEvent.emit();
        } else {
            this.closeEvent.emit({
                'cage-number': this.portForm.get('cage-number').value,
                'display-name': this.portForm.get('display-name').value,
                description: this.portForm.get(['description']).value,
                'max-channel': this.portForm.get(['max-channel']).value,
            } as SwitchModelPort);
        }
    }
}
