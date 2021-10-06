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
    options: Bandwidths[] = [
        {megabyte: {numerical: 1, inMb: '1Mbps'}},
        {megabyte: {numerical: 2, inMb: '2Mbps'}},
        {megabyte: {numerical: 5, inMb: '5Mbps'}},
        {megabyte: {numerical: 10, inMb: '10Mbps'}},
        {megabyte: {numerical: 25, inMb: '25Mbps'}},
        {megabyte: {numerical: 50, inMb: '50Mbps'}},
        {megabyte: {numerical: 100, inMb: '100Mbps'}},
        {megabyte: {numerical: 500, inMb: '500Mbps'}}
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
        'traffic-class': [undefined],
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
        this.loadTrafficClass(this.target);
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
                console.log("value",value)
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
        if (value.device && value.device.mbr) {
            console.log(value.device.mbr,"value.device.mbr")
            this.tempForm.get(['device','mbr','uplink']).setValue(value.device.mbr.uplink);
            this.tempForm.get(['device','mbr','downlink']).setValue(value.device.mbr.downlink);
            this.tempForm.get(['device','mbr','downlink'])[ORIGINAL] = value.device.mbr.uplink;
            this.tempForm.get(['device','mbr','downlink'])[ORIGINAL] = value.device.mbr.downlink;
            console.log(this.tempForm.get(['device','mbr','uplink']),"this.tempForm.get(['device']['mbr']['uplink'])")
        }
        if (value.slice && value.slice.mbr) {
            this.tempForm.get(['slice','mbr','uplink']).setValue(value.slice.mbr.uplink);
            this.tempForm.get(['slice','mbr','downlink']).setValue(value.slice.mbr.downlink);
            this.tempForm.get(['slice','mbr','uplink'])[ORIGINAL] = value.slice.mbr.uplink;
            this.tempForm.get(['slice','mbr','downlink'])[ORIGINAL] = value.slice.mbr.downlink;
        }
        if (value['traffic-class']) {
            this.tempForm.get(['traffic-class']).setValue(value['traffic-class']);
            this.tempForm.get(['traffic-class'])[ORIGINAL] = value['traffic-class'];
        }
    }

    get deviceMbrControls(): FormGroup {
        return this.tempForm.get(['device','mbr']) as FormGroup;
    }

    get sliceMbrControls(): FormGroup {
        return this.tempForm.get(['slice','mbr']) as FormGroup;
    }

    loadTrafficClass(target: string): void {
        this.aetherService.getTrafficClass({
            target,
        }).subscribe(
            (value => {
                this.trafficClass = value['traffic-class'];
                console.log('Got', value['traffic-class'].length, 'Traffic Class');
            }),
            error => {
                console.warn('Error getting Traffic Class for ', target, error);
            }
        );
    }
}

