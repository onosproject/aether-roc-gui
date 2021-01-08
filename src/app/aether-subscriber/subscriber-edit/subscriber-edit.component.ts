/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    Service as AetherV200TargetService,
    SubscriberUeService as AetherV100TargetSubscriberService,
    ApiService
} from '../../../openapi3/aether/2.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';
import {
    SubscriberUe as AetherV100TargetSubscriberUe,
    AccessProfileAccessProfile as AetherV100TargetAccessProfileAccessProfile,
    ApnProfileApnProfile as AetherV100TargetApnProfileApnProfile,
    QosProfileQosProfile as AetherV100TargetQosProfileQosProfile,
    UpProfileUpProfile as AetherV100TargetUpProfileUpProfile
} from '../../../openapi3/aether/2.0.0/models';

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
        id: [''],
        priority: [0, Validators.compose([
            Validators.min(0),
            Validators.max(1000)])
        ],
        enabled: [false],
        'requested-apn': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        ServingPlmn: this.fb.group({
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
        Profiles: this.fb.group({
                'apn-profile': [''],
                'qos-profile': [''],
                'security-profile': [''],
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

    loadSubscriberUe(target: string, id: string): void {
        this.aetherV100TargetSubscriberService.getSubscriberUe({
            target,
            id,
        }).subscribe(
            (value => {
                this.data = value;
                this.subscriberUeForm.get('id').setValue(value.id);
                this.subscriberUeForm.get('priority').setValue(value.priority);
                this.subscriberUeForm.get('enabled').setValue(value.enabled);
                this.subscriberUeForm.get('requested-apn').setValue(value['requested-apn']);
                this.subscriberUeForm.get('ServingPlmn')
                    .get('mcc').setValue(value['Serving-plmn'].mcc);
                this.subscriberUeForm.get('ServingPlmn')
                    .get('mnc').setValue(value['Serving-plmn'].mnc);
                this.subscriberUeForm.get('ServingPlmn')
                    .get('tac').setValue(value['Serving-plmn'].tac);
                this.subscriberUeForm.get('Profiles')
                    .get('apn-profile').setValue(value.Profiles['apn-profile']);
                this.subscriberUeForm.get('Profiles')
                    .get('qos-profile').setValue(value.Profiles['qos-profile']);
                this.subscriberUeForm.get('Profiles')
                    .get('up-profile').setValue(value.Profiles['up-profile']);
                console.log('Got Subscriber', value);
            }),
            error => {
                console.warn('Error getting Subscribers for ', target, error);
            },
            () => {
                console.log('Finished loading subscriber', target, id);
            }
        );
    }

    loadAccessProfiles(target: string): void {
        this.aetherV100TargetService.getAccessProfile({
            target,
        }).subscribe(
            (value => {
                this.accessProfiles = value['Access-profile'];
                console.log('Got ACCESS Profiles', value['Access-profile'].length);
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
        this.aetherV100TargetService.getApnProfile({
            target,
        }).subscribe(
            (value => {
                this.apnProfiles = value['Apn-profile'];
                console.log('Got APN Profiles', value['Apn-profile'].length);
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
        this.aetherV100TargetService.getQosProfile({
            target,
        }).subscribe(
            (value => {
                this.qosProfiles = value['Qos-profile'];
                console.log('Got QOS Profiles', value['Qos-profile'].length);
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
        this.aetherV100TargetService.getUpProfile({
            target,
        }).subscribe(
            (value => {
                this.upProfiles = value['Up-profile'];
                console.log('Got UP Profiles', value['Up-profile'].length);
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
        this.aetherApiService.postSubscriberUe({
            id: submitUeid,
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
