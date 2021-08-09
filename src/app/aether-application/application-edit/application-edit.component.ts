/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ApplicationApplicationService, Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {
    ApplicationApplication,
    EnterpriseEnterprise
} from '../../../openapi3/aether/3.0.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, REQDATTRIBS, TYPE} from '../../basket.service';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

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
    enterprises: Array<EnterpriseEnterprise>;
    pathRoot = 'application-3.0.0';
    pathListAttr = 'application';
    data: ApplicationApplication;
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
            Validators.maxLength(100),
        ])],
        endpoint: this.fb.array([]),
        enterprise: [undefined, Validators.required]
    });

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
        super(snackBar, bs, route, router, 'application-3.0.0', 'application');
        super.form = this.appForm;
        super.loadFunc = this.loadApplicationApplication;
        this.appForm[REQDATTRIBS] = ['enterprise'];
        this.appForm.get(['endpoint'])[IDATTRIBS] = ['name'];
    }

    ngOnInit(): void {
        super.init();
        this.loadEnterprises(this.target);
    }

    setOnlyEnterprise(lenEnterprises: number): void {
        if (lenEnterprises === 1) {
            this.appForm.get('enterprise').markAsTouched();
            this.appForm.get('enterprise').markAsDirty();
            this.appForm.get('enterprise').setValue(this.enterprises[0].id);
        }
    }

    deleteFromSelect(ep: FormControl): void {
        this.bs.deleteIndexedEntry('/application-3.0.0/application[id=' + this.id +
            ']/endpoint[endpoint=' + ep + ']', 'endpoint', '' + ep);
        const index = (this.appForm.get('endpoint') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === ep);
        (this.appForm.get('endpoint') as FormArray).removeAt(index);
        this.showEndpointAddButton = true;
    }

    loadApplicationApplication(target: string, id: string): void {
        this.applicationApplicationService.getApplicationApplication({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting ApplicationApplication(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['application-3.0.0']) {
                    basketPreview['application-3.0.0'].application.forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading ApplicationApplication(s)', target, id);
            }
        );
    }

    endpointSelected(selected): void {
        // Push into form
        if (selected || selected !== undefined) {
            const epNameControl = this.fb.control(selected.name);
            epNameControl.markAsTouched();
            epNameControl.markAsDirty();
            const epAddressControl = this.fb.control(selected.address);
            epAddressControl.markAsTouched();
            epAddressControl.markAsDirty();
            const epPortStartControl = this.fb.control(selected['port-start'], Validators.compose([
                Validators.min(0),
                Validators.max(65535)
            ]));
            epPortStartControl.markAsTouched();
            epPortStartControl.markAsDirty();
            epPortStartControl[TYPE] = 'number';
            const epPortEndControl = this.fb.control(selected['port-end'], Validators.compose([
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
                address: epAddressControl,
                ['port-start']: epPortStartControl,
                ['port-end']: epPortEndControl,
                protocol: epProtocolcontrol,
            });
            epGroupControl[REQDATTRIBS] = ['port-start', 'address'];

            (this.appForm.get('endpoint') as FormArray).push(epGroupControl);
            console.log('Adding new Value', selected);
            this.appForm.markAllAsTouched();
        }
        this.showConnectDisplay = false;
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
                    const epAddressControl = this.fb.control(ep.address);
                    epAddressControl[ORIGINAL] = ep.address;
                    const epPortStartControl = this.fb.control(ep['port-start']);
                    epPortStartControl[ORIGINAL] = ep['port-start'];
                    const epPortEndControl = this.fb.control(ep['port-end']);
                    epPortEndControl[ORIGINAL] = ep['port-end'];
                    const epProtocolcontrol = this.fb.control(ep.protocol);
                    epProtocolcontrol[ORIGINAL] = ep.protocol;
                    const epGroupControl = this.fb.group({
                        name: epNameControl,
                        address: epAddressControl,
                        ['port-start']: epPortStartControl,
                        ['port-end']: epPortEndControl,
                        protocol: epProtocolcontrol,
                    });
                    epGroupControl[REQDATTRIBS] = ['port-start', 'address'];

                    (this.appForm.get(['endpoint']) as FormArray).push(epGroupControl);
                }
            } else {
                value.endpoint.forEach((eachValueEndpoint, eachFormEndpointPosition) => {

                    for (const eachFormEndpoint of this.appForm.value.endpoint) {
                        if (eachValueEndpoint.name === eachFormEndpoint.name) {
                            this.appForm.get(['endpoint', eachFormEndpointPosition, 'address'])
                                .setValue(eachValueEndpoint.address);
                            this.appForm.get(['endpoint', eachFormEndpointPosition, 'port-start'])
                                .setValue(eachValueEndpoint['port-start']);
                            this.appForm.get(['endpoint', eachFormEndpointPosition, 'port-end'])
                                .setValue(eachValueEndpoint['port-end']);
                            this.appForm.get(['endpoint', eachFormEndpointPosition, 'protocol'])
                                .setValue(eachValueEndpoint.protocol);
                        } else {
                            (this.appForm.get(['endpoint']) as FormArray).push(this.fb.group({
                                name: eachValueEndpoint.name,
                                address: eachValueEndpoint.address,
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
