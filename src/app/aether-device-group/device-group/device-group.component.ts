/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DeviceGroupDeviceGroup} from '../../../openapi3/aether/3.0.0/models/device-group-device-group';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {BasketService} from '../../basket.service';
import {AETHER_TARGETS} from '../../../environments/environment';
import {RocListBase} from '../../roc-list-base';
import {DeviceGroupDatasource} from './device-group-datasource';

@Component({
    selector: 'aether-device-group',
    templateUrl: './device-group.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class DeviceGroupComponent extends RocListBase<DeviceGroupDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<DeviceGroupDeviceGroup>;

    displayedColumns = [
        'id',
        'description',
        'Imsis',
        'ip-domain',
        'site',
        'edit',
        'delete',
        'monitor'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(basketService, new DeviceGroupDatasource(aetherService, basketService, AETHER_TARGETS[0]),
            'device-group-3.0.0', 'device-group');
        super.reqdAttr = ['site'];
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('device-group-3.0.0' in basketPreview && 'device-group' in basketPreview['device-group-3.0.0']) {
            basketPreview['device-group-3.0.0']['device-group'].forEach((basketItems) => {
                ScopeOfDataSource.data
                    .filter(listItem => basketItems.id === listItem.id)
                    .forEach((listItem, listItemCount) => {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name'];
                        }
                        if (basketItems.imsis) {
                            if (ScopeOfDataSource.data[listItemCount].imsis.length === 0) {
                                ScopeOfDataSource.data[listItemCount].imsis = basketItems.imsis;
                            } else {
                                for (const eachBasketDG of basketItems.imsis) {
                                    let eachDGPosition = 0;
                                    for (const eachScopeDG of ScopeOfDataSource.data[listItemCount].imsis) {
                                        if (eachBasketDG.imsis === eachScopeDG.imsis) {
                                            ScopeOfDataSource.data[listItemCount].imsis[eachDGPosition].name
                                                = eachBasketDG.name;
                                        }
                                        eachDGPosition++;
                                    }
                                }
                            }
                        }
                        if (basketItems['ip-domain']) {
                            ScopeOfDataSource.data[listItemCount]['ip-domain'] = basketItems['ip-domain'];
                        }
                    });
            });
        }
    }


    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getDeviceGroup({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded);
    }

}
