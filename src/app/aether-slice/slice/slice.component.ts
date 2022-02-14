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
import { EnterprisesEnterpriseSiteSlice } from '../../../openapi3/aether/2.0.0/models';
import { HexPipe } from '../../utils/hex.pipe';
import { RocDataSource } from '../../roc-data-source';
import { RocElement } from '../../../openapi3/top/level/models/elements';

@Component({
    selector: 'aether-slice',
    templateUrl: './slice.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SliceComponent
    extends RocListBase<SliceDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseSiteSlice>;
    sdAsInt = HexPipe.hexAsInt;
    deletedSliceArray = [];

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

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new SliceDatasource(aetherService, basketService, AETHER_TARGET),
            'Enterprises-2.0.0',
            'slice'
        );
        super.reqdAttr = [
            'sd',
            'sst',
            'enterprise',
            'site',
            'default-behavior',
        ];
    }

    onDataLoaded(
        ScopeOfDataSource: RocDataSource<EnterprisesEnterpriseSiteSlice, any>
    ): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if (
            this.pathRoot in basketPreview &&
            'slice' in basketPreview[this.pathRoot]
        ) {
            ScopeOfDataSource.merge(basketPreview['Slice-2.0.0'].slice, [
                { fieldName: 'filter', idAttr: 'application' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
        }
    }
    checkForDeletedSlice(): void {
        const DeletesBasketPreview =
            this.basketService.buildPatchBody().Deletes;
        if (
            'slice-2.0.0' in DeletesBasketPreview &&
            'slice' in DeletesBasketPreview['slice-2.0.0']
        ) {
            this.deletedSliceArray = DeletesBasketPreview[
                'slice-2.0.0'
            ].slice.map((DeletedSliceID) => DeletedSliceID['slice-id']);
        }
    }

    deleteSlice(id: string, enterpriseID: string, siteID: string): void {
        this.pathRoot = ('Enterprises-2.0.0/enterprise' +
            '[enterprise-id=' +
            enterpriseID +
            '[site-id=' +
            siteID +
            ']') as RocElement;
        const ucMap = new Map<string, string>();
        if (this.reqdAttr.length > 0) {
            ucMap.set(
                '/' +
                    this.pathRoot +
                    '/' +
                    this.pathListAttr +
                    '[' +
                    this.pathListAttr +
                    '-' +
                    this.indexAttr +
                    '=' +
                    id +
                    ']',
                this.reqdAttr.join(',')
            );
        }
        this.bs.deleteIndexedEntry(
            '/' +
                this.pathRoot +
                '/' +
                this.pathListAttr +
                '[' +
                this.pathListAttr +
                '-' +
                this.indexAttr +
                '=' +
                id +
                ']',
            this.indexAttr,
            id,
            ucMap
        );
        this.checkForDeletedSlice();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.checkForDeletedSlice();
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getEnterprises({
                target: AETHER_TARGET,
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
