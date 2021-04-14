/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ServicePolicyServicePolicyService} from '../../../../openapi3/aether/2.1.0/services';
import {ServicePolicyServicePolicy} from '../../../../openapi3/aether/2.1.0/models';
import {BasketService, IDATTRIBS, TYPE} from '../../../basket.service';
import {RocEditBase} from '../../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

@Component({
    selector: 'aether-policy-edit',
    templateUrl: './policy-edit.component.html',
    styleUrls: [
        '../../../common-edit.component.scss',
    ]
})
export class PolicyEditComponent extends RocEditBase<ServicePolicyServicePolicy> implements OnInit {
    data: ServicePolicyServicePolicy;

    policyForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        ambr : this.fb.group({
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
        arp: [0, Validators.compose([
            Validators.min(0),
            Validators.max(85),
        ])],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])],
        rules: this.fb.array([])
    });

    constructor(
        private servicePolicyServicePolicyService: ServicePolicyServicePolicyService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'service-rule-2.1.0', 'service-rule');
        super.form = this.policyForm;
        super.loadFunc = this.loadServicePolicyServicePolicy;
        this.policyForm.get(['ambr', 'uplink'])[TYPE] = 'number';
        this.policyForm.get(['ambr', 'downlink'])[TYPE] = 'number';
        this.policyForm.get(['qci'])[TYPE] = 'number';
        this.policyForm.get(['arp'])[TYPE] = 'number';
        this.policyForm.get(['rules'])[IDATTRIBS] = ['rules'];
    }
    get rulesServices(): FormArray {
        return this.policyForm.get('rules') as FormArray;
    }

    ngOnInit(): void {
        super.init();
    }

    loadServicePolicyServicePolicy(target: string, id: string): void {
        this.servicePolicyServicePolicyService.getServicePolicyServicePolicy({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.policyForm.get('display-name').setValue(value['display-name']);
                this.policyForm.get(['ambr', 'uplink']).setValue(value.ambr.uplink);
                this.policyForm.get(['ambr', 'downlink']).setValue(value.ambr.downlink);
                this.policyForm.get('qci').setValue(value.qci);
                this.policyForm.get('arp').setValue(value.arp);
                this.policyForm.get('description').setValue(value.description);
                for (const eachRule of value.rules) {
                    const ruleFormControl = this.fb.control(eachRule.rule);
                    const allowedControl = this.fb.control(eachRule.enabled);
                    allowedControl[TYPE] = 'boolean';
                    (this.policyForm.get(['rules']) as FormArray).push(this.fb.group({
                        rules: ruleFormControl,
                        enabled: allowedControl,
                    }));
                }
            }),
            error => {
                console.warn('Error getting QosProfileQosProfile(s) for ', target, error);
            },
            () => {
                console.log('Finished loading QosProfileQosProfile(s)', target, id);
            }
        );
    }
    deleteFromSelect(rules: FormControl): void {
        this.bs.deleteIndexedEntry('/service-policy-2.1.0/ue[id=' + this.id +
            ']/rules[rule=' + rules + ']', 'rule');
        const index = (this.policyForm.get(['rules']) as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === rules);
        (this.policyForm.get(['rules']) as FormArray).removeAt(index);
    }
}
