/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { BasketService } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { DeviceGroupDatasource } from './device-group-datasource';
import { deviceGroupModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteDeviceGroup } from '../../../openapi3/aether/2.1.0/models';

@Component({
    selector: 'aether-device-group',
    templateUrl: './device-group.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class DeviceGroupComponent
    extends RocListBase<DeviceGroupDatasource, SiteDeviceGroup>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SiteDeviceGroup>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'ip-domain',
        'device',
        'edit',
        'Usage/delete',
        'monitor',
    ];

    modelPath = ['site-2.1.0', 'site', 'device-group', 'device-group-id'];

    constructor(
        protected enterpriseService: EnterpriseService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        private siteService: SiteService
    ) {
        super(
            basketService,
            new DeviceGroupDatasource(enterpriseService, basketService)
        );
        super.reqdAttr = ['traffic-class'];
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            deviceGroupModelPath,
            [{ fieldName: 'device', idAttr: 'device-id' }]
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
