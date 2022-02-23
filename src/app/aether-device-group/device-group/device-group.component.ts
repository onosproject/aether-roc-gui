/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { BasketService } from '../../basket.service';
import { AETHER_TARGET } from '../../../environments/environment';
import { RocListBase } from '../../roc-list-base';
import { DeviceGroupDatasource } from './device-group-datasource';
import { EnterprisesEnterpriseSiteDeviceGroup } from '../../../openapi3/aether/2.0.0/models';

@Component({
    selector: 'aether-device-group',
    templateUrl: './device-group.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class DeviceGroupComponent
    extends RocListBase<
        DeviceGroupDatasource,
        EnterprisesEnterpriseSiteDeviceGroup
    >
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseSiteDeviceGroup>;

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

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            basketService,
            new DeviceGroupDatasource(
                aetherService,
                basketService,
                AETHER_TARGET
            )
        );
    }

    onDataLoaded(ScopeOfDataSource: DeviceGroupDatasource): void {
        // TODO: merge basket with loaded data
        // if (
        //     this.pathRoot in basketPreview &&
        //     'site' in basketPreview[this.pathRoot]
        // ) {
        //     ScopeOfDataSource.merge(basketPreview['Site-2.0.0'].site, [
        //         { fieldName: 'small-cell', idAttr: 'small-cell-id' },
        //     ]);
        // }
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
