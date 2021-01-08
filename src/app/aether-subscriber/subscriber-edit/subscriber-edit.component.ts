/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    AetherV200TargetService,
    AetherV100TargetSubscriberUeueidService as AetherV100TargetSubscriberService,
    ApiService
} from '../../../openapi3/aether/1.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';
import {
    AetherV100TargetSubscriberUe,
    AetherV100TargetAccessProfileAccessProfile,
    AetherV100TargetApnProfileApnProfile,
    AetherV100TargetQosProfileQosProfile,
    AetherV100TargetUpProfileUpProfile
} from '../../../openapi3/aether/1.0.0/models';

@Component({
    selector: 'aether-subscriber-edit',
    templateUrl: './subscriber-edit.component.html',
    styleUrls: ['./subscriber-edit.component.scss']
})
export class SubscriberEditComponent implements OnInit {
    @Input() target: string = AETHER_TARGETS[0];
    @Input() ueid: string;
    isNew: boolean;
    data: AetherV100TargetSubscriberUe;
    apnProfiles: Array<AetherV100TargetApnProfileApnProfile>;
    qosProfiles: Array<AetherV100TargetQosProfileQosProfile>;
    upProfiles: Array<AetherV100TargetUpProfileUpProfile>;
    accessProfiles: Array<AetherV100TargetAccessProfileAccessProfile>;
    subscriberUeForm = this.fb.group({
        ueid: [''],
        priority: [0, Validators.compose([
            Validators.min(0),
            Validators.max(1000)])
        ],
        enabled: [false],
        'requested-apn': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        AetherV100targetSubscriberUeueidServingPlmn: this.fb.group({
            mcc: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999)])
            ],
            mnc: [0, Validators.compose([
                Validators.min(0),
                Validators.max(999)])
            ],
            tac: [0, Validators.compose([
                Validators.min(0),
                Validators.max(99999999)])
            ],
        }),
        AetherV100targetSubscriberUeueidProfiles: this.fb.group({
                'apn-profile': [''],
                'qos-profile': [''],
                'up-profile': [''],
            }
        )
    });

    constructor(
        private aetherV100TargetSubscriberService: AetherV100TargetSubscriberService,
        private aetherV100TargetService: AetherV200TargetService,
        private aetherApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            value => {
                if (value.get('ueid') === 'new') {
                    this.isNew = true;
                } else {
                    this.ueid = value.get('ueid');
                    this.loadSubscriberUe(this.target, this.ueid);
                }
            }
        );
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
                this.subscriberUeForm.get('ueid').setValue(value.ueid);
                this.subscriberUeForm.get('priority').setValue(value.priority);
                this.subscriberUeForm.get('enabled').setValue(value.enabled);
                this.subscriberUeForm.get('requested-apn').setValue(value['requested-apn']);
                this.subscriberUeForm.get('AetherV100targetSubscriberUeueidServingPlmn')
                    .get('mcc').setValue(value.AetherV100targetSubscriberUeueidServingPlmn.mcc);
                this.subscriberUeForm.get('AetherV100targetSubscriberUeueidServingPlmn')
                    .get('mnc').setValue(value.AetherV100targetSubscriberUeueidServingPlmn.mnc);
                this.subscriberUeForm.get('AetherV100targetSubscriberUeueidServingPlmn')
                    .get('tac').setValue(value.AetherV100targetSubscriberUeueidServingPlmn.tac);
                this.subscriberUeForm.get('AetherV100targetSubscriberUeueidProfiles')
                    .get('apn-profile').setValue(value.AetherV100targetSubscriberUeueidProfiles['apn-profile']);
                this.subscriberUeForm.get('AetherV100targetSubscriberUeueidProfiles')
                    .get('qos-profile').setValue(value.AetherV100targetSubscriberUeueidProfiles['qos-profile']);
                this.subscriberUeForm.get('AetherV100targetSubscriberUeueidProfiles')
                    .get('up-profile').setValue(value.AetherV100targetSubscriberUeueidProfiles['up-profile']);
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
        console.log('Submitted!', this.subscriberUeForm.getRawValue());
        let submitUeid = this.ueid;
        if (this.ueid === undefined) {
            submitUeid = this.subscriberUeForm.get('ueid').value as unknown as string;
        }
        this.aetherApiService.postAetherV100TargetSubscriberUe({
            ueid: submitUeid,
            target: AETHER_TARGETS[0],
            body: this.subscriberUeForm.getRawValue()
        }).subscribe(
            value => {
                console.log('POST Response', value);
                // TODO: Add a string to the response in the OpenAPI yaml (so that this is not unknown)
                this.router.navigate(['/subscribers', 'subscribers', value as unknown as string]);
            },
            error => console.warn('POST error', error),
            () => {
                console.log('POST finished');
            }
        );
    }
}
