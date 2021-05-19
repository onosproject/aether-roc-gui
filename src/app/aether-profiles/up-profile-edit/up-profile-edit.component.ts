/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, OnInit} from '@angular/core';
import {RocEditBase} from '../../roc-edit-base';
import {ServiceRuleServiceRule, UpProfileUpProfile} from '../../../openapi3/aether/2.1.0/models';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BasketService, ORIGINAL, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UpProfileUpProfileService} from '../../../openapi3/aether/2.1.0/services/up-profile-up-profile.service';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

@Component({
    selector: 'aether-up-profile-edit',
    templateUrl: './up-profile-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class UpProfileEditComponent extends RocEditBase<UpProfileUpProfile> implements OnInit {
    data: UpProfileUpProfile;

    upForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])],
        'user-plane': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(255),
        ])],
        'access-control': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
    });

    constructor(
        private upProfileUpProfileService: UpProfileUpProfileService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'up-profile-2.1.0', 'up-profile');
        super.form = this.upForm;
        super.loadFunc = this.loadUpProfileUpProfile;
    }

    ngOnInit(): void {
        super.init();
    }

    private populateFormData(value: UpProfileUpProfile): void {
        if (value['display-name']) {
            this.upForm.get('display-name').setValue(value['display-name']);
            this.upForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.upForm.get('description').setValue(value.description);
            this.upForm.get('description')[ORIGINAL] = value.description;
        }
        if (value['user-plane']) {
            this.upForm.get('user-plane').setValue(value['user-plane']);
            this.upForm.get('user-plane')[ORIGINAL] = value['user-plane'];
        }
        if (value['access-control']) {
            this.upForm.get('access-control').setValue(value['access-control']);
            this.upForm.get('access-control')[ORIGINAL] = value['access-control'];
        }
    }

    loadUpProfileUpProfile(target: string, id: string): void {
        this.upProfileUpProfileService.getUpProfileUpProfile({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting UpProfileUpProfile(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['up-profile-2.1.0']) {
                    basketPreview['up-profile-2.1.0']['up-profile'].forEach((basketItems) => {
                        if (basketItems.id === id){
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading UpProfileUpProfile(s)', target, id);
            }
        );
    }
}
