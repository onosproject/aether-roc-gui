/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DeviceGroupDeviceGroupService, Service} from 'src/openapi3/aether/3.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {DeviceGroup} from '../../../openapi3/aether/3.0.0/models';
import {RocSelectBase} from '../../roc-select-base';

@Component({
    selector: 'aether-device-group-select',
    templateUrl: './device-group-select.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})
export class DeviceGroupSelectComponent extends RocSelectBase<DeviceGroupDeviceGroupService, DeviceGroup>
    implements OnInit {

    @Input() alreadySelected: string[] = [];
    @Output() closeEvent = new EventEmitter<string>();

    constructor(
        protected service: Service,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit(): void {
        super.getData(this.service.getDeviceGroup({target: AETHER_TARGETS[0]}),
            'device-group');
    }
}
