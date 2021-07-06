/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, Inject, Input, OnDestroy, ViewChild} from '@angular/core';
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
import {ID_TOKEN_ATTR} from '../../aether.component';

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
    prometheusTimer: any;
    grafanaOrgIdTimer: any;
    grafanaOrgIdRetry: number = 0;
    loginTokenTimer: any;
    panelUrl: string;
    grafanaOrgId: number;
    grafanaOrgName: string;
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
        @Inject('grafana_api_proxy') private grafanaUrl: string,
    ) {
        super(new PanelVcsDatasource(aetherService, basketService, AETHER_TARGETS[0]));
        this.promData = new PanelVcsPromDataSource(httpClient);
        this.grafanaOrgIdTimer = setInterval(() => {
            // Retry if orgID is not yet set
            const orgIdStr = localStorage.getItem('orgID');
            const orgName = localStorage.getItem('orgName');
            if (orgIdStr !== null) {
                this.grafanaOrgId = parseInt(orgIdStr, 10);
                this.grafanaOrgName = orgName;
                this.panelUrl = this.vcsPanelUrl(this.grafanaOrgId, this.grafanaOrgName);
                console.log('orgID retrieved ' + this.grafanaOrgId + '(' + this.grafanaOrgName + '). URL is', this.panelUrl);
                clearInterval(this.grafanaOrgIdTimer);
                return;
            }
            if (this.grafanaOrgIdRetry > 5) {
                clearInterval(this.grafanaOrgIdTimer);
                console.log('Gave up waiting for orgID to be set on login after', this.grafanaOrgIdRetry, 'sec');
                return;
            } else {
                this.grafanaOrgIdRetry++;
            }
        }, 1000);
    }

    onDataLoaded(ScopeOfDataSource): void {
        ScopeOfDataSource.data.forEach((vcs: VcsVcs) => {
            // Add the tag on to VCS. the data is filled in below
            promTags.forEach((tag: string) => vcs[tag] = {});
        });
        console.log('VCS Data Loaded');
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        console.log('Testing token', localStorage.getItem(ID_TOKEN_ATTR));
        // Wait for token to be loaded
        this.loginTokenTimer = setInterval(() => {
            if (localStorage.getItem(ID_TOKEN_ATTR) !== null) {
                console.log('Load items after token is loaded');
                this.dataSource.loadData(this.aetherService.getVcs({
                    target: AETHER_TARGETS[0]
                }), this.onDataLoaded);
                clearInterval(this.loginTokenTimer);
            }
        }, 10);

        this.prometheusTimer = setInterval(() => this.promData.loadData(promTags).subscribe(
            (resultItem) => {
                // Tag these new attributes on to the data in the main data source
                // associate it with the right VCS
                if (this.dataSource.data.length === 0) {
                    clearInterval(this.prometheusTimer);
                    console.log('No VCS to monitor');
                    return;
                }
                this.dataSource.data.forEach((vcs) => {
                    if (vcs[resultItem.metric.__name__] === undefined) {
                        vcs[resultItem.metric.__name__] = {};
                    }
                    const vcsIdUs = vcs.id.split('-').join('_'); // replaceAll seems not be an option
                    if (resultItem.metric.vcs_id === vcsIdUs) {
                        vcs[resultItem.metric.__name__][vcs.id] = resultItem.value[1];
                        // console.log('Wrote ', resultItem.metric.__name__, vcs.id, resultItem.value[1]);
                    }
                });
            },
            (err) => console.log('error polling ', err),
        ), 3000);
    }

    ngOnDestroy(): void {
        clearInterval(this.prometheusTimer);
        clearInterval(this.grafanaOrgIdTimer);
        clearInterval(this.loginTokenTimer);
    }

    vcsPanelUrl(orgId: number, orgName: string, vcsName?: string): string {
        if (vcsName === undefined) {
            return this.grafanaUrl + '/d-solo/vcs_' + orgName + '_all?orgId=' + orgId +
                '&theme=light&panelId=1';
        }
        return this.grafanaUrl + '/d-solo/vcs_' + vcsName + '?orgId=' + orgId +
            '&theme=light&panelId=1';
    }
}
