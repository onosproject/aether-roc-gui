/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BasketService,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EnterprisesEnterprise } from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseSiteIpDomainService } from '../../../openapi3/aether/2.0.0/services';
import { EnterprisesEnterpriseSiteIpDomain } from '../../../openapi3/aether/2.0.0/models';
import { RocElement } from '../../../openapi3/top/level/models/elements';
import { AETHER_TARGET } from '../../../environments/environment';

export const UPDATED = 'updated';

@Component({
    selector: 'aether-ip-domain-edit',
    templateUrl: './ip-domain-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class IpDomainEditComponent extends RocEditBase implements OnInit {
    pathRoot = ('Enterprises-2.0.0/enterprise' +
        '[enterprise-id=' +
        this.route.snapshot.params['enterprise-id'] +
        ']/site' +
        '[site-id=' +
        this.route.snapshot.params['site-id'] +
        ']') as RocElement;
    ip: string;
    option: string;
    primCardDisplay = false;
    secCardDisplay = false;
    subCardDisplay = false;
    showParentDisplay = false;
    data: EnterprisesEnterpriseSiteIpDomain;
    enterprises: Array<EnterprisesEnterprise>;

    displayOption: string;

    ipForm = this.fb.group({
        'ip-domain-id': [
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
        'dns-primary': [undefined],
        'dns-secondary': [undefined],
        subnet: [
            undefined,
            Validators.pattern(
                '^' +
                    '(?=\\d+\\.\\d+\\.\\d+\\.\\d+\\/\\d+$)' +
                    '(?:' +
                    '(?:' +
                    '25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])' +
                    '\\.?){4}' +
                    '(?:' +
                    '\\/?)' +
                    '(?:' +
                    '3[0-2]|2[0-9]|1[0-9]|[0-9])?' +
                    '$'
            ),
        ],
        'admin-status': [undefined],
        mtu: [
            undefined,
            Validators.compose([Validators.min(68), Validators.max(65535)]),
        ],
        dnn: [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(32),
            ]),
        ],
    });
    ipDomainId: string;

    constructor(
        private ipDomainIpDomainService: EnterprisesEnterpriseSiteIpDomainService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(snackBar, bs, route, router, 'Enterprises-2.0.0', 'ip-domain');
        super.form = this.ipForm;
        super.loadFunc = this.loadIpDomainIpDomain;
        this.ipForm[REQDATTRIBS] = ['subnet', 'dnn'];
        this.ipForm.get('mtu')[TYPE] = 'number';
    }

    ngOnInit(): void {
        super.init();
    }

    private populateFormData(value: EnterprisesEnterpriseSiteIpDomain): void {
        this.displayOption = this.ipForm.get(['admin-status'])[ORIGINAL];
        if (value['ip-domain-id']) {
            this.ipForm.get('ip-domain-id').setValue(value['ip-domain-id']);
            this.ipForm.get('ip-domain-id')[ORIGINAL] = value['ip-domain-id'];
        }
        if (value['display-name']) {
            this.ipForm.get('display-name').setValue(value['display-name']);
            this.ipForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.ipForm.get('description').setValue(value.description);
            this.ipForm.get('description')[ORIGINAL] = value.description;
        }
        if (value['dns-primary']) {
            this.ipForm.get('dns-primary').setValue(value['dns-primary']);
            this.ipForm.get('dns-primary')[ORIGINAL] = value['dns-primary'];
        }
        if (value['dns-secondary']) {
            this.ipForm.get('dns-secondary').setValue(value['dns-secondary']);
            this.ipForm.get('dns-secondary')[ORIGINAL] = value['dns-secondary'];
        }
        if (value.subnet) {
            this.ipForm.get('subnet').setValue(value.subnet);
            this.ipForm.get('subnet')[ORIGINAL] = value.subnet;
        }
        if (value['admin-status']) {
            this.ipForm.get('admin-status').setValue(value['admin-status']);
            this.ipForm.get('admin-status')[ORIGINAL] = value['admin-status'];
        }
        if (value.mtu) {
            this.ipForm.get('mtu').setValue(value.mtu);
            this.ipForm.get('mtu')[ORIGINAL] = value.mtu;
        }
        if (value.dnn) {
            this.ipForm.get('dnn').setValue(value.dnn);
            this.ipForm.get('dnn')[ORIGINAL] = value.dnn;
        }
    }

    changeAdminStatus(): void {
        this.displayOption = this.option;
        console.log('CHOSE', this.option);
        this.ipForm.get('admin-status')[UPDATED] = this.option;
        this.ipForm.get('admin-status').markAsDirty();
        this.ipForm.get('admin-status').markAsTouched();
        this.ipForm.get('admin-status').setValue(this.option);
    }

    loadIpDomainIpDomain(target: string, id: string): void {
        this.ipDomainIpDomainService
            .getEnterprisesEnterpriseSiteIpDomain({
                target: AETHER_TARGET,
                'ip-domain-id': id,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.ipDomainId = value['ip-domain-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting EnterprisesEnterpriseSiteIpDomain(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        this.pathRoot in basketPreview &&
                        this.pathListAttr in basketPreview['Ip-domain-2.0.0']
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
                                                    'ip-domain'
                                                ].forEach((basketItems) => {
                                                    if (
                                                        basketItems[
                                                            'ip-domain-id'
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
                        'Finished loading EnterprisesEnterpriseSiteIpDomain(s)',
                        target,
                        id
                    );
                }
            );
    }

    checkForUndefinedPrim(): string {
        if (this.ipForm.get('dns-primary').value === undefined) {
            return '';
        } else {
            this.ipForm.get(['dns-primary'])[UPDATED] = this.ipForm.get([
                'dns-primary',
            ]).value;
            return this.ipForm.get(['dns-primary'])[UPDATED];
        }
    }

    checkForUndefinedSec(): string {
        if (this.data === undefined) {
            return '';
        } else {
            this.ipForm.get(['dns-secondary'])[UPDATED] = this.ipForm.get([
                'dns-secondary',
            ]).value;
            return this.ipForm.get(['dns-secondary'])[UPDATED];
        }
    }

    checkForUndefinedSub(): string {
        if (this.data === undefined) {
            return '';
        } else {
            this.ipForm.get(['subnet'])[UPDATED] = this.ipForm.get([
                'subnet',
            ]).value;
            return this.ipForm.get(['subnet'])[UPDATED];
        }
    }

    openPrimaryCard(): void {
        this.checkForUndefinedPrim();
        this.primCardDisplay = !this.primCardDisplay;
    }

    openSecondaryCard(): void {
        this.checkForUndefinedSec();
        this.secCardDisplay = !this.secCardDisplay;
    }

    // TODO - Will come back to
    openSubnetCard(): void {
        this.checkForUndefinedSub();
        this.subCardDisplay = !this.subCardDisplay;
    }

    updateFormPrim(ip: string): void {
        this.ipForm.get('dns-primary')[UPDATED] = ip;
        this.ipForm.get('dns-primary').markAsDirty();
        this.ipForm.get('dns-primary').markAsTouched();
        this.ipForm.get('dns-primary').setValue(ip);
    }

    updateFormSec(ip: string): void {
        this.ipForm.get('dns-secondary')[UPDATED] = ip;
        this.ipForm.get('dns-secondary').markAsDirty();
        this.ipForm.get('dns-secondary').markAsTouched();
        this.ipForm.get('dns-secondary').setValue(ip);
    }

    // TODO - Will come back to
    updateFormSub(ip: string): void {
        this.ipForm.get('subnet')[UPDATED] = ip;
        this.ipForm.get('subnet').markAsDirty();
        this.ipForm.get('subnet').markAsTouched();
        this.ipForm.get('subnet').setValue(ip);
    }
}
