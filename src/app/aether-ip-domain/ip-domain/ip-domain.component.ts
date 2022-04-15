/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RocListBase } from '../../roc-list-base';
import { IpDomainDatasource } from './ip-domain-datasource';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { ipDomainModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteIpDomain } from '../../../openapi3/aether/2.1.0/models/site-ip-domain';
import { SiteService } from '../../../openapi3/aether/2.1.0/services/site.service';

@Component({
    selector: 'aether-ip-domain',
    templateUrl: './ip-domain.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class IpDomainComponent
    extends RocListBase<IpDomainDatasource, SiteIpDomain>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SiteIpDomain>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'dns',
        'subnet',
        'admin-status',
        'mtu',
        'dnn',
        'edit',
        'Usage/delete',
    ];

    modelPath = ['site-2.1.0', 'site', 'ip-domain', 'ip-domain-id'];

    constructor(
        protected enterpriseService: EnterpriseService,

        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        private siteService: SiteService
    ) {
        super(
            basketService,
            new IpDomainDatasource(enterpriseService, basketService)
        );
        super.reqdAttr = ['subnet', 'dnn'];
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            ipDomainModelPath
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
