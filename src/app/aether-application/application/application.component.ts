/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApplicationApplication } from '../../../openapi3/aether/4.0.0/models/application-application';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services/service';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { AETHER_TARGETS } from '../../../environments/environment';
import { RocListBase } from '../../roc-list-base';
import { ApplicationDatasource } from './application-datasource';
import { displayedColumns } from '../show-vcs-usage/show-vcs-usage.component';

@Component({
    selector: 'aether-application',
    templateUrl: './application.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class ApplicationComponent
    extends RocListBase<ApplicationDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ApplicationApplication>;
    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'address',
        'Endpoint',
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
            new ApplicationDatasource(
                aetherService,
                basketService,
                AETHER_TARGETS[0]
            ),
            'Application-4.0.0',
            'application'
        );
        super.reqdAttr = ['enterprise', 'address'];
    }

    onDataLoaded(ScopeOfDataSource: ApplicationDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        this.usageArray = [];
        this.aetherService
            .getVcs({
                target: AETHER_TARGETS[0],
            })
            .subscribe((displayData) => {
                ScopeOfDataSource.data.forEach((listItem) => {
                    if (
                        displayData.vcs.some(
                            (applicationElement) =>
                                applicationElement.filter?.[0]?.application ===
                                listItem.id
                        )
                    ) {
                        const displayParentModules = {
                            id: listItem.id,
                        };
                        this.usageArray.push(displayParentModules);
                    }
                });
            });
        if (
            this.pathRoot in basketPreview &&
            'application' in basketPreview[this.pathRoot]
        ) {
            basketPreview['Application-4.0.0'].application.forEach(
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
                                if (basketItems.address) {
                                    ScopeOfDataSource.data[
                                        listItemCount
                                    ].address = basketItems.address;
                                }
                                if (basketItems.enterprise) {
                                    ScopeOfDataSource.data[
                                        listItemCount
                                    ].enterprise = basketItems.enterprise;
                                }
                                if (basketItems.endpoint) {
                                    if (
                                        ScopeOfDataSource.data[listItemCount]
                                            .endpoint.length === 0
                                    ) {
                                        ScopeOfDataSource.data[
                                            listItemCount
                                        ].endpoint = basketItems.endpoint;
                                    } else {
                                        for (const eachBasketAPP of basketItems.endpoint) {
                                            let eachAPPPosition = 0;
                                            for (const eachScopeAPP of ScopeOfDataSource
                                                .data[listItemCount].endpoint) {
                                                if (
                                                    eachBasketAPP.endpoint ===
                                                    eachScopeAPP.endpoint
                                                ) {
                                                    ScopeOfDataSource.data[
                                                        listItemCount
                                                    ].endpoint[eachAPPPosition][
                                                        'endpoint-id'
                                                    ] =
                                                        eachBasketAPP[
                                                            'endpoint-id'
                                                        ];
                                                }
                                                eachAPPPosition++;
                                            }
                                        }
                                    }
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
            this.aetherService.getApplication({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
