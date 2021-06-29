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
import {AETHER_TARGETS, GRAFANA_PROXY} from '../../../environments/environment';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services/service';
import {BasketService} from '../../basket.service';
import {PanelVcsDatasource} from './panel-vcs-datasource';
import {PanelVcsPromDataSource} from './panel-vcs-prom-data-source';
import {HttpClient} from '@angular/common/http';

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

    dashboard1: string = GRAFANA_PROXY + '/d/ROC1/roc-dashboard-1?orgId=1&kiosk';
    promData: PanelVcsPromDataSource;

    promTags = [
        'prometheus_tsdb_reloads_total',
        `prometheus_tsdb_wal_completed_pages_total`
    ];

    displayedColumns = [
        'id',
        'description',
        'prom1',
        'prom2'
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService,
        private httpClient: HttpClient,
    ) {
        super(new PanelVcsDatasource(aetherService, basketService, AETHER_TARGETS[0]));
        this.promData = new PanelVcsPromDataSource(httpClient);
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

        setInterval(() => this.promData.loadData(this.promTags).subscribe(
            (resultItem) => {
                console.log(resultItem.metric.__name__, '=', resultItem.value[1]);
                // Tag these new attributes on to the data in the main data source
                // Once we have VCS identifiers in the Prom data associate it with the
                // right VCS - until then associate the data with **all** VCS
                this.dataSource.data.forEach((vcs) => vcs[resultItem.metric.__name__] = resultItem.value[1]);
            },
            (err) => console.log('error polling ', err),
        ), 3000);
    }
}
