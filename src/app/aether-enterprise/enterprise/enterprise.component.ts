/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EnterpriseEnterprise } from '../../../openapi3/aether/2.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { EnterpriseDatasource } from './enterprise-datasource';
import { AETHER_TARGETS } from '../../../environments/environment';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { RocListBase } from '../../roc-list-base';

@Component({
    selector: 'aether-enterprise-profiles',
    templateUrl: './enterprise.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class EnterpriseComponent
    extends RocListBase<EnterpriseDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterpriseEnterprise>;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'description', 'connectivity', 'edit', 'delete'];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            basketService,
            new EnterpriseDatasource(
                aetherService,
                basketService,
                AETHER_TARGETS[0]
            ),
            'Enterprises-2.0.0',
            'enterprise'
        );
    }

    onDataLoaded(ScopeOfDataSource: EnterpriseDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if (
            this.pathRoot in basketPreview &&
            'enterprise' in basketPreview[this.pathRoot]
        ) {
            ScopeOfDataSource.merge(
                basketPreview['Enterprise-2.0.0'].enterprise,
                [
                    {
                        fieldName: 'connectivity-service',
                        idAttr: 'connectivity-service',
                    },
                ]
            );
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getEnterprise({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
