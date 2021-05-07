/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceRuleServiceRuleService} from '../../../../openapi3/aether/2.1.0/services';
import {ServiceRuleServiceRule} from '../../../../openapi3/aether/2.1.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../../basket.service';
import {RocEditBase} from '../../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {OpenPolicyAgentService} from '../../../open-policy-agent.service';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

export interface Bandwidths {
    megabyte: { numerical: number, inMb: string};
}

@Component({
    selector: 'aether-rule-edit',
    templateUrl: './rule-edit.component.html',
    styleUrls: [
        '../../../common-edit.component.scss',
    ]
})
export class RuleEditComponent extends RocEditBase<ServiceRuleServiceRule> implements OnInit {
    data: ServiceRuleServiceRule;
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
    ruleForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        qos : this.fb.group({
            'guaranteed-bitrate' : this.fb.group({
                uplink: [''],
                downlink: ['']
            }),
            'aggregate-maximum-bitrate' : this.fb.group({
                uplink: [''],
                downlink: ['']
            }),
            'maximum-requested-bandwidth' : this.fb.group({
                uplink: [''],
                downlink: ['']
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
            })
        }),
        flow : this.fb.group({
            specification: ['', Validators.compose([
                    Validators.minLength(1),
                    Validators.maxLength(1024),
            ])]
        }),
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])],
        'charging-rule-name': ['', Validators.compose([
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
        this.ruleForm.get(['qos', 'guaranteed-bitrate', 'downlink'])[TYPE] = 'number';
        this.ruleForm.get(['qos', 'guaranteed-bitrate', 'uplink'])[TYPE] = 'number';
        this.ruleForm.get(['qos', 'aggregate-maximum-bitrate', 'downlink'])[TYPE] = 'number';
        this.ruleForm.get(['qos', 'aggregate-maximum-bitrate', 'uplink'])[TYPE] = 'number';
        this.ruleForm.get(['qos', 'maximum-requested-bandwidth', 'downlink'])[TYPE] = 'number';
        this.ruleForm.get(['qos', 'maximum-requested-bandwidth', 'uplink'])[TYPE] = 'number';
        this.ruleForm.get(['qos', 'qci'])[TYPE] = 'number';
        this.ruleForm.get(['qos', 'arp', 'priority'])[TYPE] = 'number';
        this.ruleForm.get(['qos', 'arp', 'preemption-capability'])[TYPE] = 'boolean';
        this.ruleForm.get(['qos', 'arp', 'preemption-vulnerability'])[TYPE] = 'boolean';
    }

    ngOnInit(): void {
        super.init();
        this.bandwidthOptions = this.ruleForm.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'number' ? value : value.megabyte),
                map(megabyte => megabyte ? this._filter(megabyte) : this.options.slice())
            );
    }

    get ambControls(): FormArray {
        return this.ruleForm.get(['qos', 'aggregate-maximum-bitrate']) as FormArray;
    }

    get gbControls(): FormArray {
        return this.ruleForm.get(['qos', 'guaranteed-bitrate']) as FormArray;
    }
    private _filter(bandwidthIndex: number): Bandwidths[] {
        const filterValue = bandwidthIndex;
        return this.options.filter(option => option.megabyte.numerical);
    }

    loadServiceRuleServiceRule(target: string, id: string): void {
        this.serviceRuleServiceRuleService.getServiceRuleServiceRule({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.ruleForm.get('display-name').setValue(value['display-name']);
                this.ruleForm.get('display-name')[ORIGINAL] = value['display-name'];

                const gbDownlink = value.qos['guaranteed-bitrate'].downlink;
                const gbUplink = value.qos['guaranteed-bitrate'].uplink;

                this.ruleForm.get(['qos', 'guaranteed-bitrate', 'downlink']).setValue(gbDownlink);
                this.ruleForm.get(['qos', 'guaranteed-bitrate', 'downlink'])[ORIGINAL] = gbDownlink;

                this.ruleForm.get(['qos', 'guaranteed-bitrate', 'uplink']).setValue( gbUplink);
                this.ruleForm.get(['qos', 'guaranteed-bitrate', 'uplink'])[ORIGINAL] = gbUplink;

                const ambDownlink = value.qos['aggregate-maximum-bitrate'].downlink;
                const ambUplink = value.qos['aggregate-maximum-bitrate'].uplink;

                this.ruleForm.get(['qos', 'aggregate-maximum-bitrate', 'downlink']).setValue(ambDownlink);
                this.ruleForm.get(['qos', 'aggregate-maximum-bitrate', 'downlink'])[ORIGINAL] =  ambDownlink;

                this.ruleForm.get(['qos', 'aggregate-maximum-bitrate', 'uplink']).setValue( ambUplink);
                this.ruleForm.get(['qos', 'aggregate-maximum-bitrate', 'uplink'])[ORIGINAL] = ambUplink;

                const mrbDownlink = value.qos['maximum-requested-bandwidth'].downlink;
                const mrbUplink = value.qos['maximum-requested-bandwidth'].uplink;

                this.ruleForm.get(['qos', 'maximum-requested-bandwidth', 'downlink']).setValue(mrbDownlink);
                this.ruleForm.get(['qos', 'maximum-requested-bandwidth', 'downlink'])[ORIGINAL] = mrbDownlink;

                this.ruleForm.get(['qos', 'maximum-requested-bandwidth', 'uplink']).setValue( mrbUplink);
                this.ruleForm.get(['qos', 'maximum-requested-bandwidth', 'uplink'])[ORIGINAL] = mrbUplink;

                const priority = value.qos.arp.priority;
                const preemptionCapability = value.qos.arp['preemption-capability'];
                const preemptionVulnerability = value.qos.arp['preemption-vulnerability'];

                this.ruleForm.get(['qos', 'arp', 'priority']).setValue(priority);
                this.ruleForm.get(['qos', 'arp', 'priority'])[ORIGINAL] = priority;

                this.ruleForm.get(['qos', 'arp', 'preemption-capability']).setValue(preemptionCapability);
                this.ruleForm.get(['qos', 'arp', 'preemption-capability'])[ORIGINAL] = preemptionCapability;

                this.ruleForm.get(['qos', 'arp', 'preemption-vulnerability']).setValue(preemptionVulnerability);
                this.ruleForm.get(['qos', 'arp', 'preemption-vulnerability'])[ORIGINAL] = preemptionVulnerability;

                this.ruleForm.get(['qos', 'qci']).setValue(value.qos.qci);
                this.ruleForm.get(['qos', 'qci'])[ORIGINAL] = value.qos.qci;

                this.ruleForm.get(['flow', 'specification']).setValue(value.flow.specification);
                this.ruleForm.get(['flow', 'specification'])[ORIGINAL] = value.flow.specification;

                this.ruleForm.get('description').setValue(value.description);
                this.ruleForm.get('description')[ORIGINAL] = value.description;

                this.ruleForm.get('charging-rule-name').setValue(value['charging-rule-name']);
                this.ruleForm.get('charging-rule-name')[ORIGINAL] = value['charging-rule-name'];
            }),
            error => {
                console.warn('Error getting ServiceRuleServiceRule(s) for ', target, error);
            },
            () => {
                console.log('Finished loading ServiceRuleServiceRule(s)', target, id);
            }
        );
    }
}
