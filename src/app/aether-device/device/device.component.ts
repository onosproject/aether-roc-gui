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
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGETS } from '../../../environments/environment';
import { BasketService } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { EnterpriseEnterpriseSiteDevice } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-device';
import { DeviceDatasource } from './device-datasoruce';

@Component({
    selector: 'aether-device',
    templateUrl: './device.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class DeviceComponent
    extends RocListBase<DeviceDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterpriseEnterpriseSiteDevice>;

    displayedColumns = [
        'id',
        'imei',
        'description',
        'sim-card',
        'edit',
        'usage/delete',
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new DeviceDatasource(
                aetherService,
                basketService,
                AETHER_TARGETS[0]
            ),
            'Enterprises-2.0.0',
            'device'
        );
    }

    onDataLoaded(ScopeOfDataSource: DeviceDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        this.usageArray = [];
        if (
            this.pathRoot in basketPreview &&
            'device' in basketPreview[this.pathRoot]
        ) {
            ScopeOfDataSource.merge(basketPreview['Device-2.0.0'].device);
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getDevice({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
