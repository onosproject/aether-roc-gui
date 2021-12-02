/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RocListBase } from '../../roc-list-base';
import { TrafficClassDatasource } from './traffic-class-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TrafficClassTrafficClass } from '../../../openapi3/aether/4.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { AETHER_TARGETS } from '../../../environments/environment';

@Component({
    selector: 'aether-traffic-class',
    templateUrl: './traffic-class.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class TrafficClassComponent
    extends RocListBase<TrafficClassDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<TrafficClassTrafficClass>;

    displayedColumns = [
        'id',
        'description',
        'pelr',
        'pdb',
        'arp',
        'qci',
        'edit',
        'delete',
        'usage',
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
                AETHER_TARGETS[0]
            ),
            'Traffic-class-4.0.0',
            'traffic-class'
        );
    }

    onDataLoaded(ScopeOfDataSource: TrafficClassDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if (
            'Traffic-class-4.0.0' in basketPreview &&
            'traffic-class' in basketPreview['Traffic-class-4.0.0']
        ) {
            basketPreview['Traffic-class-4.0.0']['traffic-class'].forEach(
                (basketItems) => {
                    ScopeOfDataSource.data.forEach(
                        (listItem, listItemCount) => {
                            if (basketItems.id === listItem.id) {
                                if (basketItems['display-name']) {
                                    ScopeOfDataSource.data[listItemCount][
                                        'display-name'
                                    ] = basketItems['display-name'];
                                }
                                if (basketItems.description) {
                                    ScopeOfDataSource.data[
                                        listItemCount
                                    ].description = basketItems.description;
                                }
                                if (basketItems.pelr) {
                                    ScopeOfDataSource.data[listItemCount].pelr =
                                        basketItems.pelr;
                                }
                                if (basketItems.pdb) {
                                    ScopeOfDataSource.data[listItemCount].pdb =
                                        basketItems.pdb;
                                }
                                if (basketItems.arp) {
                                    ScopeOfDataSource.data[listItemCount].arp =
                                        basketItems.arp;
                                }
                                if (basketItems.qci) {
                                    ScopeOfDataSource.data[listItemCount].qci =
                                        basketItems.qci;
                                }
                            }
                        }
                    );
                }
            );
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getTrafficClass({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded
        );
    }
}
