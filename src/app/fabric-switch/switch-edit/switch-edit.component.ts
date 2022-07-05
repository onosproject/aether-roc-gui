/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import { SwitchDatasource } from '../switch/switch-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    BasketService,
    IDATTRIBS,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { switchPath } from '../../models-info';
import {
    SwitchModelService,
    SwitchService,
} from '../../../openapi3/sdn-fabric/0.1.0/services';
import { Switch, SwitchModel } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';

@Component({
    selector: 'aether-switch-edit',
    templateUrl: './switch-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class SwitchEditComponent
    extends RocEditBase<SwitchDatasource>
    implements OnInit
{
    roleOptions = ['undefined', 'leaf', 'spine'];
    pathListAttr: 'switch';
    switchId: string;
    data: Switch;
    showPairingPortDisplay = false;
    showVlanAddButton = false;
    switchModels: Array<SwitchModel>;

    switchForm = this.fb.group({
        'switch-id': [
            undefined,
            Validators.compose([
                // inet:domain-name
                Validators.pattern(
                    `((([a-zA-Z0-9_]([a-zA-Z0-9\-_]){0,61})?[a-zA-Z0-9]\.)*([a-zA-Z0-9_]([a-zA-Z0-9\-_]){0,61})?[a-zA-Z0-9]\.?)|\.`
                ),
                Validators.minLength(1),
                Validators.maxLength(253),
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
        attribute: this.fb.array([]),
        'model-id': [],
        role: [this.roleOptions[1], Validators.required],
        management: this.fb.group({
            address: [undefined],
            'port-number': [
                undefined,
                Validators.compose([Validators.min(1), Validators.max(65535)]),
            ],
        }),
        port: this.fb.array([]),
        'switch-pair': this.fb.group({
            'paired-switch': [],
            'pairing-port': this.fb.array([]),
        }),
        vlan: this.fb.array([]),
    });

    constructor(
        private switchService: SwitchService,
        protected fabricService: FabricService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        protected switchModelService: SwitchModelService,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            snackBar,
            bs,
            fabricService,
            null,
            route,
            new SwitchDatasource(bs, fabricService),
            switchPath,
            'fabric-id',
            'unknownfabric'
        );
        super.form = this.switchForm;
        super.loadFunc = this.loadSwitchSwitch;
        this.switchForm[REQDATTRIBS] = ['role', 'model-id'];
        this.switchForm.get(['attribute'])[IDATTRIBS] = ['attribute-key'];
        this.switchForm.get(['port'])[IDATTRIBS] = [
            'cage-number',
            'channel-number',
        ];
        this.switchForm.get(['vlan'])[IDATTRIBS] = ['vlan-id'];
        this.switchForm.get(['switch-pair', 'pairing-port'])[IDATTRIBS] = [
            'cage-number',
            'channel-number',
        ];
        this.switchForm.get(['management', 'port-number'])[TYPE] = 'number';
    }

    ngOnInit(): void {
        super.init();
        this.loadSwitchModel();
    }

    deleteVlanFromSelect(vlanId: number): void {
        this.bs.deleteIndexedEntry(
            `/${this.fullPath}/vlan[vlan-id=${vlanId}]`,
            'vlan-id',
            String(vlanId),
            this.ucmap(),
            'number'
        );
        const index = (
            this.switchForm.get('vlan') as FormArray
        ).controls.findIndex(
            (c) => c.value[Object.keys(c.value)[0]] === vlanId
        );
        (this.switchForm.get('vlan') as FormArray).removeAt(index);
        this.snackBar.open(
            'Deletion of Vlan: ' + vlanId + ' added to basket',
            undefined,
            { duration: 2000 }
        );
    }

    deletePairingPortFromSelect(
        cageNumber: number,
        channelNumber: number
    ): void {
        this.bs.deleteIndexedEntry(
            `/${this.fullPath}/switch-pair/pairing-port[cage-number=${cageNumber}][channel-number=${channelNumber}]`,
            'cage-number',
            String(cageNumber),
            this.ucmap()
        );
        const index = (
            this.switchForm.get(['switch-pair', 'pairing-port']) as FormArray
        ).controls.findIndex(
            (c) => c.value[Object.keys(c.value)[0]] === cageNumber
        );
        (
            this.switchForm.get(['switch-pair', 'pairing-port']) as FormArray
        ).removeAt(index);
        this.snackBar.open(
            `Deletion of Pairing Port: ${cageNumber}/${channelNumber} added to basket`,
            undefined,
            { duration: 2000 }
        );
    }

    loadSwitchSwitch(id: string): void {
        this.switchService
            .getSwitch({
                'switch-id': id,
                'fabric-id': this.route.snapshot.params['fabric-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.switchId = value['switch-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting Switch(s) for ',
                        this.targetId,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        switchPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(model as Switch);
                    }
                    console.log('Finished loading Switch', this.targetId, id);
                }
            );
    }

    private populateFormData(value: Switch): void {
        if (value['switch-id']) {
            this.switchForm.get('switch-id').setValue(value['switch-id']);
            this.switchForm.get('switch-id')[ORIGINAL] = value['switch-id'];
        }
        if (value['display-name']) {
            this.switchForm.get('display-name').setValue(value['display-name']);
            this.switchForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value.description) {
            this.switchForm.get('description').setValue(value.description);
            this.switchForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.attribute) {
            if (this.switchForm.value.attribute.length === 0) {
                for (const attr of value.attribute) {
                    let isDeleted = false;
                    Object.keys(localStorage)
                        .filter((checkerKey) =>
                            checkerKey.startsWith(
                                '/basket-delete/fabric-id/' +
                                    this.route.snapshot.params['fabric-id'] +
                                    '/switch[switch-id=' +
                                    value['switch-id '] +
                                    ']/attribute[attribute-key='
                            )
                        )
                        .forEach((checkerKey) => {
                            if (checkerKey.includes(attr['attribute-key'])) {
                                isDeleted = true;
                            }
                        });
                    if (!isDeleted) {
                        const attrKeyControl = this.fb.control(
                            attr['attribute-key']
                        );
                        attrKeyControl[ORIGINAL] = attr['attribute-key'];
                        const attrValueControl = this.fb.control(attr.value);
                        attrValueControl[ORIGINAL] = attr.value;

                        const attrGroupControl = this.fb.group({
                            ['attribute-key']: attrKeyControl,
                            ['value']: attrValueControl,
                        });
                        attrGroupControl[REQDATTRIBS] = ['value'];
                        (this.switchForm.get(['attribute']) as FormArray).push(
                            attrGroupControl
                        );
                    }
                    isDeleted = false;
                }
            } else {
                const existingAttribute = this.switchForm.value.attribute;
                value.attribute.forEach(
                    (eachValueAttribute, eachFormAttributePosition) => {
                        for (const eachFormAttribute of existingAttribute) {
                            if (
                                eachValueAttribute['attribute-key'] ===
                                eachFormAttribute['attribute-key']
                            ) {
                                this.switchForm
                                    .get([
                                        'attribute',
                                        eachFormAttributePosition,
                                        'value',
                                    ])
                                    .setValue(eachValueAttribute.value);
                            } else {
                                (
                                    this.switchForm.get([
                                        'attribute',
                                    ]) as FormArray
                                ).push(
                                    this.fb.group({
                                        value: eachValueAttribute.value,
                                    })
                                );
                            }
                        }
                    }
                );
            }
        }
        if (value['model-id']) {
            this.switchForm.get('model-id').setValue(value['model-id']);
            this.switchForm.get('model-id')[ORIGINAL] = value['model-id'];
        }
        if (value.role) {
            this.switchForm.get('role').setValue(value.role);
            this.switchForm.get('role')[ORIGINAL] = value.role;
        }
        if (value.management) {
            if (value.management.address) {
                this.switchForm
                    .get(['management', 'address'])
                    .setValue(value.management.address);
                this.switchForm.get(['management', 'address'])[ORIGINAL] =
                    value.management.address;
            }
            if (value.management['port-number']) {
                this.switchForm
                    .get(['management', 'port-number'])
                    .setValue(value.management['port-number']);
                this.switchForm.get(['management', 'port-number'])[ORIGINAL] =
                    value.management['port-number'];
            }
        }
        if (value['switch-pair']) {
            if (value['switch-pair']['paired-switch']) {
                this.switchForm
                    .get(['switch-pair', 'paired-switch'])
                    .setValue(value['switch-pair']['paired-switch']);
                this.switchForm.get(['switch-pair', 'paired-switch'])[
                    ORIGINAL
                ] = value['switch-pair']['paired-switch'];
            }
            if (
                value['switch-pair']['pairing-port'] &&
                this.switchForm.value['switch-pair']['pairing-port'].length ===
                    0
            ) {
                for (const pp of value['switch-pair']['pairing-port']) {
                    let isDeleted = false;
                    Object.keys(localStorage)
                        .filter((checkerKey) =>
                            checkerKey.startsWith(
                                '/basket-delete/fabric-id/' +
                                    this.route.snapshot.params['fabric-id'] +
                                    '/switch[switch-id=' +
                                    value['switch-id '] +
                                    ']/switch-pair/pairing-port[cage-number='
                            )
                        )
                        .forEach((checkerKey) => {
                            if (
                                checkerKey.includes(
                                    String(pp['channel-number'])
                                )
                            ) {
                                isDeleted = true;
                            }
                        });
                    if (!isDeleted) {
                        const pairingPortCageControl = this.fb.control(
                            pp['cage-number']
                        );
                        pairingPortCageControl[ORIGINAL] = pp['cage-number'];
                        const pairingPortChannelControl = this.fb.control(
                            pp['channel-number']
                        );
                        pairingPortChannelControl[ORIGINAL] =
                            pp['channel-number'];

                        const pairingPortGroupControl = this.fb.group({
                            ['cage-number']: pairingPortCageControl,
                            ['channel-number']: pairingPortChannelControl,
                        });
                        (
                            this.switchForm.get([
                                'switch-pair',
                                'pairing-port',
                            ]) as FormArray
                        ).push(pairingPortGroupControl);
                    }
                    isDeleted = false;
                }
            } else if (
                value['switch-pair']['pairing-port'] &&
                this.switchForm.value['switch-pair']['pairing-port'].length !==
                    0
            ) {
                this.switchForm.value['switch-pair']['pairing-port'].forEach(
                    (eachFormPp, eachFormPpPosition) => {
                        for (const eachValuePp of value['switch-pair'][
                            'pairing-port'
                        ]) {
                            if (
                                eachFormPp['cage-number'] ===
                                    eachValuePp['cage-number'] &&
                                eachFormPp['channel-number'] ===
                                    eachValuePp['channel-number']
                            ) {
                                this.switchForm
                                    .get([
                                        'switch-pair',
                                        'pairing-port',
                                        eachFormPpPosition,
                                        'cage-number',
                                    ])
                                    .setValue(eachFormPp.value['cage-number']);
                                this.switchForm
                                    .get([
                                        'switch-pair',
                                        'pairing-port',
                                        eachFormPpPosition,
                                        'channel-number',
                                    ])
                                    .setValue(
                                        eachFormPp.value['channel-number']
                                    );
                            } else {
                                const newPp = this.fb.group({
                                    'cage-number': eachValuePp['cage-number'],
                                    'channel-number':
                                        eachValuePp['channel-number'],
                                });
                                newPp.get('cage-number')[ORIGINAL] =
                                    eachValuePp['cage-number'];
                                newPp.get('channel-number')[ORIGINAL] =
                                    eachValuePp['channel-number'];
                                (
                                    this.switchForm.get([
                                        'switch-pair',
                                        'pairing-port',
                                    ]) as FormArray
                                ).push(newPp);
                            }
                        }
                    }
                );
            }
        }

        if (value.vlan) {
            this.showVlanAddButton = false;
            if (this.switchForm.value.vlan.length === 0) {
                for (const vl of value.vlan) {
                    let isDeleted = false;
                    Object.keys(localStorage)
                        .filter((checkerKey) =>
                            checkerKey.startsWith(
                                '/basket-delete/fabric-id/' +
                                    this.route.snapshot.params['fabric-id'] +
                                    '/switch[switch-id=' +
                                    value['switch-id '] +
                                    ']/vlan[vlan-id='
                            )
                        )
                        .forEach((checkerKey) => {
                            if (checkerKey.includes(String(vl['vlan-id']))) {
                                isDeleted = true;
                            }
                        });
                    if (!isDeleted) {
                        const vlanIdControl = this.fb.control(vl['vlan-id']);
                        vlanIdControl[ORIGINAL] = vl['vlan-id'];
                        vlanIdControl[TYPE] = 'number';
                        const nameControl = this.fb.control(vl['display-name']);
                        nameControl[ORIGINAL] = vl['display-name'];
                        const descControl = this.fb.control(vl.description);
                        descControl[ORIGINAL] = vl.description;

                        const subnetArrayControl = this.fb.array([]);
                        vl.subnet.forEach((sn) => {
                            const subnetControl = this.fb.control(sn);
                            subnetControl[ORIGINAL] = sn;
                            subnetArrayControl.push(subnetControl);
                        });

                        const vlanGroupControl = this.fb.group({
                            ['vlan-id']: vlanIdControl,
                            ['display-name']: nameControl,
                            ['description']: descControl,
                            ['subnet']: subnetArrayControl,
                        });
                        vlanGroupControl[IDATTRIBS] = ['vlan-id'];
                        (this.switchForm.get(['vlan']) as FormArray).push(
                            vlanGroupControl
                        );
                    }
                    isDeleted = false;
                }
            } else {
                const existingVlan = this.switchForm.value.vlan;
                value.vlan.forEach((eachVlanValue, eachFormVlanPosition) => {
                    for (const eachFormVlan of existingVlan) {
                        if (
                            eachVlanValue['vlan-id'] === eachFormVlan['vlan-id']
                        ) {
                            this.switchForm
                                .get(['vlan', eachFormVlanPosition, 'vlan-id'])
                                .setValue(eachVlanValue['vlan-id']);
                        } else {
                            (this.switchForm.get(['vlan']) as FormArray).push(
                                this.fb.group({
                                    value: eachVlanValue['vlan-id'],
                                })
                            );
                        }
                    }
                });
            }
        }
    }

    get attributeControls(): FormArray {
        return this.switchForm.get(['attribute']) as FormArray;
    }

    get portControls(): FormArray {
        return this.switchForm.get(['port']) as FormArray;
    }

    get vlanControls(): FormArray {
        return this.switchForm.get(['vlan']) as FormArray;
    }

    get mgmtControls(): FormGroup {
        return this.switchForm.get(['management']) as FormGroup;
    }

    get pairControls(): FormGroup {
        return this.switchForm.get(['switch-pair']) as FormGroup;
    }

    get pairingPortControls(): FormArray {
        return this.switchForm.get([
            'switch-pair',
            'pairing-port',
        ]) as FormArray;
    }

    loadSwitchModel(): void {
        if (this.targetId.name === this.unknownTarget) {
            return;
        }
        this.switchModelService
            .getSwitchModelList({
                'fabric-id': this.targetId.name,
            })
            .subscribe(
                (value) => {
                    this.switchModels = value;
                    console.log('Got', value.length, 'Switch Model');
                },
                (error) => {
                    console.warn(
                        'Error getting Switch Model for ',
                        this.targetId,
                        error
                    );
                }
            );
    }
}
