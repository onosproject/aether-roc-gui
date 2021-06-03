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
import {ApnProfileApnProfile} from '../../../openapi3/aether/2.1.0/models';
import {ApnProfilesDatasource} from './apn-profiles-datasource';
import {BasketService} from '../../basket.service';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {RocListBase} from '../../roc-list-base';

@Component({
    selector: 'aether-apn-profiles',
    templateUrl: './apn-profiles.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class ApnProfilesComponent extends RocListBase<ApnProfilesDatasource> implements AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ApnProfileApnProfile>;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'description',
        'apn-name',
        'dns',
        'mtu',
        'gx-enabled',
        'service-group',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(new ApnProfilesDatasource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('apn-profile-2.1.0' in basketPreview && 'apn-profile' in basketPreview['apn-profile-2.1.0']) {
            basketPreview['apn-profile-2.1.0']['apn-profile'].forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
                    if (basketItems.id === listItem.id) {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name'];
                        }
                        if (basketItems['dns-secondary']) {
                            ScopeOfDataSource.data[listItemCount]['dns-secondary'] = basketItems['dns-secondary'];
                        }
                        if (basketItems.mtu) {
                            ScopeOfDataSource.data[listItemCount].mtu = basketItems.mtu;
                        }
                        if (basketItems['apn-name']){
                            ScopeOfDataSource.data[listItemCount]['apn-name'] = basketItems['apn-name'];
                        }
                        if (basketItems['dns-primary']) {
                            ScopeOfDataSource.data[listItemCount]['dns-primary'] = basketItems['dns-primary'];
                        }
                        if (basketItems['gx-enabled']) {
                            ScopeOfDataSource.data[listItemCount]['gx-enabled'] = basketItems['gx-enabled'];
                        }
                        if (basketItems['service-group']) {
                            ScopeOfDataSource.data[listItemCount]['service-group'] = basketItems['service-group'];
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
        this.dataSource.loadData(this.aetherService.getApnProfile({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded);
    }
}
