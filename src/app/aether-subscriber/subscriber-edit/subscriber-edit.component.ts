/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {
    Service as AetherV200TargetService,
    SubscriberUeService,
    ApiService
} from '../../../openapi3/aether/2.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {
    SubscriberUe as AetherV100TargetSubscriberUe,
    AccessProfileAccessProfile,
    ApnProfileApnProfile,
    QosProfileQosProfile,
    UpProfileUpProfile,
    SecurityProfileSecurityProfile
} from '../../../openapi3/aether/2.0.0/models';

@Component({
    selector: 'aether-subscriber-edit',
    templateUrl: './subscriber-edit.component.html',
    styleUrls: [
        '../../common-edit.component.scss',
    ]
})
export class SubscriberEditComponent implements OnInit {
    @Input() target: string = AETHER_TARGETS[0];
    @Input() id: string;
    isNew: boolean;
    data: AetherV100TargetSubscriberUe;
    apnProfiles: Array<ApnProfileApnProfile>;
    qosProfiles: Array<QosProfileQosProfile>;
    upProfiles: Array<UpProfileUpProfile>;
    securityProfiles: Array<SecurityProfileSecurityProfile>;
    accessProfiles: Array<AccessProfileAccessProfile>;
    imsiWildcard: boolean;
    subscriberUeForm = this.fb.group({
        id: [''],
        priority: [0, Validators.compose([
            Validators.min(0),
            Validators.max(1000)])
        ],
        enabled: [false],
        'imsi-range-from': [''],
        'imsi-range-to': [''],
        'imsi-wildcard': [''],
        'requested-apn': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'Serving-plmn': this.fb.group({
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
                // 'Access-profile' : this.fb.array([]),
            }
        )
    });

    constructor(
        private subscriberUeService: SubscriberUeService,
        private aetherV200TargetService: AetherV200TargetService,
        private aetherApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            value => {
                if (value.get('id') === 'new') {
                    this.id = uuidv4();
                    this.isNew = true;
                } else {
                    this.id = value.get('id');
                    this.loadSubscriberUe(this.target, this.id);
                }
            }
        );
        this.loadAccessProfiles(this.target);
        this.loadApnProfiles(this.target);
        this.loadQosProfiles(this.target);
        this.loadUpProfiles(this.target);
        this.loadSecurityProfiles(this.target);
    }

    get accessProfileControls(): FormArray {
        return this.subscriberUeForm.get('Profiles').get('Access-profile') as FormArray;
    }

    loadSubscriberUe(target: string, id: string): void {
        this.subscriberUeService.getSubscriberUe({
            target,
            id,
        }).subscribe(
            (value => {
                this.data = value;
                this.subscriberUeForm.get('id').setValue(value.id);
                this.subscriberUeForm.get('priority').setValue(value.priority);
                this.subscriberUeForm.get('enabled').setValue(value.enabled);
                this.subscriberUeForm.get('imsi-range-from').setValue(value['imsi-range-from']);
                this.subscriberUeForm.get('imsi-range-to').setValue(value['imsi-range-to']);
                this.imsiWildcard = value['imsi-wildcard'] !== undefined;
                this.subscriberUeForm.get('imsi-wildcard').setValue(value['imsi-wildcard']);
                this.subscriberUeForm.get('requested-apn').setValue(value['requested-apn']);
                this.subscriberUeForm.get('Serving-plmn')
                    .get('mcc').setValue(value['Serving-plmn'].mcc);
                this.subscriberUeForm.get('Serving-plmn')
                    .get('mnc').setValue(value['Serving-plmn'].mnc);
                this.subscriberUeForm.get('Serving-plmn')
                    .get('tac').setValue(value['Serving-plmn'].tac);
                this.subscriberUeForm.get('Profiles')
                    .get('apn-profile').setValue(value.Profiles['apn-profile']);
                this.subscriberUeForm.get('Profiles')
                    .get('qos-profile').setValue(value.Profiles['qos-profile']);
                this.subscriberUeForm.get('Profiles')
                    .get('up-profile').setValue(value.Profiles['up-profile']);
                this.subscriberUeForm.get('Profiles')
                    .get('security-profile').setValue(value.Profiles['security-profile']);
                // for (const ap of value.Profiles['Access-profile']) {
                //     this.accessProfileControls.push(this.fb.group({
                //         'access-profile': new FormControl({value: ap['access-profile'], disabled: true}),
                //         allowed: new FormControl({value: ap.allowed, disabled: true}),
                //     }));
                // }
                console.log('Got Subscriber', value);
            }),
            error => {
                console.warn('Error getting SubscriberUe(s) for ', target, error);
            },
            () => {
                console.log('Finished loading SubscriberUe(s)', target, id);
            }
        );
    }

    loadAccessProfiles(target: string): void {
        this.aetherV200TargetService.getAccessProfile({
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
        this.aetherV200TargetService.getApnProfile({
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
        this.aetherV200TargetService.getQosProfile({
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
        this.aetherV200TargetService.getUpProfile({
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

    loadSecurityProfiles(target: string): void {
        this.aetherV200TargetService.getSecurityProfile({
            target,
        }).subscribe(
            (value => {
                this.securityProfiles = value['Security-profile'];
                console.log('Got UP Profiles', value['Security-profile'].length);
            }),
            error => {
                console.warn('Error getting Security Profiles for ', target, error);
            },
            () => {
                console.log('Finished loading Security Profiles', target);
            }
        );
    }

    onSubmit(): void {
        console.log('Submitted!', this.subscriberUeForm.getRawValue());
        let submitUeid = this.id;
        if (this.id === undefined) {
            submitUeid = this.subscriberUeForm.get('id').value as unknown as string;
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

    toggleImsiWildcard(isWildcard: boolean): void {
        this.imsiWildcard = isWildcard;
        if (isWildcard) {
            this.subscriberUeForm.get('imsi-range-from').setValue(undefined);
            this.subscriberUeForm.get('imsi-range-to').setValue(undefined);
        } else {
            this.subscriberUeForm.get('imsi-wildcard').setValue(undefined);
        }
    }
}
