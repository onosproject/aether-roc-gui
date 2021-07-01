/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Service as AetherService, TemplateTemplateService} from '../../../openapi3/aether/3.0.0/services';
import {TemplateTemplate, TrafficClassTrafficClass} from '../../../openapi3/aether/3.0.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {MatHeaderRow, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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

    pathRoot = 'template-3.0.0';
    pathListAttr = 'template';
    trafficClass: Array<TrafficClassTrafficClass>;
    options: Bandwidths[] = [
        {megabyte: {numerical: 1048576, inMb: '1Mb'}},
        {megabyte: {numerical: 2097152, inMb: '2Mb'}},
        {megabyte: {numerical: 5242880, inMb: '5Mb'}},
        {megabyte: {numerical: 1048576, inMb: '10Mb'}},
        {megabyte: {numerical: 26214400, inMb: '25Mb'}},
        {megabyte: {numerical: 52428800, inMb: '50Mb'}},
        {megabyte: {numerical: 104857600, inMb: '100Mb'}},
        {megabyte: {numerical: 524288000, inMb: '500Mb'}}
    ];
    bandwidthOptions: Observable<Bandwidths[]>;
    data: TemplateTemplate;
    tempForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])],
        sd: [0, Validators.compose([
            Validators.min(0),
            Validators.max(16777215)
        ])],
        sst: [1, Validators.compose([
            Validators.min(1),
            Validators.max(255)
        ])],
        uplink: [0, Validators.compose([
            Validators.min(0),
            Validators.max(4294967295)
        ])],
        downlink: [0, Validators.compose([
            Validators.min(0),
            Validators.max(4294967295)
        ])],
        'traffic-class': [''],
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
        super(snackBar, bs, route, router, 'template-3.0.0', 'template');
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
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['template-3.0.0']) {
                    basketPreview['template-3.0.0'].template.forEach((basketItems) => {
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
        }
        if (value.description) {
            this.tempForm.get(['description']).setValue(value.description);
        }
        if (value.sd) {
            this.tempForm.get(['sd']).setValue(value.sd);
        }
        if (value.sst) {
            this.tempForm.get(['sst']).setValue(value.sst);
        }
        if (value.uplink) {
            this.tempForm.get(['uplink']).setValue(value.uplink);
        }
        if (value.downlinkl) {
            this.tempForm.get(['downlink']).setValue(value.downlink);
        }
        if (value['traffic-class']) {
            this.tempForm.get(['traffic-class']).setValue(value['traffic-class']);
        }
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

