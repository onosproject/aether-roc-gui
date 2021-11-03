/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {ConnectivityServiceConnectivityService} from '../../../openapi3/aether/4.0.0/models';
import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services';
import {ConnectivityServiceDatasource} from './connectivity-service-datasource';
import {AETHER_TARGETS} from '../../../environments/environment';
import {BasketService} from '../../basket.service';
import {RocListBase} from '../../roc-list-base';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

@Component({
    selector: 'aether-connectivity-service',
    templateUrl: './connectivity-service.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class ConnectivityServiceComponent extends RocListBase<ConnectivityServiceDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ConnectivityServiceConnectivityService>;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'description',
        'core-endpoint',
        'edit',
        'delete',
        'usage'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(basketService, new ConnectivityServiceDatasource(aetherService, basketService, AETHER_TARGETS[0]),
            'connectivity-service-4.0.0', 'connectivity-service');
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('connectivity-service-4.0.0' in basketPreview && 'connectivity-service' in basketPreview['connectivity-service-4.0.0']) {
            basketPreview['connectivity-service-4.0.0']['connectivity-service'].forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
                    if (basketItems.id === listItem.id) {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name'];
                        }
                        if (basketItems['core-endpoint']) {
                            ScopeOfDataSource.data[listItemCount]['core-5g-endpoint'] = basketItems['core-endpoint'];
                        }
                        if (basketItems.description) {
                            ScopeOfDataSource.data[listItemCount].description = basketItems.description;
                        }
                    }
                });
            });
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getConnectivityService({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded);
    }
}
