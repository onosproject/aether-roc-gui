/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RocListBase } from '../../roc-list-base';
import { DeviceDatasource } from './device-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services/service';
import { BasketService } from '../../basket.service';
import { AETHER_TARGET } from '../../../environments/environment';
import { RocElement } from '../../../openapi3/top/level/models/elements';
import { EnterprisesEnterpriseSiteDevice } from '../../../openapi3/aether/2.0.0/models/enterprises-enterprise-site-device';

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
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseSiteDevice>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'imei',
        'sim-card',
        'edit',
        'usage/delete',
        'monitor',
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new DeviceDatasource(aetherService, basketService, AETHER_TARGET),
            'Enterprises-2.0.0',
            'device-id'
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

    deleteDevice(id: string, enterpriseID: string, siteID: string): void {
        this.pathRoot = ('Enterprises-2.0.0/enterprise' +
            '[enterprise-id=' +
            enterpriseID +
            '[site-id=' +
            siteID +
            ']') as RocElement;
        this.delete(id);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getEnterprises({
                target: AETHER_TARGET,
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
