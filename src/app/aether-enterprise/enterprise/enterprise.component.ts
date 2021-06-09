/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {EnterpriseEnterprise} from '../../../openapi3/aether/3.0.0/models';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {EnterpriseDatasource} from './enterprise-datasource';
import {AETHER_TARGETS} from '../../../environments/environment';
import {BasketService, ORIGINAL, TYPE} from '../../basket.service';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {RocListBase} from '../../roc-list-base';

@Component({
    selector: 'aether-enterprise-profiles',
    templateUrl: './enterprise.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class EnterpriseComponent extends RocListBase<EnterpriseDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterpriseEnterprise>;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'description',
        'connectivity',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(new EnterpriseDatasource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('enterprise-3.0.0' in basketPreview && 'enterprise' in basketPreview['enterprise-3.0.0']) {
            basketPreview['enterprise-3.0.0'].enterprise.forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
                    if (basketItems.id === listItem.id) {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name'];
                        }
                        if (basketItems.description) {
                            ScopeOfDataSource.data[listItemCount].description = basketItems.description;
                        }
                        if (basketItems['connectivity-service']){
                            if (ScopeOfDataSource.data[listItemCount]['connectivity-service'].length === 0) {
                                ScopeOfDataSource.data[listItemCount]['connectivity-service'] = basketItems['connectivity-service'];
                            } else {
                                for (const eachBasketCS of basketItems['connectivity-service']) {
                                    let eachCSPosition = 0;
                                    for (const eachScopeCS of ScopeOfDataSource.data[listItemCount]['connectivity-service']){
                                        if (eachBasketCS['connectivity-service'] === eachScopeCS['connectivity-service']){
                                            ScopeOfDataSource.data[listItemCount]['connectivity-service'][eachCSPosition].enabled
                                            = eachBasketCS.enabled;
                                        }
                                        eachCSPosition++;
                                    }
                                }
                            }
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
        this.dataSource.loadData(this.aetherService.getEnterprise({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded);
    }
}
