/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from '../../../openapi3/aether/3.0.0/services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AETHER_TARGETS} from '../../../environments/environment';
import {RocSelectBase} from '../../roc-select-base';

@Component({
    selector: 'aether-endpoint-select',
    templateUrl: './endpoint-select.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})
export class EndpointSelectComponent implements OnInit {

    protocolOptions = [
        {name: 'UDP'},
        {name: 'TCP'},
    ];

    @Input() alreadySelected: string[] = [];
    @Output() closeEvent = new EventEmitter<object>();

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
    });

    constructor(
        protected service: Service,
        protected fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
    }

    closeCard(selected): void {
        if (selected !== undefined) {
            this.closeEvent.emit(selected.value);
        }
    }

}
