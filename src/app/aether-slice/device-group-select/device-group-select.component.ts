/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {
    OnChanges,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    DeviceGroupDeviceGroupService,
    Service,
} from 'src/openapi3/aether/4.0.0/services';
import { AETHER_TARGETS } from '../../../environments/environment';
import { DeviceGroup } from '../../../openapi3/aether/4.0.0/models';
import { RocSelectBase } from '../../roc-select-base';

@Component({
    selector: 'aether-device-group-select',
    templateUrl: './device-group-select.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class DeviceGroupSelectComponent
    extends RocSelectBase<DeviceGroupDeviceGroupService, DeviceGroup>
    implements OnInit, OnChanges
{
    @Input() alreadySelected: string[] = [];
    @Input() selectedSite: string;
    @Output() closeEvent = new EventEmitter<string>();

    DisplayedDeviceGroup = [];

    constructor(protected service: Service, protected fb: FormBuilder) {
        super(fb);
    }

    ngOnInit(): void {
        super.getData(
            this.service.getDeviceGroup({ target: AETHER_TARGETS[0] }),
            'device-group'
        );
    }

    ngOnChanges(): void {
        this.DisplayedDeviceGroup = [];
        this.displayList.forEach((eachDisplayDGList) => {
            if (eachDisplayDGList['site'] == this.selectedSite) {
                this.DisplayedDeviceGroup.push(eachDisplayDGList);
            }
        });
    }
}
