/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    ConnectivityServicesConnectivityServiceService,
    Service,
} from '../../../openapi3/aether/2.0.0/services';
import { FormBuilder } from '@angular/forms';
import { AETHER_TARGET } from '../../../environments/environment';
import { ConnectivityServices } from '../../../openapi3/aether/2.0.0/models';
import { RocSelectBase } from '../../roc-select-base';

@Component({
    selector: 'aether-connectivity-service-select',
    templateUrl: './connectivity-service-select.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ConnectivityServiceSelectComponent
    extends RocSelectBase<
        ConnectivityServicesConnectivityServiceService,
        ConnectivityServices
    >
    implements OnInit
{
    @Input() alreadySelected: string[] = [];
    @Output() closeEvent = new EventEmitter<string>();

    constructor(protected service: Service, protected fb: FormBuilder) {
        super(fb);
    }

    ngOnInit(): void {
        super.getData(
            this.service.getConnectivityServices({ target: AETHER_TARGET }),
            'connectivity-service'
        );
    }
}
