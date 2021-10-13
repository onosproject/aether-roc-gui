/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl, FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {ApplicationApplicationService, Service as AetherService} from '../../../openapi3/aether/4.0.0/services';
import {
    ApplicationApplication, EnterpriseEnterprise
} from '../../../openapi3/aether/4.0.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, REQDATTRIBS, TYPE} from '../../basket.service';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {EndPointParam} from "../endpoint-select/endpoint-select.component";
import {Observable} from "rxjs";
import {Bandwidths} from "../../aether-template/template-edit/template-edit.component";
import {map, startWith} from "rxjs/operators";

const ValidatePortRange: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.get(['endpoint']).value.length !== 0) {
        const endpointFormvalue = control.get(['endpoint']).value;
        let isValid: ValidationErrors;
        endpointFormvalue.every(eachEndpoint => {
            isValid = eachEndpoint['port-start'] <= eachEndpoint['port-end'] ? null : {isEndpointNotValid: true};
        });
        return isValid;
    }
};

@Component({
    selector: 'aether-application-edit',
    templateUrl: './application-edit.component.html',
    styleUrls: [
        '../../common-edit.component.scss',
    ]
})

export class ApplicationEditComponent extends RocEditBase<ApplicationApplication> implements OnInit {

    protocolOptions = [
        {name: 'UDP'},
        {name: 'TCP'},
    ];
    showConnectDisplay: boolean = false;
    showEndpointAddButton: boolean = true;
    showParentDisplay: boolean = false;
    enterprises: Array<EnterpriseEnterprise>;
    pathRoot = 'application-4.0.0';
    pathListAttr = 'application';
    applicationId: string;
    data: ApplicationApplication;
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
    appForm = this.fb.group({
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
        address: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
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
        endpoint: this.fb.array([]),
        enterprise: [undefined, Validators.required]
    }, {validators: ValidatePortRange});

