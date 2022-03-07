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
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';
import { BasketService } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { SiteDatasource } from './site-datasource';
import { EnterprisesEnterpriseSite } from '../../../openapi3/aether/2.0.0/models';

@Component({
    selector: 'aether-site',
    templateUrl: './site.component.html',
    styleUrls: ['../../common-profiles.component.scss', 'site.component.scss'],
})
export class SiteComponent
    extends RocListBase<SiteDatasource, EnterprisesEnterpriseSite>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseSite>;

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

    modelPath = ['Enterprises-2.0.0', 'enterprise', 'site', 'site-id'];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new SiteDatasource(aetherService, basketService, AETHER_TARGET)
        );
    }

    onDataLoaded(ScopeOfDataSource: SiteDatasource): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            this.modelPath,
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
        this.dataSource.loadData(
            this.aetherService.getEnterprises({
                target: AETHER_TARGET,
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
