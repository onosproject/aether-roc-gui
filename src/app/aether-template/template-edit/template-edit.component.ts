/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import {
    BasketService,
    HEX2NUM,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { MatHeaderRow } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RocEditBase } from '../../roc-edit-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HexPipe } from '../../utils/hex.pipe';
import { EnterprisesEnterpriseTemplate } from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseTrafficClass } from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseTemplateService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';
import { TemplateDatasource } from '../template/template-datasource';
import { templateModelPath } from '../../models-info';

export interface Bandwidths {
    megabyte: { numerical: number; inMb: string };
}

interface BurstRate {
    value: number;
    label: string;
}

@Component({
    selector: 'aether-template-edit',
    templateUrl: './template-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class TemplateEditComponent
    extends RocEditBase<TemplateDatasource>
    implements OnInit
{
    @ViewChild(MatHeaderRow) row: MatHeaderRow;
    @ViewChild(MatSort) sort: MatSort;

    sdAsInt = HexPipe.hexAsInt;

    pathListAttr = 'template';
    trafficClass: Array<EnterprisesEnterpriseTrafficClass>;
    templateID: string;
    defaultBehaviorOpitons = ['DENY-ALL', 'ALLOW-ALL'];
    options: Bandwidths[] = [
        { megabyte: { numerical: 1000000, inMb: '1Mbps' } },
        { megabyte: { numerical: 2000000, inMb: '2Mbps' } },
        { megabyte: { numerical: 5000000, inMb: '5Mbps' } },
        { megabyte: { numerical: 10000000, inMb: '10Mbps' } },
        { megabyte: { numerical: 25000000, inMb: '25Mbps' } },
        { megabyte: { numerical: 50000000, inMb: '50Mbps' } },
        { megabyte: { numerical: 100000000, inMb: '100Mbps' } },
        { megabyte: { numerical: 500000000, inMb: '500Mbps' } },
    ];

    burstRateOptions: BurstRate[] = [
        { label: '125 KB', value: 125000 },
        { label: '250 KB', value: 250000 },
        { label: '375 KB', value: 375000 },
        { label: '500 KB', value: 500000 },
        { label: '625 KB', value: 625000 },
        { label: '750 KB', value: 750000 },
        { label: '875 KB', value: 875000 },
        { label: '1 MB', value: 1000000 },
    ];

    bandwidthOptions: Observable<Bandwidths[]>;
    data: EnterprisesEnterpriseTemplate;
    tempForm = this.fb.group({
        'template-id': [
            undefined,
            Validators.compose([
                Validators.pattern('[a-z]([a-z0-9-]?[a-z0-9])*'),
                Validators.minLength(1),
                Validators.maxLength(63),
            ]),
        ],
        'display-name': [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
        description: [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(1024),
            ]),
        ],
        sd: [
            undefined,
            Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(6),
                Validators.pattern('^[A-F0-9]{6}'),
            ]),
        ],
        'default-behavior': [
            undefined,
            Validators.compose([Validators.required]),
        ],
        sst: [
            undefined,
            Validators.compose([Validators.min(1), Validators.max(255)]),
        ],
        mbr: this.fb.group({
            uplink: [
                undefined,
                Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295),
                ]),
            ],
            downlink: [
                undefined,
                Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295),
                ]),
            ],
            'uplink-burst-size': [
                undefined,
                Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295),
                ]),
            ],
            'downlink-burst-size': [
                undefined,
                Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295),
                ]),
            ],
        }),
    });

    constructor(
        private templateTemplateService: EnterprisesEnterpriseTemplateService,
        protected aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            snackBar,
            bs,
            route,
            router,
            new TemplateDatasource(aetherService, bs, AETHER_TARGET),
            templateModelPath,
            aetherService
        );
        super.form = this.tempForm;
        super.loadFunc = this.loadTemplateTemplate;
        this.tempForm[REQDATTRIBS] = ['default-behavior'];
    }

    ngOnInit(): void {
        super.init();
        if (this.isNewInstance) {
            this.tempForm
                .get('default-behavior')
                .setValue(this.defaultBehaviorOpitons[0]);
            this.tempForm.get('default-behavior').markAsTouched();
            this.tempForm.get('default-behavior').markAsDirty();
        }
        this.bandwidthOptions = this.tempForm.valueChanges.pipe(
            startWith(''),
            map((value) =>
                typeof value === 'number' ? value : value.megabyte
            ),
            map((megabyte) =>
                megabyte ? this._filter() : this.options.slice()
            )
        );
        this.tempForm.get('sd')[TYPE] = HEX2NUM;
        this.tempForm.get('sst')[TYPE] = 'number';
        this.tempForm.get(['mbr', 'uplink'])[TYPE] = 'number';
        this.tempForm.get(['mbr', 'downlink'])[TYPE] = 'number';
        this.tempForm.get(['mbr', 'uplink-burst-size'])[TYPE] = 'number';
        this.tempForm.get(['mbr', 'downlink-burst-size'])[TYPE] = 'number';
    }

    private _filter(): Bandwidths[] {
        return this.options.filter((option) => option.megabyte.numerical);
    }

    loadTemplateTemplate(target: string, id: string): void {
        this.templateTemplateService
            .getEnterprisesEnterpriseTemplate({
                target: AETHER_TARGET,
                'template-id': id,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.templateID = value['template-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting TemplateTemplte(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        templateModelPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(
                            model as EnterprisesEnterpriseTemplate
                        );
                    }

                    console.log(
                        'Finished loading TemplateTemplte(s)',
                        target,
                        id
                    );
                }
            );
    }

    private populateFormData(value: EnterprisesEnterpriseTemplate): void {
        if (value['template-id']) {
            this.tempForm.get('template-id').setValue(value['template-id']);
            this.tempForm.get('template-id')[ORIGINAL] = value['template-id'];
        }
        if (value['display-name']) {
            this.tempForm.get('display-name').setValue(value['display-name']);
            this.tempForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.tempForm.get(['description']).setValue(value.description);
            this.tempForm.get(['description'])[ORIGINAL] = value.description;
        }
        if (value.sd) {
            this.tempForm
                .get(['sd'])
                .setValue(value.sd.toString(16).toUpperCase());
            this.tempForm.get(['sd'])[ORIGINAL] = value.sd
                .toString(16)
                .toUpperCase();
        }
        if (value.sst) {
            this.tempForm.get(['sst']).setValue(value.sst);
            this.tempForm.get(['sst'])[ORIGINAL] = value.sst;
        }
        if (value['default-behavior']) {
            this.tempForm
                .get(['default-behavior'])
                .setValue(value['default-behavior']);
            this.tempForm.get(['default-behavior'])[ORIGINAL] =
                value['default-behavior'];
        }

        if (value.mbr) {
            this.tempForm.get(['mbr', 'uplink']).setValue(value.mbr.uplink);
            this.tempForm.get(['mbr', 'downlink']).setValue(value.mbr.downlink);
            this.tempForm
                .get(['mbr', 'uplink-burst-size'])
                .setValue(value.mbr['uplink-burst-size']);
            this.tempForm
                .get(['mbr', 'downlink-burst-size'])
                .setValue(value.mbr['downlink-burst-size']);
            this.tempForm.get(['mbr', 'uplink'])[ORIGINAL] = value.mbr.uplink;
            this.tempForm.get(['mbr', 'downlink'])[ORIGINAL] =
                value.mbr.downlink;
            this.tempForm.get(['mbr', 'uplink-burst-size'])[ORIGINAL] =
                value.mbr['uplink-burst-size'];
            this.tempForm.get(['mbr', 'downlink-burst-size'])[ORIGINAL] =
                value.mbr['downlink-burst-size'];
        }
    }

    get mbrControls(): FormGroup {
        return this.tempForm.get(['mbr']) as FormGroup;
    }
}
