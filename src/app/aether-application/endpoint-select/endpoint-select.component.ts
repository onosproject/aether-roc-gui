/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from '../../../openapi3/aether/3.0.0/services';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AETHER_TARGETS} from '../../../environments/environment';
import {RocSelectBase} from '../../roc-select-base';

export interface EndPointParam {
    name: string;
    address: string;
    protocol: string;
    portStart: number;
    portEnd: number;
}

const ValidatePortRange: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const portStart = control.get(['port-start']).value;
    const portEnd = control.get(['port-end']).value;
    return portStart <= portEnd ? null : {isEndpointNotValid: true};
};

@Component({
    selector: 'aether-endpoint-select',
    templateUrl: './endpoint-select.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})
export class EndpointSelectComponent {

    protocolOptions = [
        {name: 'UDP'},
        {name: 'TCP'},
    ];

    @Input() alreadySelected: string[] = [];
    @Output() closeEvent = new EventEmitter<EndPointParam>();

    endpointForm = this.fb.group({
        name: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        address: [undefined],
        'port-start': [undefined,
            Validators.compose([
                Validators.min(1),
                Validators.max(65535)
            ])
        ],
        'port-end': [undefined,
            Validators.compose([
                Validators.min(1),
                Validators.max(65535)
            ])],
        protocol: [undefined]
    }, {validators: ValidatePortRange});

    constructor(
        protected service: Service,
        protected fb: FormBuilder
    ) {
    }

    closeCard(cancelled: boolean): void {
        if (cancelled) {
            this.closeEvent.emit();
        } else {
            this.closeEvent.emit({
                name: this.endpointForm.get('name').value,
                address: this.endpointForm.get('address').value,
                portStart: this.endpointForm.get('port-start').value,
                portEnd: this.endpointForm.get('port-end').value,
                protocol: this.endpointForm.get('protocol').value
            } as EndPointParam);
        }
    }

}
