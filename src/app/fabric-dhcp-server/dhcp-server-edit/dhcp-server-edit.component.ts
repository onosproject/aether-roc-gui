/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import { DhcpServerDatasource } from '../dhcp-server/dhcp-server-datasource';
import { FormBuilder, Validators } from '@angular/forms';
import { DhcpServer } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService, ORIGINAL, REQDATTRIBS } from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    DhcpServerService,
    SwitchService,
} from '../../../openapi3/sdn-fabric/0.1.0/services';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { dhcpServerPath } from '../../models-info';

@Component({
    selector: 'aether-dhcp-server-edit',
    templateUrl: './dhcp-server-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class DhcpServerEditComponent
    extends RocEditBase<DhcpServerDatasource>
    implements OnInit
{
    pathListAttr: 'dhcp-server';
    dhcpServerId: string;
    data: DhcpServer;

    dhcpServerForm = this.fb.group({
        'dhcp-server-id': [
            undefined,
            Validators.compose([
                // inet:domain-name
                Validators.pattern(`[a-zA-Z_][a-zA-Z0-9\\-_.]*`),
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
        address: [
            undefined,
            Validators.compose([
                Validators.pattern(
                    '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).){3}' +
                        '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
                ),
            ]),
        ],
    });

    constructor(
        protected fabricService: FabricService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        protected dhcpServerService: DhcpServerService,
        private switchService: SwitchService,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            snackBar,
            bs,
            fabricService,
            null,
            route,
            new DhcpServerDatasource(bs, fabricService, switchService),
            dhcpServerPath,
            'fabric-id',
            'unknownfabric'
        );
        super.form = this.dhcpServerForm;
        super.loadFunc = this.loadDhcpServer;
        this.dhcpServerForm[REQDATTRIBS] = ['address'];
    }

    ngOnInit(): void {
        super.init();
    }

    loadDhcpServer(id: string): void {
        this.dhcpServerService
            .getDhcpServer({
                'dhcp-server-id': id,
                'fabric-id': this.route.snapshot.params['fabric-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.dhcpServerId = value['dhcp-server-id'];
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
                    const [hasUpdates, dhcpServer] = this.datasource.hasUpdates(
                        basketPreview,
                        dhcpServerPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(dhcpServer as DhcpServer);
                    }
                    console.log(
                        'Finished loading DhcpServer',
                        this.targetId,
                        id
                    );
                }
            );
    }

    private populateFormData(value: DhcpServer): void {
        if (value['dhcp-server-id']) {
            this.dhcpServerForm
                .get('dhcp-server-id')
                .setValue(value['dhcp-server-id']);
            this.dhcpServerForm.get('dhcp-server-id')[ORIGINAL] =
                value['dhcp-server-id'];
        }
        if (value['display-name']) {
            this.dhcpServerForm
                .get('display-name')
                .setValue(value['display-name']);
            this.dhcpServerForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value.description) {
            this.dhcpServerForm.get('description').setValue(value.description);
            this.dhcpServerForm.get('description')[ORIGINAL] =
                value.description;
        }
        if (value.address) {
            this.dhcpServerForm.get('address').setValue(value.address);
            this.dhcpServerForm.get('address')[ORIGINAL] = value.address;
        }
    }
}
