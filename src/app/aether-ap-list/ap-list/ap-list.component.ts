/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApListApList} from '../../../openapi3/aether/3.0.0/models/ap-list-ap-list';
import {MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {MatPaginator} from '@angular/material/paginator';
import {ApListDatasource} from './ap-list-datasource';
import {BasketService} from '../../basket.service';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {AETHER_TARGETS} from '../../../environments/environment';
import {RocListBase} from '../../roc-list-base';

@Component({
    selector: 'aether-ap-list',
    templateUrl: './ap-list.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class ApListComponent extends RocListBase<ApListDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ApListApList>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'Access-Points',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(new ApListDatasource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('ap-list-3.0.0' in basketPreview && 'ap-list' in basketPreview['ap-list-3.0.0']) {
            basketPreview['ap-list-3.0.0']['ap-list'].forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
                    if (basketItems.id === listItem.id) {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name'];
                        }
                        if (basketItems.description) {
                            ScopeOfDataSource.data[listItemCount].description = basketItems.description;

                        }
                        if (basketItems.enterprise) {
                            ScopeOfDataSource.data[listItemCount].enterprise = basketItems.enterprise;
                        }
                        if (basketItems['access-points']) {
                            if (ScopeOfDataSource.data[listItemCount]['access-points'].length === 0) {
                                ScopeOfDataSource.data[listItemCount]['access-points'] = basketItems['access-points'];
                            } else {
                                for (const eachBasketAP of basketItems['access-points']) {
                                    let eachAPPosition = 0;
                                    for (const eachScopeAP of ScopeOfDataSource.data[listItemCount]['access-points']) {
                                        if (eachBasketAP['access-points'] === eachScopeAP['access-points']) {
                                            ScopeOfDataSource.data[listItemCount]['access-points'][eachAPPosition].address
                                                = eachBasketAP.address;
                                        }
                                        eachAPPosition++;
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
        this.dataSource.loadData(this.aetherService.getApList({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded);
    }

}
