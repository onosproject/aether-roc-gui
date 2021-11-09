/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, ViewChild} from '@angular/core'
import {OpenPolicyAgentService} from 'src/app/open-policy-agent.service'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'
import {MatTable} from '@angular/material/table'
import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services'
import {AETHER_TARGETS} from '../../../environments/environment'
import {BasketService} from '../../basket.service'
import {RocListBase} from '../../roc-list-base'
import {VcsDatasource} from './vcs-datasource'
import {VcsVcs} from '../../../openapi3/aether/4.0.0/models'

@Component({
    selector: 'aether-vcs',
    templateUrl: './vcs.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class VcsComponent extends RocListBase<VcsDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<VcsVcs>;

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
        'monitor'
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService,
    ) {
        super(basketService, new VcsDatasource(aetherService, basketService, AETHER_TARGETS[0]),
            'Vcs-4.0.0', 'vcs')
        super.reqdAttr = ['sd', 'sst', 'enterprise', 'site', 'default-behavior']
    }

    onDataLoaded(ScopeOfDataSource: VcsDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates
        if ('Vcs-4.0.0' in basketPreview && 'vcs' in basketPreview['Vcs-4.0.0']) {
            ScopeOfDataSource.merge(basketPreview['Vcs-4.0.0'].vcs, [
                {fieldName: 'filter', idAttr: 'application'}
            ])
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.table.dataSource = this.dataSource
        this.dataSource.loadData(this.aetherService.getVcs({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded)
    }
}
