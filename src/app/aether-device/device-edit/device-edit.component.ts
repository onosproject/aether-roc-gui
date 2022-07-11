/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService, ORIGINAL } from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import * as _ from 'lodash';
import { DeviceDatasource } from '../device/device-datasource';
import { deviceModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteSimCard, SiteDevice } from '../../../openapi3/aether/2.1.0/models';
import {
    SiteDeviceService,
    SiteService,
} from '../../../openapi3/aether/2.1.0/services';

@Component({
    selector: 'aether-device-edit',
    templateUrl: './device-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class DeviceEditComponent
    extends RocEditBase<DeviceDatasource>
    implements OnInit
{
    data: SiteDevice;
    pathListAttr = 'device';
    deviceId: string;
    showParentDisplay = false;
    simCards: Array<SiteSimCard> = [];

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
        private deviceService: SiteDeviceService,
        protected siteService: SiteService,
        protected enterpriseService: EnterpriseService,

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
            enterpriseService,
            siteService,
            route,
            fb,
            new DeviceDatasource(enterpriseService, bs),
            deviceModelPath
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

    loadDevice(deviceId: string): void {
        if (
            this.targetId.name == this.unknownTarget ||
            this.siteId == this.unknownSite
        ) {
            return;
        }

        this.deviceService
            .getSiteDevice({
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
                        'Error getting SiteDevice(s) for ',
                        this.targetId,
                        this.siteId,
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
                        this.populateFormData(model as SiteDevice);
                    }
                    console.log(
                        'Finished loading SiteDevice(s)',
                        this.targetId,
                        this.siteId,
                        deviceId
                    );
                    this.loadSimCards(); // Needs Device to be loaded first
                }
            );
    }

    private populateFormData(value: SiteDevice): void {
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
            this.targetId.name == this.unknownTarget ||
            this.siteId == this.unknownSite
        ) {
            return;
        }
        this.siteService
            .getSite({
                'enterprise-id': this.targetId.name,
                'site-id': this.siteId,
            })
            .subscribe(
                (value) => {
                    const simCardControl = this.deviceForm.get('sim-card');
                    const usedSims = value.device.map((d) => d['sim-card']);
                    if (value['sim-card']) {
                        this.simCards = value['sim-card'].reduce(
                            (list, item) => {
                                if (
                                    _.indexOf(usedSims, item['sim-id']) == -1 ||
                                    item['sim-id'] === simCardControl.value
                                ) {
                                    return [item, ...list];
                                }
                                return list;
                            },
                            [] as SiteSimCard[]
                        );
                        console.log(
                            `Showing ${this.simCards.length} unused Sim Cards. Total ${value['sim-card'].length}`
                        );
                        simCardControl.enable();
                    }
                },
                (error) => {
                    console.warn(
                        'Error getting SimCards for ',
                        this.targetId,
                        error
                    );
                }
            );
    }
}
