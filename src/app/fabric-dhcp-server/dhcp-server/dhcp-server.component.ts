/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RocListBase } from '../../roc-list-base';
import { DhcpServerDatasource } from './dhcp-server-datasource';
import { DhcpServer } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { dhcpServerPath } from '../../models-info';
import {
    DhcpServerService,
    SwitchService,
} from '../../../openapi3/sdn-fabric/0.1.0/services';

@Component({
    selector: 'aether-dhcp-server',
    templateUrl: './dhcp-server.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class DhcpServerComponent
    extends RocListBase<DhcpServerDatasource, DhcpServer>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<DhcpServer>;
    displayedColumns = [
        'id',
        'description',
        'fabric',
        'address',
        'edit',
        'Usage/delete',
    ];

    constructor(
        private dhcpServerService: DhcpServerService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        protected fabricService: FabricService,
        protected switchService: SwitchService
    ) {
        super(
            basketService,
            new DhcpServerDatasource(
                basketService,
                fabricService,
                switchService
            )
        );
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            dhcpServerPath,
            []
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        this.fabricService.enterprises.forEach((fabricId) => {
            this.dataSource.loadData(
                this.dhcpServerService.getDhcpServerList({
                    'fabric-id': fabricId.name,
                }),
                this.onDataLoaded.bind(this),
                fabricId
            );
        });
    }
}
