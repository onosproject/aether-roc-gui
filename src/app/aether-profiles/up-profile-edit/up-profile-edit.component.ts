/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, OnInit} from '@angular/core';
import {RocEditBase} from '../../roc-edit-base';
import {UpProfileUpProfile} from '../../../openapi3/aether/2.1.0/models';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BasketService, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UpProfileUpProfileService} from '../../../openapi3/aether/2.1.0/services/up-profile-up-profile.service';

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
    ) {
        super(snackBar, bs, route, router, 'up-profile-2.1.0', 'up-profile');
        super.form = this.upForm;
        super.loadFunc = this.loadUpProfileUpProfile;
    }

    ngOnInit(): void {
        super.init();
    }

    loadUpProfileUpProfile(target: string, id: string): void {
        this.upProfileUpProfileService.getUpProfileUpProfile({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.upForm.get('display-name').setValue(value['display-name']);
                this.upForm.get('description').setValue(value.description);
                this.upForm.get('user-plane').setValue(value['user-plane']);
                this.upForm.get('access-control').setValue(value['access-control']);
            }),
            error => {
                console.warn('Error getting UpProfileUpProfile(s) for ', target, error);
            },
            () => {
                console.log('Finished loading UpProfileUpProfile(s)', target, id);
            }
        );
    }
}
