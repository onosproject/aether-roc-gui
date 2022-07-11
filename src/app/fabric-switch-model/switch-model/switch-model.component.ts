/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SwitchModel } from '../../../openapi3/sdn-fabric/0.1.0/models';
import {
    SwitchModelService,
    SwitchService,
} from '../../../openapi3/sdn-fabric/0.1.0/services';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { SwitchModelDatasource } from './switch-model-datasource';
import { RocListBase } from '../../roc-list-base';
import { switchModelPath } from '../../models-info';

@Component({
    selector: 'aether-switch-model',
    templateUrl: './switch-model.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SwitchModelComponent
    extends RocListBase<SwitchModelDatasource, SwitchModel>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SwitchModel>;
    displayedColumns = [
        'id',
        'description',
        'fabric',
        'pipeline',
        'ports',
        'edit',
        'Usage/delete',
    ];

    constructor(
        private switchModelService: SwitchModelService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        protected fabricService: FabricService,
        protected switchService: SwitchService
    ) {
        super(
            basketService,
            new SwitchModelDatasource(
                basketService,
                fabricService,
                switchService
            ),
            'fabric-id'
        );
        super.reqdAttr = ['pipeline'];
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            switchModelPath,
            [{ fieldName: 'port', idAttr: 'cage-number' }]
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        this.fabricService.enterprises.forEach((fabricId) => {
            this.dataSource.loadData(
                this.switchModelService.getSwitchModelList({
                    'fabric-id': fabricId.name,
                }),
                this.onDataLoaded.bind(this),
                fabricId
            );
        });
    }
}
