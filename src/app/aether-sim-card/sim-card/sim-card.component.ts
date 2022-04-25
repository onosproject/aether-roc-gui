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
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { BasketService } from '../../basket.service';
import { simCardModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';
import { SiteSimCard } from '../../../openapi3/aether/2.1.0/models';

@Component({
    selector: 'aether-sim-card',
    templateUrl: './sim-card.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SimCardComponent
    extends RocListBase<SimCardDatasource, SiteSimCard>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SiteSimCard>;

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

    modelPath = ['site-2.1.0', 'site', 'sim-card', 'sim-id'];

    constructor(
        public opaService: OpenPolicyAgentService,
        protected enterpriseService: EnterpriseService,
        private siteService: SiteService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new SimCardDatasource(enterpriseService, basketService)
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
        this.enterpriseService.enterprises.forEach((enterpriseId) => {
            this.dataSource.loadData(
                this.siteService.getSiteList({
                    'enterprise-id': enterpriseId.name,
                }),
                this.onDataLoaded.bind(this),
                enterpriseId
            );
        });
    }
}
