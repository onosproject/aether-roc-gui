/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {VcsVcs} from '../../../openapi3/aether/3.0.0/models';
import {RocListBase} from '../../roc-list-base';
import {AETHER_TARGETS} from '../../../environments/environment';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services/service';
import {BasketService} from '../../basket.service';
import {PanelVcsDatasource} from './panel-vcs-datasource';

@Component({
    selector: 'aether-panel-vcs',
    templateUrl: './panel-vcs.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class PanelVcsComponent extends RocListBase<PanelVcsDatasource> implements AfterViewInit {
    @Input() top: number;
    @Input() left: number;
    @Input() width: number;
    @Input() height: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<VcsVcs>;

    displayedColumns = [
        'id',
        'description'
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService,
    ) {
        super(new PanelVcsDatasource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    onDataLoaded(ScopeOfDataSource): void {
        console.log('onDataLoaded() - not doing anything');
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getVcs({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded);
    }
}
