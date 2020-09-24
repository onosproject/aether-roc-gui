/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AetherV100TargetService, AetherV100TargetSubscriberService} from '../../../openapi3/aether/1.0.0/services';
import {AetherV100TargetSubscriberUe} from '../../../openapi3/aether/1.0.0/models/aether-v-100-target-subscriber-ue';
import {TARGETS} from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';
import {AetherV100TargetQosProfileQosProfile} from '../../../openapi3/aether/1.0.0/models/aether-v-100-target-qos-profile-qos-profile';
import {AetherV100TargetApnProfileApnProfile} from '../../../openapi3/aether/1.0.0/models/aether-v-100-target-apn-profile-apn-profile';
import {AetherV100TargetUpProfileUpProfile} from '../../../openapi3/aether/1.0.0/models/aether-v-100-target-up-profile-up-profile';
import {AetherV100TargetAccessProfileAccessProfile} from '../../../openapi3/aether/1.0.0/models/aether-v-100-target-access-profile-access-profile';

@Component({
    selector: 'aether-subscriber-edit',
    templateUrl: './subscriber-edit.component.html',
    styleUrls: ['./subscriber-edit.component.scss']
})
export class SubscriberEditComponent implements OnInit {
    @Input() target: string = TARGETS[0];
    @Input() ueid: string;
    data: AetherV100TargetSubscriberUe;
    apnProfiles: Array<AetherV100TargetApnProfileApnProfile>;
    qosProfiles: Array<AetherV100TargetQosProfileQosProfile>;
    upProfiles: Array<AetherV100TargetUpProfileUpProfile>;
    accessProfiles: Array<AetherV100TargetAccessProfileAccessProfile>;

    subscriberUeForm = this.fb.group({
        company: null,
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        address: [null, Validators.required],
        address2: null,
        city: [null, Validators.required],
        state: [null, Validators.required],
        postalCode: [null, Validators.compose([
            Validators.required, Validators.minLength(5), Validators.maxLength(5)])
        ],
        shipping: ['free', Validators.required]
    });

    constructor(
        private aetherV100TargetSubscriberService: AetherV100TargetSubscriberService,
        private aetherV100TargetService: AetherV100TargetService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.ueid = this.route.snapshot.paramMap.get('ueid');
        this.loadSubscriberUe(this.target, this.ueid);
        this.loadAccessProfiles(this.target);
        this.loadApnProfiles(this.target);
        this.loadQosProfiles(this.target);
        this.loadUpProfiles(this.target);
    }

    loadSubscriberUe(target: string, ueid: string): void {
        this.aetherV100TargetSubscriberService.getAetherV100TargetSubscriberUe({
            target,
            ueid
        }).subscribe(
            (value => {
                this.data = value;
                console.log('Got Subscriber', value);
            }),
            error => {
                console.warn('Error getting Subscribers for ', target, error);
            },
            () => {
                console.log('Finished loading subscriber', target, ueid);
            }
        );
    }

    loadAccessProfiles(target: string): void {
        this.aetherV100TargetService.getAetherV100TargetAccessProfile({
            target,
        }).subscribe(
            (value => {
                this.accessProfiles = value.ListAetherV100targetAccessProfileAccessProfile;
                console.log('Got ACCESS Profiles', value.ListAetherV100targetAccessProfileAccessProfile.length);
            }),
            error => {
                console.warn('Error getting ACCESS Profiles for ', target, error);
            },
            () => {
                console.log('Finished loading ACCESS Profiles', target);
            }
        );
    }

    loadApnProfiles(target: string): void {
        this.aetherV100TargetService.getAetherV100TargetApnProfile({
            target,
        }).subscribe(
            (value => {
                this.apnProfiles = value.ListAetherV100targetApnProfileApnProfile;
                console.log('Got APN Profiles', value.ListAetherV100targetApnProfileApnProfile.length);
            }),
            error => {
                console.warn('Error getting APN Profiles for ', target, error);
            },
            () => {
                console.log('Finished loading APN Profiles', target);
            }
        );
    }

    loadQosProfiles(target: string): void {
        this.aetherV100TargetService.getAetherV100TargetQosProfile({
            target,
        }).subscribe(
            (value => {
                this.qosProfiles = value.ListAetherV100targetQosProfileQosProfile;
                console.log('Got QOS Profiles', value.ListAetherV100targetQosProfileQosProfile.length);
            }),
            error => {
                console.warn('Error getting QOS Profiles for ', target, error);
            },
            () => {
                console.log('Finished loading QOS Profiles', target);
            }
        );
    }

    loadUpProfiles(target: string): void {
        this.aetherV100TargetService.getAetherV100TargetUpProfile({
            target,
        }).subscribe(
            (value => {
                this.upProfiles = value.ListAetherV100targetUpProfileUpProfile;
                console.log('Got UP Profiles', value.ListAetherV100targetUpProfileUpProfile.length);
            }),
            error => {
                console.warn('Error getting UP Profiles for ', target, error);
            },
            () => {
                console.log('Finished loading UP Profiles', target);
            }
        );
    }

    onSubmit(): void {
        alert('Thanks!');
    }
}
