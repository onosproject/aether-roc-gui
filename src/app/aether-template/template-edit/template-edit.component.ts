/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service as AetherService, TemplateTemplateService} from '../../../openapi3/aether/4.0.0/services';
import {TemplateTemplate, TrafficClassTrafficClass} from '../../../openapi3/aether/4.0.0/models';
import {BasketService, HEX2NUM, ORIGINAL, TYPE} from '../../basket.service';
import {MatHeaderRow} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HexPipe} from '../../utils/hex.pipe';

export interface Bandwidths {
    megabyte: { numerical: number, inMb: string };
}

@Component({
    selector: 'aether-template-edit',
    templateUrl: './template-edit.component.html',
    styleUrls: [
        '../../common-edit.component.scss',
    ]
})
export class TemplateEditComponent extends RocEditBase<TemplateTemplate> implements OnInit {
    // @ViewChild(MatTable) table: MatTable<Array<ConnectivityServiceRow>>;
    @ViewChild(MatHeaderRow) row: MatHeaderRow;
    @ViewChild(MatSort) sort: MatSort;

    sdAsInt = HexPipe.hexAsInt;

    pathRoot = 'template-4.0.0';
    pathListAttr = 'template';
    trafficClass: Array<TrafficClassTrafficClass>;
    defaultBehaviorOpitons = [
        "DENY-ALL",
        "ALLOW-ALL",
        "ALLOW-PUBLIC"
    ];
    options: Bandwidths[] = [
        {megabyte: {numerical: 1000000, inMb: '1Mbps'}},
        {megabyte: {numerical: 2000000, inMb: '2Mbps'}},
        {megabyte: {numerical: 5000000, inMb: '5Mbps'}},
        {megabyte: {numerical: 10000000, inMb: '10Mbps'}},
        {megabyte: {numerical: 25000000, inMb: '25Mbps'}},
        {megabyte: {numerical: 50000000, inMb: '50Mbps'}},
        {megabyte: {numerical: 100000000, inMb: '100Mbps'}},
        {megabyte: {numerical: 500000000, inMb: '500Mbps'}}
    ];
    bandwidthOptions: Observable<Bandwidths[]>;
    data: TemplateTemplate;
    tempForm = this.fb.group({
        id: [undefined, Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(1024),
        ])],
        sd: [undefined, Validators.compose([
            Validators.minLength(6),
            Validators.maxLength(6),
            Validators.pattern('^[A-F0-9]{6}')
        ])],
        'default-behavior': [undefined, Validators.compose([
            Validators.required
        ])],
        sst: [undefined, Validators.compose([
            Validators.min(1),
            Validators.max(255)
        ])],
        device: this.fb.group({
            mbr: this.fb.group({
                uplink: [undefined, Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295)
                ])],
                downlink: [undefined, Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295)
                ])]
            }),
        }),
        slice: this.fb.group({
            mbr: this.fb.group({
                uplink: [undefined, Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295)
                ])],
                downlink: [undefined, Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295)
                ])]
            }),
        }),
    });

    constructor(
        private templateTemplateService: TemplateTemplateService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'template-4.0.0', 'template');
        super.form = this.tempForm;
        super.loadFunc = this.loadTemplateTemplate;
    }

    ngOnInit(): void {
        super.init();
        this.bandwidthOptions = this.tempForm.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'number' ? value : value.megabyte),
                map(megabyte => megabyte ? this._filter(megabyte) : this.options.slice())
            );
        this.tempForm.get('sd')[TYPE] = HEX2NUM;
        this.tempForm.get('sst')[TYPE] = 'number';
        this.tempForm.get(['device','mbr','uplink'])[TYPE] = 'number';
        this.tempForm.get(['device','mbr','downlink'])[TYPE] = 'number';
        this.tempForm.get(['slice','mbr','uplink'])[TYPE] = 'number';
        this.tempForm.get(['slice','mbr','downlink'])[TYPE] = 'number';
    }

    private _filter(bandwidthIndex: number): Bandwidths[] {
        const filterValue = bandwidthIndex;
        return this.options.filter(option => option.megabyte.numerical);
    }

    loadTemplateTemplate(target: string, id: string): void {
        this.templateTemplateService.getTemplateTemplate({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting TemplateTemplte(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['template-4.0.0']) {
                    basketPreview['template-4.0.0'].template.forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading TemplateTemplte(s)', target, id);
            }
        );
    }

    private populateFormData(value: TemplateTemplate): void {
        if (value['display-name']) {
            this.tempForm.get('display-name').setValue(value['display-name']);
            this.tempForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.tempForm.get(['description']).setValue(value.description);
            this.tempForm.get(['description'])[ORIGINAL] = value.description;
        }
        if (value.sd) {
            this.tempForm.get(['sd']).setValue(value.sd.toString(16).toUpperCase());
            this.tempForm.get(['sd'])[ORIGINAL] = value.sd.toString(16).toUpperCase();
        }
        if (value.sst) {
            this.tempForm.get(['sst']).setValue(value.sst);
            this.tempForm.get(['sst'])[ORIGINAL] = value.sst;
        }
        if (value['default-behavior']) {
            this.tempForm.get(['default-behavior']).setValue(value['default-behavior']);
            this.tempForm.get(['default-behavior'])[ORIGINAL] = value['default-behavior'];
        }

        if (value.slice && value.slice.mbr) {
            this.tempForm.get(['slice','mbr','uplink']).setValue(value.slice.mbr.uplink);
            this.tempForm.get(['slice','mbr','downlink']).setValue(value.slice.mbr.downlink);
            this.tempForm.get(['slice','mbr','uplink'])[ORIGINAL] = value.slice.mbr.uplink;
            this.tempForm.get(['slice','mbr','downlink'])[ORIGINAL] = value.slice.mbr.downlink;
        }
    }

    get deviceMbrControls(): FormGroup {
        return this.tempForm.get(['device','mbr']) as FormGroup;
    }

    get sliceMbrControls(): FormGroup {
        return this.tempForm.get(['slice','mbr']) as FormGroup;
    }
}

