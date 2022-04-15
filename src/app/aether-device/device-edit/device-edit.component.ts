/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import {
    EnterprisesEnterpriseSiteDevice,
    EnterprisesEnterpriseSiteSimCard,
} from '../../../openapi3/aether/2.0.0/models';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService, ORIGINAL } from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import {
    EnterprisesEnterpriseSiteDeviceService,
    EnterprisesEnterpriseSiteService,
    Service as AetherService,
} from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';
import * as _ from 'lodash';
import { DeviceDatasource } from '../device/device-datasource';
import { deviceModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';

@Component({
    selector: 'aether-device-edit',
    templateUrl: './device-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class DeviceEditComponent
    extends RocEditBase<DeviceDatasource>
    implements OnInit
{
    data: EnterprisesEnterpriseSiteDevice;
    pathListAttr = 'device';
    deviceId: string;
    showParentDisplay = false;
    simCards: Array<EnterprisesEnterpriseSiteSimCard> = [];

    deviceForm = this.fb.group({
        'device-id': [
            undefined,
            Validators.compose([
                Validators.pattern('[a-z]([a-z0-9-]?[a-z0-9])*'),
                Validators.minLength(1),
                Validators.maxLength(63),
            ]),
        ],
        'display-name': [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
        description: [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(1024),
            ]),
        ],
        imei: [
            undefined,
            Validators.compose([
                Validators.pattern('([0-9]{14,16})'),
                Validators.minLength(14),
                Validators.maxLength(16),
            ]),
        ],
        'sim-card': [
            { value: '', disabled: true },
            Validators.compose([
                Validators.pattern('[a-z]([a-z0-9-]?[a-z0-9])*'),
                Validators.minLength(1),
                Validators.maxLength(63),
            ]),
        ],
    });

    constructor(
        private deviceService: EnterprisesEnterpriseSiteDeviceService,
        private siteService: EnterprisesEnterpriseSiteService,
        protected enterpriseService: EnterpriseService,

        protected aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            snackBar,
            bs,
            route,
            new DeviceDatasource(enterpriseService, bs),
            deviceModelPath,
            aetherService
        );
        super.form = this.deviceForm;
        super.loadFunc = this.loadDevice;
    }

    ngOnInit(): void {
        super.init();
    }

    closeShowParentCard(): void {
        this.showParentDisplay = false;
    }

    loadDevice(target: string, deviceId: string): void {
        if (
            this.enterpriseId == this.unknownEnterprise ||
            this.siteId == this.unknownSite
        ) {
            return;
        }

        this.deviceService
            .getEnterprisesEnterpriseSiteDevice({
                target: AETHER_TARGET,
                'device-id': deviceId,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.deviceId = value['device-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting EnterprisesEnterpriseSiteDevice(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        deviceModelPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(
                            model as EnterprisesEnterpriseSiteDevice
                        );
                    }
                    console.log(
                        'Finished loading EnterprisesEnterpriseSiteDevice(s)',
                        target,
                        deviceId
                    );
                    this.loadSimCards(); // Needs Device to be loaded first
                }
            );
    }

    private populateFormData(value: EnterprisesEnterpriseSiteDevice): void {
        if (value['device-id']) {
            this.deviceForm.get('device-id').setValue(value['device-id']);
            this.deviceForm.get('device-id')[ORIGINAL] = value['device-id'];
        }
        if (value['display-name']) {
            this.deviceForm.get('display-name').setValue(value['display-name']);
            this.deviceForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value.description) {
            this.deviceForm.get('description').setValue(value.description);
            this.deviceForm.get('description')[ORIGINAL] = value.description;
        }
        if (value['sim-card'] != null) {
            this.deviceForm.get('sim-card').setValue(value['sim-card']);
            this.deviceForm.get('sim-card')[ORIGINAL] = value['sim-card'];
        }
        if (value.imei) {
            this.deviceForm.get('imei').setValue(value.imei);
            this.deviceForm.get('imei')[ORIGINAL] = value.imei;
        }
    }

    loadSimCards(): void {
        if (
            this.enterpriseId == this.unknownEnterprise ||
            this.siteId == this.unknownSite
        ) {
            return;
        }
        this.siteService
            .getEnterprisesEnterpriseSite({
                target: AETHER_TARGET,
                'enterprise-id': this.enterpriseId,
                'site-id': this.siteId,
            })
            .subscribe(
                (value) => {
                    const simCardControl = this.deviceForm.get('sim-card');
                    const usedSims = value.device.map((d) => d['sim-card']);
                    this.simCards = value['sim-card'].reduce((list, item) => {
                        if (
                            _.indexOf(usedSims, item['sim-id']) == -1 ||
                            item['sim-id'] === simCardControl.value
                        ) {
                            return [item, ...list];
                        }
                        return list;
                    }, [] as EnterprisesEnterpriseSiteSimCard[]);
                    console.log(
                        `Showing ${this.simCards.length} unused Sim Cards. Total ${value['sim-card'].length}`
                    );
                    simCardControl.enable();
                },
                (error) => {
                    console.warn(
                        'Error getting SimCards for ',
                        AETHER_TARGET,
                        error
                    );
                }
            );
    }
}
