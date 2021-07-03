/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, Input, OnDestroy, ViewChild} from '@angular/core';
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

const promTags = [
    'vcs_latency',
    'vcs_jitter',
    'vcs_throughput',
];

@Component({
    selector: 'aether-panel-vcs',
    templateUrl: './panel-vcs.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class PanelVcsComponent extends RocListBase<PanelVcsDatasource> implements AfterViewInit, OnDestroy {
    @Input() top: number;
    @Input() left: number;
    @Input() width: number;
    @Input() height: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<VcsVcs>;
    timer: any;

    dashboard1: string = GRAFANA_PROXY + '/d/ROC1/roc-dashboard-1?orgId=1&kiosk';
    promData: PanelVcsPromDataSource;

    displayedColumns = [
        'id',
        'description',
        'latency',
        'jitter',
        'throughput'
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
        ScopeOfDataSource.data.forEach((vcs: VcsVcs) => {
            // Add the tag on to VCS. the data is filled in below
            promTags.forEach((tag: string) => vcs[tag] = {});
        });
        console.log('onDataLoaded() - not doing anything');
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getVcs({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded);

        this.timer = setInterval(() => this.promData.loadData(promTags).subscribe(
            (resultItem) => {
                // Tag these new attributes on to the data in the main data source
                // associate it with the right VCS
                this.dataSource.data.forEach((vcs) => {
                    if (vcs[resultItem.metric.__name__] === undefined) {
                        vcs[resultItem.metric.__name__] = {};
                    }
                    const vcsIdUs = vcs.id.split('-').join('_'); // replaceAll seems not be an option
                    if (resultItem.metric.vcs_id === vcsIdUs) {
                        vcs[resultItem.metric.__name__][vcs.id] = resultItem.value[1];
                        console.log('Wrote ', resultItem.metric.__name__, vcs.id, resultItem.value[1]);
                    }
                });
            },
            (err) => console.log('error polling ', err),
        ), 3000);
    }

    ngOnDestroy(): void {
        clearInterval(this.timer);
    }
}
