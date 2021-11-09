/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, ViewChild} from '@angular/core'
import {DeviceGroupDeviceGroup} from '../../../openapi3/aether/4.0.0/models/device-group-device-group'
import {MatSort} from '@angular/material/sort'
import {MatTable} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator'
import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services'
import {OpenPolicyAgentService} from '../../open-policy-agent.service'
import {BasketService} from '../../basket.service'
import {AETHER_TARGETS} from '../../../environments/environment'
import {RocListBase} from '../../roc-list-base'
import {DeviceGroupDatasource} from './device-group-datasource'

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
        'site',
        'Imsis',
        'ip-domain',
        'device',
        'edit',
        'delete',
        'usage',
        'monitor'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(basketService, new DeviceGroupDatasource(aetherService, basketService, AETHER_TARGETS[0]),
            'Device-group-4.0.0', 'device-group')
        super.reqdAttr = ['site']
    }

    onDataLoaded(ScopeOfDataSource: DeviceGroupDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates
        if ('device-group-4.0.0' in basketPreview && 'device-group' in basketPreview['device-group-4.0.0']) {
            ScopeOfDataSource.merge(basketPreview['Device-group-4.0.0']['device-group'], [
                {fieldName: 'imsis', idAttr: 'imsi-id'}
            ])
        }
    }


    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.table.dataSource = this.dataSource
        this.dataSource.loadData(this.aetherService.getDeviceGroup({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded)
    }

}
