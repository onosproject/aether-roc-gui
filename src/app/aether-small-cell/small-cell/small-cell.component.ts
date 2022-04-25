/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RocListBase } from '../../roc-list-base';
import { SmallCellDatasource } from './small-cell-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { smallCellModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteSmallCell } from '../../../openapi3/aether/2.1.0/models';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';

@Component({
    selector: 'aether-small-cell',
    templateUrl: './small-cell.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SmallCellComponent
    extends RocListBase<SmallCellDatasource, SiteSmallCell>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SiteSmallCell>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'address',
        'tac',
        'edit',
        'delete',
    ];

    modelPath = ['site-2.1.0', 'site', 'small-cell', 'small-cell-id'];

    constructor(
        private basketService: BasketService,
        protected enterpriseService: EnterpriseService,
        private siteService: SiteService,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            basketService,
            new SmallCellDatasource(enterpriseService, basketService)
        );
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            smallCellModelPath
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
