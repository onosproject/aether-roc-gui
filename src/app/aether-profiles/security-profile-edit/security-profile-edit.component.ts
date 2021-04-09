/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';
import {AETHER_TARGETS} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {SecurityProfileSecurityProfileService} from '../../../openapi3/aether/2.1.0/services';
import {SecurityProfileSecurityProfile} from '../../../openapi3/aether/2.1.0/models';
import {BasketService, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RocEditBase} from '../../roc-edit-base';

@Component({
    selector: 'aether-security-profile-edit',
    templateUrl: './security-profile-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class SecurityProfileEditComponent extends RocEditBase<SecurityProfileSecurityProfile> implements OnInit {
    @Input() target: string = AETHER_TARGETS[0];
    @Input() id: string;
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
    ) {
        super(snackBar, bs, route, router, 'security-profile-2.1.0', 'security-profile');
        super.form = this.spForm;
        super.target = this.target;
        super.loadFunc = this.loadSecurityProfileSecurityProfile;
        this.spForm.get(['sqn'])[TYPE] = 'number';
    }

    ngOnInit(): void {
        super.init();
    }

    loadSecurityProfileSecurityProfile(target: string, id: string): void {
        this.securityProfileSecurityProfileService.getSecurityProfileSecurityProfile({
            target,
            id,
        }).subscribe(
            (value => {
                this.data = value;
                this.spForm.get('id').setValue(value.id);
                this.spForm.get('display-name').setValue(value['display-name']);
                this.spForm.get('key').setValue(value.key);
                this.spForm.get('opc').setValue(value.opc);
                this.spForm.get('sqn').setValue(value.sqn);
                this.spForm.get('description').setValue(value.description);
            }),
            error => {
                console.warn('Error getting SecurityProfileSecurityProfile(s) for ', target, error);
            },
            () => {
                console.log('Finished loading SecurityProfileSecurityProfile(s)', target, id);
            }
        );
    }
}
