/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RocListBase } from '../../roc-list-base';
import { SwitchDatasource } from './switch-datasource';
import { Switch } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SwitchService } from '../../../openapi3/sdn-fabric/0.1.0/services';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { switchPath } from '../../models-info';

@Component({
    selector: 'aether-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SwitchComponent
    extends RocListBase<SwitchDatasource, Switch>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<Switch>;

    displayedColumns = [
        'id',
        'description',
        'fabric',
        'role',
        'model',
        'paired',
        'ports',
        'vlans',
        'edit',
        'delete',
    ];

    constructor(
        private switchService: SwitchService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        protected fabricService: FabricService
    ) {
        super(
            basketService,
            new SwitchDatasource(basketService, fabricService),
            'fabric-id'
        );
        super.reqdAttr = ['model-id', 'role'];
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            switchPath,
            [{ fieldName: 'port', idAttr: 'cage-number' }]
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        this.fabricService.enterprises.forEach((fabricId) => {
            this.dataSource.loadData(
                this.switchService.getSwitchList({
                    'fabric-id': fabricId.name,
                }),
                this.onDataLoaded.bind(this),
                fabricId
            );
        });
    }
}
