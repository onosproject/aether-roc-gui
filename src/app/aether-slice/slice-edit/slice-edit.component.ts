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
import { from, Observable } from 'rxjs';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { map, mergeMap, skipWhile, startWith } from 'rxjs/operators';
import {
    EnterprisesEnterpriseService,
    EnterprisesEnterpriseSiteService,
    Service as AetherService,
} from 'src/openapi3/aether/2.0.0/services';
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
import { RocElement } from '../../../openapi3/top/level/models/elements';
import {
    EnterprisesEnterpriseSiteDeviceGroup,
    EnterprisesEnterpriseApplication,
    EnterprisesEnterpriseTemplate,
    EnterprisesEnterpriseSiteUpf,
    EnterprisesEnterpriseSiteSlice,
} from '../../../openapi3/aether/2.0.0/models';
import { EnterprisesEnterpriseSiteSliceService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';

interface Bandwidths {
    megabyte: { numerical: number; inMb: string };
}

interface BurstRate {
    value: number;
    label: string;
}

@Component({
    selector: 'aether-slice-edit',
    templateUrl: './slice-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class SliceEditComponent extends RocEditBase implements OnInit {
    showApplicationDisplay = false;
    showDeviceGroupDisplay = false;
    showAddFilterButton = true;
    EndpointLeft = 5;
    sliceID: string;
    enterpriseID: string;
    siteID: string;
    deviceGroups: Array<EnterprisesEnterpriseSiteDeviceGroup>;
    applications: Array<EnterprisesEnterpriseApplication>;
    templates: Array<EnterprisesEnterpriseTemplate>;
    selectedSite: string;
    upfs: Array<EnterprisesEnterpriseSiteUpf> = [];
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

    defaultBehaviorOptions = ['DENY-ALL', 'ALLOW-ALL'];
    bandwidthOptions: Observable<Bandwidths[]>;
    data: EnterprisesEnterpriseSiteSlice;
    pathRoot = ('Enterprises-2.0.0/enterprise' +
        '[enterprise-id=' +
        this.route.snapshot.params['enterprise-id'] +
        ']/site' +
        '[site-id=' +
        this.route.snapshot.params['site-id'] +
        ']') as RocElement;

    pathListAttr = 'slice';
    sdAsInt = HexPipe.hexAsInt;

    sliceForm = this.fb.group({
        'slice-id': [
            undefined,
            Validators.compose([
                Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
                Validators.minLength(1),
                Validators.maxLength(31),
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
            undefined,
            Validators.compose([Validators.required]),
        ],
        'device-group': this.fb.array([]),
        sd: [
            undefined,
            Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(6),
                Validators.pattern('^[A-F0-9]{6}'),
            ]),
        ],
        sst: [
            undefined,
            Validators.compose([Validators.min(1), Validators.max(255)]),
        ],
        upf: [undefined],
    });

    constructor(
        protected sliceService: EnterprisesEnterpriseSiteSliceService,
        protected enterpriseService: EnterprisesEnterpriseService,
        protected siteService: EnterprisesEnterpriseSiteService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(snackBar, bs, route, router, 'Enterprises-2.0.0', 'slice');
        super.form = this.sliceForm;
        this.loadApplication(this.target);
        super.loadFunc = this.loadSliceSlice;
        this.sliceForm[REQDATTRIBS] = [
            'sd',
            'sst',
            'enterprise',
            'site',
            'default-behavior',
        ];
        this.sliceForm.get(['mbr', 'uplink'])[TYPE] = 'number';
        this.sliceForm.get(['mbr', 'downlink'])[TYPE] = 'number';
        this.sliceForm.get(['sst'])[TYPE] = 'number';
        this.sliceForm.get(['sd'])[TYPE] = HEX2NUM;
        this.sliceForm.get(['filter'])[IDATTRIBS] = ['application'];
        this.sliceForm.get(['device-group'])[IDATTRIBS] = ['device-group'];
    }

    ngOnInit(): void {
        this.enterpriseID = this.route.snapshot.params['enterprise-id'];
        this.siteID = this.route.snapshot.params['site-id'];
        super.init();
        if (this.isNewInstance) {
            this.sliceForm
                .get('default-behavior')
                .setValue(this.defaultBehaviorOptions[0]);
            this.loadTemplate(this.target);
        } else {
            this.sliceForm.get('sst').disable();
            this.sliceForm.get('sd').disable();
        }
        this.loadDeviceGoup(this.target);
        this.bandwidthOptions = this.sliceForm.valueChanges.pipe(
            startWith(''),
            map((value) =>
                typeof value === 'number' ? value : value.megabyte
            ),
            map((megabyte) =>
                megabyte ? this._filter() : this.options.slice()
            )
        );
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
        this.setShowAddFilterButton();
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

    loadTemplate(target: string): void {
        this.enterpriseService
            .getEnterprisesEnterprise({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
            })
            .subscribe(
                (value) => {
                    this.templates = value.template;
                    console.log('Got', value.template.length, 'Template');
                },
                (error) => {
                    console.warn('Error getting Template for ', target, error);
                }
            );
    }

    templateSelected(evt: { value: EnterprisesEnterpriseTemplate }): void {
        if (this.isNewInstance) {
            const eachTemplate: EnterprisesEnterpriseTemplate = evt.value;
            const SdFormControl = this.sliceForm.get('sd');
            SdFormControl.setValue(
                eachTemplate.sd.toString(16).toUpperCase().padStart(6, '0')
            );
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
        }
    }

    loadSliceSlice(target: string, id: string): void {
        this.sliceService
            .getEnterprisesEnterpriseSiteSlice({
                target: AETHER_TARGET,
                'slice-id': id,
                'enterprise-id': this.enterpriseID,
                'site-id': this.siteID,
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
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        this.pathRoot in basketPreview &&
                        this.pathListAttr in basketPreview[this.pathRoot]
                    ) {
                        basketPreview['Enterprises-2.0.0'].enterprise.forEach(
                            (enterpriseBasketItems) => {
                                if (
                                    enterpriseBasketItems['enterprise-id'] ===
                                    this.enterpriseID
                                ) {
                                    enterpriseBasketItems.site.forEach(
                                        (SitebasketItems) => {
                                            if (
                                                SitebasketItems['site-id'] ===
                                                this.route.snapshot.params[
                                                    'site-id'
                                                ]
                                            ) {
                                                SitebasketItems[
                                                    'slice'
                                                ].forEach((basketItems) => {
                                                    if (
                                                        basketItems[
                                                            'slice-id'
                                                        ] === id
                                                    ) {
                                                        this.populateFormData(
                                                            basketItems
                                                        );
                                                    }
                                                });
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                    console.log('Finished loading SliceSlice(s)', target, id);
                }
            );
    }

    deleteApplicationFromSelect(app: string): void {
        this.bs.deleteIndexedEntry(
            '/slice-2.0.0/slice[id=' +
                this.id +
                ']/filter[application=' +
                app +
                ']',
            'application',
            app,
            this.ucmap
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
        this.setShowAddFilterButton();
    }

    deleteDeviceGroupFromSelect(dg: string): void {
        this.bs.deleteIndexedEntry(
            '/slice-2.0.0/slice[id=' +
                this.id +
                ']/device-group[device-group=' +
                dg +
                ']',
            'device-group',
            dg,
            this.ucmap
        );
        const index = (
            this.sliceForm.get('device-group') as FormArray
        ).controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === dg);
        (this.sliceForm.get('device-group') as FormArray).removeAt(index);
        this.snackBar.open('Deletion ' + dg + ' added to basket', undefined, {
            duration: 2000,
        });
    }

    private get ucmap(): Map<string, string> {
        const sliceId = '/slice-2.0.0/slice[id=' + this.id + ']';
        let parentUc = localStorage.getItem(sliceId);
        if (parentUc === null) {
            parentUc = this.sliceForm[REQDATTRIBS];
        }
        const ucMap = new Map<string, string>();
        ucMap.set(sliceId, parentUc);
        return ucMap;
    }

    public populateFormData(value: EnterprisesEnterpriseSiteSlice): void {
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
                            '/basket-delete/slice-2.0.0/slice[id=' +
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
            this.setShowAddFilterButton();
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
            this.setShowAddFilterButton();
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
                            '/basket-delete/slice-2.0.0/slice[id=' +
                                this.id +
                                ']/device-group[device-group='
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
        if (value.sd) {
            this.sliceForm
                .get(['sd'])
                .setValue(value.sd.toString(16).toUpperCase());
            this.sliceForm.get('sd')[ORIGINAL] = value.sd
                .toString(16)
                .toUpperCase();
        }
        if (value['default-behavior']) {
            this.sliceForm
                .get(['default-behavior'])
                .setValue(value['default-behavior']);
            this.sliceForm.get(['default-behavior'])[ORIGINAL] =
                value['default-behavior'];
        }
        if (value.sst) {
            this.sliceForm.get(['sst']).setValue(value.sst);
            this.sliceForm.get('sst')[ORIGINAL] = value.sst;
        }
        if (value.upf) {
            this.sliceForm.get(['upf']).setValue(value.upf);
            this.sliceForm.get('upf')[ORIGINAL] = value.upf;
        }
    }

    loadDeviceGoup(target: string): void {
        this.siteService
            .getEnterprisesEnterpriseSite({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .pipe(skipWhile((dgContainer) => dgContainer === null))
            .subscribe(
                (value) => {
                    this.deviceGroups = value['device-group'];
                    console.log(
                        'Got',
                        value['device-group'].length,
                        'Device Group'
                    );
                },
                (error) => {
                    console.warn(
                        'Error getting Device Groups for ',
                        target,
                        error
                    );
                }
            );
    }

    get mbrControls(): FormGroup {
        return this.sliceForm.get(['mbr']) as FormGroup;
    }

    loadUpf(target: string): void {
        let origLen = 0;
        this.siteService
            .getEnterprisesEnterpriseSite({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    value.upf.forEach((eachUPF) => {
                        if (eachUPF.site === this.selectedSite) {
                            this.upfs.push(eachUPF);
                        }
                    });
                    origLen = this.upfs.length;
                },
                (error) => {
                    console.warn('Error getting UPF for ', target, error);
                },
                () => {
                    // eliminate already used UPFs
                    this.siteService
                        .getEnterprisesEnterpriseSite({
                            target: AETHER_TARGET,
                            'enterprise-id':
                                this.route.snapshot.params['enterprise-id'],
                            'site-id': this.route.snapshot.params['site-id'],
                        })
                        .pipe(
                            map((sliceContainer) => sliceContainer?.slice),
                            skipWhile((sliceList) => sliceList === undefined),
                            mergeMap(
                                (sliceItem: EnterprisesEnterpriseSiteSlice[]) =>
                                    from(sliceItem)
                            ),
                            map(
                                (sliceItem: EnterprisesEnterpriseSiteSlice) =>
                                    sliceItem.upf
                            )
                        )
                        .subscribe(
                            (sliceUpf) => {
                                const idx = this.upfs.findIndex(
                                    (upf: EnterprisesEnterpriseSiteUpf) =>
                                        upf.id === sliceUpf &&
                                        this.sliceForm.get('upf').value !==
                                            sliceUpf
                                );
                                if (idx > -1) {
                                    this.upfs.splice(idx, 1);
                                }
                            },
                            (err) => console.warn('Error getting Slice', err),
                            () =>
                                console.log(
                                    'Showing',
                                    this.upfs.length,
                                    'unused UPFs. Total',
                                    origLen
                                )
                        );
                }
            );
    }

    setShowAddFilterButton(): void {
        this.EndpointLeft = this.applications
            ?.filter((eachApplication) =>
                this.selectedApplications().includes(
                    eachApplication['application-id']
                )
            )
            .reduce((total, application) => {
                return total - application.endpoint.length;
            }, 5);
        if (this.EndpointLeft <= 0) {
            this.showAddFilterButton = false;
        }
    }

    loadApplication(target: string): void {
        this.enterpriseService
            .getEnterprisesEnterprise({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
            })
            .subscribe(
                (value) => {
                    this.applications = value.application;
                },
                (error) => {
                    console.warn(
                        'Error getting Application for ',
                        target,
                        error
                    );
                }
            );
    }
}
