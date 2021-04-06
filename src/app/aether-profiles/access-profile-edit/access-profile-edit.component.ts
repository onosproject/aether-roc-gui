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
    Service,
    AccessProfileAccessProfileService
} from '../../../openapi3/aether/2.1.0/services';
import {
    AccessProfileAccessProfile
} from '../../../openapi3/aether/2.1.0/models';
import {BasketService} from '../../basket.service';

@Component({
    selector: 'aether-access-profile-edit',
    templateUrl: './access-profile-edit.component.html',
    styleUrls: [
        '../../common-edit.component.scss',
        './access-profile-edit.component.scss'
    ]
})
export class AccessProfileEditComponent implements OnInit {
    @Input() target: string = AETHER_TARGETS[0];
    @Input() id: string;
    isNew: boolean;
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
        private service: Service,
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
                    this.loadAccessProfileAccessProfile(this.target, this.id);
                }
            }
        );
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

    onSubmit(): void {
        console.log('Submitted!', this.accForm.getRawValue());
        let submitId = this.id;
        if (this.id === undefined) {
            submitId = this.accForm.get('id').value as unknown as string;
        }
        this.bs.logKeyValuePairs(this.accForm, 'access-profile-2.1.0/access-profile[' + this.id + ']');
        console.log(this.bs.buildPatchBody());

        // Keeping this in for now to test

        this.aetherApiService.postAccessProfileAccessProfile({
            id: submitId,
            target: AETHER_TARGETS[0],
            body: this.accForm.getRawValue()
        }).subscribe(
            value => {
                console.log('POST Response', value);
                // TODO: Add a string to the response in the OpenAPI yaml (so that this is not unknown)
                this.router.navigate(['/profiles', 'accessprofiles', value as unknown as string]);
            },
            error => console.warn('POST error', error),
            () => {
                console.log('POST finished');
            }
        );
    }
}
