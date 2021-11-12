/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    VcsVcs,
    DeviceGroupDeviceGroup,
    UpfUpf,
    AdditionalPropertyTarget, EnterpriseEnterprise, SiteSite, TemplateTemplate, ApplicationApplication, ApListApList
} from '../../../openapi3/aether/4.0.0/models';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {from, Observable} from 'rxjs';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {map, mergeMap, skipWhile, startWith, tap, filter} from 'rxjs/operators';
import {VcsVcsService, Service as AetherService} from 'src/openapi3/aether/4.0.0/services';
import {BasketService, HEX2NUM, IDATTRIBS, ORIGINAL, REQDATTRIBS, TYPE} from 'src/app/basket.service';
import {HexPipe} from '../../utils/hex.pipe';
import {SelectAppParam} from "../application-select/application-select.component";
import has = Reflect.has;
import {ApplicationDatasource} from "../../aether-application/application/application-datasource";

interface Bandwidths {
    megabyte: { numerical: number, inMb: string };
}

interface BurstRate {
    value: number
    label: string
}

@Component({
    selector: 'aether-vcs-edit',
    templateUrl: './vcs-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class VcsEditComponent extends RocEditBase<VcsVcs> implements OnInit {
    showApplicationDisplay: boolean = false;
    showDeviceGroupDisplay: boolean = false;
    showAddFilterButton: boolean = true;
    EndpointLeft: number = 5;
    aps: Array<ApListApList> | AdditionalPropertyTarget;
    deviceGroups: Array<DeviceGroupDeviceGroup>;
    site: Array<SiteSite>;
    application: Array<ApplicationApplication>;
    templates: Array<TemplateTemplate>;
    selectedSite: string;
    enterprises: Array<EnterpriseEnterprise>;
    upfs: Array<UpfUpf> = [];
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

    burstRateOptions: BurstRate[] = [
        {label: '125 Kbps', value: 125000},
        {label: '250 Kbps', value: 250000},
        {label: '375 Kbps', value: 375000},
        {label: '500 Kbps', value: 500000},
        {label: '625 Kbps', value: 625000},
        {label: '750 Kbps', value: 750000},
        {label: '875 Kbps', value: 875000},
        {label: '1 Mbps', value: 1000000},
    ]

    defaultBehaviorOptions = [
        "DENY-ALL",
        "ALLOW-ALL",
        "ALLOW-PUBLIC"
    ];
    bandwidthOptions: Observable<Bandwidths[]>;
    data: VcsVcs;
    pathRoot = 'vcs-4.0.0';
    pathListAttr = 'vcs';
    sdAsInt = HexPipe.hexAsInt;

    vcsForm = this.fb.group({
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
        site: [undefined],
        filter: this.fb.array([]),
        slice: this.fb.group({
            mbr: this.fb.group({
                uplink: [undefined, Validators.compose([
                    Validators.min(0),
                    Validators.max(18446744073709552000)
                ])],
                downlink: [undefined, Validators.compose([
                    Validators.min(0),
                    Validators.max(18446744073709552000)
                ])],
                'uplink-burst-size': [undefined, Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295)
                ])],
                'downlink-burst-size': [undefined, Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295)
                ])]
            }),
        }),
        'default-behavior': [undefined, Validators.compose([
            Validators.required
        ])],
        enterprise: [undefined],
        'device-group': this.fb.array([]),
        sd: [undefined, Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(6),
                Validators.pattern('^[A-F0-9]{6}')
            ]
        )],
        sst: [undefined, Validators.compose([
            Validators.min(1),
            Validators.max(255)
        ])],
        upf: [undefined]
    });

    constructor(
        private vcsVcsService: VcsVcsService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(snackBar, bs, route, router, 'vcs-4.0.0', 'vcs');
        super.form = this.vcsForm;
        this.loadApplication(this.target);
        super.loadFunc = this.loadVcsVcs;
        this.vcsForm[REQDATTRIBS] = ['sd', 'sst', 'enterprise', 'site', 'default-behavior'];
        this.vcsForm.get(['slice', 'mbr', 'uplink'])[TYPE] = 'number';
        this.vcsForm.get(['slice', 'mbr', 'downlink'])[TYPE] = 'number';
        this.vcsForm.get(['sst'])[TYPE] = 'number';
        this.vcsForm.get(['sd'])[TYPE] = HEX2NUM;
        this.vcsForm.get(['filter'])[IDATTRIBS] = ['application']
        this.vcsForm.get(['device-group'])[IDATTRIBS] = ['device-group']
    }

    ngOnInit(): void {
        super.init();
        if (this.isNewInstance) {
            this.vcsForm.get('default-behavior').setValue(this.defaultBehaviorOptions[0])
            this.loadTemplate(this.target);
        }
        this.vcsForm.get('sst').disable();
        this.vcsForm.get('sd').disable();
        this.loadSites(this.target);
        this.OnSiteSelect();
        this.loadDeviceGoup(this.target);
        this.loadEnterprises(this.target);
        this.bandwidthOptions = this.vcsForm.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'number' ? value : value.megabyte),
                map(megabyte => megabyte ? this._filter(megabyte) : this.options.slice())
            );
    }

    setOnlyEnterprise(lenEnterprises: number): void {
        if (lenEnterprises === 1) {
            this.vcsForm.get('enterprise').markAsTouched();
            this.vcsForm.get('enterprise').markAsDirty();
            this.vcsForm.get('enterprise').setValue(this.enterprises[0].id);
        }
    }

    get filter(): FormArray {
        return this.vcsForm.get('filter') as FormArray;
    }

    selectedApplications(): string[] {
        return (this.vcsForm.get(['filter']) as FormArray).controls.map((app) => {
            return app.get('application').value;
        });

    }

    get deviceGroup(): FormArray {
        return this.vcsForm.get('device-group') as FormArray;
    }

    get deviceGroupExists(): string[] {
        const existingList: string[] = [];
        (this.vcsForm.get(['device-group']) as FormArray).controls.forEach((app) => {
            existingList.push(app.get('device-group').value);
        });
        return existingList;
    }

    OnSiteSelect(): void {
        this.selectedSite = this.vcsForm.get('site').value;
        this.loadUpf(this.target);
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
            priority: priorityControl
        });
        (this.vcsForm.get('filter') as FormArray).push(appGroupControl);
        this.vcsForm.get('filter').markAsTouched();
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
            (this.vcsForm.get('device-group') as FormArray).push(this.fb.group({
                'device-group': dgFormControl,
                enable: enabledControl,
            }));
            this.vcsForm.get('device-group').markAsTouched();
            console.log('Adding new Value', selected);
        }
        this.showDeviceGroupDisplay = false;
    }

    private _filter(bandwidthIndex: number): Bandwidths[] {
        const filterValue = bandwidthIndex;
        return this.options.filter(option => option.megabyte.numerical);
    }

    loadTemplate(target: string): void {
        this.aetherService.getTemplate({
            target,
        }).subscribe(
            (value => {
                this.templates = value.template;
                console.log('Got', value.template.length, 'Template');
            }),
            error => {
                console.warn('Error getting Template for ', target, error);
            }
        );
    }

    templateSelected(evt): void {
        if (this.isNewInstance) {

            const eachTemplate: TemplateTemplate = evt.value
            const SdFormControl = this.vcsForm.get('sd');
            SdFormControl.setValue(eachTemplate.sd.toString(16).toUpperCase());
            SdFormControl.markAsTouched();
            SdFormControl.markAsDirty();
            const SstFormControl = this.vcsForm.get('sst');
            SstFormControl.setValue(eachTemplate.sst);
            SstFormControl.markAsTouched();
            SstFormControl.markAsDirty();
            const dbFormControl = this.vcsForm.get('default-behavior');
            dbFormControl.setValue(eachTemplate['default-behavior']);
            dbFormControl.markAsTouched();
            dbFormControl.markAsDirty();
            const UplinkFormControl = this.vcsForm.get(['slice', 'mbr', 'uplink']);
            UplinkFormControl.setValue(eachTemplate.slice.mbr.uplink);
            UplinkFormControl.markAsTouched();
            UplinkFormControl.markAsDirty();
            const DownlinkFormControl = this.vcsForm.get(['slice', 'mbr', 'downlink']);
            DownlinkFormControl.setValue(eachTemplate.slice.mbr.downlink);
            DownlinkFormControl.markAsTouched();
            DownlinkFormControl.markAsDirty();

            const ulBurstSize = this.vcsForm.get(['slice', 'mbr', 'uplink-burst-size']);
            ulBurstSize.setValue(eachTemplate.slice.mbr['uplink-burst-size']);
            ulBurstSize.markAsTouched();
            ulBurstSize.markAsDirty();
            const dlBurstSize = this.vcsForm.get(['slice', 'mbr', 'downlink-burst-size']);
            dlBurstSize.setValue(eachTemplate.slice.mbr['downlink-burst-size']);
            dlBurstSize.markAsTouched();
            dlBurstSize.markAsDirty();
        }
    }

    loadVcsVcs(target: string, id: string): void {
        this.vcsVcsService.getVcsVcs({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting VcsVcs(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['vcs-4.0.0']) {
                    basketPreview['vcs-4.0.0'].vcs.forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading VcsVcs(s)', target, id);
            }
        );
    }

    deleteApplicationFromSelect(app: string): void {
        this.bs.deleteIndexedEntry('/vcs-4.0.0/vcs[id=' + this.id +
            ']/filter[application=' + app + ']', 'application', app, this.ucmap);
        const index = (this.vcsForm.get('filter') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === app);
        (this.vcsForm.get('filter') as FormArray).removeAt(index);
        this.snackBar.open('Deletion of ' + app + ' added to basket', undefined, {duration: 2000});
        this.setShowAddFilterButton();
    }

    deleteDeviceGroupFromSelect(dg: string): void {
        this.bs.deleteIndexedEntry('/vcs-4.0.0/vcs[id=' + this.id +
            ']/device-group[device-group=' + dg + ']', 'device-group', dg, this.ucmap);
        const index = (this.vcsForm.get('device-group') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === dg);
        (this.vcsForm.get('device-group') as FormArray).removeAt(index);
        this.snackBar.open('Deletion ' + dg + ' added to basket', undefined, {duration: 2000});
    }

    private get ucmap(): Map<string, string> {
        const vcsId = '/vcs-4.0.0/vcs[id=' + this.id + ']';
        let parentUc = localStorage.getItem(vcsId);
        if (parentUc === null) {
            parentUc = this.vcsForm[REQDATTRIBS];
        }
        const ucMap = new Map<string, string>();
        ucMap.set(vcsId, parentUc);
        return ucMap;
    }

    private populateFormData(value: VcsVcs): void {
        if (value['display-name']) {
            this.vcsForm.get('display-name').setValue(value['display-name']);
            this.vcsForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.vcsForm.get('description').setValue(value.description);
            this.vcsForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.filter && this.vcsForm.value.filter.length === 0) {
            for (const app of value.filter) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter(checkerKey => checkerKey.startsWith('/basket-delete/vcs-4.0.0/vcs[id=' + this.id +
                        ']/application[application='))
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
                        priority: priorityControl
                    });
                    (this.vcsForm.get('filter') as FormArray).push(appControlGroup);
                }
                isDeleted = false;
            }
            this.setShowAddFilterButton();
        } else if (value.filter && this.vcsForm.value.filter.length !== 0) {
            this.vcsForm.value.filter.forEach((eachValueApp, eachValueAppPosition) => {
                for (const eachFormApp of value.filter) {
                    if (eachValueApp.application === eachFormApp.application) {
                        this.vcsForm.get(['filter', eachValueAppPosition, 'allow']).setValue(eachFormApp.allow);
                        this.vcsForm.get(['filter', eachValueAppPosition, 'priority']).setValue(eachFormApp.priority);
                    } else {
                        (this.vcsForm.get(['application']) as FormArray).push(this.fb.group({
                            application: eachFormApp.application,
                            allow: eachFormApp.allow,
                            priority: eachFormApp.priority
                        }));
                    }
                }
            });
            this.setShowAddFilterButton();
        }
        if (value.slice && value.slice.mbr) {
            this.vcsForm.get(['slice', 'mbr', 'uplink']).setValue(value.slice.mbr.uplink);
            this.vcsForm.get(['slice', 'mbr', 'downlink']).setValue(value.slice.mbr.downlink);
            this.vcsForm.get(['slice', 'mbr', 'uplink'])[ORIGINAL] = value.slice.mbr.uplink;
            this.vcsForm.get(['slice', 'mbr', 'downlink'])[ORIGINAL] = value.slice.mbr.downlink;
        }
        if (value.enterprise) {
            this.vcsForm.get('enterprise').setValue(value.enterprise);
            this.vcsForm.get('enterprise')[ORIGINAL] = value.enterprise;
        }
        if (value['device-group'] && this.vcsForm.value['device-group'].length === 0) {
            for (const dg of value['device-group']) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter(checkerKey => checkerKey.startsWith('/basket-delete/vcs-4.0.0/vcs[id=' + this.id +
                        ']/device-group[device-group='))
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
                    (this.vcsForm.get('device-group') as FormArray).push(this.fb.group({
                        'device-group': dgFormControl,
                        enable: enabledControl,
                    }));
                }
                isDeleted = false;
            }
        } else if (value['device-group'] && this.vcsForm.value['device-group'].length !== 0) {
            this.vcsForm.value['device-group'].forEach((eachValuedg, eachValuedgPosition) => {
                for (const eachFormdg of value['device-group']) {
                    if (eachValuedg['device-group'] === eachFormdg['device-group']) {
                        this.vcsForm.get(['device-group', eachValuedgPosition, 'enable']).setValue(eachFormdg.enable);
                    } else {
                        const newDgGroup = this.fb.group({
                            'device-group': eachFormdg['device-group'],
                            enable: eachFormdg.enable
                        });
                        newDgGroup.get('device-group')[ORIGINAL] = eachFormdg['device-group'];
                        newDgGroup.get('enable')[ORIGINAL] = eachFormdg.enable;
                        (this.vcsForm.get(['device-group']) as FormArray).push(newDgGroup);
                    }
                }
            });
        }
        if (value.sd) {
            this.vcsForm.get(['sd']).setValue(value.sd.toString(16).toUpperCase());
            this.vcsForm.get('sd')[ORIGINAL] = value.sd.toString(16).toUpperCase();
        }
        if (value.site) {
            this.vcsForm.get('site').setValue(value.site);
            this.vcsForm.get('site')[ORIGINAL] = value.site;
            this.loadSites(this.target);
            this.OnSiteSelect();
        }
        if (value['default-behavior']) {
            this.vcsForm.get(['default-behavior']).setValue(value['default-behavior']);
            this.vcsForm.get(['default-behavior'])[ORIGINAL] = value['default-behavior'];
        }
        if (value.sst) {
            this.vcsForm.get(['sst']).setValue(value.sst);
            this.vcsForm.get('sst')[ORIGINAL] = value.sst;
        }
        if (value.upf) {
            this.vcsForm.get(['upf']).setValue(value.upf);
            this.vcsForm.get('upf')[ORIGINAL] = value.upf;
        }
    }

    loadEnterprises(target: string): void {
        this.aetherService.getEnterprise({
            target,
        }).subscribe(
            (value => {
                this.enterprises = value.enterprise;
                this.setOnlyEnterprise(value.enterprise.length);
                console.log('Got', value.enterprise.length, 'Enterprise');
            }),
            error => {
                console.warn('Error getting Enterprise for ', target, error);
            }
        );
    }

    loadDeviceGoup(target: string): void {
        this.aetherService.getDeviceGroup({
            target,
        }).pipe(
            skipWhile(dgContainer => dgContainer === null)
        ).subscribe(
            (value => {
                this.deviceGroups = value['device-group'];
                console.log('Got', value['device-group'].length, 'Device Group');
            }),
            error => {
                console.warn('Error getting Device Groups for ', target, error);
            }
        );
    }

    get sliceMbrControls(): FormGroup {
        return this.vcsForm.get(['slice', 'mbr']) as FormGroup;
    }

    loadUpf(target: string): void {
        let origLen = 0;
        this.aetherService.getUpf({
            target,
        }).subscribe(
            (value => {
                value.upf.forEach(eachUPF => {
                    if (eachUPF.site === this.selectedSite) {
                        this.upfs.push(eachUPF)
                    }
                })
                origLen = this.upfs.length;
            }),
            error => {
                console.warn('Error getting UPF for ', target, error);
            },
            () => {
                // eliminate already used UPFs
                this.aetherService.getVcs({target}).pipe(
                    map(vcsContainer => vcsContainer?.vcs),
                    skipWhile(vcsList => vcsList === undefined),
                    mergeMap((vcsItem: VcsVcs[]) => from(vcsItem)),
                    map((vcs: VcsVcs) => vcs.upf),
                ).subscribe(
                    (vcsUpf) => {
                        const idx = this.upfs.findIndex((upf: UpfUpf) => upf.id === vcsUpf && this.vcsForm.get('upf').value !== vcsUpf)
                        if (idx > -1) {
                            this.upfs.splice(idx, 1)
                        }
                    },
                    err => console.warn('Error getting VCS', err),
                    () => console.log('Showing', this.upfs.length, 'unused UPFs. Total', origLen)
                );
            }
        );
    }


    setShowAddFilterButton(): void {
        this.EndpointLeft = this.application?.filter(eachApplication => this.selectedApplications().includes(eachApplication.id))
            .reduce((total, application) => {
                return total - application.endpoint.length
            }, 5)
        if (this.EndpointLeft <= 0) {
            this.showAddFilterButton = false;
        }
    }

    loadSites(target: string): void {
        this.aetherService.getSite({
            target,
        }).subscribe(
            (value => {
                this.site = value.site;
                console.log('Got Site', value.site.length);
            }),
            error => {
                console.warn('Error getting Site for ', target, error);
            },
            () => {
                console.log('Finished loading Site', target);
            }
        );
    }

    loadApplication(target: string): void {
        this.aetherService.getApplication({
            target,
        }).subscribe(
            (value => {
                this.application = value.application;
            }),
            error => {
                console.warn('Error getting Application for ', target, error);
            }
        )
    }
}

