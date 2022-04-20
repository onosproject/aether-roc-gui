/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RocSelectBase } from '../../roc-select-base';
import { FormBuilder } from '@angular/forms';
import { SiteDevice, Site } from '../../../openapi3/aether/2.1.0/models';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';
import { TargetName } from '../../../openapi3/top/level/models';

@Component({
    selector: 'aether-device-select',
    templateUrl: './device-select.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class DeviceSelectComponent
    extends RocSelectBase<SiteDevice, Site>
    implements OnInit
{
    @Input() alreadySelected: string[] = [];
    @Input() selectedEnterprise: TargetName;
    @Input() selectedSite: string;
    @Output() closeEvent = new EventEmitter<string>();

    constructor(protected siteService: SiteService, protected fb: FormBuilder) {
        super(fb, 'device-id');
    }

    ngOnInit(): void {
        super.getData(
            this.siteService.getSite({
                'enterprise-id': this.selectedEnterprise.name,
                'site-id': this.selectedSite,
            }),
            'device'
        );
    }
}
