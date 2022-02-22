/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EnterprisesEnterprise } from '../../../openapi3/aether/2.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { EnterpriseDatasource } from './enterprise-datasource';
import { AETHER_TARGET } from '../../../environments/environment';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { RocListBase } from '../../roc-list-base';

@Component({
    selector: 'aether-enterprise-profiles',
    templateUrl: './enterprise.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class EnterpriseComponent
    extends RocListBase<EnterpriseDatasource, EnterprisesEnterprise>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterprise>;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'description',
        'sites',
        'applications',
        'trafficclasses',
        'templates',
        'connectivity',
        'edit',
        'delete',
    ];

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
                AETHER_TARGET
            )
        );
    }

    onDataLoaded(ScopeOfDataSource: EnterpriseDatasource): void {
        /* TODO: Needs work*/
        // const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        // if (
        //     this.pathRoot in basketPreview &&
        //     'enterprise' in basketPreview[this.pathRoot]
        // ) {
        //     ScopeOfDataSource.merge(
        //         basketPreview['Enterprises-2.0.0'].enterprise,
        //         [
        //             {
        //                 fieldName: 'connectivity-service',
        //                 idAttr: 'connectivity-service',
        //             },
        //         ]
        //     );
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
