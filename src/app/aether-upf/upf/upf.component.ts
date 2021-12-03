/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OpenPolicyAgentService } from 'src/app/open-policy-agent.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { AETHER_TARGETS } from '../../../environments/environment';
import { BasketService } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { UpfDatasource } from './upf-datasource';
import { UpfUpf } from '../../../openapi3/aether/4.0.0/models';

@Component({
    selector: 'aether-upf',
    templateUrl: './upf.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class UpfComponent
    extends RocListBase<UpfDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<UpfUpf>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'address',
        'config-endpoint',
        'port',
        'edit',
        'delete',
        'usage',
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new UpfDatasource(aetherService, basketService, AETHER_TARGETS[0]),
            'Upf-4.0.0',
            'upf'
        );
        super.reqdAttr = ['enterprise', 'port', 'address', 'site'];
    }

    onDataLoaded(ScopeOfDataSource: UpfDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if (
            this.pathRoot in basketPreview &&
            'upf' in basketPreview[this.pathRoot]
        ) {
            basketPreview['Upf-4.0.0'].upf.forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
                    if (basketItems.id === listItem.id) {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount][
                                'display-name'
                            ] = basketItems['display-name'];
                        }
                        if (basketItems.description) {
                            ScopeOfDataSource.data[listItemCount].description =
                                basketItems.description;
                        }
                        if (basketItems.enterprise) {
                            ScopeOfDataSource.data[listItemCount].enterprise =
                                basketItems.enterprise;
                        }
                        if (basketItems.address) {
                            ScopeOfDataSource.data[listItemCount].address =
                                basketItems.address;
                        }
                        if (basketItems['site']) {
                            ScopeOfDataSource.data[listItemCount]['site'] =
                                basketItems['site'];
                        }
                        if (basketItems['config-endpoint']) {
                            ScopeOfDataSource.data[listItemCount][
                                'config-endpoint'
                            ] = basketItems['config-endpoint'];
                        }
                        if (basketItems.port) {
                            ScopeOfDataSource.data[listItemCount].port =
                                basketItems.port;
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
        this.dataSource.loadData(
            this.aetherService.getUpf({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
