/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {AccessProfileAccessProfile} from '../../../openapi3/aether/2.1.0/models';
import {AccessProfilesDatasource} from './access-profiles-datasource';
import {BasketService} from '../../basket.service';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {RocListBase} from '../../roc-list-base';

@Component({
    selector: 'aether-access-profiles',
    templateUrl: './access-profiles.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class AccessProfilesComponent extends RocListBase<AccessProfilesDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<AccessProfileAccessProfile>;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'description',
        'type',
        'filter',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(new AccessProfilesDatasource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('access-profile-2.1.0' in basketPreview && 'access-profile' in basketPreview['access-profile-2.1.0']) {
            basketPreview['access-profile-2.1.0']['access-profile'].forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
                    if (basketItems.id === listItem.id) {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name'];
                        }
                        if (basketItems.description) {
                            ScopeOfDataSource.data[listItemCount].description = basketItems.description;
                        }
                        if (basketItems.type) {
                            ScopeOfDataSource.data[listItemCount].type = basketItems.type;
                        }
                        if (basketItems.filter) {
                            ScopeOfDataSource.data[listItemCount].filter = basketItems.filter;
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
        this.dataSource.loadData(this.aetherService.getAccessProfile({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded);
    }
}
