/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from '../../../../openapi3/aether/2.1.0/services';
import {FormBuilder} from '@angular/forms';
import {AETHER_TARGETS} from '../../../../environments/environment';
import {ServicePolicy, ServicePolicyServicePolicy} from '../../../../openapi3/aether/2.1.0/models';
import {RocSelectBase} from '../../../roc-select-base';

@Component({
    selector: 'aether-service-policy-select',
    templateUrl: './service-policy-select.component.html',
    styleUrls: ['../../../common-panel.component.scss']
})
export class ServicePolicySelectComponent extends RocSelectBase<ServicePolicyServicePolicy, ServicePolicy> implements OnInit {
    @Input() alreadySelected: string[] = [];
    @Output() closeEvent = new EventEmitter<string>();

    constructor(
        protected service: Service,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit(): void {
        super.getData(this.service.getServicePolicy({target: AETHER_TARGETS[0]}),
            'service-policy');
    }
}
