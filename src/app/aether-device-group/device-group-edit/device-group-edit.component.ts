/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
    EnterprisesEnterpriseService,
    Service as AetherService,
} from '../../../openapi3/aether/2.0.0/services';
import {
    BasketService,
    IDATTRIBS,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs/operators';
import { Bandwidths } from '../../aether-template/template-edit/template-edit.component';
import { Observable } from 'rxjs';
import { EnterprisesEnterpriseSiteDeviceGroup } from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseSiteIpDomain } from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseTrafficClass } from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseSiteDeviceGroupService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';
import { DeviceGroupDatasource } from '../device-group/device-group-datasource';
import { deviceGroupModelPath } from '../../models-info';

@Component({
    selector: 'aether-device-group-edit',
    templateUrl: './device-group-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class DeviceGroupEditComponent
    extends RocEditBase<DeviceGroupDatasource>
    implements OnInit
{
    data: EnterprisesEnterpriseSiteDeviceGroup;
    ipdomain: Array<EnterprisesEnterpriseSiteIpDomain>;
    showParentDisplay = false;
    showDeviceDisplay: boolean;
    trafficClass: Array<EnterprisesEnterpriseTrafficClass>;
    options: Bandwidths[] = [
        { megabyte: { numerical: 1000000, inMb: '1Mbps' } },
        { megabyte: { numerical: 2000000, inMb: '2Mbps' } },
        { megabyte: { numerical: 5000000, inMb: '5Mbps' } },
        { megabyte: { numerical: 10000000, inMb: '10Mbps' } },
        { megabyte: { numerical: 25000000, inMb: '25Mbps' } },
        { megabyte: { numerical: 50000000, inMb: '50Mbps' } },
        { megabyte: { numerical: 100000000, inMb: '100Mbps' } },
        { megabyte: { numerical: 500000000, inMb: '500Mbps' } },
    ];
    bandwidthOptions: Observable<Bandwidths[]>;

    deviceGroupForm = this.fb.group({
        'device-group-id': [
            undefined,
            Validators.compose([
                Validators.pattern('[a-z]([a-z0-9-]?[a-z0-9])*'),
                Validators.minLength(1),
                Validators.maxLength(63),
            ]),
        ],
        description: [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(1024),
            ]),
        ],
        'display-name': [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
        'ip-domain': [undefined],
        mbr: this.fb.group({
            uplink: [
                undefined,
                Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295),
                ]),
            ],
            downlink: [
                undefined,
                Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295),
                ]),
            ],
        }),
        'traffic-class': [{ value: '', disabled: true }],
        device: this.fb.array([]),
    });
    deviceGroupId: string;

    constructor(
        private deviceGroupDeviceGroupService: EnterprisesEnterpriseSiteDeviceGroupService,
        protected entService: EnterprisesEnterpriseService,
        protected aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            snackBar,
            bs,
            route,
            router,
            new DeviceGroupDatasource(aetherService, bs, AETHER_TARGET),
            deviceGroupModelPath,
            aetherService
        );
        super.form = this.deviceGroupForm;
        super.loadFunc = this.loadDeviceGroupDeviceGroup;
        this.deviceGroupForm.get(['mbr'])[REQDATTRIBS] = ['uplink', 'downlink'];
        this.deviceGroupForm[REQDATTRIBS] = ['traffic-class'];
        this.deviceGroupForm.get('device')[IDATTRIBS] = ['device-id'];
    }

    ngOnInit(): void {
        super.init();
        this.loadTrafficClass();
        this.deviceGroupForm.get(['mbr', 'uplink'])[TYPE] = 'number';
        this.deviceGroupForm.get(['mbr', 'downlink'])[TYPE] = 'number';
        this.deviceGroupForm.get(['traffic-class'])[TYPE] = 'string';
        this.bandwidthOptions = this.deviceGroupForm.valueChanges.pipe(
            startWith(''),
            map((value) =>
                typeof value === 'number' ? value : value.megabyte
            ),
            map((megabyte) =>
                megabyte ? this._filter() : this.options.slice()
            )
        );
    }

    private _filter(): Bandwidths[] {
        return this.options.filter((option) => option.megabyte.numerical);
    }

    get mbrControls(): FormGroup {
        return this.deviceGroupForm.get(['mbr']) as FormGroup;
    }

    get deviceControls(): FormArray {
        return this.deviceGroupForm.get('device') as FormArray;
    }

    get deviceExists(): string[] {
        const existingList: string[] = [];
        (this.deviceGroupForm.get(['device']) as FormArray).controls.forEach(
            (devCtl) => {
                existingList.push(devCtl.get('device-id').value);
            }
        );
        return existingList;
    }

    deviceSelected(selected: string): void {
        // Push into form
        if (selected !== undefined && selected !== '') {
            const deviceIdFormControl = this.fb.control(selected);
            deviceIdFormControl.markAsTouched();
            deviceIdFormControl.markAsDirty();
            const enabledControl = this.fb.control(true); // Default as true
            enabledControl.markAsTouched();
            enabledControl.markAsDirty();
            enabledControl[TYPE] = 'boolean';
            (this.deviceGroupForm.get('device') as FormArray).push(
                this.fb.group({
                    'device-id': deviceIdFormControl,
                    enable: enabledControl,
                })
            );
            this.deviceGroupForm.get('device').markAsTouched();
            console.log('Adding new Value', selected);
        }
        this.showDeviceDisplay = false;
    }

    deleteFromSelect(devid: string): void {
        this.bs.deleteIndexedEntry(
            '/' + this.fullPath + '/device[device-id=' + devid + ']',
            'device-id',
            devid,
            this.ucmap()
        );
        const index = (
            this.deviceGroupForm.get(['device']) as FormArray
        ).controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === devid);
        (this.deviceGroupForm.get(['device']) as FormArray).removeAt(index);
        this.snackBar.open(
            'Deletion of ' + devid + ' added to basket',
            undefined,
            { duration: 2000 }
        );
    }

    private populateFormData(
        value: EnterprisesEnterpriseSiteDeviceGroup
    ): void {
        if (value['device-group-id']) {
            this.deviceGroupForm
                .get('device-group-id')
                .setValue(value['device-group-id']);
            this.deviceGroupForm.get('device-group-id')[ORIGINAL] =
                value['device-group-id'];
        }
        if (value['display-name']) {
            this.deviceGroupForm
                .get('display-name')
                .setValue(value['display-name']);
            this.deviceGroupForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value['ip-domain']) {
            this.deviceGroupForm.get('ip-domain').setValue(value['ip-domain']);
            this.deviceGroupForm.get('ip-domain')[ORIGINAL] =
                value['ip-domain'];
        }
        if (value.description) {
            this.deviceGroupForm.get('description').setValue(value.description);
            this.deviceGroupForm.get('description')[ORIGINAL] =
                value.description;
        }
        if (value['traffic-class']) {
            this.deviceGroupForm
                .get(['traffic-class'])
                .setValue(value['traffic-class']);
            this.deviceGroupForm.get(['traffic-class'])[ORIGINAL] =
                value.mbr['traffic-class'];
        }
        if (value.mbr) {
            this.deviceGroupForm
                .get(['mbr', 'uplink'])
                .setValue(value.mbr.uplink);
            this.deviceGroupForm
                .get(['mbr', 'downlink'])
                .setValue(value.mbr.downlink);
            this.deviceGroupForm.get(['mbr', 'downlink'])[ORIGINAL] =
                value.mbr.uplink;
            this.deviceGroupForm.get(['mbr', 'downlink'])[ORIGINAL] =
                value.mbr.downlink;
        }
        if (value['device'] && this.deviceGroupForm.value.device.length === 0) {
            for (const dev of value.device) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter((checkerKey) =>
                        checkerKey.startsWith(
                            '/basket-delete/device-group-2.0.0/device-group[device-group-id=' +
                                this.id +
                                ']/device[device='
                        )
                    )
                    .forEach((checkerKey) => {
                        if (checkerKey.includes(dev['device-id'])) {
                            isDeleted = true;
                        }
                    });
                if (!isDeleted) {
                    const deviceIdFormControl = this.fb.control(
                        dev['device-id']
                    );
                    deviceIdFormControl[ORIGINAL] = dev['device-id'];
                    const enabledControl = this.fb.control(dev.enable);
                    enabledControl[ORIGINAL] = dev.enable;
                    enabledControl[TYPE] = 'boolean';
                    (this.deviceGroupForm.get('device') as FormArray).push(
                        this.fb.group({
                            'device-id': deviceIdFormControl,
                            enable: enabledControl,
                        })
                    );
                }
            }
        }
    }

    loadDeviceGroupDeviceGroup(target: string, id: string): void {
        if (
            this.enterpriseId == this.unknownEnterprise ||
            this.siteId == this.unknownSite
        ) {
            return;
        }

        this.deviceGroupDeviceGroupService
            .getEnterprisesEnterpriseSiteDeviceGroup({
                target: AETHER_TARGET,
                'device-group-id': id,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.deviceGroupId = value['device-group-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting EnterprisesEnterpriseSiteDeviceGroup(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        deviceGroupModelPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(
                            model as EnterprisesEnterpriseSiteDeviceGroup
                        );
                    }
                    console.log(
                        'Finished loading EnterprisesEnterpriseSiteDeviceGroup(s)',
                        target,
                        id
                    );
                }
            );
    }

    loadTrafficClass(): void {
        if (this.enterpriseId == this.unknownEnterprise) {
            return;
        }
        this.entService
            .getEnterprisesEnterprise({
                target: AETHER_TARGET,
                'enterprise-id': this.enterpriseId,
            })
            .subscribe(
                (value) => {
                    this.trafficClass = value['traffic-class'];
                    // might as well load the IP Domains while we're here
                    const thisSite = value.site.find(
                        (s) =>
                            s['site-id'] ===
                            this.route.snapshot.params['site-id']
                    );
                    if (thisSite !== undefined) {
                        this.ipdomain = thisSite['ip-domain'];
                    }
                    this.form.get('traffic-class').enable();
                },
                (error) => {
                    console.warn(
                        `Error getting Traffic Class for ${AETHER_TARGET}: ${error}`
                    );
                }
            );
    }
}
