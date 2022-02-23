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
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { AETHER_TARGET } from '../../../environments/environment';
import { EnterprisesEnterpriseSiteIpDomain } from '../../../openapi3/aether/2.0.0/models';

@Component({
    selector: 'aether-ip-domain',
    templateUrl: './ip-domain.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class IpDomainComponent
    extends RocListBase<IpDomainDatasource, EnterprisesEnterpriseSiteIpDomain>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseSiteIpDomain>;

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

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            basketService,
            new IpDomainDatasource(aetherService, basketService, AETHER_TARGET)
        );
        super.reqdAttr = ['enterprise', 'subnet', 'dnn'];
    }

    onDataLoaded(ScopeOfDataSource: IpDomainDatasource): void {
        // TODO: merge basket with loaded data
        // if (
        //     this.pathRoot in basketPreview &&
        //     'site' in basketPreview[this.pathRoot]
        // ) {
        //     ScopeOfDataSource.merge(basketPreview['Site-2.0.0'].site, [
        //         { fieldName: 'small-cell', idAttr: 'small-cell-id' },
        //     ]);
        // }
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
