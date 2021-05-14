/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {
    Service as AetherService,
    SubscriberUeService,
    ApiService
} from '../../../openapi3/aether/2.1.0/services';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {
    SubscriberUe as AetherV100TargetSubscriberUe,
    AccessProfileAccessProfile,
    ApnProfileApnProfile,
    QosProfileQosProfile,
    UpProfileUpProfile,
    SecurityProfileSecurityProfile, SubscriberUe, EnterpriseEnterprise, ServiceRuleServiceRule
} from '../../../openapi3/aether/2.1.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RocEditBase} from '../../roc-edit-base';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';



@Component({
    selector: 'aether-subscriber-edit',
    templateUrl: './subscriber-edit.component.html',
    styleUrls: [
        '../../common-edit.component.scss',
    ]
})
export class SubscriberEditComponent extends RocEditBase<SubscriberUe> implements OnInit {
    data: AetherV100TargetSubscriberUe;
    enterprises: Array<EnterpriseEnterprise>;
    apnProfiles: Array<ApnProfileApnProfile>;
    qosProfiles: Array<QosProfileQosProfile>;
    upProfiles: Array<UpProfileUpProfile>;
    securityProfiles: Array<SecurityProfileSecurityProfile>;
    accessProfiles: Array<AccessProfileAccessProfile>;
    imsiWildcard: boolean;
    showApSelect: boolean;

