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
    Service as AetherService,
    QosProfileQosProfileService
} from '../../../openapi3/aether/2.1.0/services';
import {
    QosProfileQosProfile
} from '../../../openapi3/aether/2.1.0/models';
import {BasketService, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RocEditBase} from '../../roc-edit-base';

@Component({
    selector: 'aether-qos-profile-edit',
    templateUrl: './qos-profile-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class QosProfileEditComponent extends RocEditBase<QosProfileQosProfile> implements OnInit {
    data: QosProfileQosProfile;

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
    }

    loadQosProfileQosProfile(target: string, id: string): void {
        this.qosProfileQosProfileService.getQosProfileQosProfile({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.qosForm.get('display-name').setValue(value['display-name']);
                this.qosForm.get(['apn-ambr', 'uplink']).setValue(value['apn-ambr'].uplink);
                this.qosForm.get(['apn-ambr', 'downlink']).setValue(value['apn-ambr'].downlink);
                this.qosForm.get('qci').setValue(value.qci);
                this.qosForm.get(['arp', 'priority']).setValue(value.arp.priority);
                this.qosForm.get(['arp', 'preemption-capability']).setValue(value.arp['preemption-capability']);
                this.qosForm.get(['arp', 'preemption-vulnerability']).setValue(value.arp['preemption-vulnerability']);
                this.qosForm.get('description').setValue(value.description);
            }),
            error => {
                console.warn('Error getting QosProfileQosProfile(s) for ', target, error);
            },
            () => {
                console.log('Finished loading QosProfileQosProfile(s)', target, id);
            }
        );
    }
}
