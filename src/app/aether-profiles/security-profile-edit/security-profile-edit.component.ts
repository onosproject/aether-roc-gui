/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {SecurityProfileSecurityProfileService} from '../../../openapi3/aether/2.1.0/services';
import {SecurityProfileSecurityProfile, ServiceRuleServiceRule} from '../../../openapi3/aether/2.1.0/models';
import {BasketService, ORIGINAL, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RocEditBase} from '../../roc-edit-base';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

@Component({
    selector: 'aether-security-profile-edit',
    templateUrl: './security-profile-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class SecurityProfileEditComponent extends RocEditBase<SecurityProfileSecurityProfile> implements OnInit {
    data: SecurityProfileSecurityProfile;

    spForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        key: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
        opc: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
        sqn: [''],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])]
    });

    constructor(
        private securityProfileSecurityProfileService: SecurityProfileSecurityProfileService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'security-profile-2.1.0', 'security-profile');
        super.form = this.spForm;
        super.loadFunc = this.loadSecurityProfileSecurityProfile;
        this.spForm.get(['sqn'])[TYPE] = 'number';
    }

    ngOnInit(): void {
        super.init();
    }

    private populateFormData(value: SecurityProfileSecurityProfile): void {
        if (value['display-name']) {
            this.spForm.get('display-name').setValue(value['display-name']);
            this.spForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.key) {
            this.spForm.get('key').setValue(value.key);
            this.spForm.get('key')[ORIGINAL] = value.key;
        }
        if (value.opc) {
            this.spForm.get('opc').setValue(value.opc);
            this.spForm.get('opc')[ORIGINAL] = value.opc;
        }
        if (value.sqn) {
            this.spForm.get('sqn').setValue(value.sqn);
            this.spForm.get('sqn')[ORIGINAL] = value.sqn;
        }
        if (value.description) {
            this.spForm.get('description').setValue(value.description);
            this.spForm.get('description')[ORIGINAL] = value.description;
        }
    }

    loadSecurityProfileSecurityProfile(target: string, id: string): void {
        this.securityProfileSecurityProfileService.getSecurityProfileSecurityProfile({
            target,
            id,
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting SecurityProfileSecurityProfile(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['security-profile-2.1.0']) {
                    basketPreview['security-profile-2.1.0']['security-profile'].forEach((basketItems) => {
                        if (basketItems.id === id){
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading SecurityProfileSecurityProfile(s)', target, id);
            }
        );
    }
}
