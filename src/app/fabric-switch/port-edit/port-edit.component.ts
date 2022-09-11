/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    DhcpServer,
    SwitchModelPort,
    SwitchPort,
    SwitchVlan,
} from '../../../openapi3/sdn-fabric/0.1.0/models';
import { RocEditBase } from '../../roc-edit-base';
import { PortDatasource } from '../port/port.datasource';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BasketService,
    GRANDPARENT_REQDATTRIBS,
    IDATTRIBS,
    ORIGINAL,
    REQDATTRIBS,
} from '../../basket.service';
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
    dhcpServersAvailable: Array<DhcpServer> = [];
    switchVlansAvailable: SwitchVlan[] = [];
    switchPortsExisting: SwitchPort[] = [];
    displaySelectVlan = false;
    displaySelectDhcp = false;

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
        speed: [undefined, Validators.required],
        'dhcp-connect-point': this.fb.array([]),
        vlans: this.fb.group({
            untagged: [undefined, Validators.compose([Validators.max(4096)])],
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
            fb,
            new PortDatasource(bs, fabricService),
            switchPortPath,
            'fabric-id',
            'unknownfabric'
        );
        super.form = this.portForm;
        super.loadFunc = this.loadSwitchPort;
        this.form[REQDATTRIBS] = ['speed'];
        this.form[GRANDPARENT_REQDATTRIBS] = ['model-id', 'role'];
        this.form.get(['dhcp-connect-point'])[IDATTRIBS] = [];
        this.form.get(['vlans', 'tagged'])[IDATTRIBS] = [];
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((value) => {
            this.loadIds(value);
            if (value.get('cage-number') === 'newcage') {
                this.portForm.get('channel-number').setValue(0);
                this.portForm.get('channel-number').markAsTouched();
                this.portForm.get('channel-number').markAsDirty();
                this.isNewInstance = true;
            } else {
                this.loadFunc(value.get('id'));
            }
            this.switchId = this.route.snapshot.params['switch-id'];
            this.fullPath = this.calcFullPath(value);
            console.log('Full path', this.fullPath);
        });
        this.loadSwitchModelPorts();
        this.loadDhcpServers();
    }

    onSubmitDoubleKey(): void {
        console.log('Submitted!', this.form.getRawValue());
        console.log(this.fullPath, this.targetId);
        if (this.fullPath.includes('newcage')) {
            this.fullPath = this.fullPath.replace(
                'newcage',
                this.form.get(['cage-number']).value
            );
        }
        if (this.fullPath.includes('newchannel')) {
            this.fullPath = this.fullPath.replace(
                'newchannel',
                this.form.get(['channel-number']).value
            );
        }
        console.log('Updated', this.fullPath);
        this.bs.logKeyValuePairs(this.form, this.fullPath);
        this.snackBar.open('Added to basket', undefined, {
            duration: 2000,
            politeness: 'polite',
        });
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
                        dhControl[ORIGINAL] = dh;
                        (
                            this.portForm.get([
                                'dhcp-connect-point',
                            ]) as FormArray
                        ).push(dhControl);
                    }
                    isDeleted = false;
                }
            } else {
                console.log('dhcp-connect-point', value['dhcp-connect-point']);
                // TODO complete this
            }
        }
        if (value.vlans) {
            if (value.vlans.untagged) {
                this.portForm
                    .get(['vlans', 'untagged'])
                    .setValue(value.vlans.untagged);
                this.portForm.get(['vlans', 'untagged'])[ORIGINAL] =
                    value.vlans.untagged;
            }
            if (value.vlans.tagged) {
                if (this.portForm.value.vlans.tagged.length === 0) {
                    for (const t of value.vlans.tagged) {
                        console.log('Tagged', t);
                        let isDeleted = false;
                        Object.keys(localStorage)
                            .filter((checkerKey) =>
                                checkerKey.startsWith(
                                    '/basket-delete/fabric-id/' +
                                        this.route.snapshot.params[
                                            'fabric-id'
                                        ] +
                                        '/switch[switch-id=' +
                                        value['switch-id '] +
                                        ']/port[cage-number='
                                )
                            )
                            .forEach((checkerKey) => {
                                if (checkerKey.includes(String(t))) {
                                    isDeleted = true;
                                }
                            });
                        if (!isDeleted) {
                            const taggedControl = this.fb.control(t);
                            taggedControl[ORIGINAL] = t;
                            (
                                this.portForm.get([
                                    'vlans',
                                    'tagged',
                                ]) as FormArray
                            ).push(taggedControl);
                        }
                        isDeleted = false;
                    }
                }
            }
        }
    }

    deleteVlanTagged(vlanId: number): void {
        this.bs.deleteIndexedEntry(
            `/${this.fullPath}/vlans/tagged[vlan-id=${vlanId}]`,
            'vlan-id',
            String(vlanId),
            this.ucmap(),
            'number'
        );
        const index = (
            this.portForm.get(['vlans', 'tagged']) as FormArray
        ).controls.findIndex(
            (c) => c.value[Object.keys(c.value)[0]] === vlanId
        );
        (this.portForm.get(['vlans', 'tagged']) as FormArray).removeAt(index);
        this.snackBar.open(
            'Deletion of Tagged: ' + vlanId + ' added to basket',
            undefined,
            { duration: 2000 }
        );
    }

    deleteDhcpConnectPoint(dhcpId: string): void {
        this.bs.deleteIndexedEntry(
            `/${this.fullPath}/dhcp-connect-point[vlan-id=${dhcpId}]`,
            'vlan-id',
            String(dhcpId),
            this.ucmap()
        );
        const index = (
            this.portForm.get(['dhcp-connect-point']) as FormArray
        ).controls.findIndex(
            (c) => c.value[Object.keys(c.value)[0]] === dhcpId
        );
        (this.portForm.get(['dhcp-connect-point']) as FormArray).removeAt(
            index
        );
        this.snackBar.open(
            'Deletion of Dhcp-Connect-Point: ' + dhcpId + ' added to basket',
            undefined,
            { duration: 2000 }
        );
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
                    this.switchVlansAvailable = value.vlan;
                    this.switchPortsExisting = value.port;
                },
                (error) =>
                    console.log(
                        'Error loading switch',
                        this.route.snapshot.params['switch-id'],
                        error
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

    loadDhcpServers(): void {
        if (this.targetId.name === this.unknownTarget) {
            return;
        }
        this.dhcpServerService
            .getDhcpServerList({
                'fabric-id': this.targetId.name,
            })
            .subscribe(
                (value) => {
                    this.dhcpServersAvailable = value;
                },
                (error) =>
                    console.log(
                        'Error loading dhcp-servers for Fabric',
                        this.route.snapshot.params['fabric-id'],
                        error
                    )
            );
    }

    get availableChannels(): number[] {
        const availableChannels: number[] = [];
        const found = this.switchModelPort.find(
            (smp) => smp['cage-number'] === this.cageNumber
        );
        if (found === undefined || found['max-channel'] === undefined) {
            return [0];
        }
        const alreadyUsedChannels: number[] = [];
        if (this.switchPortsExisting !== null) {
            this.switchPortsExisting
                .filter((spe) => spe['cage-number'] === found['cage-number'])
                .forEach((spem) =>
                    alreadyUsedChannels.push(spem['channel-number'])
                );
        }
        for (let i = 0; i <= found['max-channel']; i++) {
            if (!alreadyUsedChannels.includes(i)) {
                availableChannels.push(i);
            }
        }
        return availableChannels;
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

    get dhcpServersControls(): FormArray {
        return this.portForm.get(['dhcp-connect-point']) as FormArray;
    }

    get vlanControls(): FormGroup {
        return this.portForm.get(['vlans']) as FormGroup;
    }

    get vlanTaggedControls(): FormArray {
        return this.portForm.get(['vlans', 'tagged']) as FormArray;
    }

    get vlansAvailableNotUsed(): SwitchVlan[] {
        const vlans = this.switchVlansAvailable.filter(
            (vl) =>
                vl['vlan-id'] !== this.portForm.get(['vlans', 'untagged']).value
        );
        // Also remove any tagged vlans already chosen in form
        return vlans.filter(
            (vl) =>
                !this.vlanTaggedControls.controls.some(
                    (taggedCtl) => taggedCtl.value === vl['vlan-id']
                )
        );
    }

    get dhcpAvailableNotUsed(): DhcpServer[] {
        const dhcps = this.dhcpServersAvailable.filter(
            (dh) =>
                !this.dhcpServersControls.controls.some(
                    (dcp) => dcp.value === dh['dhcp-server-id']
                )
        );
        return dhcps;
    }

    get switchPortsNotInUse(): SwitchModelPort[] {
        if (!this.switchPortsExisting) {
            return this.switchModelPort;
        }
        const portList = this.switchModelPort.filter((smp) => {
            const matchingExisting = this.switchPortsExisting.filter(
                (spe) => spe['cage-number'] === smp['cage-number']
            );
            // Include model port if not all of its channel numbers are used up
            return (
                (matchingExisting.length < 1 &&
                    smp['max-channel'] === undefined) ||
                matchingExisting.length < smp['max-channel'] + 1
            );
        });
        return portList.sort((a, b) => {
            if (a['cage-number'] < b['cage-number']) {
                return -1;
            } else if (a['cage-number'] > b['cage-number']) {
                return 1;
            }
            return 0;
        });
    }

    addVlanControl(vlan: SwitchVlan): void {
        if (vlan !== undefined) {
            this.vlanTaggedControls.push(this.fb.control(vlan['vlan-id']));
            this.vlanTaggedControls.markAsTouched();
            this.vlanTaggedControls.markAsDirty();
        }
        this.displaySelectVlan = false;
    }

    addDhcpConnectPoint(dhcpServer: DhcpServer): void {
        if (dhcpServer !== undefined) {
            this.dhcpServersControls.push(
                this.fb.control(dhcpServer['dhcp-server-id'])
            );
            this.dhcpServersControls.markAsTouched();
            this.dhcpServersControls.markAsDirty();
        }
        this.displaySelectDhcp = false;
    }
}
