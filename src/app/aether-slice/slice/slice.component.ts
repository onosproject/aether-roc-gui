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
import { SliceDatasource } from './slice-datasource';
import {
    EnterpriseEnterpriseSiteSlice,
    Slice,
} from '../../../openapi3/aether/2.0.0/models';
import { HexPipe } from '../../utils/hex.pipe';
import { RocDataSource } from '../../roc-data-source';

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
    @ViewChild(MatTable) table: MatTable<EnterpriseEnterpriseSiteSlice>;
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
            new SliceDatasource(
                aetherService,
                basketService,
                AETHER_TARGETS[0]
            ),
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
        ScopeOfDataSource: RocDataSource<EnterpriseEnterpriseSiteSlice, Slice>
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

    deleteSlice(id: string): void {
        const ucMap = new Map<string, string>();
        if (this.reqdAttr.length > 0) {
            ucMap.set(
                '/' +
                    this.pathRoot +
                    '/' +
                    this.pathListAttr +
                    '[' +
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
            this.aetherService.getSlice({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
