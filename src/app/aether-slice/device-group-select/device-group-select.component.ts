/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RocSelectBase } from '../../roc-select-base';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';
import { Site, SiteDeviceGroup } from '../../../openapi3/aether/2.1.0/models';

@Component({
    selector: 'aether-device-group-select',
    templateUrl: './device-group-select.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class DeviceGroupSelectComponent
    extends RocSelectBase<SiteDeviceGroup, Site>
    implements OnInit
{
    @Input() alreadySelected: string[] = [];
    @Input() selectedEnterprise: string;
    @Input() selectedSite: string;
    @Output() closeEvent = new EventEmitter<string>();

    constructor(protected siteService: SiteService, protected fb: FormBuilder) {
        super(fb, 'device-group-id');
    }

    ngOnInit(): void {
        super.getData(
            this.siteService.getSite({
                'enterprise-id': this.selectedEnterprise,
                'site-id': this.selectedSite,
            }),
            'device-group'
        );
    }
}
