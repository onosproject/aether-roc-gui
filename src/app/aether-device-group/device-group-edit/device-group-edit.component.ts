/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
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
import { EnterpriseEnterpriseSiteDeviceGroup } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-device-group';
import { EnterpriseEnterpriseSiteIpDomain } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-ip-domain';
import { EnterpriseEnterpriseTrafficClass } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-traffic-class';
import { DeviceGroupDeviceGroupService } from '../../../openapi3/aether/2.0.0/services/device-group-device-group.service';
import { RocElement } from '../../../openapi3/top/level/models/elements';

@Component({
    selector: 'aether-device-group-edit',
    templateUrl: './device-group-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class DeviceGroupEditComponent extends RocEditBase implements OnInit {
    pathRoot = ('Enterprises-2.0.0/enterprise' +
        '[enterprise-id=' +
        this.route.snapshot.params['enterprise-id'] +
        ']/site' +
        '[site-id=' +
        this.route.snapshot.params['site-id'] +
        ']') as RocElement;
    data: EnterpriseEnterpriseSiteDeviceGroup;
    ipdomain: Array<EnterpriseEnterpriseSiteIpDomain>;
    showParentDisplay = false;
    trafficClass: Array<EnterpriseEnterpriseTrafficClass>;
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
                Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
                Validators.minLength(1),
                Validators.maxLength(31),
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
            'traffic-class': [undefined],
        }),
    });
    deviceGroupId: string;

    constructor(
        private deviceGroupDeviceGroupService: DeviceGroupDeviceGroupService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(snackBar, bs, route, router, 'Enterprises-2.0.0', 'device-group');
        super.form = this.deviceGroupForm;
        super.loadFunc = this.loadDeviceGroupDeviceGroup;
        this.deviceGroupForm.get(['mbr'])[REQDATTRIBS] = ['uplink', 'downlink'];
    }

    ngOnInit(): void {
        this.loadIpDomains(this.target);
        this.loadTrafficClass(this.target);
        super.init();
        this.deviceGroupForm.get(['mbr', 'uplink'])[TYPE] = 'number';
        this.deviceGroupForm.get(['mbr', 'downlink'])[TYPE] = 'number';
        this.deviceGroupForm.get(['mbr', 'traffic-class'])[TYPE] = 'string';
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

    deleteFromSelect(im: string): void {
        this.bs.deleteIndexedEntry(
            '/Device-group-2.0.0/device-group[id=' +
                this.id +
                ']/imsis[imsi-id=' +
                im +
                ']',
            'imsi-id',
            im,
            this.ucmap()
        );
        const index = (
            this.deviceGroupForm.get(['imsis']) as FormArray
        ).controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === im);
        (this.deviceGroupForm.get(['imsis']) as FormArray).removeAt(index);
        this.snackBar.open(
            'Deletion of ' + im + ' added to basket',
            undefined,
            { duration: 2000 }
        );
    }

    private ucmap(): Map<string, string> {
        const ucMap = new Map<string, string>();
        const dgId = '/Device-group-2.0.0/device-group[id=' + this.id + ']';
        let parentUc = localStorage.getItem(dgId);
        if (parentUc === null) {
            parentUc = this.deviceGroupForm[REQDATTRIBS];
        }
        ucMap.set(dgId, parentUc);

        return ucMap;
    }

    private populateFormData(value: EnterpriseEnterpriseSiteDeviceGroup): void {
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
        if (value.mbr && value.mbr['traffic-class']) {
            this.deviceGroupForm
                .get(['mbr', 'traffic-class'])
                .setValue(value.mbr['traffic-class']);
            this.deviceGroupForm.get(['mbr', 'traffic-class'])[ORIGINAL] =
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
    }

    loadDeviceGroupDeviceGroup(target: string, id: string): void {
        this.deviceGroupDeviceGroupService
            .getDeviceGroupDeviceGroup({
                target,
                id,
                ent_id: this.route.snapshot.params['enterprise-id'],
                site_id: this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.deviceGroupId = value['device-group-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting DeviceGroupDeviceGroup(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        'Enterprises-2.0.0' in basketPreview &&
                        'enterprise' in basketPreview['Enterprises-2.0.0'] &&
                        'site' in
                            basketPreview['Enterprises-2.0.0'].enterprise &&
                        this.pathListAttr in
                            basketPreview['Enterprises-2.0.0'].site
                    ) {
                        basketPreview['Enterprises-2.0.0'].enterprise.forEach(
                            (enterpriseBasketItems) => {
                                if (
                                    enterpriseBasketItems['enterprise-id'] ===
                                    this.route.snapshot.params['enterprise-id']
                                ) {
                                    enterpriseBasketItems.site.forEach(
                                        (SitebasketItems) => {
                                            if (
                                                SitebasketItems['site-id'] ===
                                                this.route.snapshot.params[
                                                    'site-id'
                                                ]
                                            ) {
                                                SitebasketItems[
                                                    'device-group'
                                                ].forEach((basketItems) => {
                                                    if (
                                                        basketItems[
                                                            'device-group-id'
                                                        ] === id
                                                    ) {
                                                        this.populateFormData(
                                                            basketItems
                                                        );
                                                    }
                                                });
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                    console.log(
                        'Finished loading DeviceGroupDeviceGroup(s)',
                        target,
                        id
                    );
                }
            );
    }

    loadIpDomains(target: string): void {
        this.aetherService
            .getIpDomain({
                target,
            })
            .subscribe(
                (value) => {
                    this.ipdomain = value['ip-domain'];
                    console.log('Got Ip Domain', value['ip-domain'].length);
                },
                (error) => {
                    console.warn('Error getting Ip Domain for ', target, error);
                },
                () => {
                    console.log('Finished loading Ip Domains', target);
                }
            );
    }

    loadTrafficClass(target: string): void {
        this.aetherService
            .getTrafficClass({
                target,
            })
            .subscribe(
                (value) => {
                    this.trafficClass = value['traffic-class'];
                    console.log(
                        'Got',
                        value['traffic-class'].length,
                        'Traffic Class'
                    );
                },
                (error) => {
                    console.warn(
                        'Error getting Traffic Class for ',
                        target,
                        error
                    );
                }
            );
    }
}
