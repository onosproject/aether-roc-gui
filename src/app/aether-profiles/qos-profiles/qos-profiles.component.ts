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
import {QosProfileQosProfile} from '../../../openapi3/aether/2.1.0/models';
import {QosProfilesDatasource} from './qos-profiles-datasource';
import {BasketService} from '../../basket.service';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {RocListBase} from '../../roc-list-base';

@Component({
    selector: 'aether-qos-profiles',
    templateUrl: './qos-profiles.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class QosProfilesComponent extends RocListBase<QosProfilesDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<QosProfileQosProfile>;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'description',
        'qci',
        'uplink',
        'downlink',
        'priority',
        'capability',
        'vulnerability',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(new QosProfilesDatasource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('qos-profile-2.1.0' in basketPreview && 'qos-profile' in basketPreview['qos-profile-2.1.0']) {
            basketPreview['qos-profile-2.1.0']['qos-profile'].forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
                    if (basketItems.id === listItem.id) {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name'];
                        }
                        if (basketItems['apn-ambr'] && basketItems['apn-ambr'].uplink) {
                            ScopeOfDataSource.data[listItemCount]['apn-ambr'].uplink = basketItems['apn-ambr'].uplink;
                        }
                        if (basketItems['apn-ambr'] && basketItems['apn-ambr'].downlink) {
                            ScopeOfDataSource.data[listItemCount]['apn-ambr'].downlink = basketItems['apn-ambr'].downlink;
                        }
                        if (basketItems.qci){
                            ScopeOfDataSource.data[listItemCount].qci = basketItems.qci;
                        }
                        if (basketItems.arp && basketItems.arp.priority) {
                            ScopeOfDataSource.data[listItemCount].arp.priority = basketItems.arp.priority;
                        }
                        if (basketItems.arp && 'preemption-capability' in basketItems.arp) {
                            ScopeOfDataSource.data[listItemCount].arp['preemption-capability'] = basketItems.arp['preemption-capability'];
                        }
                        if (basketItems.arp && 'preemption-vulnerability' in basketItems.arp) {
                            ScopeOfDataSource.data[listItemCount].arp['preemption-vulnerability'] = basketItems.arp['preemption-vulnerability'];
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
        this.dataSource.loadData(this.aetherService.getQosProfile({
            target: AETHER_TARGETS[0]
        }),     this.onDataLoaded);
    }
}
