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
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../../basket.service';
import {RocEditBase} from '../../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../../open-policy-agent.service';
import {Observable} from 'rxjs';
import {Bandwidths} from '../../service-rule/rule-edit/rule-edit.component';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
    selector: 'aether-policy-edit',
    templateUrl: './policy-edit.component.html',
    styleUrls: [
        '../../../common-edit.component.scss',
    ]
})
export class PolicyEditComponent extends RocEditBase<ServicePolicyServicePolicy> implements OnInit {
    data: ServicePolicyServicePolicy;
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
    showAddComponent: boolean = false;

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
        super(snackBar, bs, route, router, 'service-policy-2.1.0', 'service-policy');
        super.form = this.policyForm;
        super.loadFunc = this.loadServicePolicyServicePolicy;
        this.policyForm.get(['ambr', 'uplink'])[TYPE] = 'number';
        this.policyForm.get(['ambr', 'downlink'])[TYPE] = 'number';
        this.policyForm.get(['qci'])[TYPE] = 'number';
        this.policyForm.get(['arp'])[TYPE] = 'number';
        this.policyForm.get(['rules'])[IDATTRIBS] = ['rule'];
    }
    get rulesServices(): FormArray {
        return this.policyForm.get('rules') as FormArray;
    }

    get serviceRuleExists(): string[] {
        const existingList: string[] = [];
        (this.policyForm.get(['rules']) as FormArray).controls.forEach((rule) => {
            existingList.push(rule.get('rule').value);
        });
        return existingList;
    }

    ruleSelected(selected: string): void {
        // Push into form
        if (selected !== undefined && selected !== '') {
            const ruleFormControl = this.fb.control(selected);
            ruleFormControl.markAsTouched();
            ruleFormControl.markAsDirty();
            const enabledControl = this.fb.control(false);
            enabledControl.markAsTouched();
            enabledControl.markAsDirty();
            enabledControl[TYPE] = 'boolean';
            (this.policyForm.get('rules') as FormArray).push(this.fb.group({
                rule: ruleFormControl,
                enabled: enabledControl,
            }));
            console.log('Adding new Value', selected);
        }
        this.showAddComponent = false;
    }

    ngOnInit(): void {
        super.init();
        this.bandwidthOptions = this.policyForm.valueChanges
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

    loadServicePolicyServicePolicy(target: string, id: string): void {
        this.servicePolicyServicePolicyService.getServicePolicyServicePolicy({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.policyForm.get('display-name').setValue(value['display-name']);
                this.policyForm.get('display-name')[ORIGINAL] = value['display-name'];

                this.policyForm.get(['ambr', 'uplink']).setValue(value.ambr.uplink);
                this.policyForm.get(['ambr', 'uplink'])[ORIGINAL] = value.ambr.uplink;

                this.policyForm.get(['ambr', 'downlink']).setValue(value.ambr.downlink);
                this.policyForm.get(['ambr', 'downlink'])[ORIGINAL] = value.ambr.downlink;

                this.policyForm.get('qci').setValue(value.qci);
                this.policyForm.get('qci')[ORIGINAL] = value.qci;

                this.policyForm.get('arp').setValue(value.arp);
                this.policyForm.get('arp')[ORIGINAL] = value.arp;

                this.policyForm.get('description').setValue(value.description);
                this.policyForm.get('description')[ORIGINAL] = value.description;

                for (const eachRule of value.rules) {
                    const ruleFormControl = this.fb.control(eachRule.rule);
                    ruleFormControl[ORIGINAL] = eachRule.rule;

                    const enabledControl = this.fb.control(eachRule.enabled);
                    enabledControl[ORIGINAL] = eachRule.enabled;

                    enabledControl[TYPE] = 'boolean';
                    (this.policyForm.get(['rules']) as FormArray).push(this.fb.group({
                        rule: ruleFormControl,
                        enabled: enabledControl,
                    }));
                }
            }),
            error => {
                console.warn('Error getting ServicePolicyServicePolicy(s) for ', target, error);
            },
            () => {
                console.log('Finished loading ServicePolicyServicePolicy(s)', target, id);
            }
        );
    }
    deleteFromSelect(rule: FormControl): void {
        this.bs.deleteIndexedEntry('/service-policy-2.1.0/service-policy[id=' + this.id +
            ']/rules[rule=' + rule + ']', 'rule');
        const index = (this.policyForm.get(['rules']) as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === rule);
        (this.policyForm.get(['rules']) as FormArray).removeAt(index);
    }
}
