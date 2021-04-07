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
import {BasketService} from '../../basket.service';

@Component({
    selector: 'aether-qos-profile-edit',
    templateUrl: './qos-profile-edit.component.html',
    styleUrls: ['../../common-edit.component.scss',
        './qos-profile-edit.component.scss'
    ]
})
export class QosProfileEditComponent implements OnInit {
    @Input() target: string = AETHER_TARGETS[0];
    @Input() id: string;
    isNew: boolean;
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
            'up-link': [0, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)])
            ],
            'down-link': [0, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)])
            ],
        }),

        qci: [0, Validators.compose([
            Validators.min(1),
            Validators.max(32),
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
        private aetherService: AetherService,
        private aetherApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private bs: BasketService
    ) {
    }

    ngOnInit(): void {

    }

    loadQosProfileQosProfile(target: string, id: string): void {
        this.qosProfileQosProfileService.getQosProfileQosProfile({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.qosForm.get('id').setValue(value.id);
                this.qosForm.get('display-name').setValue(value['display-name']);
                this.qosForm.get('apn-ambr')
                    .get('uplink').setValue(value['apn-ambr'].uplink);
                this.qosForm.get('apn-ambr')
                    .get('downlink').setValue(value['apn-ambr'].downlink);
                this.qosForm.get('opc').setValue(value.opc);
                this.qosForm.get('sqn').setValue(value.sqn);
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

    onSubmit(): void {
        console.log('Submitted!', this.qosForm.getRawValue());
        let submitId = this.id;
        if (this.id === undefined) {
            submitId = this.qosForm.get('id').value as unknown as string;
        }
        this.bs.logKeyValuePairs(this.qosForm, 'qos-profile/qos-profile[id=' + this.id + ' ]' );
    }

}
