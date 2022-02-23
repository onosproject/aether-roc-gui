/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RocListBase } from '../../roc-list-base';
import { TrafficClassDatasource } from './traffic-class-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { AETHER_TARGET } from '../../../environments/environment';
import { EnterprisesEnterpriseTrafficClass } from '../../../openapi3/aether/2.0.0/models';

@Component({
    selector: 'aether-traffic-class',
    templateUrl: './traffic-class.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class TrafficClassComponent
    extends RocListBase<
        TrafficClassDatasource,
        EnterprisesEnterpriseTrafficClass
    >
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseTrafficClass>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'pelr',
        'pdb',
        'arp',
        'qci',
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
            new TrafficClassDatasource(
                aetherService,
                basketService,
                AETHER_TARGET
            )
        );
    }

    onDataLoaded(ScopeOfDataSource: TrafficClassDatasource): void {
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
