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
import { VcsDatasource } from './vcs-datasource';
import {
    EnterpriseEnterpriseSiteVcs,
    Vcs,
} from '../../../openapi3/aether/2.0.0/models';
import { HexPipe } from '../../utils/hex.pipe';
import { RocDataSource } from '../../roc-data-source';

@Component({
    selector: 'aether-vcs',
    templateUrl: './vcs.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class VcsComponent
    extends RocListBase<VcsDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterpriseEnterpriseSiteVcs>;
    sdAsInt = HexPipe.hexAsInt;
    deletedVCS = [];

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'filter',
        'default-behavior',
        'slice',
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
            new VcsDatasource(aetherService, basketService, AETHER_TARGETS[0]),
            'Vcs-2.0.0',
            'vcs'
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
        ScopeOfDataSource: RocDataSource<EnterpriseEnterpriseSiteVcs, Vcs>
    ): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if (
            this.pathRoot in basketPreview &&
            'vcs' in basketPreview[this.pathRoot]
        ) {
            ScopeOfDataSource.merge(basketPreview['Vcs-2.0.0'].vcs, [
                { fieldName: 'filter', idAttr: 'application' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
        }
    }
    checkForDeletedVcs(): void {
        const DeletesBasketPreview =
            this.basketService.buildPatchBody().Deletes;
        if (
            'vcs-2.0.0' in DeletesBasketPreview &&
            'vcs' in DeletesBasketPreview['vcs-2.0.0']
        ) {
            this.deletedVCS = DeletesBasketPreview['vcs-2.0.0'].vcs.map(
                (DeletedVCSID) => DeletedVCSID.id
            );
        }
    }

    deleteVCS(id: string): void {
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
        this.checkForDeletedVcs();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.checkForDeletedVcs();
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getVcs({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
