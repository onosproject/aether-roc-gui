/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OpenPolicyAgentService } from 'src/app/open-policy-agent.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';
import { BasketService } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { SliceDatasource } from './slice-datasource';
import {
    Enterprises,
    EnterprisesEnterpriseSiteSlice,
} from '../../../openapi3/aether/2.0.0/models';
import { HexPipe } from '../../utils/hex.pipe';
import { RocDataSource } from '../../roc-data-source';

@Component({
    selector: 'aether-slice',
    templateUrl: './slice.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SliceComponent
    extends RocListBase<SliceDatasource, EnterprisesEnterpriseSiteSlice>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseSiteSlice>;
    sdAsInt = HexPipe.hexAsInt;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'filter',
        'default-behavior',
        'mbr',
        'device-group',
        'sd',
        'sst',
        'upf',
        'edit',
        'delete',
        'monitor',
    ];

    modelPath = [
        'Enterprises-2.0.0',
        'enterprise',
        'site',
        'slice',
        'slice-id',
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new SliceDatasource(aetherService, basketService, AETHER_TARGET)
        );
        super.reqdAttr = ['sd', 'sst', 'default-behavior'];
    }

    onDataLoaded(
        ScopeOfDataSource: RocDataSource<
            EnterprisesEnterpriseSiteSlice,
            Enterprises
        >
    ): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            this.modelPath,
            [
                { fieldName: 'device-group', idAttr: 'device-group' },
                { fieldName: 'filter', idAttr: 'application' },
            ]
        );
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
