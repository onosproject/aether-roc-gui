/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BasketService,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { IpDomainDatasource } from '../ip-domain/ip-domain-datasource';
import { ipDomainModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteIpDomain } from '../../../openapi3/aether/2.1.0/models';
import {
    SiteIpDomainService,
    SiteService,
} from '../../../openapi3/aether/2.1.0/services';

export const UPDATED = 'updated';

@Component({
    selector: 'aether-ip-domain-edit',
    templateUrl: './ip-domain-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class IpDomainEditComponent
    extends RocEditBase<IpDomainDatasource>
    implements OnInit
{
    ip: string;
    option: string;
    primCardDisplay = false;
    secCardDisplay = false;
    subCardDisplay = false;
    showParentDisplay = false;
    data: SiteIpDomain;

    displayOption: string;

    ipForm = this.fb.group({
        'ip-domain-id': [
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
        private ipDomainIpDomainService: SiteIpDomainService,
        protected enterpriseService: EnterpriseService,
        protected siteService: SiteService,

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
            enterpriseService,
            siteService,
            route,
            new IpDomainDatasource(enterpriseService, bs),
            ipDomainModelPath
        );
        super.form = this.ipForm;
        super.loadFunc = this.loadIpDomainIpDomain;
        this.ipForm[REQDATTRIBS] = ['subnet', 'dnn'];
        this.ipForm.get('mtu')[TYPE] = 'number';
    }

    ngOnInit(): void {
        super.init();
    }

    private populateFormData(value: SiteIpDomain): void {
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

    loadIpDomainIpDomain(id: string): void {
        this.ipDomainIpDomainService
            .getSiteIpDomain({
                'ip-domain-id': id,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.ipDomainId = id;
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting SiteIpDomain(s) for ',
                        this.targetId,
                        this.ipDomainId,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        ipDomainModelPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(model as SiteIpDomain);
                    }
                    console.log(
                        'Finished loading SiteIpDomain(s)',
                        this.targetId,
                        this.ipDomainId,
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
