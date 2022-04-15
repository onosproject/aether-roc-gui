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
import { SiteDatasource } from './site-datasource';
import { siteModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';
import { Site } from '../../../openapi3/aether/2.1.0/models';

@Component({
    selector: 'aether-site',
    templateUrl: './site.component.html',
    styleUrls: ['../../common-profiles.component.scss', 'site.component.scss'],
})
export class SiteComponent
    extends RocListBase<SiteDatasource, Site>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<Site>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'small-cells',
        'slices',
        'device-groups',
        'ip-domains',
        'upfs',
        'devices',
        'sim-cards',
        'edit',
        'delete',
        'monitor',
    ];

    modelPath = ['site-2.1.0', 'site', 'site-id'];

    constructor(
        public opaService: OpenPolicyAgentService,
        protected enterpriseService: EnterpriseService,
        private basketService: BasketService,
        private siteService: SiteService
    ) {
        super(
            basketService,
            new SiteDatasource(enterpriseService, basketService)
        );
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            siteModelPath,
            [
                { fieldName: 'device-group', idAttr: 'device-group-id' },
                { fieldName: 'device', idAttr: 'device-id' },
                { fieldName: 'ip-domain', idAttr: 'ip-domain-id' },
                { fieldName: 'sim-card', idAttr: 'sim-id' },
                { fieldName: 'slice', idAttr: 'slice-id' },
                { fieldName: 'small-cell', idAttr: 'small-cell-id' },
                { fieldName: 'upf', idAttr: 'upf-id' },
            ]
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
