/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {
    QosProfileQosProfileService
} from '../../../openapi3/aether/2.1.0/services';
import {
    QosProfileQosProfile, ServiceRuleServiceRule
} from '../../../openapi3/aether/2.1.0/models';
import {BasketService, ORIGINAL, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RocEditBase} from '../../roc-edit-base';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {Bandwidths} from '../../aether-services/service-rule/rule-edit/rule-edit.component';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'aether-qos-profile-edit',
    templateUrl: './qos-profile-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class QosProfileEditComponent extends RocEditBase<QosProfileQosProfile> implements OnInit {
    data: QosProfileQosProfile;
    options: Bandwidths[] = [
        { megabyte : { numerical : 1048576, inMb: '1Mb'} },
        { megabyte : { numerical : 2097152, inMb: '2Mb'} },
        { megabyte : { numerical : 5242880, inMb: '5Mb'} },
        { megabyte : { numerical : 1048576, inMb: '10Mb'} },
        { megabyte : { numerical : 26214400, inMb: '25Mb'} },
        { megabyte : { numerical : 52428800, inMb: '50Mb'} },
        { megabyte : { numerical: 104857600, inMb: '100Mb'} },
        { megabyte : { numerical: 524288000, inMb: '500Mb'}}
    ];
    bandwidthOptions: Observable<Bandwidths[]>;

    qosForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],

        'apn-ambr': this.fb.group({
            uplink: [0, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)])
            ],
            downlink: [0, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)])
            ],
        }),

        qci: [0, Validators.compose([
            Validators.min(0),
            Validators.max(85),
        ])],

        arp: this.fb.group({
            priority: [0, Validators.compose([
                Validators.min(0),
                Validators.max(15),
            ])],
            'preemption-capability': [''],
            'preemption-vulnerability': ['']
        }),

        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])]
    });

    constructor(
        private qosProfileQosProfileService: QosProfileQosProfileService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'qos-profile-2.1.0', 'qos-profile');
        super.form = this.qosForm;
        super.loadFunc = this.loadQosProfileQosProfile;
        this.qosForm.get(['apn-ambr', 'uplink'])[TYPE] = 'number';
        this.qosForm.get(['apn-ambr', 'downlink'])[TYPE] = 'number';
        this.qosForm.get(['qci'])[TYPE] = 'number';
        this.qosForm.get(['arp', 'priority'])[TYPE] = 'number';
        this.qosForm.get(['arp', 'preemption-capability'])[TYPE] = 'boolean';
        this.qosForm.get(['arp', 'preemption-vulnerability'])[TYPE] = 'boolean';
    }

    ngOnInit(): void {
        super.init();
        this.bandwidthOptions = this.qosForm.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'number' ? value : value.megabyte),
                map(megabyte => megabyte ? this._filter(megabyte) : this.options.slice())
            );
    }

    private _filter(bandwidthIndex: number): Bandwidths[] {
        const filterValue = bandwidthIndex;
        return this.options.filter(option => option.megabyte.numerical);
    }
    private populateFormData(value: QosProfileQosProfile): void {
        if (value['display-name']) {
            this.qosForm.get('display-name').setValue(value['display-name']);
            this.qosForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value['apn-ambr'] && value['apn-ambr'].uplink != null) {
            this.qosForm.get(['apn-ambr', 'uplink']).setValue(value['apn-ambr'].uplink);
            this.qosForm.get(['apn-ambr', 'uplink'])[ORIGINAL] = value['apn-ambr'].uplink;
        }
        if (value['apn-ambr'] && value['apn-ambr'].downlink != null) {
            this.qosForm.get(['apn-ambr', 'downlink']).setValue(value['apn-ambr'].downlink);
            this.qosForm.get(['apn-ambr', 'downlink'])[ORIGINAL] = value['apn-ambr'].downlink;
        }
        if (value.qci) {
            this.qosForm.get('qci').setValue(value.qci);
            this.qosForm.get('qci')[ORIGINAL] = value.qci;
        }
        if (value.arp && value.arp.priority) {
            this.qosForm.get(['arp', 'priority']).setValue(value.arp.priority);
            this.qosForm.get(['arp', 'priority'])[ORIGINAL] = value.arp.priority;
        }
        if (value.arp && value.arp['preemption-capability'] != null) {
            this.qosForm.get(['arp', 'preemption-capability']).setValue(value.arp['preemption-capability']);
            this.qosForm.get(['arp', 'preemption-capability'])[ORIGINAL] = value.arp['preemption-capability'];
        }
        if (value.arp && value.arp['preemption-vulnerability'] != null) {
            this.qosForm.get(['arp', 'preemption-vulnerability']).setValue(value.arp['preemption-vulnerability']);
            this.qosForm.get(['arp', 'preemption-vulnerability'])[ORIGINAL] = value.arp['preemption-vulnerability'];
        }
        if (value.description) {
            this.qosForm.get('description').setValue(value.description);
            this.qosForm.get('description')[ORIGINAL] = value.description;
        }
    }

    loadQosProfileQosProfile(target: string, id: string): void {
        this.qosProfileQosProfileService.getQosProfileQosProfile({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting QosProfileQosProfile(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['qos-profile-2.1.0']) {
                    basketPreview['qos-profile-2.1.0']['qos-profile'].forEach((basketItems) => {
                        if (basketItems.id === id){
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading QosProfileQosProfile(s)', target, id);
            }
        );
    }
}
