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
import { SiteService } from '../../../openapi3/aether/2.1.0/services';
import { BasketService } from '../../basket.service';
import { deviceModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteDevice } from '../../../openapi3/aether/2.1.0/models';

@Component({
    selector: 'aether-device',
    templateUrl: './device.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class DeviceComponent
    extends RocListBase<DeviceDatasource, SiteDevice>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SiteDevice>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'imei',
        'sim-card',
        'edit',
        'usage/delete',
    ];

    modelPath = ['site-2.1.0', 'site', 'device', 'device-id'];

    constructor(
        public opaService: OpenPolicyAgentService,
        private siteService: SiteService,
        protected enterpriseService: EnterpriseService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new DeviceDatasource(enterpriseService, basketService)
        );
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            deviceModelPath
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.enterpriseService.enterprises.forEach((enterpriseId) => {
            this.dataSource.loadData(
                this.siteService.getSiteList({
                    'enterprise-id': enterpriseId.name,
                }),
                this.onDataLoaded.bind(this),
                enterpriseId
            );
        });
    }
}
