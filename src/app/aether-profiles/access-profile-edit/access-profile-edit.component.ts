/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';
import {AETHER_TARGETS} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AccessProfileAccessProfileService} from '../../../openapi3/aether/2.1.0/services';
import {AccessProfileAccessProfile} from '../../../openapi3/aether/2.1.0/models';
import {BasketService} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RocEditBase} from '../../roc-edit-base';

@Component({
    selector: 'aether-access-profile-edit',
    templateUrl: './access-profile-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class AccessProfileEditComponent extends RocEditBase<AccessProfileAccessProfile> implements OnInit {
    @Input() target: string = AETHER_TARGETS[0];
    @Input() id: string;
    data: AccessProfileAccessProfile;

    accForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        type: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32)
        ])],
        filter: ['', Validators.compose([
            Validators.minLength(0),
            Validators.maxLength(32)
        ])],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100)
        ])]
    });


    constructor(
        private accessProfileAccessProfileService: AccessProfileAccessProfileService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
    ) {
        super(snackBar, bs, route, router, 'access-profile-2.1.0', 'access-profile');
        super.form = this.accForm;
        super.target = this.target;
        super.loadFunc = this.loadAccessProfileAccessProfile;
    }

    ngOnInit(): void {
        super.init();
    }

    loadAccessProfileAccessProfile(target: string, id: string): void {
        this.accessProfileAccessProfileService.getAccessProfileAccessProfile({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.accForm.get('id').setValue(value.id);
                this.accForm.get('display-name').setValue(value['display-name']);
                this.accForm.get('type').setValue(value.type);
                this.accForm.get('filter').setValue(value.filter);
                this.accForm.get('description').setValue(value.description);
            }),
            error => {
                console.warn('Error getting AccessProfileAccessProfile(s) for ', target, error);
            },
            () => {
                console.log('Finished loading AccessProfileAccessProfile(s)', target, id);
            }
        );
    }
}