    subscriberUeForm = this.fb.group({
        id: [''],
        priority: [0, Validators.compose([
            Validators.min(0),
            Validators.max(1000)])
        ],
        enabled: [false],
        enterprise: [''],
        'imsi-range-from': [''],
        'imsi-range-to': [''],
        'imsi-wildcard': [''],
        'requested-apn': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'serving-plmn': this.fb.group({
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
        profiles: this.fb.group({
                'apn-profile': [''],
                'qos-profile': [''],
                'security-profile': [''],
                'up-profile': [''],
                'access-profile' : this.fb.array([]),
            }
        )
    });

    constructor(
        private subscriberUeService: SubscriberUeService,
        private aetherService: AetherService,
        private aetherApiService: ApiService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'subscriber-2.1.0', 'ue');
        super.form = this.subscriberUeForm;
        super.loadFunc = this.loadSubscriberUe;
        super.initFunc = uuidv4; // Generate a new UUID if a new SubscriberUe
        this.subscriberUeForm.get(['imsi-range-from'])[TYPE] = 'number';
        this.subscriberUeForm.get(['imsi-range-to'])[TYPE] = 'number';
        this.subscriberUeForm.get(['serving-plmn', 'mcc'])[TYPE] = 'number';
        this.subscriberUeForm.get(['serving-plmn', 'mnc'])[TYPE] = 'number';
        this.subscriberUeForm.get(['serving-plmn', 'tac'])[TYPE] = 'number';
        this.subscriberUeForm.get(['priority'])[TYPE] = 'number';
        this.subscriberUeForm.get(['enabled'])[TYPE] = 'boolean';
        this.subscriberUeForm.get(['profiles', 'access-profile'])[IDATTRIBS] = ['access-profile'];
    }

    ngOnInit(): void {
        super.init();
        this.loadEnterprises(this.target);
        this.loadApnProfiles(this.target);
        this.loadQosProfiles(this.target);
        this.loadUpProfiles(this.target);
        this.loadSecurityProfiles(this.target);
    }

    get accessProfileControls(): FormArray {
        return this.subscriberUeForm.get(['profiles', 'access-profile']) as FormArray;
    }

    private populateFormData(value: AetherV100TargetSubscriberUe): void{
        if (value.priority != null) {
            this.subscriberUeForm.get('priority').setValue(value.priority);
        }
        if (value.enabled) {
            this.subscriberUeForm.get('enabled').setValue(value.enabled);
            this.subscriberUeForm.get('enabled')[ORIGINAL] = value.enabled;
        }
        if (value['imsi-range-from']) {
            this.subscriberUeForm.get('imsi-range-from').setValue(value['imsi-range-from']);
            this.subscriberUeForm.get('imsi-range-from')[ORIGINAL] = value['imsi-range-from'];
        }
        if (value['imsi-range-to']){
            this.subscriberUeForm.get('imsi-range-to').setValue(value['imsi-range-to']);
            this.subscriberUeForm.get('imsi-range-to')[ORIGINAL] = value['imsi-range-to'];
        }
        if (value['imsi-wildcard']) {
            this.subscriberUeForm.get('imsi-wildcard').setValue(value['imsi-wildcard']);
            this.subscriberUeForm.get('imsi-wildcard')[ORIGINAL] = value['imsi-wildcard'];
        }
        if (value['requested-apn']) {
            this.subscriberUeForm.get('requested-apn').setValue(value['requested-apn']);
            this.subscriberUeForm.get('requested-apn')[ORIGINAL] = value['requested-apn'];
        }
        if (value['serving-plmn'] && value['serving-plmn'].mcc != null) {
            this.subscriberUeForm.get(['serving-plmn', 'mcc']).setValue(value['serving-plmn'].mcc);
            this.subscriberUeForm.get(['serving-plmn', 'mcc'])[ORIGINAL] = value['serving-plmn'].mcc;
        }
        if (value['serving-plmn'] && value['serving-plmn'].mnc != null){
            this.subscriberUeForm.get(['serving-plmn', 'mnc']).setValue(value['serving-plmn'].mnc);
            this.subscriberUeForm.get(['serving-plmn', 'mnc'])[ORIGINAL] = value['serving-plmn'].mnc;
        }
        if (value['serving-plmn'] && value['serving-plmn'].tac != null){
            this.subscriberUeForm.get(['serving-plmn', 'tac']).setValue(value['serving-plmn'].tac);
            this.subscriberUeForm.get(['serving-plmn', 'tac'])[ORIGINAL] = value['serving-plmn'].tac;
        }
        if (value.enterprise != null) {
            this.subscriberUeForm.get(['enterprise']).setValue(value.enterprise);
            this.subscriberUeForm.get(['enterprise'])[ORIGINAL] = value.enterprise;
        }
        if (value.profiles && value.profiles['apn-profile'] != null){
            this.subscriberUeForm.get(['profiles', 'apn-profile']).setValue(value.profiles['apn-profile']);
            this.subscriberUeForm.get(['profiles', 'apn-profile'])[ORIGINAL] = value.profiles['apn-profile'];
        }
        if (value.profiles && value.profiles['qos-profile'] != null){
            this.subscriberUeForm.get(['profiles', 'qos-profile']).setValue(value.profiles['qos-profile']);
            this.subscriberUeForm.get(['profiles', 'qos-profile'])[ORIGINAL] = value.profiles['qos-profile'];
        }
        if (value.profiles && value.profiles['up-profile'] !=null){
            this.subscriberUeForm.get(['profiles', 'up-profile']).setValue(value.profiles['up-profile']);
            this.subscriberUeForm.get(['profiles', 'up-profile'])[ORIGINAL] = value.profiles['up-profile'];
        }
        if (value.profiles && value.profiles['security-profile'] != null){
            this.subscriberUeForm.get(['profiles', 'security-profile']).setValue(value.profiles['security-profile']);
            this.subscriberUeForm.get(['profiles', 'security-profile'])[ORIGINAL] = value.profiles['security-profile'];
        }
        if (value.profiles && value.profiles['access-profile'] ){
            if (this.subscriberUeForm.value.profiles['access-profile'].length === 0) {
                for (const ap of value.profiles['access-profile']) {
                    const apFormControl = this.fb.control(ap['access-profile']);
                    apFormControl[ORIGINAL] = ap['access-profile'];
                    const allowedControl = this.fb.control(ap.allowed);
                    allowedControl[ORIGINAL] = ap.allowed;
                    allowedControl[TYPE] = 'boolean';

                    (this.subscriberUeForm.get(['profiles', 'access-profile']) as FormArray).push(this.fb.group({
                        'access-profile': apFormControl,
                        allowed: allowedControl,
                    }));
                }
                console.log('Got Subscriber', value);
            } else {
                for (const eachValueAccessProfile of value.profiles['access-profile']) {
                    let eachFormRulePosition = 0;
                    for (const eachFormSubscribe of this.subscriberUeForm.value.profiles['access-profile']){
                        if (eachValueAccessProfile['access-profile'] === eachFormSubscribe['access-profile']){
                            this.subscriberUeForm.value.profiles['access-profile'].allowed = eachValueAccessProfile.allowed;
                        }
                        eachFormRulePosition++;
                    }
                }
            }
        }
    }

    loadSubscriberUe(target: string, id: string): void {
        this.subscriberUeService.getSubscriberUe({
            target,
            id,
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
                console.log('Got Subscriber', value);
            }),
            error => {
                console.warn('Error getting SubscriberUe(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['subscriber-2.1.0']) {
                    basketPreview['subscriber-2.1.0']['ue'].forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading SubscriberUe(s)', target, id);
            }
        );
    }

    loadEnterprises(target: string): void {
        this.aetherService.getEnterprise({
            target,
        }).subscribe(
            (value => {
                this.enterprises = value.enterprise;
                console.log('Got Enterprises', value.enterprise.length);
            }),
            error => {
                console.warn('Error getting Enterprises for ', target, error);
            },
            () => {
                console.log('Finished loading Enterprises', target);
            }
        );
    }

    loadApnProfiles(target: string): void {
        this.aetherService.getApnProfile({
            target,
        }).subscribe(
            (value => {
                this.apnProfiles = value['apn-profile'];
                console.log('Got APN Profiles', value['apn-profile'].length);
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
        this.aetherService.getQosProfile({
            target,
        }).subscribe(
            (value => {
                this.qosProfiles = value['qos-profile'];
                console.log('Got QOS Profiles', value['qos-profile'].length);
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
        this.aetherService.getUpProfile({
            target,
        }).subscribe(
            (value => {
                this.upProfiles = value['up-profile'];
                console.log('Got UP Profiles', value['up-profile'].length);
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
        this.aetherService.getSecurityProfile({
            target,
        }).subscribe(
            (value => {
                this.securityProfiles = value['security-profile'];
                console.log('Got Security Profiles', value['security-profile'].length);
            }),
            error => {
                console.warn('Error getting Security Profiles for ', target, error);
            },
            () => {
                console.log('Finished loading Security Profiles', target);
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

    deleteFromSelect(ap: FormControl): void {
        this.bs.deleteIndexedEntry('/subscriber-2.1.0/ue[id=' + this.id +
            ']/access-profile[access-profile=' + ap + ']', 'access-profile');
        const index = (this.subscriberUeForm.get(['profiles', 'access-profile']) as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === ap);
        (this.subscriberUeForm.get(['profiles', 'access-profile']) as FormArray).removeAt(index);
    }

    get accessProfileExisting(): string[] {
        const existingList: string[] = [];
        (this.subscriberUeForm.get(['profiles', 'access-profile']) as FormArray).controls.forEach((ap) => {
            existingList.push(ap.get('access-profile').value);
        });
        return existingList;
    }

    apSelected(selected: string): void {
        // Push into form
        if (selected !== undefined && selected !== '') {
            const apFormControl = this.fb.control(selected);
            apFormControl.markAsTouched();
            apFormControl.markAsDirty();
            const allowedControl = this.fb.control(false);
            allowedControl.markAsTouched();
            allowedControl.markAsDirty();
            allowedControl[TYPE] = 'boolean';
            (this.subscriberUeForm.get(['profiles', 'access-profile']) as FormArray).push(this.fb.group({
                'access-profile': apFormControl,
                allowed: allowedControl,
            }));
            console.log('Adding new Value', selected);
        }
        this.showApSelect = false;
    }
}
