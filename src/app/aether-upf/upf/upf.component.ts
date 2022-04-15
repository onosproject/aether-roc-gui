/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OpenPolicyAgentService } from 'src/app/open-policy-agent.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BasketService } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { UpfDatasource } from './upf-datasource';
import { upfModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteUpf } from '../../../openapi3/aether/2.1.0/models';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';

@Component({
    selector: 'aether-upf',
    templateUrl: './upf.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class UpfComponent
    extends RocListBase<UpfDatasource, SiteUpf>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SiteUpf>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'address',
        'config-endpoint',
        'port',
        'edit',
        'usage/delete',
        'monitor',
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        protected enterpriseService: EnterpriseService,
        private basketService: BasketService,
        private siteService: SiteService
    ) {
        super(
            basketService,
            new UpfDatasource(enterpriseService, basketService)
        );
        super.reqdAttr = ['port', 'address'];
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            upfModelPath
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
