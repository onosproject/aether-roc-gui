/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RocEditBase } from '../../roc-edit-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { map, startWith } from 'rxjs/operators';
import {
    BasketService,
    HEX2NUM,
    IDATTRIBS,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from 'src/app/basket.service';
import { HexPipe } from '../../utils/hex.pipe';
import { SelectAppParam } from '../application-select/application-select.component';
import * as _ from 'lodash';
import { SliceDatasource } from '../slice/slice-datasource';
import { sliceModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import {
    SiteService,
    SiteSliceService,
    SiteUpfService,
    TemplateService,
} from '../../../openapi3/aether/2.1.0/services';
import {
    SiteSlice,
    Template,
    SiteUpf,
    Site,
} from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';

interface Bandwidths {
    megabyte: { numerical: number; inMb: string };
}

interface BurstRate {
    value: number;
    label: string;
}

const ENDPOINTLIMIT = 5;

@Component({
    selector: 'aether-slice-edit',
    templateUrl: './slice-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class SliceEditComponent
    extends RocEditBase<SliceDatasource>
    implements OnInit
{
    showApplicationDisplay = false;
    showDeviceGroupDisplay = false;
    sliceID: string;
    templates: Array<Template>;
    upfs: Array<SiteUpf> = [];
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

    defaultBehaviorOptions = ['DENY-ALL', 'ALLOW-ALL', 'ALLOW-PUBLIC'];
    connectivityServiceOptions = ['4g', '5g'];
    bandwidthOptions: Observable<Bandwidths[]>;
    data: SiteSlice;
    pathListAttr = 'slice';
    sdAsInt = HexPipe.hexAsInt;

    sliceForm = this.fb.group({
        'slice-id': [
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
        filter: this.fb.array([]),
        mbr: this.fb.group({
            uplink: [
                undefined,
                Validators.compose([
                    Validators.min(0),
                    Validators.max(18446744073709552000),
                ]),
            ],
            downlink: [
                undefined,
                Validators.compose([
                    Validators.min(0),
                    Validators.max(18446744073709552000),
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
        'default-behavior': [
            this.defaultBehaviorOptions[0],
            Validators.compose([Validators.required]),
        ],
        'device-group': this.fb.array([]),
        sd: [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(6),
                Validators.pattern('^[0-9A-F\\.]{1,6}'),
                Validators.required,
            ]),
        ],
        sst: [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(2),
                Validators.pattern('^[0-9A-F\\.]{1,2}'),
                Validators.required,
            ]),
        ],
        upf: [{ value: undefined, disabled: true }],
        'connectivity-service': [this.connectivityServiceOptions[1]],
    });

    constructor(
        protected sliceService: SiteSliceService,
        protected enterpriseService: EnterpriseService,
        public siteService: SiteService,
        protected templateService: TemplateService,
        protected upfService: SiteUpfService,
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
            enterpriseService,
            siteService,
            route,
            fb,
            new SliceDatasource(enterpriseService, bs),
            sliceModelPath
        );
        super.form = this.sliceForm;
        super.loadFunc = this.loadSliceSlice;
        this.sliceForm[REQDATTRIBS] = ['sd', 'sst', 'default-behavior'];
        this.sliceForm.get(['mbr', 'uplink'])[TYPE] = 'number';
        this.sliceForm.get(['mbr', 'downlink'])[TYPE] = 'number';
        this.sliceForm.get(['filter'])[IDATTRIBS] = ['application'];
        this.sliceForm.get(['device-group'])[IDATTRIBS] = ['device-group'];

        // need to set this to touched/dirty so that the basket will read the default value
        this.sliceForm.get('default-behavior').markAsTouched();
        this.sliceForm.get('default-behavior').markAsDirty();
        this.sliceForm.get('connectivity-service').markAsTouched();
        this.sliceForm.get('connectivity-service').markAsDirty();
    }

    ngOnInit(): void {
        super.init();
        if (this.isNewInstance) {
            this.sliceForm
                .get('default-behavior')
                .setValue(this.defaultBehaviorOptions[0]);
            this.sliceForm
                .get('connectivity-service')
                .setValue(this.connectivityServiceOptions[1]);
        } else {
            this.sliceForm.get('sst').disable();
            this.sliceForm.get('sd').disable();
        }
        this.bandwidthOptions = this.sliceForm.valueChanges.pipe(
            startWith(''),
            map((value) =>
                typeof value === 'number' ? value : value.megabyte
            ),
            map((megabyte) =>
                megabyte ? this._filter() : this.options.slice()
            )
        );
        this.loadUpf();
    }

    get filter(): FormArray {
        return this.sliceForm.get('filter') as FormArray;
    }

    selectedApplications(): string[] {
        return (this.sliceForm.get(['filter']) as FormArray).controls.map(
            (app) => {
                return app.get('application').value;
            }
        );
    }

    get deviceGroup(): FormArray {
        return this.sliceForm.get('device-group') as FormArray;
    }

    get deviceGroupExists(): string[] {
        const existingList: string[] = [];
        (this.sliceForm.get(['device-group']) as FormArray).controls.forEach(
            (app) => {
                existingList.push(app.get('device-group').value);
            }
        );
        return existingList;
    }

    appSelected(selected: SelectAppParam): void {
        // Push into form
        this.showApplicationDisplay = false;

        if (selected === undefined) {
            return;
        }
        const appFormControl = this.fb.control(selected.application);
        appFormControl.markAsTouched();
        appFormControl.markAsDirty();
        const priorityControl = this.fb.control(selected.priority); // Default as true
        priorityControl.markAsTouched();
        priorityControl.markAsDirty();
        const allowControl = this.fb.control(true); // Default as true
        allowControl.markAsTouched();
        allowControl.markAsDirty();
        allowControl[TYPE] = 'boolean';
        const appGroupControl = this.fb.group({
            application: appFormControl,
            allow: allowControl,
            priority: priorityControl,
        });
        (this.sliceForm.get('filter') as FormArray).push(appGroupControl);
        this.sliceForm.get('filter').markAsTouched();
        console.log('Adding new Value', selected);
    }

    dgSelected(selected: string): void {
        // Push into form
        if (selected !== undefined && selected !== '') {
            const dgFormControl = this.fb.control(selected);
            dgFormControl.markAsTouched();
            dgFormControl.markAsDirty();
            const enabledControl = this.fb.control(true); // Default as true
            enabledControl.markAsTouched();
            enabledControl.markAsDirty();
            enabledControl[TYPE] = 'boolean';
            (this.sliceForm.get('device-group') as FormArray).push(
                this.fb.group({
                    'device-group': dgFormControl,
                    enable: enabledControl,
                })
            );
            this.sliceForm.get('device-group').markAsTouched();
            console.log('Adding new Value', selected);
        }
        this.showDeviceGroupDisplay = false;
    }

    private _filter(): Bandwidths[] {
        return this.options.filter((option) => option.megabyte.numerical);
    }

    loadTemplate(target: TargetName): void {
        console.log('called on load template once target chosen', target);
        if (this.targetId.name == this.unknownTarget) {
            return;
        }

        this.templateService
            .getTemplateList({
                'enterprise-id': this.targetId.name,
            })
            .subscribe(
                (value) => {
                    this.templates = value;
                    console.log('Got', value.length, 'Template');
                },
                (error) => {
                    console.warn('Error getting Template for ', target, error);
                }
            );
    }

    templateSelected(evt: { value: Template }): void {
        if (this.isNewInstance) {
            const eachTemplate: Template = evt.value;
            const SdFormControl = this.sliceForm.get('sd');
            SdFormControl.setValue(eachTemplate.sd);
            SdFormControl.markAsTouched();
            SdFormControl.markAsDirty();
            const SstFormControl = this.sliceForm.get('sst');
            SstFormControl.setValue(eachTemplate.sst);
            SstFormControl.markAsTouched();
            SstFormControl.markAsDirty();
            const dbFormControl = this.sliceForm.get('default-behavior');
            dbFormControl.setValue(eachTemplate['default-behavior']);
            dbFormControl.markAsTouched();
            dbFormControl.markAsDirty();
            const UplinkFormControl = this.sliceForm.get(['mbr', 'uplink']);
            UplinkFormControl.setValue(eachTemplate.mbr.uplink);
            UplinkFormControl.markAsTouched();
            UplinkFormControl.markAsDirty();
            const DownlinkFormControl = this.sliceForm.get(['mbr', 'downlink']);
            DownlinkFormControl.setValue(eachTemplate.mbr.downlink);
            DownlinkFormControl.markAsTouched();
            DownlinkFormControl.markAsDirty();

            const ulBurstSize = this.sliceForm.get([
                'mbr',
                'uplink-burst-size',
            ]);
            ulBurstSize.setValue(eachTemplate.mbr['uplink-burst-size']);
            ulBurstSize.markAsTouched();
            ulBurstSize.markAsDirty();
            const dlBurstSize = this.sliceForm.get([
                'mbr',
                'downlink-burst-size',
            ]);
            dlBurstSize.setValue(eachTemplate.mbr['downlink-burst-size']);
            dlBurstSize.markAsTouched();
            dlBurstSize.markAsDirty();
            const csFormControl = this.sliceForm.get('connectivity-service');
            csFormControl.setValue(eachTemplate['connectivity-service']);
            csFormControl.markAsTouched();
            csFormControl.markAsDirty();
        }
    }

    loadSliceSlice(id: string): void {
        this.sliceService
            .getSiteSlice({
                'slice-id': id,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.sliceID = value['slice-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting SliceSlice(s) for ',
                        this.targetId,
                        this.siteId,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        sliceModelPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(model as SiteSlice);
                    }
                    console.log(
                        'Finished loading SliceSlice(s)',
                        this.targetId,
                        this.siteId,
                        id
                    );
                }
            );
    }

    deleteApplicationFromSelect(app: string): void {
        this.bs.deleteIndexedEntry(
            '/' + this.fullPath + '/filter[application=' + app + ']',
            'application',
            app,
            this.ucmap()
        );
        const index = (
            this.sliceForm.get('filter') as FormArray
        ).controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === app);
        (this.sliceForm.get('filter') as FormArray).removeAt(index);
        this.snackBar.open(
            'Deletion of ' + app + ' added to basket',
            undefined,
            { duration: 2000 }
        );
    }

    deleteDeviceGroupFromSelect(dg: string): void {
        this.bs.deleteIndexedEntry(
            '/' + this.fullPath + '/device-group[device-group=' + dg + ']',
            'device-group',
            dg,
            this.ucmap()
        );
        const index = (
            this.sliceForm.get('device-group') as FormArray
        ).controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === dg);
        (this.sliceForm.get('device-group') as FormArray).removeAt(index);
        this.snackBar.open('Deletion ' + dg + ' added to basket', undefined, {
            duration: 2000,
        });
    }

    public populateFormData(value: SiteSlice): void {
        if (value['slice-id']) {
            this.sliceForm.get('slice-id').setValue(value['slice-id']);
            this.sliceForm.get('slice-id')[ORIGINAL] = value['slice-id'];
        }
        if (value['display-name']) {
            this.sliceForm.get('display-name').setValue(value['display-name']);
            this.sliceForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value.description) {
            this.sliceForm.get('description').setValue(value.description);
            this.sliceForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.filter && this.sliceForm.value.filter.length === 0) {
            for (const app of value.filter) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter((checkerKey) =>
                        checkerKey.startsWith(
                            '/basket-delete/slice-2.1.0/slice[id=' +
                                this.id +
                                ']/application[application='
                        )
                    )
                    .forEach((checkerKey) => {
                        if (checkerKey.includes(app.application)) {
                            isDeleted = true;
                        }
                    });
                if (!isDeleted) {
                    const appFormControl = this.fb.control(app.application);
                    appFormControl[ORIGINAL] = app.application;
                    const priorityControl = this.fb.control(app.priority);
                    priorityControl[ORIGINAL] = app.priority;
                    const enabledControl = this.fb.control(app.allow);
                    enabledControl[ORIGINAL] = app.allow;
                    enabledControl[TYPE] = 'boolean';
                    const appControlGroup = this.fb.group({
                        application: appFormControl,
                        allow: enabledControl,
                        priority: priorityControl,
                    });
                    (this.sliceForm.get('filter') as FormArray).push(
                        appControlGroup
                    );
                }
                isDeleted = false;
            }
        } else if (value.filter && this.sliceForm.value.filter.length !== 0) {
            this.sliceForm.value.filter.forEach(
                (eachValueApp, eachValueAppPosition) => {
                    for (const eachFormApp of value.filter) {
                        if (
                            eachValueApp.application === eachFormApp.application
                        ) {
                            this.sliceForm
                                .get(['filter', eachValueAppPosition, 'allow'])
                                .setValue(eachFormApp.allow);
                            this.sliceForm
                                .get([
                                    'filter',
                                    eachValueAppPosition,
                                    'priority',
                                ])
                                .setValue(eachFormApp.priority);
                        } else {
                            (
                                this.sliceForm.get(['application']) as FormArray
                            ).push(
                                this.fb.group({
                                    application: eachFormApp.application,
                                    allow: eachFormApp.allow,
                                    priority: eachFormApp.priority,
                                })
                            );
                        }
                    }
                }
            );
        }
        if (value.mbr) {
            this.sliceForm.get(['mbr', 'uplink']).setValue(value.mbr.uplink);
            this.sliceForm
                .get(['mbr', 'downlink'])
                .setValue(value.mbr.downlink);
            this.sliceForm.get(['mbr', 'uplink'])[ORIGINAL] = value.mbr.uplink;
            this.sliceForm.get(['mbr', 'downlink'])[ORIGINAL] =
                value.mbr.downlink;

            this.sliceForm
                .get(['mbr', 'uplink-burst-size'])
                .setValue(value.mbr['uplink-burst-size']);
            this.sliceForm
                .get(['mbr', 'downlink-burst-size'])
                .setValue(value.mbr['downlink-burst-size']);
            this.sliceForm.get(['mbr', 'uplink-burst-size'])[ORIGINAL] =
                value.mbr['uplink-burst-size'];
            this.sliceForm.get(['mbr', 'downlink-burst-size'])[ORIGINAL] =
                value.mbr['downlink-burst-size'];
        }
        if (
            value['device-group'] &&
            this.sliceForm.value['device-group'].length === 0
        ) {
            for (const dg of value['device-group']) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter((checkerKey) =>
                        checkerKey.startsWith(
                            '/basket-delete/slice-2.1.0/slice[slice-id=' +
                                this.id +
                                ']/device-group[device-group-id='
                        )
                    )
                    .forEach((checkerKey) => {
                        if (checkerKey.includes(dg['device-group'])) {
                            isDeleted = true;
                        }
                    });
                if (!isDeleted) {
                    const dgFormControl = this.fb.control(dg['device-group']);
                    dgFormControl[ORIGINAL] = dg['device-group'];
                    const enabledControl = this.fb.control(dg.enable);
                    enabledControl[ORIGINAL] = dg.enable;
                    enabledControl[TYPE] = 'boolean';
                    (this.sliceForm.get('device-group') as FormArray).push(
                        this.fb.group({
                            'device-group': dgFormControl,
                            enable: enabledControl,
                        })
                    );
                }
                isDeleted = false;
            }
        } else if (
            value['device-group'] &&
            this.sliceForm.value['device-group'].length !== 0
        ) {
            this.sliceForm.value['device-group'].forEach(
                (eachValuedg, eachValuedgPosition) => {
                    for (const eachFormdg of value['device-group']) {
                        if (
                            eachValuedg['device-group'] ===
                            eachFormdg['device-group']
                        ) {
                            this.sliceForm
                                .get([
                                    'device-group',
                                    eachValuedgPosition,
                                    'enable',
                                ])
                                .setValue(eachFormdg.enable);
                        } else {
                            const newDgGroup = this.fb.group({
                                'device-group': eachFormdg['device-group'],
                                enable: eachFormdg.enable,
                            });
                            newDgGroup.get('device-group')[ORIGINAL] =
                                eachFormdg['device-group'];
                            newDgGroup.get('enable')[ORIGINAL] =
                                eachFormdg.enable;
                            (
                                this.sliceForm.get([
                                    'device-group',
                                ]) as FormArray
                            ).push(newDgGroup);
                        }
                    }
                }
            );
        }

        this.sliceForm.get(['sd']).setValue(value.sd);
        this.sliceForm.get('sd')[ORIGINAL] = value.sd;

        this.sliceForm.get('sst').setValue(value.sst);
        this.sliceForm.get('sst')[ORIGINAL] = value.sst;

        if (value['default-behavior']) {
            this.sliceForm
                .get(['default-behavior'])
                .setValue(value['default-behavior']);
            this.sliceForm.get(['default-behavior'])[ORIGINAL] =
                value['default-behavior'];
        }
        if (value['connectivity-service']) {
            this.sliceForm
                .get(['connectivity-service'])
                .setValue(value['connectivity-service']);
            this.sliceForm.get(['connectivity-service'])[ORIGINAL] =
                value['connectivity-service'];
        }
        if (value.upf) {
            this.sliceForm.get('upf').setValue(value.upf);
            this.sliceForm.get('upf')[ORIGINAL] = value.upf;
        }
    }

    get mbrControls(): FormGroup {
        return this.sliceForm.get(['mbr']) as FormGroup;
    }

    loadUpf(): void {
        if (
            this.targetId.name == this.unknownTarget ||
            this.siteId == this.unknownSite
        ) {
            return;
        }
        // Go through all the slices in all sites to see what UPFs have been used up
        this.siteService
            .getSite({
                'enterprise-id': this.targetId.name,
                'site-id': this.siteId,
            })
            .subscribe(
                (site) => {
                    // only keep
                    // - the currently selected UPF
                    // - and the unused ones
                    const selectedUpf = _.find(site.upf, {
                        'upf-id': this.sliceForm.get('upf').value,
                    });

                    this.upfs = _.isNil(selectedUpf)
                        ? this.filterUpf(site)
                        : [selectedUpf, ...this.filterUpf(site)];

                    this.form.get('upf').enable();
                    console.log(
                        `Showing ${this.upfs.length} unused UPFs. Total ${site.upf.length}`
                    );
                },
                (error) => {
                    console.warn(
                        'Error getting UPF for ',
                        this.targetId,
                        error
                    );
                }
            );
    }

    // returns a list of UPFs IDs that are not used in other Slices in the same site
    filterUpf(site: Site): SiteUpf[] {
        const usedUpfs = site.slice.map((s) => s.upf);
        return site.upf.reduce((list, item) => {
            if (_.indexOf(usedUpfs, item['upf-id']) == -1) {
                return [item, ...list];
            }
            return list;
        }, [] as SiteUpf[]);
    }

    public get EndpointLimit(): number {
        return ENDPOINTLIMIT;
    }
}
