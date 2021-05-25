/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, ViewChild, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {
    Service as AetherService,
    ApnProfileApnProfileService
} from '../../../openapi3/aether/2.1.0/services';
import {
    ApnProfileApnProfile, SecurityProfileSecurityProfile, ServiceGroupServiceGroup
} from '../../../openapi3/aether/2.1.0/models';
import {BasketService, ORIGINAL, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RocEditBase} from '../../roc-edit-base';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

export const UPDATED = 'updated';

@Component({
    selector: 'aether-apn-profile-edit',
    templateUrl: './apn-profile-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})

export class ApnProfileEditComponent extends RocEditBase<ApnProfileApnProfile> implements OnInit {

    ip: string;
    cardDisplay: number = 0;
    primCardDisplay: boolean = false;
    secCardDisplay: boolean = false;
    data: ApnProfileApnProfile;
    serviceGroups: Array<ServiceGroupServiceGroup>;

    apnForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'apn-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
        'dns-primary': [''],
        'dns-secondary': [''],
        mtu: [0, Validators.compose([
            Validators.min(68),
            Validators.max(65535),
        ])],
        'gx-enabled': [''],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])],
        'service-group': ['']

    });

    constructor(
        private apnProfileApnProfileService: ApnProfileApnProfileService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(snackBar, bs, route, router, 'apn-profile-2.1.0', 'apn-profile');
        super.form = this.apnForm;
        super.loadFunc = this.loadApnProfileApnProfile;
        this.apnForm.get('mtu')[TYPE] = 'number';
        this.apnForm.get('gx-enabled')[TYPE] = 'boolean';
    }

    ngOnInit(): void {
        super.init();
        this.loadServiceGroups(this.target);
    }

    private populateFormData(value: ApnProfileApnProfile): void {
        if (value['display-name']) {
            this.apnForm.get('display-name').setValue(value['display-name']);
            this.apnForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value['apn-name']) {
            this.apnForm.get('apn-name').setValue(value['apn-name']);
            this.apnForm.get('apn-name')[ORIGINAL] = value['apn-name'];
        }
        if (value['dns-primary']) {
            this.apnForm.get('dns-primary').setValue(value['dns-primary']);
            this.apnForm.get('dns-primary')[ORIGINAL] = value['dns-primary'];
        }
        if (value['dns-secondary']) {
            this.apnForm.get('dns-secondary').setValue(value['dns-secondary']);
            this.apnForm.get('dns-secondary')[ORIGINAL] = value['dns-secondary'];
        }
        if (value.mtu) {
            this.apnForm.get('mtu').setValue(value.mtu);
            this.apnForm.get('mtu')[ORIGINAL] = value.mtu;
        }
        if (value['gx-enabled']) {
            this.apnForm.get('gx-enabled').setValue(value['gx-enabled']);
            this.apnForm.get('gx-enabled')[ORIGINAL] = value['gx-enabled'];
        }
        if (value.description) {
            this.apnForm.get('description').setValue(value.description);
            this.apnForm.get('description')[ORIGINAL] = value.description;
        }
        if (value['service-group']) {
            this.apnForm.get('service-group').setValue(value['service-group']);
            this.apnForm.get('service-group')[ORIGINAL] = value['service-group'];
        }
    }

    loadApnProfileApnProfile(target: string, id: string): void {
        this.apnProfileApnProfileService.getApnProfileApnProfile({
            target,
            id,
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting ApnProfileApnProfile(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['apn-profile-2.1.0']) {
                    basketPreview['apn-profile-2.1.0']['apn-profile'].forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading ApnProfileApnProfile(s)', target, id);
            }
        );
    }

    checkForUndefinedPrim(): string {
        if (this.apnForm.get('dns-primary').value === undefined) {
            return '';
        } else {
            this.apnForm.get(['dns-primary'])[UPDATED] = this.apnForm.get(['dns-primary']).value;
            return this.apnForm.get(['dns-primary'])[UPDATED];
        }
    }

    checkForUndefinedSec(): string {
        if (this.data === undefined) {
            return '';
        } else {
            this.apnForm.get(['dns-secondary'])[UPDATED] = this.apnForm.get(['dns-secondary']).value;
            return this.apnForm.get(['dns-secondary'])[UPDATED];
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

    updateFormPrim(ip: string): void {
        console.log('UPDATED FORM');
        this.apnForm.get('dns-primary')[UPDATED] = ip;
        this.apnForm.get('dns-primary').markAsDirty();
        this.apnForm.get('dns-primary').markAsTouched();
        this.apnForm.get('dns-primary').setValue(ip);
    }

    updateFormSec(ip: string): void {
        console.log('UPDATED FORM');
        this.apnForm.get('dns-secondary')[UPDATED] = ip;
        this.apnForm.get('dns-secondary').markAsDirty();
        this.apnForm.get('dns-secondary').markAsTouched();
        this.apnForm.get('dns-secondary').setValue(ip);

    }

    loadServiceGroups(target: string): void {
        this.aetherService.getServiceGroup({
            target,
        }).subscribe(
            (value => {
                this.serviceGroups = value['service-group'];
                console.log('Got Service Profiles', value['service-group'].length);
            }),
            error => {
                console.warn('Error getting Service Groups for ', target, error);
            },
            () => {
                console.log('Finished loading Service Groups', target);
            }
        );
    }
}
