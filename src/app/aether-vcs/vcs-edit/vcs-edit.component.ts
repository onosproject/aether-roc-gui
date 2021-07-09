/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, InjectionToken, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
    VcsVcs,
    ApListApList,
    DeviceGroupDeviceGroup,
    TemplateTemplate,
    TrafficClassTrafficClass,
    UpfUpf,
    AdditionalPropertyTarget
} from '../../../openapi3/aether/3.0.0/models';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {isEmpty, map, startWith} from 'rxjs/operators';
import {VcsVcsService, Service as AetherService} from 'src/openapi3/aether/3.0.0/services';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from 'src/app/basket.service';

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
    templates: Array<TemplateTemplate>;
    trafficClasses: Array<TrafficClassTrafficClass>;
    upfs: Array<UpfUpf>;
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
    data: VcsVcs;
    pathRoot = 'vcs-3.0.0';
    pathListAttr = 'vcs';

    vcsForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])],
        application: this.fb.array([]),
        downlink: [0, Validators.compose([
            Validators.minLength(0),
            Validators.maxLength(4294967295)
        ])],
        uplink: [0, Validators.compose([
            Validators.minLength(0),
            Validators.maxLength(4294967295)
        ])],
        ap: [''],
        'device-group': this.fb.array([]),
        sd: [0],
        sst: [0],
        template: [''],
        'traffic-class': [''],
        upf: ['']
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
        this.vcsForm.get(['uplink'])[TYPE] = 'number';
        this.vcsForm.get(['downlink'])[TYPE] = 'number';
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
        this.bandwidthOptions = this.vcsForm.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'number' ? value : value.megabyte),
                map(megabyte => megabyte ? this._filter(megabyte) : this.options.slice())
            );
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
            const enabledControl = this.fb.control(false);
            enabledControl.markAsTouched();
            enabledControl.markAsDirty();
            enabledControl[TYPE] = 'boolean';
            (this.vcsForm.get('application') as FormArray).push(this.fb.group({
                application: appFormControl,
                allow: enabledControl,
            }));
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
            const enabledControl = this.fb.control(false);
            enabledControl.markAsTouched();
            enabledControl.markAsDirty();
            enabledControl[TYPE] = 'boolean';
            (this.vcsForm.get('device-group') as FormArray).push(this.fb.group({
                'device-group': dgFormControl,
                enable: enabledControl,
            }));
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

    deleteApplicationFromSelect(app: FormControl): void {
        this.bs.deleteIndexedEntry('/vcs-3.0.0/vcs[id=' + this.id +
            ']/application[application=' + app + ']', 'application');
        const index = (this.vcsForm.get('application') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === app);
        (this.vcsForm.get('application') as FormArray).removeAt(index);
    }

    deleteDeviceGroupFromSelect(dg: FormControl): void {
        this.bs.deleteIndexedEntry('/vcs-3.0.0/vcs[id=' + this.id +
            ']/device-group[device-group=' + dg + ']', 'device-group');
        const index = (this.vcsForm.get('device-group') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === dg);
        (this.vcsForm.get('device-group') as FormArray).removeAt(index);
    }

    private populateFormData(value: VcsVcs): void {
        if (value['display-name']) {
            this.vcsForm.get('display-name').setValue(value['display-name']);
        }
        if (value.description) {
            this.vcsForm.get('description').setValue(value.description);
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
                    (this.vcsForm.get('application') as FormArray).push(this.fb.group({
                        application: appFormControl,
                        allow: enabledControl,
                    }));
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
        }
        if (value.uplink) {
            this.vcsForm.get(['uplink']).setValue(value.uplink);
        }
        if (value.ap) {
            this.vcsForm.get(['ap']).setValue(value.ap);
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
                        (this.vcsForm.get(['device-group']) as FormArray).push(this.fb.group({
                            'device-group': eachFormdg['device-group'],
                            enable: eachFormdg.enable
                        }));
                    }
                }
            });
        }
        if (value.sd) {
            this.vcsForm.get(['sd']).setValue(value.sd);
        }
        if (value.sst) {
            this.vcsForm.get(['sst']).setValue(value.sst);
        }
        if (value.template) {
            this.vcsForm.get(['template']).setValue(value.template);
        }
        if (value['traffic-class']) {
            this.vcsForm.get(['traffic-class']).setValue(value['traffic-class']);
        }
        if (value.upf) {
            this.vcsForm.get(['upf']).setValue(value.upf);
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
                    this.vcsForm.get(['sd']).setValue(eachTemplate.sd);
                    this.vcsForm.get(['sst']).setValue(eachTemplate.sst);
                    this.vcsForm.get(['traffic-class']).setValue(eachTemplate['traffic-class']);
                    this.vcsForm.get(['uplink']).setValue(eachTemplate.uplink);
                    this.vcsForm.get(['downlink']).setValue(eachTemplate.downlink);
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

