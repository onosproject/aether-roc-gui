/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {RocEditBase} from '../../roc-edit-base';
import {FormBuilder, Validators} from '@angular/forms';
import {IpDomainIpDomain} from '../../../openapi3/aether/3.0.0/models/ip-domain-ip-domain';
import {
    Service as AetherService,
    IpDomainIpDomainService
} from '../../../openapi3/aether/3.0.0/services';
import {ActivatedRoute, Router} from '@angular/router';
import {BasketService, ORIGINAL, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

export const UPDATED = 'updated';

@Component({
    selector: 'aether-ip-domain-edit',
    templateUrl: './ip-domain-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})


export class IpDomainEditComponent extends RocEditBase<IpDomainIpDomain> implements OnInit {

    ip: string;
    option: string;
    primCardDisplay: boolean = false;
    secCardDisplay: boolean = false;
    subCardDisplay: boolean = false;
    data: IpDomainIpDomain;

    displayOption: string;

    ipForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'dns-primary': [''],
        'dns-secondary': [''],
        subnet: ['', Validators.pattern(
            '^' +
            '(?=\\d+\\.\\d+\\.\\d+\\.\\d+\\/\\d+$)' +
            '(?:' +
            '(?:' +
            '25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])' +
            '\\.?){4}' +
            '(?:' +
            '\\/?)' +
            '(?:' +
            '3[0-2]|2[0-9]|[1-9]|[0-9])?' +
            '$'
        )
        ],
        'admin-status': [''],
        mtu: [68, Validators.compose([
            Validators.min(68),
            Validators.max(65535),
        ])],
    });

    constructor(
        private ipDomainIpDomainService: IpDomainIpDomainService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(snackBar, bs, route, router, 'ip-domain-3.0.0', 'ip-domain');
        super.form = this.ipForm;
        super.loadFunc = this.loadIpDomainIpDomain;
        this.ipForm.get('mtu')[TYPE] = 'number';

    }

    ngOnInit(): void {
        super.init();
    }

    private populateFormData(value: IpDomainIpDomain): void {
        this.displayOption = this.ipForm.get(['admin-status'])[ORIGINAL];
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
        this.ipDomainIpDomainService.getIpDomainIpDomain({
            target,
            id,
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting IpDomainIpDomain(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['ip-domain-3.0.0']) {
                    basketPreview['ip-domain-3.0.0']['ip-domain'].forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading IpDomainIpDomain(s)', target, id);
            }
        );
    }

    checkForUndefinedPrim(): string {
        if (this.ipForm.get('dns-primary').value === undefined) {
            return '';
        } else {
            this.ipForm.get(['dns-primary'])[UPDATED] = this.ipForm.get(['dns-primary']).value;
            return this.ipForm.get(['dns-primary'])[UPDATED];
        }
    }

    checkForUndefinedSec(): string {
        if (this.data === undefined) {
            return '';
        } else {
            this.ipForm.get(['dns-secondary'])[UPDATED] = this.ipForm.get(['dns-secondary']).value;
            return this.ipForm.get(['dns-secondary'])[UPDATED];
        }
    }

    checkForUndefinedSub(): string {
        if (this.data === undefined) {
            return '';
        } else {
            this.ipForm.get(['subnet'])[UPDATED] = this.ipForm.get(['subnet']).value;
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
