/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import { SwitchModelDatasource } from '../switch-model/switch-model-datasource';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BasketService,
    IDATTRIBS,
    ORIGINAL,
    REQDATTRIBS,
} from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    SwitchService,
    SwitchModelService,
} from '../../../openapi3/sdn-fabric/0.1.0/services';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { switchModelPath } from '../../models-info';
import {
    SwitchModel,
    SwitchModelPort,
} from '../../../openapi3/sdn-fabric/0.1.0/models';

@Component({
    selector: 'aether-switch-model-edit',
    templateUrl: './switch-model-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class SwitchModelEditComponent
    extends RocEditBase<SwitchModelDatasource>
    implements OnInit
{
    pipelineOptions = ['dual', 'quad', 'unknown'];
    pathListAttr: 'switch-model';
    switchModelId: string;
    data: SwitchModel;
    displaySelectPort = false;

    switchModelForm = this.fb.group({
        'switch-model-id': [
            undefined,
            Validators.compose([
                Validators.pattern(`[a-zA-Z_][a-zA-Z0-9\\-_.]*`),
                Validators.minLength(1),
                Validators.maxLength(100),
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
        pipeline: [this.pipelineOptions[1], Validators.required],
        port: this.fb.array([]),
    });

    constructor(
        protected fabricService: FabricService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        private switchService: SwitchService,
        protected switchModelService: SwitchModelService,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            snackBar,
            bs,
            fabricService,
            null,
            route,
            fb,
            new SwitchModelDatasource(bs, fabricService, switchService),
            switchModelPath,
            'fabric-id',
            'unknownfabric'
        );
        super.form = this.switchModelForm;
        super.loadFunc = this.loadSwitchModel;
        this.switchModelForm[REQDATTRIBS] = ['pipeline'];
        this.switchModelForm.get(['attribute'])[IDATTRIBS] = ['attribute-key'];
        this.switchModelForm.get(['port'])[IDATTRIBS] = ['cage-number'];
    }

    ngOnInit(): void {
        super.init();
        if (this.isNewInstance) {
            this.switchModelForm.get('pipeline').markAsTouched();
            this.switchModelForm.get('pipeline').markAsDirty();
        }
    }

    deletePortFromSelect(cageNumber: number): void {
        this.bs.deleteIndexedEntry(
            `/${this.fullPath}/port[cage-number=${cageNumber}]`,
            'cage-number',
            String(cageNumber),
            this.ucmap(),
            'number'
        );
        const index = (
            this.switchModelForm.get('port') as FormArray
        ).controls.findIndex(
            (c) => c.value[Object.keys(c.value)[0]] === cageNumber
        );
        (this.switchModelForm.get('port') as FormArray).removeAt(index);
        this.snackBar.open(
            'Deletion of Port: ' + cageNumber + ' added to basket',
            undefined,
            { duration: 2000 }
        );
    }

    get attributeControls(): FormArray {
        return this.switchModelForm.get(['attribute']) as FormArray;
    }

    get portControls(): FormArray {
        return this.switchModelForm.get(['port']) as FormArray;
    }

    loadSwitchModel(id: string): void {
        this.switchModelService
            .getSwitchModel({
                'switch-model-id': id,
                'fabric-id': this.route.snapshot.params['fabric-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.switchModelId = value['switch-model-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting SwitchModels(s) for ',
                        this.targetId,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        switchModelPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(model as SwitchModel);
                    }
                    console.log(
                        'Finished loading SwitchModel',
                        this.targetId,
                        id
                    );
                }
            );
    }

    private populateFormData(value: SwitchModel): void {
        if (value['switch-model-id']) {
            this.switchModelForm
                .get('switch-model-id')
                .setValue(value['switch-model-id']);
            this.switchModelForm.get('switch-model-id')[ORIGINAL] =
                value['switch-model-id'];
        }
        if (value['display-name']) {
            this.switchModelForm
                .get('display-name')
                .setValue(value['display-name']);
            this.switchModelForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value.description) {
            this.switchModelForm.get('description').setValue(value.description);
            this.switchModelForm.get('description')[ORIGINAL] =
                value.description;
        }
        if (value.pipeline) {
            this.switchModelForm.get('pipeline').setValue(value.pipeline);
            this.switchModelForm.get('pipeline')[ORIGINAL] = value.pipeline;
        }
        if (value.attribute) {
            if (this.switchModelForm.value.attribute.length === 0) {
                for (const attr of value.attribute) {
                    let isDeleted = false;
                    Object.keys(localStorage)
                        .filter((checkerKey) =>
                            checkerKey.startsWith(
                                '/basket-delete/fabric-id/' +
                                    this.route.snapshot.params['fabric-id'] +
                                    '/switch-model[switch-model-id=' +
                                    value['switch-model-id '] +
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
                        (
                            this.switchModelForm.get(['attribute']) as FormArray
                        ).push(attrGroupControl);
                    }
                    isDeleted = false;
                }
            } else {
                const existingAttribute = this.switchModelForm.value.attribute;
                value.attribute.forEach(
                    (eachValueAttribute, eachValueAttributePosition) => {
                        for (const eachFormAttribute of existingAttribute) {
                            if (
                                eachValueAttribute['attribute-key'] ===
                                eachFormAttribute['attribute-key']
                            ) {
                                this.switchModelForm
                                    .get([
                                        'attribute',
                                        eachValueAttributePosition,
                                        'value',
                                    ])
                                    .setValue(eachValueAttribute.value);
                            } else {
                                (
                                    this.switchModelForm.get([
                                        'attribute',
                                    ]) as FormArray
                                ).push(
                                    this.fb.group({
                                        'attribute-key':
                                            eachValueAttribute['attribute-key'],
                                        value: eachValueAttribute.value,
                                    })
                                );
                            }
                        }
                    }
                );
            }
        }
        if (value.port) {
            if (this.switchModelForm.value.port.length === 0) {
                for (const p of value.port) {
                    let isDeleted = false;
                    Object.keys(localStorage)
                        .filter((checkerKey) =>
                            checkerKey.startsWith(
                                '/basket-delete/fabric-id/' +
                                    this.route.snapshot.params['fabric-id'] +
                                    '/switch-model[switch-model-id=' +
                                    value['switch-model-id '] +
                                    ']/port[cage-number='
                            )
                        )
                        .forEach((checkerKey) => {
                            if (checkerKey.includes(String(p['cage-number']))) {
                                isDeleted = true;
                            }
                        });
                    if (!isDeleted) {
                        const cageNumberControl = this.fb.control(
                            p['cage-number']
                        );
                        cageNumberControl[ORIGINAL] = p['cage-number'];
                        const displayNameControl = this.fb.control(
                            p['display-name']
                        );
                        displayNameControl[ORIGINAL] = p['display-name'];
                        const descControl = this.fb.control(p.description);
                        descControl[ORIGINAL] = p.description;
                        const maxChannelControl = this.fb.control(
                            p['max-channel']
                        );
                        maxChannelControl[ORIGINAL] = p['max-channel'];

                        const speedsArrayControl = this.fb.array([]);
                        if (p.speeds) {
                            p.speeds.forEach((sp) => {
                                const speedControl = this.fb.control(sp);
                                speedControl[ORIGINAL] = sp;
                                speedsArrayControl.push(speedControl);
                            });
                        }

                        const portGroupControl = this.fb.group({
                            ['cage-number']: cageNumberControl,
                            ['display-name']: displayNameControl,
                            ['description']: descControl,
                            ['max-channel']: maxChannelControl,
                            ['speeds']: speedsArrayControl,
                        });
                        (this.switchModelForm.get(['port']) as FormArray).push(
                            portGroupControl
                        );
                    }
                    isDeleted = false;
                }
            } else {
                const existingPort = this.switchModelForm.value.port;
                value.port.forEach((eachValuePort, eachFormPortPosition) => {
                    for (const eachFormPort of existingPort) {
                        if (
                            eachValuePort['cage-number'] ===
                            eachFormPort['cage-number']
                        ) {
                            this.switchModelForm
                                .get([
                                    'port',
                                    eachFormPortPosition,
                                    'cage-number',
                                ])
                                .setValue(eachValuePort['cage-number']);
                            this.switchModelForm
                                .get([
                                    'port',
                                    eachFormPortPosition,
                                    'display-name',
                                ])
                                .setValue(eachValuePort['display-name']);
                            this.switchModelForm
                                .get([
                                    'port',
                                    eachFormPortPosition,
                                    'description',
                                ])
                                .setValue(eachValuePort['description']);
                            this.switchModelForm
                                .get([
                                    'port',
                                    eachFormPortPosition,
                                    'max-channel',
                                ])
                                .setValue(eachValuePort['max-channel']);
                        } else {
                            (
                                this.switchModelForm.get(['port']) as FormArray
                            ).push(
                                this.fb.group({
                                    'cage-number': eachValuePort['cage-number'],
                                    'display-name':
                                        eachValuePort['display-name'],
                                    description: eachValuePort.description,
                                    'max-channel': eachValuePort['max-channel'],
                                })
                            );
                        }
                    }
                });
            }
        }
    }

    portAdded(port: SwitchModelPort): void {
        this.displaySelectPort = false;

        if (port === undefined) {
            return;
        }

        const portCageNumControl = this.fb.control(port['cage-number']);
        portCageNumControl.markAsTouched();
        portCageNumControl.markAsDirty();

        const portDisplayControl = this.fb.control(port['display-name']);
        portDisplayControl.markAsTouched();
        portDisplayControl.markAsDirty();

        const portDescControl = this.fb.control(port.description);
        portDescControl.markAsTouched();
        portDescControl.markAsDirty();

        const portMaxChannelControl = this.fb.control(port['max-channel']);
        portMaxChannelControl.markAsTouched();
        portMaxChannelControl.markAsDirty();

        const portGroupControl = this.fb.group({
            'cage-number': portCageNumControl,
            'display-name': portDisplayControl,
            description: portDescControl,
            'max-channel': portMaxChannelControl,
        });

        (this.switchModelForm.get(['port']) as FormArray).push(
            portGroupControl
        );
        this.switchModelForm.markAllAsTouched();
    }

    get portsAlreadyUsed(): number[] {
        const portNumbers: number[] = [];
        (this.switchModelForm.get('port') as FormArray).controls.forEach(
            (ctl) => {
                portNumbers.push(ctl.value['cage-number']);
            }
        );
        return portNumbers;
    }

    get attrKeyAlreadyUsed(): string[] {
        const keys: string[] = [];
        (this.switchModelForm.get('attribute') as FormArray).controls.forEach(
            (ctl) => {
                keys.push(ctl.value['attribute-key']);
            }
        );
        return keys;
    }
}
