/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';
import {AETHER_TARGETS} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {
    ApiService,
    Service as AetherV200TargetService,
    ApnProfileApnProfileService
} from '../../../openapi3/aether/2.0.0/services';
import {
    ApnProfileApnProfile
} from '../../../openapi3/aether/2.0.0/models';
import {BasketService} from '../../basket.service';

@Component({
    selector: 'aether-apn-profile-edit',
    templateUrl: './apn-profile-edit.component.html',
    styleUrls: ['../../common-edit.component.scss',
        './apn-profile-edit.component.scss']
})
export class ApnProfileEditComponent implements OnInit {
    @Input() target: string = AETHER_TARGETS[0];
    @Input() id: string;
    isNew: boolean;
    data: ApnProfileApnProfile;

    spForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
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
        mtu: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])],
        'gx-enabled': [''],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])],

    });
    constructor(
        private apnProfileApnProfileService: ApnProfileApnProfileService,
        private aetherV200TargetService: AetherV200TargetService,
        private aetherApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private bs: BasketService
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            value => {
                if (value.get('id') === 'new') {
                    this.isNew = true;
                } else {
                    this.id = value.get('id');
                    this.loadApnProfileApnProfile(this.target, this.id);
                }
            }
        );
    }

    loadApnProfileApnProfile(target: string, id: string): void{
        this.apnProfileApnProfileService.getApnProfileApnProfile({
            target,
            id,
        }).subscribe(
            (value => {
                this.data = value;
                this.spForm.get('id').setValue(value.id);
                this.spForm.get('display-name').setValue(value['display-name']);
                this.spForm.get('apn-name').setValue(value['apn-name']);
                this.spForm.get('dns-primary').setValue(value['dns-primary']);
                this.spForm.get('dns-secondary').setValue(value['dns-secondary']);
                this.spForm.get('mtu').setValue(value.mtu);
                this.spForm.get('gx-enabled').setValue(value['gx-enabled']);
                this.spForm.get('description').setValue(value.description);
            }),
            error => {
                console.warn('Error getting ApnProfileApnProfile(s) for ', target, error);
            },
            () => {
                console.log('Finished loading ApnProfileApnProfile(s)', target, id);
            }
        );
    }
    onSubmit(): void {
        console.log('Submitted!', this.spForm.getRawValue());
        let submitId = this.id;
        if (this.id === undefined) {
            submitId = this.spForm.get('id').value as unknown as string;
        }
        this.bs.logKeyValuePairs(this.spForm, 'apn-profile/apn-profile[]/' + this.id);
        console.log(this.bs.buildPatchBody());
        this.aetherApiService.postApnProfileApnProfile({
            id: submitId,
            target: AETHER_TARGETS[0],
            body: this.spForm.getRawValue()
        }).subscribe(
            value => {
                console.log('POST Response', value);
                // TODO: Add a string to the response in the OpenAPI yaml (so that this is not unknown)
                this.router.navigate(['/profiles', 'apnprofiles', value as unknown as string]);
            },
            error => console.warn('POST error', error),
            () => {
                console.log('POST finished');
            }
        );
    }

}
