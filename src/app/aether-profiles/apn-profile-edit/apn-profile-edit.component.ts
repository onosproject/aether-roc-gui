/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {
    Service as AetherService,
    ApnProfileApnProfileService
} from '../../../openapi3/aether/2.1.0/services';
import {
    ApnProfileApnProfile, ServiceGroupServiceGroup
} from '../../../openapi3/aether/2.1.0/models';
import {BasketService} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RocEditBase} from '../../roc-edit-base';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

const TYPE = 'type';

@Component({
    selector: 'aether-apn-profile-edit',
    templateUrl: './apn-profile-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class ApnProfileEditComponent extends RocEditBase<ApnProfileApnProfile> implements OnInit {
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
        'dns-primary': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
        'dns-secondary': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
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
        public opaService: OpenPolicyAgentService,
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

    loadApnProfileApnProfile(target: string, id: string): void{
        this.apnProfileApnProfileService.getApnProfileApnProfile({
            target,
            id,
        }).subscribe(
            (value => {
                this.data = value;
                this.apnForm.get('display-name').setValue(value['display-name']);
                this.apnForm.get('apn-name').setValue(value['apn-name']);
                this.apnForm.get('dns-primary').setValue(value['dns-primary']);
                this.apnForm.get('dns-secondary').setValue(value['dns-secondary']);
                this.apnForm.get('mtu').setValue(value.mtu);
                this.apnForm.get('gx-enabled').setValue(value['gx-enabled']);
                this.apnForm.get('description').setValue(value.description);
                this.apnForm.get('service-group').setValue(value['service-group']);
            }),
            error => {
                console.warn('Error getting ApnProfileApnProfile(s) for ', target, error);
            },
            () => {
                console.log('Finished loading ApnProfileApnProfile(s)', target, id);
            }
        );
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
