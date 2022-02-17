/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';

import {
    EnterprisesEnterpriseService,
    Service as AetherService,
} from '../../../openapi3/aether/2.0.0/services';
import {
    EnterprisesEnterpriseApplication,
    EnterprisesEnterpriseTrafficClass,
} from '../../../openapi3/aether/2.0.0/models';
import {
    BasketService,
    IDATTRIBS,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { RocEditBase } from '../../roc-edit-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EndPointParam } from '../endpoint-select/endpoint-select.component';
import { Observable } from 'rxjs';
import { Bandwidths } from '../../aether-template/template-edit/template-edit.component';
import { map, startWith } from 'rxjs/operators';
import { RocElement } from '../../../openapi3/top/level/models/elements';
import { EnterprisesEnterpriseApplicationService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';

const ValidatePortRange: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (control.get(['endpoint']).value.length !== 0) {
        const endpointFormvalue = control.get(['endpoint']).value;
        let isValid: ValidationErrors;
        endpointFormvalue.every((eachEndpoint) => {
            isValid =
                eachEndpoint['port-start'] <= eachEndpoint['port-end']
                    ? null
                    : { isEndpointNotValid: true };
        });
        return isValid;
    }
};

@Component({
    selector: 'aether-application-edit',
    templateUrl: './application-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class ApplicationEditComponent extends RocEditBase implements OnInit {
    protocolOptions = [{ name: 'UDP' }, { name: 'TCP' }];
    shownEndpointDisplay = false;
    showEndpointAddButton = true;
    showParentDisplay = false;
    readonly endpointLimit: number = 5;
    trafficClassOptions: Array<EnterprisesEnterpriseTrafficClass>;
    pathListAttr = 'application';
    applicationId: string;
    data: EnterprisesEnterpriseApplication;
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
    bandwidthOptions: Observable<Bandwidths[]>;
    appForm = this.fb.group(
        {
            'application-id': [
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
            address: [
                undefined,
                Validators.compose([
                    Validators.minLength(1),
                    Validators.maxLength(80),
                ]),
            ],
            endpoint: this.fb.array([]),
        },
        { validators: ValidatePortRange }
    );

    constructor(
        private applicationApplicationService: EnterprisesEnterpriseApplicationService,
        private enterpriseService: EnterprisesEnterpriseService,
        protected aetherService: AetherService,
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
            route,
            router,
            'Enterprises-2.0.0',
            'application',
            'application-id'
        );
        super.form = this.appForm;
        super.loadFunc = this.loadApplicationApplication;
        this.appForm[REQDATTRIBS] = ['address'];
        this.appForm.get(['endpoint'])[IDATTRIBS] = ['endpoint-id'];
    }

    ngOnInit(): void {
        super.init();
        this.loadTrafficClass(this.target);
        this.bandwidthOptions = this.appForm.valueChanges.pipe(
            startWith(''),
            map((value) =>
                typeof value === 'number' ? value : value.megabyte
            ),
            map((megabyte) =>
                megabyte ? this._filter() : this.options.slice()
            )
        );
    }

    deleteFromSelect(ep: string): void {
        this.bs.deleteIndexedEntry(
            '/' +
                this.pathRoot +
                '/application[application-id=' +
                this.id +
                ']/endpoint[endpoint-id=' +
                ep +
                ']',
            'endpoint-id',
            ep,
            this.ucmap()
        );
        const index = (
            this.appForm.get('endpoint') as FormArray
        ).controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === ep);
        (this.appForm.get('endpoint') as FormArray).removeAt(index);
        this.showEndpointAddButton = true;
        this.snackBar.open(
            'Deletion of ' + ep + ' added to basket',
            undefined,
            { duration: 2000 }
        );
    }

    private ucmap(): Map<string, string> {
        const ucMap = new Map<string, string>();
        const appId =
            '/' +
            this.pathRoot +
            '/application[application-id=' +
            this.id +
            ']';
        let parentUc = localStorage.getItem(appId);
        if (parentUc === null) {
            parentUc = this.appForm[REQDATTRIBS];
        }
        ucMap.set(appId, parentUc);

        return ucMap;
    }

    loadApplicationApplication(target: string, id: string): void {
        this.applicationApplicationService
            .getEnterprisesEnterpriseApplication({
                target: AETHER_TARGET,
                'application-id': id,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.applicationId = value['application-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting EnterprisesEnterpriseApplication(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        this.pathRoot in basketPreview &&
                        'enterprise' in basketPreview['Enterprises-2.0.0'] &&
                        this.pathListAttr in basketPreview['Enterprises-2.0.0']
                    ) {
                        basketPreview['Enterprises-2.0.0'].enterprise.forEach(
                            (enterpriseBasketItems) => {
                                if (
                                    enterpriseBasketItems['enterprise-id'] ===
                                    this.route.snapshot.params['enterprise-id']
                                ) {
                                    enterpriseBasketItems.application.forEach(
                                        (basketItems) => {
                                            if (
                                                basketItems[
                                                    'application-id'
                                                ] === id
                                            ) {
                                                this.populateFormData(
                                                    basketItems
                                                );
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                    console.log(
                        'Finished loading EnterprisesEnterpriseApplication(s)',
                        target,
                        id
                    );
                }
            );
    }

    private _filter(): Bandwidths[] {
        return this.options.filter((option) => option.megabyte.numerical);
    }

    endpointSelected(selected: EndPointParam): void {
        this.shownEndpointDisplay = false;

        if (selected === undefined) {
            return;
        }
        const epIdControl = this.fb.control(selected['endpoint-id']);
        epIdControl.markAsTouched();
        epIdControl.markAsDirty();

        const epNameControl = this.fb.control(selected['display-name']);
        epNameControl.markAsTouched();
        epNameControl.markAsDirty();

        const epPortStartControl = this.fb.control(
            selected.portStart,
            Validators.compose([Validators.min(0), Validators.max(65535)])
        );
        epPortStartControl.markAsTouched();
        epPortStartControl.markAsDirty();

        epPortStartControl[TYPE] = 'number';
        const epPortEndControl = this.fb.control(
            selected.portEnd,
            Validators.compose([Validators.min(0), Validators.max(65535)])
        );
        epPortEndControl.markAsTouched();
        epPortEndControl.markAsDirty();

        epPortEndControl[TYPE] = 'number';
        const epProtocolcontrol = this.fb.control(selected.protocol);
        epProtocolcontrol.markAsTouched();
        epProtocolcontrol.markAsDirty();

        const epTrafficClasscontrol = this.fb.control(selected.trafficClass);
        epTrafficClasscontrol.markAsTouched();
        epTrafficClasscontrol.markAsDirty();

        const epMbrUplinkcontrol = this.fb.control(selected.mbrUplink);
        epMbrUplinkcontrol.markAsTouched();
        epMbrUplinkcontrol.markAsDirty();
        epMbrUplinkcontrol[TYPE] = 'number';

        const epMbrDownlinkcontrol = this.fb.control(selected.mbrDownlink);
        epMbrDownlinkcontrol.markAsTouched();
        epMbrDownlinkcontrol.markAsDirty();
        epMbrDownlinkcontrol[TYPE] = 'number';

        const epGroupControl = this.fb.group({
            ['endpoint-id']: epIdControl,
            ['display-name']: epNameControl,
            ['port-start']: epPortStartControl,
            ['port-end']: epPortEndControl,
            protocol: epProtocolcontrol,
            ['traffic-class']: epTrafficClasscontrol,
            mbr: this.fb.group({
                uplink: epMbrUplinkcontrol,
                downlink: epMbrDownlinkcontrol,
            }),
        });

        (this.appForm.get('endpoint') as FormArray).push(epGroupControl);
        this.appForm.markAllAsTouched();
    }

    private populateFormData(value: EnterprisesEnterpriseApplication): void {
        if (value['application-id']) {
            this.appForm
                .get('application-id')
                .setValue(value['application-id']);
            this.appForm.get('application-id')[ORIGINAL] =
                value['application-id'];
        }
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
                    let isDeleted = false;
                    Object.keys(localStorage)
                        .filter((checkerKey) =>
                            checkerKey.startsWith(
                                '/basket-delete/Enterprises/enterprise[enterprise-id=[' +
                                    this.route.snapshot.params[
                                        'enterprise-id'
                                    ] +
                                    ']/application[application-id=' +
                                    value['application-id '] +
                                    ']/endpoint[endpoint-id='
                            )
                        )
                        .forEach((checkerKey) => {
                            if (checkerKey.includes(ep['endpoint-id'])) {
                                isDeleted = true;
                            }
                        });
                    if (!isDeleted) {
                        const epIdControl = this.fb.control(ep['endpoint-id']);
                        epIdControl[ORIGINAL] = ep['endpoint-id'];
                        const epNameControl = this.fb.control(
                            ep['display-name']
                        );
                        epNameControl[ORIGINAL] = ep['display-name'];
                        const epPortStartControl = this.fb.control(
                            ep['port-start']
                        );
                        epPortStartControl[ORIGINAL] = ep['port-start'];
                        const epPortEndControl = this.fb.control(
                            ep['port-end']
                        );
                        epPortEndControl[ORIGINAL] = ep['port-end'];
                        const epProtocolcontrol = this.fb.control(ep.protocol);
                        epProtocolcontrol[ORIGINAL] = ep.protocol;
                        const epMbrDownlinkcontrol = this.fb.control(
                            ep.mbr.downlink
                        );
                        epMbrDownlinkcontrol[ORIGINAL] = ep.mbr.downlink;
                        const epMbrUplinkcontrol = this.fb.control(
                            ep.mbr.uplink
                        );
                        epMbrUplinkcontrol[ORIGINAL] = ep.mbr.uplink;
                        const epTrafficClasscontrol = this.fb.control(
                            ep['traffic-class']
                        );
                        epTrafficClasscontrol[ORIGINAL] = ep['traffic-class'];
                        const epGroupControl = this.fb.group({
                            ['endpoint-id']: epIdControl,
                            ['display-name']: epNameControl,
                            ['port-start']: epPortStartControl,
                            ['port-end']: epPortEndControl,
                            protocol: epProtocolcontrol,
                            'traffic-class': epTrafficClasscontrol,
                            mbr: this.fb.group({
                                uplink: epMbrUplinkcontrol,
                                downlink: epMbrDownlinkcontrol,
                            }),
                        });

                        (this.appForm.get(['endpoint']) as FormArray).push(
                            epGroupControl
                        );
                    }
                    isDeleted = false;
                }
            } else {
                const existingEndpoint = this.appForm.value.endpoint;
                value.endpoint.forEach(
                    (eachValueEndpoint, eachFormEndpointPosition) => {
                        for (const eachFormEndpoint of existingEndpoint) {
                            if (
                                eachValueEndpoint['endpoint-id'] ===
                                eachFormEndpoint['endpoint-id']
                            ) {
                                this.appForm
                                    .get([
                                        'endpoint',
                                        eachFormEndpointPosition,
                                        'display-name',
                                    ])
                                    .setValue(
                                        eachValueEndpoint['display-name']
                                    );
                                this.appForm
                                    .get([
                                        'endpoint',
                                        eachFormEndpointPosition,
                                        'port-start',
                                    ])
                                    .setValue(eachValueEndpoint['port-start']);
                                this.appForm
                                    .get([
                                        'endpoint',
                                        eachFormEndpointPosition,
                                        'port-end',
                                    ])
                                    .setValue(eachValueEndpoint['port-end']);
                                this.appForm
                                    .get([
                                        'endpoint',
                                        eachFormEndpointPosition,
                                        'protocol',
                                    ])
                                    .setValue(eachValueEndpoint.protocol);
                                this.appForm
                                    .get([
                                        'endpoint',
                                        eachFormEndpointPosition,
                                        'traffic-class',
                                    ])
                                    .setValue(
                                        eachValueEndpoint['traffic-class']
                                    );
                                this.appForm
                                    .get([
                                        'endpoint',
                                        eachFormEndpointPosition,
                                        'mbr',
                                        'uplink',
                                    ])
                                    .setValue(eachValueEndpoint.mbr.uplink);
                                this.appForm
                                    .get([
                                        'endpoint',
                                        eachFormEndpointPosition,
                                        'mbr',
                                        'downlink',
                                    ])
                                    .setValue(eachValueEndpoint.mbr.downlink);
                            } else {
                                (
                                    this.appForm.get(['endpoint']) as FormArray
                                ).push(
                                    this.fb.group({
                                        'display-name':
                                            eachValueEndpoint['display-name'],
                                        'endpoint-id':
                                            eachValueEndpoint['endpoint-id'],
                                        'port-start':
                                            eachValueEndpoint['port-start'],
                                        'port-end':
                                            eachValueEndpoint['port-end'],
                                        protocol: eachValueEndpoint.protocol,
                                        'traffic-class':
                                            eachValueEndpoint['traffic-class'],
                                        mbr: this.fb.group({
                                            uplink: eachValueEndpoint.mbr
                                                .uplink,
                                            downlink:
                                                eachValueEndpoint.mbr.downlink,
                                        }),
                                    })
                                );
                            }
                        }
                    }
                );
            }
        }
    }

    get endpointControls(): FormArray {
        return this.appForm.get(['endpoint']) as FormArray;
    }

    CheckAndShowEndpoint(): void {
        if (this.endpointControls.value.length < this.endpointLimit) {
            this.shownEndpointDisplay = true;
        } else {
            this.snackBar.open('Maximum Endpoints Added', undefined, {
                duration: 2000,
                politeness: 'polite',
            });
        }
    }

    mbrControls(index: number): FormGroup {
        return this.appForm.get(['endpoint', index, 'mbr']) as FormGroup;
    }

    loadTrafficClass(target: string): void {
        this.enterpriseService
            .getEnterprisesEnterprise({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
            })
            .subscribe(
                (value) => {
                    this.trafficClassOptions = value['traffic-class'];
                    console.log(
                        'Got',
                        value['traffic-class'].length,
                        'Traffic Class'
                    );
                },
                (error) => {
                    console.warn(
                        'Error getting Traffic Class for ',
                        target,
                        error
                    );
                }
            );
    }
}
