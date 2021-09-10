/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {
    VcsVcs,
    ApListApList,
    DeviceGroupDeviceGroup,
    TemplateTemplate,
    TrafficClassTrafficClass,
    UpfUpf,
    AdditionalPropertyTarget, EnterpriseEnterprise
} from '../../../openapi3/aether/3.0.0/models';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {map, startWith} from 'rxjs/operators';
import {VcsVcsService, Service as AetherService} from 'src/openapi3/aether/3.0.0/services';
import {BasketService, HEX2NUM, IDATTRIBS, ORIGINAL, REQDATTRIBS, TYPE} from 'src/app/basket.service';
import {HexPipe} from '../../utils/hex.pipe';

export interface Bandwidths {
    megabyte: { numerical: number, inMb: string };
}

@Component({
    selector: 'aether-vcs-edit',
    templateUrl: './vcs-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class VcsEditComponent extends RocEditBase<VcsVcs> implements OnInit {
    showApplicationDisplay: boolean = false;
    showDeviceGroupDisplay: boolean = false;
    aps: Array<ApListApList> | AdditionalPropertyTarget;
    deviceGroups: Array<DeviceGroupDeviceGroup>;
    enterprises: Array<EnterpriseEnterprise>;
    templates: Array<TemplateTemplate>;
    trafficClasses: Array<TrafficClassTrafficClass>;
    upfs: Array<UpfUpf>;
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
    data: VcsVcs;
    pathRoot = 'vcs-3.0.0';
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
        application: this.fb.array([]),
        downlink: [undefined, Validators.compose([
            Validators.minLength(0),
            Validators.maxLength(4294967295)
        ])],
        uplink: [undefined, Validators.compose([
            Validators.minLength(0),
            Validators.maxLength(4294967295)
        ])],
        enterprise: [undefined],
        ap: [undefined],
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
        template: [undefined],
        'traffic-class': [undefined, Validators.required],
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
        super(snackBar, bs, route, router, 'vcs-3.0.0', 'vcs');
        super.form = this.vcsForm;
        super.loadFunc = this.loadVcsVcs;
        this.vcsForm[REQDATTRIBS] = ['sd', 'traffic-class', 'sst', 'enterprise'];
        this.vcsForm.get(['uplink'])[TYPE] = 'number';
        this.vcsForm.get(['downlink'])[TYPE] = 'number';
        this.vcsForm.get(['sst'])[TYPE] = 'number';
        this.vcsForm.get(['sd'])[TYPE] = HEX2NUM;
        this.vcsForm.get('application')[IDATTRIBS] = ['application'];
        this.vcsForm.get('device-group')[IDATTRIBS] = ['device-group'];
    }

    ngOnInit(): void {
        super.init();
        if (!this.isNewInstance) {
            this.vcsForm.get('template').disable();
            this.vcsForm.get('sd').disable();
            this.vcsForm.get('sst').disable();
            this.vcsForm.get('downlink').disable();
            this.vcsForm.get('uplink').disable();
            this.vcsForm.get('traffic-class').disable();
        }
        this.loadAp(this.target);
        this.loadDeviceGoup(this.target);
        this.loadTemplate(this.target);
        this.loadTrafficClass(this.target);
        this.loadUpf(this.target);
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

    get applications(): FormArray {
        return this.vcsForm.get('application') as FormArray;
    }

    get applicationExists(): string[] {
        const existingList: string[] = [];
        (this.vcsForm.get(['application']) as FormArray).controls.forEach((app) => {
            existingList.push(app.get('application').value);
        });
        return existingList;
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

    appSelected(selected: string): void {
        // Push into form
        if (selected !== undefined && selected !== '') {
            const appFormControl = this.fb.control(selected);
            appFormControl.markAsTouched();
            appFormControl.markAsDirty();
            const allowControl = this.fb.control(true); // Default as true
            allowControl.markAsTouched();
            allowControl.markAsDirty();
            allowControl[TYPE] = 'boolean';
            const appGroupControl = this.fb.group({
                application: appFormControl,
                allow: allowControl,
            });
            (this.vcsForm.get('application') as FormArray).push(appGroupControl);
            this.vcsForm.get('application').markAsTouched();
            console.log('Adding new Value', selected);
        }
        this.showApplicationDisplay = false;
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
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['vcs-3.0.0']) {
                    basketPreview['vcs-3.0.0'].vcs.forEach((basketItems) => {
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
        this.bs.deleteIndexedEntry('/vcs-3.0.0/vcs[id=' + this.id +
            ']/application[application=' + app + ']', 'application', app, this.ucmap);
        const index = (this.vcsForm.get('application') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === app);
        (this.vcsForm.get('application') as FormArray).removeAt(index);
        this.snackBar.open('Deletion of ' + app + ' added to basket', undefined, {duration: 2000});
    }

    deleteDeviceGroupFromSelect(dg: string): void {
        this.bs.deleteIndexedEntry('/vcs-3.0.0/vcs[id=' + this.id +
            ']/device-group[device-group=' + dg + ']', 'device-group', dg, this.ucmap);
        const index = (this.vcsForm.get('device-group') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === dg);
        (this.vcsForm.get('device-group') as FormArray).removeAt(index);
        this.snackBar.open('Deletion ' + dg + ' added to basket', undefined, {duration: 2000});
    }

    private get ucmap(): Map<string, string> {
        const vcsId = '/vcs-3.0.0/vcs[id=' + this.id + ']';
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
        if (value.application && this.vcsForm.value.application.length === 0) {
            for (const app of value.application) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter(checkerKey => checkerKey.startsWith('/basket-delete/vcs-3.0.0/vcs[id=' + this.id +
                        ']/application[application='))
                    .forEach((checkerKey) => {
                        if (checkerKey.includes(app.application)) {
                            isDeleted = true;
                        }
                    });
                if (!isDeleted) {
                    const appFormControl = this.fb.control(app.application);
                    appFormControl[ORIGINAL] = app.application;
                    const enabledControl = this.fb.control(app.allow);
                    enabledControl[ORIGINAL] = app.allow;
                    enabledControl[TYPE] = 'boolean';
                    const appControlGroup = this.fb.group({
                        application: appFormControl,
                        allow: enabledControl,
                    });
                    (this.vcsForm.get('application') as FormArray).push(appControlGroup);
                }
                isDeleted = false;
            }
        } else if (value.application && this.vcsForm.value.application.length !== 0) {
            this.vcsForm.value.application.forEach((eachValueApp, eachValueAppPosition) => {
                for (const eachFormApp of value.application) {
                    if (eachValueApp.application === eachFormApp.application) {
                        this.vcsForm.get(['application', eachValueAppPosition, 'allow']).setValue(eachFormApp.allow);
                    } else {
                        (this.vcsForm.get(['application']) as FormArray).push(this.fb.group({
                            application: eachFormApp.application,
                            allow: eachFormApp.allow
                        }));
                    }
                }
            });
        }
        if (value.downlink) {
            this.vcsForm.get(['downlink']).setValue(value.downlink);
            this.vcsForm.get(['downlink'])[ORIGINAL] = value.downlink;
        }
        if (value.uplink) {
            this.vcsForm.get(['uplink']).setValue(value.uplink);
            this.vcsForm.get(['uplink'])[ORIGINAL] = value.uplink;
        }
        if (value.enterprise) {
            this.vcsForm.get('enterprise').setValue(value.enterprise);
            this.vcsForm.get('enterprise')[ORIGINAL] = value.enterprise;
        }
        if (value.ap) {
            this.vcsForm.get(['ap']).setValue(value.ap);
            this.vcsForm.get(['ap'])[ORIGINAL] = value.ap;
        }
        if (value['device-group'] && this.vcsForm.value['device-group'].length === 0) {
            for (const dg of value['device-group']) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter(checkerKey => checkerKey.startsWith('/basket-delete/vcs-3.0.0/vcs[id=' + this.id +
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
        if (value.sst) {
            this.vcsForm.get(['sst']).setValue(value.sst);
            this.vcsForm.get('sst')[ORIGINAL] = value.sst;
        }
        if (value.template) {
            this.vcsForm.get(['template']).setValue(value.template);
            this.vcsForm.get('template')[ORIGINAL] = value.template;
        }
        if (value['traffic-class']) {
            this.vcsForm.get(['traffic-class']).setValue(value['traffic-class']);
            this.vcsForm.get('traffic-class')[ORIGINAL] = value['traffic-class'];
        }
        if (value.upf) {
            this.vcsForm.get(['upf']).setValue(value.upf);
            this.vcsForm.get('upf')[ORIGINAL] = value.upf;
        }
    }

    loadAp(target: string): void {
        this.aetherService.getApList({
            target,
        }).subscribe(
            (value => {
                this.aps = value['ap-list'];
                console.log('Got', value['ap-list'].length, 'AP List');
            }),
            error => {
                console.warn('Error getting Ap List for ', target, error);
            }
        );
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
        }).subscribe(
            (value => {
                this.deviceGroups = value['device-group'];
                console.log('Got', value['device-group'].length, 'Device Group');
            }),
            error => {
                console.warn('Error getting Device Groups for ', target, error);
            }
        );
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

    templateSelecte(templateSelected): void {
        if (this.isNewInstance) {
            this.templates.forEach(eachTemplate => {
                if (eachTemplate.id === templateSelected.value) {
                    this.vcsForm.get(['sd']).setValue(eachTemplate.sd.toString(16).toUpperCase());
                    const SdFormControl = this.vcsForm.get('sd');
                    SdFormControl.markAsTouched();
                    SdFormControl.markAsDirty();
                    this.vcsForm.get(['sst']).setValue(eachTemplate.sst);
                    const SstFormControl = this.vcsForm.get('sst');
                    SstFormControl.markAsTouched();
                    SstFormControl.markAsDirty();
                    this.vcsForm.get(['traffic-class']).setValue(eachTemplate['traffic-class']);
                    const TcFormControl = this.vcsForm.get('traffic-class');
                    TcFormControl.markAsTouched();
                    TcFormControl.markAsDirty();
                    this.vcsForm.get(['uplink']).setValue(eachTemplate.uplink);
                    const UplinkFormControl = this.vcsForm.get('uplink');
                    UplinkFormControl.markAsTouched();
                    UplinkFormControl.markAsDirty();
                    this.vcsForm.get(['downlink']).setValue(eachTemplate.downlink);
                    const DownlinkFormControl = this.vcsForm.get('downlink');
                    DownlinkFormControl.markAsTouched();
                    DownlinkFormControl.markAsDirty();
                }
            });
        }
    }

    loadTrafficClass(target: string): void {
        this.aetherService.getTrafficClass({
            target,
        }).subscribe(
            (value => {
                this.trafficClasses = value['traffic-class'];
                console.log('Got', value['traffic-class'].length, 'Traffic Class');
            }),
            error => {
                console.warn('Error getting Traffic Class for ', target, error);
            }
        );
    }

    loadUpf(target: string): void {
        this.aetherService.getUpf({
            target,
        }).subscribe(
            (value => {
                this.upfs = value.upf;
                console.log('Got', value.upf.length, 'UPF');
            }),
            error => {
                console.warn('Error getting UPF for ', target, error);
            }
        );
    }
}

