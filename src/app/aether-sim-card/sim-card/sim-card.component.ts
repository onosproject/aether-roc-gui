/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RocListBase } from '../../roc-list-base';
import { SimCardDatasource } from './sim-card-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EnterprisesEnterpriseSiteSimCard } from '../../../openapi3/aether/2.0.0/models';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { AETHER_TARGET } from '../../../environments/environment';
import { simCardModelPath } from '../../models-info';

@Component({
    selector: 'aether-sim-card',
    templateUrl: './sim-card.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SimCardComponent
    extends RocListBase<SimCardDatasource, EnterprisesEnterpriseSiteSimCard>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseSiteSimCard>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'iccid',
        'imsi',
        'edit',
        'usage/delete',
    ];

    modelPath = [
        'enterprises-2.0.0',
        'enterprise',
        'site',
        'sim-card',
        'sim-id',
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new SimCardDatasource(aetherService, basketService, AETHER_TARGET)
        );
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            simCardModelPath
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getEnterprises({
                target: AETHER_TARGET,
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
