/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {OpenPolicyAgentService} from 'src/app/open-policy-agent.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {BasketService, ORIGINAL, TYPE} from '../../basket.service';
import {RocListBase} from '../../roc-list-base';
import {SiteDatasource} from './site-datasource';
import {SiteSite} from '../../../openapi3/aether/3.0.0/models';

@Component({
    selector: 'aether-site',
    templateUrl: './site.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class SiteComponent extends RocListBase<SiteDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SiteSite>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'mcc',
        'mnc',
        'enterpriseID',
        'format',
        'edit',
        'delete'
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService,
    ) {
        super(new SiteDatasource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('site-3.0.0' in basketPreview && 'site' in basketPreview['site-3.0.0']) {
            basketPreview['site-3.0.0'].site.forEach((basketItems) => {
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
                        if (basketItems['imsi-definition'] && basketItems['imsi-definition'].mcc) {
                            ScopeOfDataSource.data[listItemCount]['imsi-definition'].mcc = basketItems['imsi-definition'].mcc;
                        }
                        if (basketItems['imsi-definition'] && basketItems['imsi-definition'].mnc) {
                            ScopeOfDataSource.data[listItemCount]['imsi-definition'].mnc = basketItems['imsi-definition'].mnc;
                        }
                        if (basketItems['imsi-definition'] && basketItems['imsi-definition'].enterprise) {
                            ScopeOfDataSource.data[listItemCount]['imsi-definition'].enterprise = basketItems['imsi-definition'].enterprise;
                        }
                        if (basketItems['imsi-definition'] && basketItems['imsi-definition'].format) {
                            ScopeOfDataSource.data[listItemCount]['imsi-definition'].format = basketItems['imsi-definition'].format;

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
        this.dataSource.loadData(this.aetherService.getSite({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded);
    }

}