    constructor(
        private applicationApplicationService: ApplicationApplicationService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'application-4.0.0', 'application');
        super.form = this.appForm;
        super.loadFunc = this.loadApplicationApplication;
        this.appForm[REQDATTRIBS] = ['enterprise'];
        this.appForm.get(['endpoint'])[IDATTRIBS] = ['name'];
    }

    ngOnInit(): void {
        super.init();
        this.loadEnterprises(this.target);
        this.bandwidthOptions = this.appForm.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'number' ? value : value.megabyte),
                map(megabyte => megabyte ? this._filter(megabyte) : this.options.slice())
            );
    }

    setOnlyEnterprise(lenEnterprises: number): void {
        if (lenEnterprises === 1) {
            this.appForm.get('enterprise').markAsTouched();
            this.appForm.get('enterprise').markAsDirty();
            this.appForm.get('enterprise').setValue(this.enterprises[0].id);
        }
    }

    deleteFromSelect(ep: string): void {
        this.bs.deleteIndexedEntry('/application-4.0.0/application[id=' + this.id +
            ']/endpoint[name=' + ep + ']', 'name', ep, this.ucmap(ep));
        const index = (this.appForm.get('endpoint') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === ep);
        (this.appForm.get('endpoint') as FormArray).removeAt(index);
        this.showEndpointAddButton = true;
        this.snackBar.open('Deletion of ' + ep + ' added to basket', undefined, {duration: 2000});
    }

    private ucmap(ep: string): Map<string, string> {
        const ucMap = new Map<string, string>();
        const appId = '/application-4.0.0/application[id=' + this.id + ']';
        let parentUc = localStorage.getItem(appId);
        if (parentUc === null) {
            parentUc = this.appForm[REQDATTRIBS];
        }
        ucMap.set(appId, parentUc);

        const epId = appId + '/endpoint[name=' + ep + ']';
        let epUc = localStorage.getItem(epId);
        if (epUc === null) {
            const epFormArray = this.appForm.get(['endpoint']) as FormArray;
            const epCtl = epFormArray.controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === ep);
            console.log('Getting', epCtl, 'for', epId);
            epUc = epFormArray.controls[epCtl][REQDATTRIBS];
        }
        ucMap.set(epId, epUc);
        return ucMap;
    }

    get mbrControls(): FormGroup {
        return this.appForm.get(['mbr']) as FormGroup;
    }

    loadApplicationApplication(target: string, id: string): void {
        this.applicationApplicationService.getApplicationApplication({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.applicationId = value.id;
                console.log("value1", value)
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting ApplicationApplication(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['application-4.0.0']) {
                    basketPreview['application-4.0.0'].application.forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading ApplicationApplication(s)', target, id);
            }
        );
    }

    closeShowParentCard(close: boolean): void {
        this.showParentDisplay = false;
    }

    private _filter(bandwidthIndex: number): Bandwidths[] {
        const filterValue = bandwidthIndex;
        return this.options.filter(option => option.megabyte.numerical);
    }

    endpointSelected(selected: EndPointParam): void {
        this.showConnectDisplay = false;

        if (selected === undefined) {
            return;
        }
        const epNameControl = this.fb.control(selected.name);
        epNameControl.markAsTouched();
        epNameControl.markAsDirty();

        const epPortStartControl = this.fb.control(selected.portStart, Validators.compose([
            Validators.min(0),
            Validators.max(65535)
        ]));
        epPortStartControl.markAsTouched();
        epPortStartControl.markAsDirty();

        epPortStartControl[TYPE] = 'number';
        const epPortEndControl = this.fb.control(selected.portEnd, Validators.compose([
            Validators.min(0),
            Validators.max(65535)
        ]));
        epPortEndControl.markAsTouched();
        epPortEndControl.markAsDirty();

        epPortEndControl[TYPE] = 'number';
        const epProtocolcontrol = this.fb.control(selected.protocol);
        epProtocolcontrol.markAsTouched();
        epProtocolcontrol.markAsDirty();

        const epGroupControl = this.fb.group({
            name: epNameControl,
            ['port-start']: epPortStartControl,
            ['port-end']: epPortEndControl,
            protocol: epProtocolcontrol,
        });
        epGroupControl[REQDATTRIBS] = ['port-start'];

        (this.appForm.get('endpoint') as FormArray).push(epGroupControl);
        console.log('Adding new Value', selected);
        this.appForm.markAllAsTouched();
    }

    private populateFormData(value: ApplicationApplication): void {
        if (value['display-name']) {
            this.appForm.get('display-name').setValue(value['display-name']);
            this.appForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.appForm.get('description').setValue(value.description);
            this.appForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.address) {
            this.appForm.get('address').setValue(value.address);
            this.appForm.get('address')[ORIGINAL] = value.address;
        }
        if (value.enterprise) {
            this.appForm.get('enterprise').setValue(value.enterprise);
            this.appForm.get('enterprise')[ORIGINAL] = value.enterprise;
        }
        if (value.endpoint) {
            this.showEndpointAddButton = false;
            if (this.appForm.value.endpoint.length === 0) {
                for (const ep of value.endpoint) {
                    const epNameControl = this.fb.control(ep.name);
                    epNameControl[ORIGINAL] = ep.name;
                    const epPortStartControl = this.fb.control(ep['port-start']);
                    epPortStartControl[ORIGINAL] = ep['port-start'];
                    const epPortEndControl = this.fb.control(ep['port-end']);
                    epPortEndControl[ORIGINAL] = ep['port-end'];
                    const epProtocolcontrol = this.fb.control(ep.protocol);
                    epProtocolcontrol[ORIGINAL] = ep.protocol;
                    const epGroupControl = this.fb.group({
                        name: epNameControl,
                        ['port-start']: epPortStartControl,
                        ['port-end']: epPortEndControl,
                        protocol: epProtocolcontrol,
                    });
                    epGroupControl[REQDATTRIBS] = ['port-start'];

                    (this.appForm.get(['endpoint']) as FormArray).push(epGroupControl);
                }
            } else {
                value.endpoint.forEach((eachValueEndpoint, eachFormEndpointPosition) => {

                    for (const eachFormEndpoint of this.appForm.value.endpoint) {
                        if (eachValueEndpoint.name === eachFormEndpoint.name) {
                            this.appForm.get(['endpoint', eachFormEndpointPosition, 'port-start'])
                                .setValue(eachValueEndpoint['port-start']);
                            this.appForm.get(['endpoint', eachFormEndpointPosition, 'port-end'])
                                .setValue(eachValueEndpoint['port-end']);
                            this.appForm.get(['endpoint', eachFormEndpointPosition, 'protocol'])
                                .setValue(eachValueEndpoint.protocol);
                        } else {
                            (this.appForm.get(['endpoint']) as FormArray).push(this.fb.group({
                                name: eachValueEndpoint.name,
                                'port-start': eachValueEndpoint['port-start'],
                                'port-end': eachValueEndpoint['port-end'],
                                protocol: eachValueEndpoint.protocol
                            }));
                        }
                    }
                });
            }
        }
    }

    get endpointControls(): FormArray {
        return this.appForm.get(['endpoint']) as FormArray;
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

}
