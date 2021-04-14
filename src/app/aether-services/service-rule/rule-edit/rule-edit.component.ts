/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ServiceRuleServiceRuleService} from '../../../../openapi3/aether/2.1.0/services';
import {ServiceRuleServiceRule} from '../../../../openapi3/aether/2.1.0/models';
import {BasketService, IDATTRIBS, TYPE} from '../../../basket.service';
import {RocEditBase} from '../../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';


@Component({
    selector: 'aether-rule-edit',
    templateUrl: './rule-edit.component.html',
    styleUrls: [
        '../../../common-edit.component.scss',
    ]
})
export class RuleEditComponent extends RocEditBase<ServiceRuleServiceRule> implements OnInit {
    data: ServiceRuleServiceRule;

    ruleForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'guaranteed-bitrate': this.fb.group({
            GBuplink: [0, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)])
            ],
            GBdownlink: [0, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)])
            ],
        }),
        'aggregate-maximum-bitrate': this.fb.group({
            AMBuplink: [0, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)])
            ],
            AMBdownlink: [0, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)])
            ],
        }),
        'maximum-requested-bandwidth': this.fb.group({
            MRBuplink: [0, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)])
            ],
            MRBdownlink: [0, Validators.compose([
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
        private serviceRuleServiceRuleService: ServiceRuleServiceRuleService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(snackBar, bs, route, router, 'service-rule-2.1.0', 'service-rule');
        super.form = this.ruleForm;
        super.loadFunc = this.loadServiceRuleServiceRule;
        this.ruleForm.get(['guaranteed-bitrate', 'GBuplink'])[TYPE] = 'number';
        this.ruleForm.get(['guaranteed-bitrate', 'GBdownlink'])[TYPE] = 'number';
        this.ruleForm.get(['aggregate-maximum-bitrate', 'AMBuplink'])[TYPE] = 'number';
        this.ruleForm.get(['aggregate-maximum-bitrate', 'AMBdownlink'])[TYPE] = 'number';
        this.ruleForm.get(['maximum-requested-bandwidth', 'MRBuplink'])[TYPE] = 'number';
        this.ruleForm.get(['maximum-requested-bandwidth', 'MRBdownlink'])[TYPE] = 'number';
        this.ruleForm.get(['qci'])[TYPE] = 'number';
        this.ruleForm.get(['arp', 'priority'])[TYPE] = 'number';
        this.ruleForm.get(['arp', 'preemption-capability'])[TYPE] = 'boolean';
        this.ruleForm.get(['arp', 'preemption-vulnerability'])[TYPE] = 'boolean';
    }

    ngOnInit(): void {
        super.init();
    }

    loadServiceRuleServiceRule(target: string, id: string): void {
        this.serviceRuleServiceRuleService.getServiceRuleServiceRule({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.ruleForm.get('display-name').setValue(value['display-name']);
                this.ruleForm.get(['guaranteed-bitrate', 'GBuplink']).setValue(value.qos['guaranteed-bitrate'].uplink);
                this.ruleForm.get(['guaranteed-bitrate', 'GBdownlink']).setValue(value.qos['guaranteed-bitrate'].downlink);
                this.ruleForm.get(['aggregate-maximum-bitrate', 'AMBuplink']).setValue(value.qos['aggregate-maximum-bitrate'].uplink);
                this.ruleForm.get(['aggregate-maximum-bitrate', 'AMBdownlink']).setValue(value.qos['aggregate-maximum-bitrate'].downlink);
                this.ruleForm.get(['maximum-requested-bandwidth', 'MRBuplink']).setValue(value.qos['maximum-requested-bandwidth'].uplink);
                this.ruleForm.get(['maximum-requested-bandwidth', 'MRBdownlink'])
                    .setValue(value.qos['maximum-requested-bandwidth'].downlink);
                this.ruleForm.get('qci').setValue(value.qos.qci);
                this.ruleForm.get(['arp', 'priority']).setValue(value.qos.arp.priority);
                this.ruleForm.get(['arp', 'preemption-capability']).setValue(value.qos.arp['preemption-capability']);
                this.ruleForm.get(['arp', 'preemption-vulnerability']).setValue(value.qos.arp['preemption-vulnerability']);
                this.ruleForm.get('description').setValue(value.description);
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
