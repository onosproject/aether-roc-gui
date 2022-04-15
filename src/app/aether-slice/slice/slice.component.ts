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
import { BasketService } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { SliceDatasource } from './slice-datasource';
import { HexPipe } from '../../utils/hex.pipe';
import { sliceModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';
import { SiteSlice } from '../../../openapi3/aether/2.1.0/models';

@Component({
    selector: 'aether-slice',
    templateUrl: './slice.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SliceComponent
    extends RocListBase<SliceDatasource, SiteSlice>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SiteSlice>;
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

    modelPath = ['site-2.1.0', 'site', 'slice', 'slice-id'];

    constructor(
        public opaService: OpenPolicyAgentService,
        protected enterpriseService: EnterpriseService,
        private basketService: BasketService,
        private siteService: SiteService
    ) {
        super(
            basketService,
            new SliceDatasource(enterpriseService, basketService)
        );
        super.reqdAttr = ['sd', 'sst', 'default-behavior'];
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            sliceModelPath,
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
