/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EnterprisesEnterpriseSiteService } from 'src/openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';
import { RocSelectBase } from '../../roc-select-base';
import { EnterprisesEnterpriseSite } from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseSiteDeviceGroup } from '../../../openapi3/aether/2.0.0/models';

@Component({
    selector: 'aether-device-group-select',
    templateUrl: './device-group-select.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class DeviceGroupSelectComponent
    extends RocSelectBase<
        EnterprisesEnterpriseSiteDeviceGroup,
        EnterprisesEnterpriseSite
    >
    implements OnInit
{
    @Input() alreadySelected: string[] = [];
    @Input() selectedEnterprise: string;
    @Input() selectedSite: string;
    @Output() closeEvent = new EventEmitter<string>();

    constructor(
        protected siteService: EnterprisesEnterpriseSiteService,
        protected fb: FormBuilder
    ) {
        super(fb, 'device-group-id');
    }

    ngOnInit(): void {
        super.getData(
            this.siteService.getEnterprisesEnterpriseSite({
                target: AETHER_TARGET,
                'enterprise-id': this.selectedEnterprise,
                'site-id': this.selectedSite,
            }),
            'device-group'
        );
    }
}
