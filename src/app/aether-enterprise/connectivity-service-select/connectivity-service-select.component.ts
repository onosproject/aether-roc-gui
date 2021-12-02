/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    ConnectivityServiceConnectivityServiceService,
    Service,
} from '../../../openapi3/aether/4.0.0/services';
import { FormBuilder } from '@angular/forms';
import { AETHER_TARGETS } from '../../../environments/environment';
import {
    ConnectivityService,
} from '../../../openapi3/aether/4.0.0/models';
import { RocSelectBase } from '../../roc-select-base';

@Component({
    selector: 'aether-connectivity-service-select',
    templateUrl: './connectivity-service-select.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ConnectivityServiceSelectComponent
    extends RocSelectBase<
        ConnectivityServiceConnectivityServiceService,
        ConnectivityService
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
            this.service.getConnectivityService({ target: AETHER_TARGETS[0] }),
            'connectivity-service'
        );
    }
}
