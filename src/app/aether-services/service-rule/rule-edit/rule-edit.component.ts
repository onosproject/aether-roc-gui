/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, InjectionToken, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceRuleServiceRuleService} from '../../../../openapi3/aether/2.1.0/services';
import {ServiceRuleServiceRule} from '../../../../openapi3/aether/2.1.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../../basket.service';
import {RocEditBase} from '../../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {OpenPolicyAgentService} from '../../../open-policy-agent.service';
import {isEmpty, map, startWith} from 'rxjs/operators';

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
    pathRoot = 'service-rule-2.1.0';
    pathListAttr = 'service-rule';
    ruleForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        qos : this.fb.group({
            'guaranteed-bitrate' : this.fb.group({
                uplink: [0,Validators.compose(([
                    Validators.minLength(0),
                    Validators.maxLength(4294967295)
                ]))],
                downlink: [0,Validators.compose(([
                    Validators.minLength(0),
                    Validators.maxLength(4294967295)
                ]))]
            }),
            'aggregate-maximum-bitrate' : this.fb.group({
                uplink: [0,Validators.compose(([
                    Validators.minLength(0),
                    Validators.maxLength(4294967295)
                ]))],
                downlink: [0,Validators.compose(([
                    Validators.minLength(0),
                    Validators.maxLength(4294967295)
                ]))],
            }),
            'maximum-requested-bandwidth' : this.fb.group({
                uplink: [0,Validators.compose(([
                    Validators.minLength(0),
                    Validators.maxLength(4294967295)
                ]))],
                downlink: [0,Validators.compose(([
                    Validators.minLength(0),
                    Validators.maxLength(4294967295)
                ]))],
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
        public opaService: OpenPolicyAgentService,
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
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting ServiceRuleServiceRule(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['service-rule-2.1.0']) {
                    basketPreview['service-rule-2.1.0']['service-rule'].forEach((basketItems) => {
                        if (basketItems.id === id){
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading ServiceRuleServiceRule(s)', target, id);
            }
        );
    }

    private populateFormData(value: ServiceRuleServiceRule): void{
        if (value['display-name']) {
            this.ruleForm.get('display-name').setValue(value['display-name']);
        }
        if (value.qos && value.qos['guaranteed-bitrate'].downlink != null) {
            const gbDownlink = value.qos['guaranteed-bitrate'].downlink;
            this.ruleForm.get(['qos', 'guaranteed-bitrate', 'downlink']).setValue(gbDownlink);
        }
        if (value.qos && value.qos['guaranteed-bitrate'].uplink != null) {
            const gbUplink = value.qos['guaranteed-bitrate'].uplink;
            this.ruleForm.get(['qos', 'guaranteed-bitrate', 'uplink']).setValue(gbUplink);
        }
        if (value.qos && value.qos['aggregate-maximum-bitrate'].downlink != null){
            const ambDownlink = value.qos['aggregate-maximum-bitrate'].downlink;
            this.ruleForm.get(['qos', 'aggregate-maximum-bitrate', 'downlink']).setValue(ambDownlink);
        }
        if (value.qos && value.qos['aggregate-maximum-bitrate'].uplink != null) {
            const ambUplink = value.qos['aggregate-maximum-bitrate'].uplink;
            this.ruleForm.get(['qos', 'aggregate-maximum-bitrate', 'uplink']).setValue(ambUplink);
        }
        if (value.qos && value.qos['maximum-requested-bandwidth'].downlink != null) {
            const mrbDownlink = value.qos['maximum-requested-bandwidth'].downlink;
            this.ruleForm.get(['qos', 'maximum-requested-bandwidth', 'downlink']).setValue(mrbDownlink);
        }
        if (value.qos && value.qos['maximum-requested-bandwidth'].uplink != null) {
            const mrbUplink = value.qos['maximum-requested-bandwidth'].uplink;
            this.ruleForm.get(['qos', 'maximum-requested-bandwidth', 'uplink']).setValue(mrbUplink);
        }
        if (value.qos && value.qos.arp && value.qos.arp.priority != null){
            const priority = value.qos.arp.priority;
            this.ruleForm.get(['qos', 'arp', 'priority']).setValue(priority);
        }
        if (value.qos && value.qos.arp && 'preemption-capability' in value.qos.arp ){
            const preemptionCapability = value.qos.arp['preemption-capability'];
            this.ruleForm.get(['qos', 'arp', 'preemption-capability']).setValue(preemptionCapability);
        }
        if (value.qos && value.qos.arp && 'preemption-vulnerability' in value.qos.arp) {
            const preemptionVulnerability = value.qos.arp['preemption-vulnerability'];
            this.ruleForm.get(['qos', 'arp', 'preemption-vulnerability']).setValue(preemptionVulnerability);
        }
        if (value.qos && value.qos.qci != null){
            this.ruleForm.get(['qos', 'qci']).setValue(value.qos.qci);
        }
        if (value.flow && value.flow.specification) {
            this.ruleForm.get(['flow', 'specification']).setValue(value.flow.specification);
        }
        if (value.description){
            this.ruleForm.get('description').setValue(value.description);
        }
        if (value['charging-rule-name']){
            this.ruleForm.get('charging-rule-name').setValue(value['charging-rule-name']);
        }
    }
}
