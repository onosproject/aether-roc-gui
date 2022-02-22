/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RocSelectBase } from '../../roc-select-base';
import { EnterprisesEnterpriseSite } from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseSiteDevice } from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseSiteService } from '../../../openapi3/aether/2.0.0/services';
import { FormBuilder } from '@angular/forms';
import { AETHER_TARGET } from '../../../environments/environment';

@Component({
    selector: 'aether-device-select',
    templateUrl: './device-select.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class DeviceSelectComponent
    extends RocSelectBase<
        EnterprisesEnterpriseSiteDevice,
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
        super(fb, 'device-id');
    }

    ngOnInit(): void {
        super.getData(
            this.siteService.getEnterprisesEnterpriseSite({
                target: AETHER_TARGET,
                'enterprise-id': this.selectedEnterprise,
                'site-id': this.selectedSite,
            }),
            'device'
        );
    }
}
