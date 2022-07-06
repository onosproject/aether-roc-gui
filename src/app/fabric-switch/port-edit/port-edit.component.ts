/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import {
    SwitchModelPort,
    SwitchPort,
} from '../../../openapi3/sdn-fabric/0.1.0/models';
import { RocEditBase } from '../../roc-edit-base';
import { PortDatasource } from '../port/port.datasource';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService, ORIGINAL } from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { switchPortPath } from '../../models-info';
import {
    SwitchPortService,
    SwitchModelPortService,
    DhcpServerService,
    SwitchService,
} from '../../../openapi3/sdn-fabric/0.1.0/services';

@Component({
    selector: 'aether-port-edit',
    templateUrl: './port-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class PortEditComponent
    extends RocEditBase<PortDatasource>
    implements OnInit
{
    pathListAttr: 'switch/port';
    cageNumber: number;
    channelNumber: number;
    data: SwitchPort;
    switchModel: string;
    switchId: string;
    switchModelPort: Array<SwitchModelPort> = [];

    portForm = this.fb.group({
        'cage-number': [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(255),
            ]),
        ],
        'channel-number': [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.minLength(0),
                Validators.maxLength(15),
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
        speed: [],
        'dhcp-connect-point': this.fb.array([]),
        vlans: this.fb.group({
            untagged: [],
            tagged: this.fb.array([]),
        }),
    });

    constructor(
        private switchPortService: SwitchPortService,
        protected fabricService: FabricService,
        public route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        protected switchModelPortService: SwitchModelPortService,
        protected dhcpServerService: DhcpServerService,
        protected switchService: SwitchService,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            snackBar,
            bs,
            fabricService,
            null,
            route,
            new PortDatasource(bs, fabricService),
            switchPortPath,
            'fabric-id',
            'unknownfabric'
        );
        super.form = this.portForm;
        super.loadFunc = this.loadSwitchPort;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((value) => {
            this.loadIds(value);
            if (value.get('cage-number') === 'newcage') {
                this.portForm.get('channel-number').setValue(0);
                this.isNewInstance = true;
            } else {
                this.loadFunc(value.get('id'));
            }
            this.switchId = this.route.snapshot.params['switch-id'];
            this.fullPath = this.calcFullPath(value);
            console.log('Full path', this.fullPath);
        });
        this.loadSwitchModelPorts();
    }

    loadSwitchPort(id: string): void {
        this.switchPortService
            .getSwitchPort({
                'fabric-id': this.route.snapshot.params['fabric-id'],
                'switch-id': this.route.snapshot.params['switch-id'],
                'cage-number': this.route.snapshot.params['cage-number'],
                'channel-number': this.route.snapshot.params['channel-number'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.cageNumber = value['cage-number'];
                    this.channelNumber = value['channel-number'];
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
                        switchPortPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(model as SwitchPort);
                    }
                    console.log('Finished loading Switch', this.targetId, id);
                }
            );
    }

    private populateFormData(value: SwitchPort): void {
        this.portForm.get('cage-number').setValue(value['cage-number']);
        this.portForm.get('cage-number')[ORIGINAL] = value['cage-number'];

        this.portForm.get('channel-number').setValue(value['channel-number']);
        this.portForm.get('channel-number')[ORIGINAL] = value['channel-number'];

        if (value['display-name']) {
            this.portForm.get('display-name').setValue(value['display-name']);
            this.portForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.portForm.get('description').setValue(value.description);
            this.portForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.speed) {
            this.portForm.get('speed').setValue(value.speed);
            this.portForm.get('speed')[ORIGINAL] = value.speed;
        }
        if (value['dhcp-connect-point']) {
            if (this.portForm.value['dhcp-connect-point'].length === 0) {
                for (const dh of value['dhcp-connect-point']) {
                    let isDeleted = false;
                    Object.keys(localStorage)
                        .filter((checkerKey) =>
                            checkerKey.startsWith(
                                '/basket-delete/fabric-id/' +
                                    this.route.snapshot.params['fabric-id'] +
                                    '/switch[switch-id=' +
                                    value['switch-id '] +
                                    ']/port[cage-number='
                            )
                        )
                        .forEach((checkerKey) => {
                            if (checkerKey.includes(dh)) {
                                isDeleted = true;
                            }
                        });
                    if (!isDeleted) {
                        const dhControl = this.fb.control(dh);

                        (
                            this.portForm.get([
                                'dhcp-connect-point',
                            ]) as FormArray
                        ).push(dhControl);
                    }
                    isDeleted = false;
                }
            } else {
                // TODO complete this
            }
        }
    }

    loadSwitchModelPorts(): void {
        if (this.targetId.name === this.unknownTarget) {
            return;
        }
        this.switchService
            .getSwitch({
                'fabric-id': this.targetId.name,
                'switch-id': this.switchId,
            })
            .subscribe(
                (value) => {
                    // First we need the model of the switch we're working on, and then the ports of that models
                    this.switchModel = value['model-id'];
                },
                (error) =>
                    console.log(
                        'Error loading switch',
                        this.route.snapshot.params['switch-id']
                    ),
                () => {
                    this.switchModelPortService
                        .getSwitchModelPortList({
                            'fabric-id': this.targetId.name,
                            'switch-model-id': this.switchModel,
                        })
                        .subscribe(
                            (value) => {
                                this.switchModelPort = value;
                                console.log(
                                    'Got',
                                    value.length,
                                    'Switch Model Ports'
                                );
                            },
                            (error) => {
                                console.warn(
                                    'Error getting Switch Model Ports for ',
                                    this.targetId,
                                    this.route.snapshot.params['switch-id'],
                                    error
                                );
                            }
                        );
                }
            );
    }

    get maxChannel(): number {
        const found = this.switchModelPort.find(
            (smp) => smp['cage-number'] === this.cageNumber
        );
        if (found === undefined || found['max-channel'] === undefined) {
            return 0;
        }
        return found['max-channel'];
    }

    get speeds(): string[] {
        const found = this.switchModelPort.find(
            (smp) => smp['cage-number'] === this.cageNumber
        );
        if (found === undefined || found.speeds === undefined) {
            return [];
        }
        return found.speeds;
    }
}
