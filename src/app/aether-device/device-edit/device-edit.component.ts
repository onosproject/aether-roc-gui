/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BasketService, ORIGINAL } from '../../basket.service';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { RocEditBase } from '../../roc-edit-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { RocElement } from '../../../openapi3/top/level/models/elements';
import { EnterpriseEnterpriseSiteDevice } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-device';
import { DeviceDeviceService } from '../../../openapi3/aether/2.0.0/services/device-device.service';

@Component({
    selector: 'aether-device-edit',
    templateUrl: './device-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class DeviceEditComponent extends RocEditBase implements OnInit {
    data: EnterpriseEnterpriseSiteDevice;
    pathRoot = 'Enterprises-2.0.0/Site-2.0.0/Device-2.0.0' as RocElement;
    pathListAttr = 'device';
    deviceId;
    showParentDisplay = false;
    deviceForm = this.fb.group({
        id: [
            undefined,
            Validators.compose([
                Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
                Validators.minLength(1),
                Validators.maxLength(31),
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
        'sim-card': [undefined],
        imei: [undefined],
    });

    constructor(
        private deviceDeviceService: DeviceDeviceService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(snackBar, bs, route, router, 'Enterprises-2.0.0', 'upf');
        super.form = this.deviceForm;
        super.loadFunc = this.loadDeviceDevice;
    }

    ngOnInit(): void {
        super.init();
    }

    // closeShowParentCard(): void {
    //     this.showParentDisplay = false;
    // }

    loadDeviceDevice(target: string, id: string): void {
        this.deviceDeviceService
            .getDeviceDevice({
                target,
                id,
                ent_id: this.route.snapshot.params['ent-id'],
                site_id: this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.deviceId = value['device-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting DeviceDevice(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        this.pathRoot in basketPreview &&
                        this.pathListAttr in basketPreview['Device-2.0.0']
                    ) {
                        basketPreview['Device-2.0.0'].device.forEach(
                            (basketItems) => {
                                if (basketItems.id === id) {
                                    this.populateFormData(basketItems);
                                }
                            }
                        );
                    }
                    console.log('Finished loading DeviceDevice(s)', target, id);
                }
            );
    }

    private populateFormData(value: EnterpriseEnterpriseSiteDevice): void {
        if (value['display-name']) {
            this.deviceForm.get('display-name').setValue(value['display-name']);
            this.deviceForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value.description) {
            this.deviceForm.get('description').setValue(value.description);
            this.deviceForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.imei) {
            this.deviceForm.get('imei').setValue(value.imei);
            this.deviceForm.get('imei')[ORIGINAL] = value.imei;
        }
        if (value['sim-card']) {
            this.deviceForm.get('sim-card').setValue(value['sim-card']);
            this.deviceForm.get('sim-card')[ORIGINAL] = value['sim-card'];
        }
    }
}
